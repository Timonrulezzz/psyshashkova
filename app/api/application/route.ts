import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ContactMethod =
  | 'telegram'
  | 'max'
  | 'email';

const allowedTopics = [
  'relationships',
  'self',
  'emotions',
  'work',
  'decisions',
  'other',
] as const;

type TopicValue =
  (typeof allowedTopics)[number];

type ApplicationBody = {
  name?: unknown;
  contactMethod?: unknown;
  contact?: unknown;
  adult?: unknown;
  topic?: unknown;
  comment?: unknown;
  termsAgreed?: unknown;
  personalDataConsent?: unknown;
  website?: unknown;
  attribution?: unknown;
};

type ValidationErrors = {
  name?: string;
  contact?: string;
  adult?: string;
  topic?: string;
  comment?: string;
  termsAgreed?: string;
  personalDataConsent?: string;
};

const RATE_LIMIT_WINDOW_MS =
  60 * 60 * 1000;

const RATE_LIMIT_MAX_REQUESTS = 5;

const attempts = new Map<
  string,
  number[]
>();

const topicLabels: Record<
  TopicValue,
  string
> = {
  relationships:
    'Отношения и личные границы',

  self:
    'Отношение к себе и самокритика',

  emotions:
    'Эмоции и привычные реакции',

  work:
    'Работа, нагрузка и выгорание',

  decisions:
    'Решения, действия и избегание',

  other:
    'Другое / пока сложно определить',
};

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

function cleanTechnicalString(
  value: unknown,
  maxLength: number,
) {
  if (
    typeof value !== 'string'
  ) {
    return '';
  }

  return value
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function isTopicValue(
  value: unknown,
): value is TopicValue {
  return (
    typeof value === 'string' &&
    allowedTopics.includes(
      value as TopicValue,
    )
  );
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

  const rawComment =
    typeof body.comment === 'string'
      ? body.comment
      : '';

  const comment =
    cleanString(
      body.comment,
      500,
    );

      const attributionRaw =
    body.attribution &&
    typeof body.attribution === 'object' &&
    !Array.isArray(body.attribution)
      ? (
          body.attribution as Record<
            string,
            unknown
          >
        )
      : {};

  const attribution = {
    metrikaClientId:
      cleanTechnicalString(
        attributionRaw.metrikaClientId,
        80,
      ),

    yclid:
      cleanTechnicalString(
        attributionRaw.yclid,
        200,
      ),

    utmSource:
      cleanTechnicalString(
        attributionRaw.utmSource,
        200,
      ),

    utmMedium:
      cleanTechnicalString(
        attributionRaw.utmMedium,
        200,
      ),

    utmCampaign:
      cleanTechnicalString(
        attributionRaw.utmCampaign,
        200,
      ),

    utmContent:
      cleanTechnicalString(
        attributionRaw.utmContent,
        200,
      ),

    utmTerm:
      cleanTechnicalString(
        attributionRaw.utmTerm,
        200,
      ),

    landingPage:
      cleanTechnicalString(
        attributionRaw.landingPage,
        300,
      ),

    referrerOrigin:
      cleanTechnicalString(
        attributionRaw.referrerOrigin,
        200,
      ),
  };

  const contactMethod =
    body.contactMethod ===
      'telegram' ||
    body.contactMethod ===
      'max' ||
    body.contactMethod ===
      'email'
      ? body.contactMethod
      : null;

  const topic =
    isTopicValue(body.topic)
      ? body.topic
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
    contactMethod === 'telegram'
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

  if (!topic) {
    errors.topic =
      'Выберите, пожалуйста, наиболее близкую тему';
  }

  if (rawComment.length > 500) {
    errors.comment =
      'Комментарий должен быть не длиннее 500 символов';
  }

  if (
    body.termsAgreed !== true
  ) {
    errors.termsAgreed =
      'Подтвердите, пожалуйста, что вы ознакомились с условиями работы';
  }

  if (
    body.personalDataConsent !==
    true
  ) {
    errors.personalDataConsent =
      'Для отправки заявки необходимо согласие на обработку персональных данных';
  }

  return {
    errors,

        data: {
      name,
      contactMethod,
      contact,
      topic,
      comment,
      attribution,
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

  if (
    contentLength > 20_000
  ) {
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

  const topic =
    data.topic as TopicValue;

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

  const messageParts = [
    'Новая заявка на первую встречу',
    '',
    `Имя: ${safeName}`,
    'Возраст: подтверждено 18+',
    `Удобный способ связи: ${contactMethodLabels[contactMethod]}`,
    `Контакт: ${data.contact}`,
    '',
    `Тема: ${topicLabels[topic]}`,
  ];

    if (data.comment) {
    messageParts.push(
      '',
      'Дополнительный комментарий:',
      data.comment,
    );
  }

  const attributionLines = [
    [
      'Metrika ClientID',
      data.attribution
        .metrikaClientId,
    ],
    [
      'yclid',
      data.attribution.yclid,
    ],
    [
      'utm_source',
      data.attribution.utmSource,
    ],
    [
      'utm_medium',
      data.attribution.utmMedium,
    ],
    [
      'utm_campaign',
      data.attribution.utmCampaign,
    ],
    [
      'utm_content',
      data.attribution.utmContent,
    ],
    [
      'utm_term',
      data.attribution.utmTerm,
    ],
    [
      'Первая страница',
      data.attribution.landingPage,
    ],
    [
      'Источник перехода',
      data.attribution.referrerOrigin,
    ],
  ]
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `${label}: ${value}`,
    );

  if (attributionLines.length > 0) {
    messageParts.push(
      '',
      'Источник и атрибуция:',
      ...attributionLines,
    );
  }

  messageParts.push(
    '',
    'Условия работы: ознакомление подтверждено',
    'Согласие на обработку ПД: получено',
    '',
    'Страница отправки: psyshashkova.ru/book',
  );

  const message =
    messageParts.join('\n');

  try {
    await transporter.sendMail({
      from:
        `"psyshashkova.ru" <${smtpUser}>`,

      to:
        applicationEmailTo,

      replyTo:
        contactMethod === 'email'
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