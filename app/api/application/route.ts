import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ContactMethod =
  | 'telegram'
  | 'max'
  | 'email';

type ApplicationBody = {
  name?: unknown;
  contactMethod?: unknown;
  contact?: unknown;
  adult?: unknown;
  request?: unknown;
  agreed?: unknown;
  website?: unknown;
};

type ValidationErrors = {
  name?: string;
  contact?: string;
  adult?: string;
  request?: string;
  agreed?: string;
};

const RATE_LIMIT_WINDOW_MS =
  60 * 60 * 1000;

const RATE_LIMIT_MAX_REQUESTS = 5;

const attempts = new Map<
  string,
  number[]
>();

function getClientIp(
  request: Request,
): string | null {
  const forwardedFor =
    request.headers.get(
      'x-forwarded-for',
    );

  if (forwardedFor) {
    const firstIp =
      forwardedFor
        .split(',')[0]
        ?.trim();

    if (firstIp) {
      return firstIp;
    }
  }

  const realIp =
    request.headers.get(
      'x-real-ip',
    );

  return realIp?.trim() || null;
}

function isRateLimited(
  ip: string,
) {
  const now = Date.now();

  const recentAttempts = (
    attempts.get(ip) || []
  ).filter(
    (timestamp) =>
      now - timestamp <
      RATE_LIMIT_WINDOW_MS,
  );

  if (
    recentAttempts.length >=
    RATE_LIMIT_MAX_REQUESTS
  ) {
    attempts.set(
      ip,
      recentAttempts,
    );

    return true;
  }

  recentAttempts.push(now);

  attempts.set(
    ip,
    recentAttempts,
  );

  return false;
}

function cleanString(
  value: unknown,
  maxLength: number,
) {
  if (
    typeof value !== 'string'
  ) {
    return '';
  }

  return value
    .trim()
    .slice(0, maxLength);
}

function validateApplication(
  body: ApplicationBody,
) {
  const errors: ValidationErrors =
    {};

  const name = cleanString(
    body.name,
    80,
  );

  const contact = cleanString(
    body.contact,
    150,
  );

  const request = cleanString(
    body.request,
    3000,
  );

  const contactMethod =
    body.contactMethod ===
      'telegram' ||
    body.contactMethod === 'max' ||
    body.contactMethod ===
      'email'
      ? body.contactMethod
      : null;

  if (name.length < 2) {
    errors.name =
      'Напишите, пожалуйста, как к вам обращаться';
  }

  if (!contactMethod) {
    errors.contact =
      'Выберите, пожалуйста, удобный способ связи';
  } else if (!contact) {
    errors.contact =
      'Оставьте, пожалуйста, контакт для ответа';
  } else if (
    contactMethod === 'email'
  ) {
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(
        contact,
      )
    ) {
      errors.contact =
        'Проверьте, пожалуйста, адрес email';
    }
  } else if (
    contactMethod ===
    'telegram'
  ) {
    const normalizedUsername =
      contact.startsWith('@')
        ? contact.slice(1)
        : contact;

    const telegramPattern =
      /^[A-Za-z0-9_]{5,32}$/;

    if (
      !telegramPattern.test(
        normalizedUsername,
      )
    ) {
      errors.contact =
        'Укажите имя пользователя в Telegram, например @username';
    }
  } else if (
    contactMethod === 'max'
  ) {
    const digits =
      contact.replace(
        /\D/g,
        '',
      );

    if (
      digits.length < 10 ||
      digits.length > 15
    ) {
      errors.contact =
        'Проверьте, пожалуйста, номер телефона';
    }
  }

  if (body.adult !== true) {
    errors.adult =
      'Для записи нужно подтвердить, что вам уже исполнилось 18 лет';
  }

  if (request.length < 50) {
    errors.request =
      'Напишите, пожалуйста, еще пару предложений, чтобы я могла немного понять ситуацию';
  }

  if (body.agreed !== true) {
    errors.agreed =
      'Для отправки заявки нужно согласие с условиями и обработкой данных';
  }

  return {
    errors,
    data: {
      name,
      contactMethod,
      contact,
      request,
    },
  };
}

export async function POST(
  request: Request,
) {
  const contentLength =
    Number(
      request.headers.get(
        'content-length',
      ) || 0,
    );

  if (contentLength > 20_000) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'Заявка слишком большая.',
      },
      {
        status: 413,
      },
    );
  }

  let body: ApplicationBody;

  try {
    body =
      await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message:
          'Не удалось прочитать заявку.',
      },
      {
        status: 400,
      },
    );
  }

  /*
    Honeypot.

    Обычный посетитель этого поля
    не видит. Если бот его заполнил,
    внешне отвечаем успехом,
    но письмо не отправляем.
  */

  const website =
    cleanString(
      body.website,
      200,
    );

  if (website) {
    return NextResponse.json({
      ok: true,
    });
  }

  const ip =
    getClientIp(request);

  /*
    Если платформа не передала IP,
    не используем "unknown" как
    общий ключ для всех посетителей.
  */

  if (
    ip &&
    isRateLimited(ip)
  ) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'Слишком много попыток отправки. Попробуйте немного позже.',
      },
      {
        status: 429,
      },
    );
  }

  const {
    errors,
    data,
  } =
    validateApplication(
      body,
    );

  if (
    Object.keys(errors)
      .length > 0
  ) {
    return NextResponse.json(
      {
        ok: false,
        errors,
      },
      {
        status: 400,
      },
    );
  }

  const smtpHost =
    process.env.SMTP_HOST;

  const smtpPort =
    Number(
      process.env.SMTP_PORT ||
        587,
    );

  const smtpUser =
    process.env.SMTP_USER;

  const smtpPassword =
    process.env.SMTP_PASSWORD;

  const applicationEmailTo =
    process.env
      .APPLICATION_EMAIL_TO;

  if (
    !smtpHost ||
    !smtpUser ||
    !smtpPassword ||
    !applicationEmailTo
  ) {
    console.error(
      'Application form: SMTP configuration is incomplete',
    );

    return NextResponse.json(
      {
        ok: false,
        message:
          'Отправка заявки временно недоступна. Попробуйте позже.',
      },
      {
        status: 503,
      },
    );
  }

  const transporter =
    nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,

      /*
        465 использует TLS сразу.
        587 начинает обычное соединение
        и затем переходит на STARTTLS.
      */
      secure:
        smtpPort === 465,

      requireTLS:
        smtpPort === 587,

      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },

      connectionTimeout:
        15_000,

      greetingTimeout:
        15_000,

      socketTimeout:
        20_000,
    });

  const contactMethod =
    data.contactMethod as ContactMethod;

  const contactMethodLabels: Record<
    ContactMethod,
    string
  > = {
    telegram: 'Telegram',
    max: 'MAX',
    email: 'Email',
  };

  const safeName =
    data.name.replace(
      /[\r\n]+/g,
      ' ',
    );

  const message = [
    'Новая заявка на первую встречу',
    '',
    `Имя: ${safeName}`,
    'Возраст: подтверждено 18+',
    `Удобный способ связи: ${contactMethodLabels[contactMethod]}`,
    `Контакт: ${data.contact}`,
    '',
    'С чем хочет обратиться:',
    data.request,
    '',
    'Источник: psyshashkova.ru/book',
  ].join('\n');

  try {
    await transporter.sendMail({
      from: `"psyshashkova.ru" <${smtpUser}>`,

      to:
        applicationEmailTo,

      /*
        Если человек выбрал Email,
        обычная кнопка Reply в почте
        будет отвечать сразу ему.
      */
      replyTo:
        contactMethod ===
        'email'
          ? data.contact
          : undefined,

      subject:
        `Новая заявка с psyshashkova.ru — ${safeName}`,

      text: message,
    });

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error(
      'Application form email error:',
      error,
    );

    return NextResponse.json(
      {
        ok: false,
        message:
          'Не получилось отправить заявку. Попробуйте еще раз через несколько минут.',
      },
      {
        status: 500,
      },
    );
  }
}