'use client';

import {
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';

import Link from 'next/link';

import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import Eyebrow from '@/app/components/Eyebrow';
import Reveal from '@/app/components/Reveal';

import { site } from '@/app/data/site';
import {
  C,
  radius,
  sans,
  serif,
  shadow,
} from '@/app/lib/theme';

type ContactMethod = 'telegram' | 'max' | 'email';

type FormErrors = {
  name?: string;
  contact?: string;
  adult?: string;
  request?: string;
  agreed?: string;
};

const contactOptions: {
  value: ContactMethod;
  label: string;
}[] = [
  { value: 'telegram', label: 'Telegram' },
  { value: 'max', label: 'MAX' },
  { value: 'email', label: 'Email' },
];

export default function Book() {
  const [name, setName] = useState('');
  const [contactMethod, setContactMethod] =
    useState<ContactMethod>('telegram');
  const [contact, setContact] = useState('');
  const [adult, setAdult] = useState(false);
  const [request, setRequest] = useState('');
  const [agreed, setAgreed] = useState(false);

  // Honeypot для простых ботов.
  const [website, setWebsite] = useState('');

  const [errors, setErrors] =
    useState<FormErrors>({});
  const [submitError, setSubmitError] =
    useState('');
  const [submitting, setSubmitting] =
    useState(false);
  const [submitted, setSubmitted] =
    useState(false);

  const applicationStarted = useRef(false);

  const session = site.practice.session;

  const price = new Intl.NumberFormat('ru-RU').format(
    session.priceRub,
  );

  const markApplicationStarted = () => {
    if (applicationStarted.current) return;

    applicationStarted.current = true;

    window.dispatchEvent(
      new CustomEvent('application_start'),
    );
  };

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!name.trim()) {
      nextErrors.name =
        'Напишите, пожалуйста, как к вам обращаться';
    }

    const trimmedContact = contact.trim();

    if (!trimmedContact) {
      nextErrors.contact =
        'Оставьте, пожалуйста, контакт для ответа';
    } else if (contactMethod === 'email') {
      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(trimmedContact)) {
        nextErrors.contact =
          'Проверьте, пожалуйста, адрес email';
      }
    } else if (contactMethod === 'telegram') {
      const normalizedUsername =
        trimmedContact.startsWith('@')
          ? trimmedContact.slice(1)
          : trimmedContact;

      const telegramPattern =
        /^[A-Za-z0-9_]{5,32}$/;

      if (!telegramPattern.test(normalizedUsername)) {
        nextErrors.contact =
          'Укажите имя пользователя в Telegram, например @username';
      }
    } else if (contactMethod === 'max') {
      const digits = trimmedContact.replace(/\D/g, '');

      if (digits.length < 10 || digits.length > 15) {
        nextErrors.contact =
          'Проверьте, пожалуйста, номер телефона';
      }
    }

    if (!adult) {
      nextErrors.adult =
        'Для записи нужно подтвердить, что вам уже исполнилось 18 лет';
    }

    if (request.trim().length < 50) {
      nextErrors.request =
        'Напишите, пожалуйста, еще пару предложений, чтобы я могла немного понять ситуацию';
    }

    if (!agreed) {
      nextErrors.agreed =
        'Для отправки заявки нужно согласие с условиями и обработкой данных';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setSubmitError('');

    if (!validate()) return;

    setSubmitting(true);

    try {
      const response = await fetch(
        '/api/application',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            contactMethod,
            contact,
            adult,
            request,
            agreed,
            website,
          }),
        },
      );

      const result = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        if (
          result.errors &&
          typeof result.errors === 'object'
        ) {
          setErrors(result.errors);

          window.setTimeout(() => {
            document
              .getElementById('application-form')
              ?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
          }, 50);

          return;
        }

        setSubmitError(
          result.message ||
            'Не получилось отправить заявку. Попробуйте еще раз через несколько минут.',
        );

        return;
      }

      setSubmitted(true);

      window.dispatchEvent(
        new CustomEvent('application_submit'),
      );

      window.setTimeout(() => {
        document
          .getElementById('application-form')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
      }, 50);
    } catch {
      setSubmitError(
        'Не получилось отправить заявку. Проверьте соединение и попробуйте еще раз.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const selectContactMethod = (
    method: ContactMethod,
  ) => {
    setContactMethod(method);
    setContact('');

    setErrors((current) => ({
      ...current,
      contact: undefined,
    }));
  };

  const contactLabel =
    contactMethod === 'telegram'
      ? 'Ваш Telegram'
      : contactMethod === 'max'
        ? 'Номер для MAX'
        : 'Ваш email';

  const contactPlaceholder =
    contactMethod === 'telegram'
      ? '@username'
      : contactMethod === 'max'
        ? '+7 999 123-45-67'
        : 'name@example.com';

  const contactHint =
    contactMethod === 'telegram'
      ? 'Укажите имя пользователя, по которому я смогу вам написать, например @username.'
      : contactMethod === 'max'
        ? 'Укажите номер телефона, к которому привязан ваш аккаунт MAX.'
        : 'Укажите адрес, на который вам удобно получить ответ.';

  const facts = [
    {
      value: `${price} ₽`,
      label: 'стоимость встречи',
    },
    {
      value: `${session.durationMinutes} минут`,
      label: 'одна встреча',
    },
    {
      value: session.format,
      label: session.platform,
    },
    {
      value: 'Раз в 7–10 дней',
      label: 'обычная частота',
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        ...serif,
        backgroundColor: C.bg,
        color: C.ink,
      }}
    >
      <Nav active="/book" />

      <main>
        {/* HERO */}

        <section className="mx-auto max-w-6xl px-6 pb-7 pt-10 md:px-8 md:pb-9 md:pt-14">
          <div className="max-w-4xl">
            <Reveal>
              <Eyebrow>Запись</Eyebrow>

              <h1 className="mt-4 max-w-[820px] text-[37px] font-normal leading-[1.03] tracking-[-0.025em] md:text-[46px] lg:text-[50px]">
                Записаться на встречу
              </h1>
            </Reveal>

            <Reveal delay={80}>
              <p
                className="mt-4 max-w-[730px] text-[15px] leading-[1.65] md:text-[16px]"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                Здесь можно оставить короткую заявку на
                встречу. Ниже собраны основные
                условия работы, а в форме можно немного
                рассказать о том, с чем хотите прийти.
                После этого я свяжусь с вами, и мы
                договоримся о следующих шагах.
              </p>
            </Reveal>
          </div>

          <Reveal delay={130}>
            <div
              className="mt-7 grid grid-cols-2 overflow-hidden md:grid-cols-4"
              style={{
                backgroundColor: C.surface,
                border: `1px solid ${C.line}`,
                borderRadius: radius.lg,
              }}
            >
              {facts.map((fact, index) => (
                <Fact
                  key={fact.label}
                  value={fact.value}
                  label={fact.label}
                  index={index}
                />
              ))}
            </div>
          </Reveal>
        </section>

        {/* CONDITIONS */}

        <section className="mx-auto max-w-6xl px-6 py-6 md:px-8 md:py-8">
          <Reveal>
            <div
              className="overflow-hidden"
              style={{
                backgroundColor: C.surfaceWarm,
                borderRadius: radius.lg,
                boxShadow: shadow.soft,
              }}
            >
              <div className="grid gap-6 p-6 md:grid-cols-[0.72fr_1.28fr] md:gap-10 md:p-8 lg:p-10">
                <div>
                  <Eyebrow>Перед заявкой</Eyebrow>

                  <h2 className="mt-3 text-[30px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[38px]">
                    Несколько важных условий
                  </h2>
                </div>

                <div
                  className="space-y-4 text-[14px] leading-[1.65] md:text-[15px]"
                  style={{
                    ...sans,
                    color: C.ink,
                  }}
                >
                  <p>
                    Я работаю индивидуально со взрослыми от
                    18 лет.
                  </p>

                  <p>
                    Я не работаю с парами, расстройствами
                    пищевого поведения и активными
                    зависимостями. Этот формат также не
                    подходит для ситуаций, в которых есть
                    непосредственная угроза жизни или
                    требуется экстренная психиатрическая
                    помощь.
                  </p>

                  <p>
                    Если состояние требует психиатрического
                    наблюдения, я могу работать параллельно
                    при условии, что вы уже наблюдаетесь у
                    врача или организуете такое наблюдение
                    самостоятельно.
                  </p>

                  <div
                    className="mt-5 p-4 md:p-5"
                    style={{
                      backgroundColor:
                        'rgba(247, 243, 236, 0.64)',
                      borderRadius: radius.md,
                    }}
                  >
                    <p
                      className="mb-1.5 text-[14px] font-semibold"
                      style={{
                        ...sans,
                        color: C.ink,
                      }}
                    >
                      Не уверены, относится ли ваша ситуация
                      к моей работе?
                    </p>

                    <p
                      className="text-[13px] leading-[1.6] md:text-[14px]"
                      style={{
                        ...sans,
                        color: C.inkSoft,
                      }}
                    >
                      Это нормально. Можно оставить
                      заявку, не пытаясь заранее определить
                      свой запрос или поставить себе диагноз.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* FORM */}

        <section
          id="application-form"
          className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-12 pt-6 md:px-8 md:pb-14 md:pt-8"
        >
          <div className="mx-auto max-w-2xl">
            {!submitted ? (
              <>
                <Reveal>
                  <div className="mb-6">
                    <Eyebrow>Короткая заявка</Eyebrow>

                    <h2 className="mt-3 text-[30px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[38px]">
                      Расскажите, с чем хотите прийти
                    </h2>

                    <p
                      className="mt-4 max-w-xl text-[14px] leading-[1.65] md:text-[15px]"
                      style={{
                        ...sans,
                        color: C.inkSoft,
                      }}
                    >
                      Здесь не нужно подробно описывать свою
                      историю. Достаточно оставить контакт и
                      в нескольких предложениях рассказать,
                      что сейчас происходит и с чем хотелось
                      бы поработать.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={60}>
                  <form
                    onSubmit={handleSubmit}
                    onFocusCapture={markApplicationStarted}
                    onChangeCapture={markApplicationStarted}
                    noValidate
                    className="p-5 md:p-7"
                    style={{
                      backgroundColor: C.surface,
                      borderRadius: radius.lg,
                      boxShadow: shadow.soft,
                    }}
                  >
                    {/* HONEYPOT */}

                    <div
                      aria-hidden="true"
                      className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
                    >
                      <label htmlFor="website">
                        Сайт
                      </label>

                      <input
                        id="website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={website}
                        onChange={(event) =>
                          setWebsite(event.target.value)
                        }
                      />
                    </div>

                    {/* NAME */}

                    <FormField>
                      <FieldLabel htmlFor="name">
                        Как к вам обращаться
                      </FieldLabel>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(event) => {
                          setName(event.target.value);

                          if (event.target.value.trim()) {
                            setErrors((current) => ({
                              ...current,
                              name: undefined,
                            }));
                          }
                        }}
                        placeholder="Имя"
                        className="w-full px-4 py-3.5 outline-none transition"
                        style={{
                          ...inputStyle(Boolean(errors.name)),
                          ...sans,
                        }}
                      />

                      {errors.name && (
                        <FieldError>
                          {errors.name}
                        </FieldError>
                      )}
                    </FormField>

                    {/* CONTACT METHOD */}

                    <FormField>
                      <FieldLabel>
                        Как вам удобнее получить ответ
                      </FieldLabel>

                      <div
                        className="grid grid-cols-3 gap-1.5 p-1.5"
                        role="radiogroup"
                        aria-label="Способ связи"
                        style={{
                          backgroundColor: C.bg,
                          borderRadius: radius.pill,
                          border: `1px solid ${C.line}`,
                        }}
                      >
                        {contactOptions.map((option) => {
                          const active =
                            contactMethod === option.value;

                          return (
                            <button
                              key={option.value}
                              type="button"
                              role="radio"
                              aria-checked={active}
                              onClick={() =>
                                selectContactMethod(
                                  option.value,
                                )
                              }
                              className="min-h-10 px-3 py-2 text-[13px] font-medium transition"
                              style={{
                                ...sans,
                                borderRadius: radius.pill,
                                backgroundColor: active
                                  ? C.ink
                                  : 'transparent',
                                color: active
                                  ? C.bg
                                  : C.inkSoft,
                              }}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </FormField>

                    {/* CONTACT */}

                    <FormField>
                      <FieldLabel htmlFor="contact">
                        {contactLabel}
                      </FieldLabel>

                      <input
                        id="contact"
                        name="contact"
                        type={
                          contactMethod === 'email'
                            ? 'email'
                            : contactMethod === 'max'
                              ? 'tel'
                              : 'text'
                        }
                        inputMode={
                          contactMethod === 'email'
                            ? 'email'
                            : contactMethod === 'max'
                              ? 'tel'
                              : 'text'
                        }
                        autoComplete={
                          contactMethod === 'email'
                            ? 'email'
                            : contactMethod === 'max'
                              ? 'tel'
                              : 'off'
                        }
                        value={contact}
                        onChange={(event) => {
                          setContact(event.target.value);

                          if (event.target.value.trim()) {
                            setErrors((current) => ({
                              ...current,
                              contact: undefined,
                            }));
                          }
                        }}
                        placeholder={contactPlaceholder}
                        className="w-full px-4 py-3.5 outline-none transition"
                        style={{
                          ...inputStyle(
                            Boolean(errors.contact),
                          ),
                          ...sans,
                        }}
                      />

                      {errors.contact ? (
                        <FieldError>
                          {errors.contact}
                        </FieldError>
                      ) : (
                        <p
                          className="mt-2 text-[12px] leading-[1.55]"
                          style={{
                            ...sans,
                            color: C.inkSoft,
                          }}
                        >
                          {contactHint}
                        </p>
                      )}
                    </FormField>

                    {/* AGE */}

                    <FormField>
                      <CheckRow
                        checked={adult}
                        onChange={(checked) => {
                          setAdult(checked);

                          if (checked) {
                            setErrors((current) => ({
                              ...current,
                              adult: undefined,
                            }));
                          }
                        }}
                        label="Мне уже исполнилось 18 лет"
                      />

                      {errors.adult && (
                        <FieldError>
                          {errors.adult}
                        </FieldError>
                      )}
                    </FormField>

                    {/* REQUEST */}

                    <FormField>
                      <FieldLabel htmlFor="request">
                        С чем хотите обратиться?
                      </FieldLabel>

                      <textarea
                        id="request"
                        name="request"
                        rows={5}
                        value={request}
                        onChange={(event) => {
                          setRequest(event.target.value);

                          if (
                            event.target.value.trim().length >=
                            50
                          ) {
                            setErrors((current) => ({
                              ...current,
                              request: undefined,
                            }));
                          }
                        }}
                        placeholder="Расскажите в нескольких предложениях, что сейчас происходит и с чем хотелось бы поработать. Подробно описывать всю историю не нужно."
                        className="w-full resize-y px-4 py-4 outline-none transition"
                        style={{
                          ...inputStyle(
                            Boolean(errors.request),
                          ),
                          ...sans,
                          minHeight: '145px',
                          lineHeight: 1.6,
                        }}
                      />

                      {errors.request ? (
                        <FieldError>
                          {errors.request}
                        </FieldError>
                      ) : (
                        <p
                          className="mt-2 text-[12px]"
                          style={{
                            ...sans,
                            color: C.inkSoft,
                          }}
                        >
                          Обычно достаточно 2–5 предложений.
                        </p>
                      )}
                    </FormField>

                    {/* CONSENT */}

                    <FormField>
                      <CheckRow
                        checked={agreed}
                        onChange={(checked) => {
                          setAgreed(checked);

                          if (checked) {
                            setErrors((current) => ({
                              ...current,
                              agreed: undefined,
                            }));
                          }
                        }}
                        label={
                          <>
                            Я ознакомился(-ась) с{' '}
                            <Link
                              href="/how-we-work"
                              target="_blank"
                              style={inlineLinkStyle}
                            >
                              условиями работы
                            </Link>
                            ,{' '}
                            <Link
                              href="/legal/privacy"
                              target="_blank"
                              style={inlineLinkStyle}
                            >
                              политикой конфиденциальности
                            </Link>{' '}
                            и даю{' '}
                            <Link
                              href="/legal/consent"
                              target="_blank"
                              style={inlineLinkStyle}
                            >
                              согласие на обработку
                              персональных данных
                            </Link>
                            .
                          </>
                        }
                      />

                      {errors.agreed && (
                        <FieldError>
                          {errors.agreed}
                        </FieldError>
                      )}
                    </FormField>

                    <div
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {submitError && (
                        <div
                          className="mb-5 p-4 text-[13px] leading-[1.6]"
                          style={{
                            ...sans,
                            color: C.berry,
                            backgroundColor:
                              'rgba(150, 59, 89, 0.08)',
                            borderRadius: radius.sm,
                          }}
                        >
                          {submitError}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full px-7 py-3.5 text-[14px] font-medium transition duration-200 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0"
                      style={{
                        ...sans,
                        backgroundColor: C.ink,
                        color: C.bg,
                        borderRadius: radius.pill,
                      }}
                    >
                      {submitting
                        ? 'Отправляю...'
                        : 'Отправить заявку'}
                    </button>

                    <p
                      className="mx-auto mt-3 max-w-md text-center text-[11.5px] leading-[1.55]"
                      style={{
                        ...sans,
                        color: C.inkSoft,
                      }}
                    >
                      После отправки вы останетесь на этой
                      странице. Я отвечу по контакту, который
                      вы указали.
                    </p>
                  </form>
                </Reveal>
              </>
            ) : (
              <Reveal>
                <SuccessState />
              </Reveal>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Fact({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  const mobileLeftBorder =
    index % 2 === 1 ? 'border-l' : '';

  const mobileTopBorder =
    index >= 2 ? 'border-t' : '';

  const desktopLeftBorder =
    index > 0
      ? 'md:border-l'
      : 'md:border-l-0';

  return (
    <div
      className={[
        'min-h-[92px] px-5 py-4 md:min-h-[100px] md:px-6 md:py-5 md:border-t-0',
        mobileLeftBorder,
        mobileTopBorder,
        desktopLeftBorder,
      ].join(' ')}
      style={{
        borderColor: C.line,
      }}
    >
      <p
        className="text-[18px] leading-[1.2] md:text-[20px]"
        style={{
          color: C.ink,
        }}
      >
        {value}
      </p>

      <p
        className="mt-1.5 text-[11.5px] leading-[1.45] md:text-[12px]"
        style={{
          ...sans,
          color: C.inkSoft,
        }}
      >
        {label}
      </p>
    </div>
  );
}

function FormField({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mb-5">
      {children}
    </div>
  );
}

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[13px] font-medium"
      style={{
        ...sans,
        color: C.ink,
      }}
    >
      {children}
    </label>
  );
}

function FieldError({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <p
      className="mt-2 text-[12px] leading-[1.5]"
      style={{
        ...sans,
        color: C.berry,
      }}
    >
      {children}
    </p>
  );
}

function CheckRow({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: ReactNode;
}) {
  return (
    <label
      className="flex cursor-pointer items-start gap-3"
      style={sans}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange(event.target.checked)
        }
        className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer"
        style={{
          accentColor: C.terracotta,
        }}
      />

      <span
        className="text-[13px] leading-[1.6]"
        style={{
          color: C.ink,
        }}
      >
        {label}
      </span>
    </label>
  );
}

function SuccessState() {
  return (
    <div
      className="px-6 py-9 text-center md:px-10 md:py-11"
      style={{
        backgroundColor: C.surface,
        borderRadius: radius.lg,
        boxShadow: shadow.soft,
      }}
    >
      <div
        className="mx-auto flex h-10 w-10 items-center justify-center text-[19px]"
        style={{
          backgroundColor:
            'rgba(107, 115, 85, 0.13)',
          color: C.moss,
          borderRadius: radius.pill,
        }}
      >
        ✓
      </div>

      <h2 className="mt-5 text-[30px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[38px]">
        Заявка отправлена
      </h2>

      <div
        className="mx-auto mt-5 max-w-lg space-y-3 text-[14px] leading-[1.65] md:text-[15px]"
        style={{
          ...sans,
          color: C.inkSoft,
        }}
      >
        <p>
          Спасибо. Я прочитаю заявку и отвечу по
          контакту, который вы указали.
        </p>

        <p>
          Дальше мы при необходимости уточним
          несколько деталей и договоримся о времени
          встречи. Если для вашей ситуации
          нужен другой формат помощи, я тоже скажу
          об этом сразу.
        </p>
      </div>

      <div
        className="mx-auto mt-6 max-w-lg px-5 py-4"
        style={{
          backgroundColor: C.bg,
          borderRadius: radius.md,
        }}
      >
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.14em]"
          style={{
            ...sans,
            color: C.inkSoft,
          }}
        >
          Что будет дальше
        </p>

        <p
          className="mt-2.5 text-[13px] leading-[1.6]"
          style={{
            ...sans,
            color: C.ink,
          }}
        >
          Ответ → согласование времени → оплата →
           встреча
        </p>
      </div>
    </div>
  );
}

function inputStyle(
  hasError: boolean,
) {
  return {
    backgroundColor: C.bg,
    color: C.ink,
    border: `1px solid ${
      hasError ? C.berry : C.line
    }`,
    borderRadius: radius.sm,
    fontSize: '16px',
  };
}

const inlineLinkStyle = {
  color: C.terracotta,
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
};