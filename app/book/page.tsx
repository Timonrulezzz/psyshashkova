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

const topicOptions = [
  {
    value: 'relationships',
    label: 'Отношения и личные границы',
  },
  {
    value: 'self',
    label: 'Отношение к себе и самокритика',
  },
  {
    value: 'emotions',
    label: 'Эмоции и привычные реакции',
  },
  {
    value: 'work',
    label: 'Работа, нагрузка и выгорание',
  },
  {
    value: 'decisions',
    label: 'Решения, действия и избегание',
  },
  {
    value: 'other',
    label: 'Другое / пока сложно определить',
  },
] as const;

type TopicValue =
  (typeof topicOptions)[number]['value'];

type FormErrors = {
  name?: string;
  contact?: string;
  adult?: string;
  topic?: string;
  comment?: string;
  termsAgreed?: string;
  personalDataConsent?: string;
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

  const [topic, setTopic] =
    useState<TopicValue | ''>('');

  const [comment, setComment] = useState('');

  const [termsAgreed, setTermsAgreed] =
    useState(false);

  const [
    personalDataConsent,
    setPersonalDataConsent,
  ] = useState(false);

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

  const price = new Intl.NumberFormat(
    'ru-RU',
  ).format(session.priceRub);

  const markApplicationStarted = () => {
    if (applicationStarted.current) {
      return;
    }

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
      const digits =
        trimmedContact.replace(/\D/g, '');

      if (
        digits.length < 10 ||
        digits.length > 15
      ) {
        nextErrors.contact =
          'Проверьте, пожалуйста, номер телефона';
      }
    }

    if (!adult) {
      nextErrors.adult =
        'Для записи нужно подтвердить, что вам уже исполнилось 18 лет';
    }

    if (!topic) {
      nextErrors.topic =
        'Выберите, пожалуйста, наиболее близкую тему';
    }

    if (comment.length > 500) {
      nextErrors.comment =
        'Комментарий должен быть не длиннее 500 символов';
    }

    if (!termsAgreed) {
      nextErrors.termsAgreed =
        'Подтвердите, пожалуйста, что вы ознакомились с условиями работы';
    }

    if (!personalDataConsent) {
      nextErrors.personalDataConsent =
        'Для отправки заявки необходимо согласие на обработку персональных данных';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setSubmitError('');

    if (!validate()) {
      return;
    }

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
            topic,
            comment,
            termsAgreed,
            personalDataConsent,
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
                условия работы, а в форме достаточно
                оставить контакт и выбрать, к какой теме
                ближе то, с чем вы хотите прийти. После
                этого я свяжусь с вами, и мы договоримся
                о следующих шагах.
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
                      С чем вы хотите поработать
                    </h2>

                    <p
                      className="mt-4 max-w-xl text-[14px] leading-[1.65] md:text-[15px]"
                      style={{
                        ...sans,
                        color: C.inkSoft,
                      }}
                    >
                      Здесь не нужно подробно описывать свою
                      историю. Оставьте контакт, выберите
                      наиболее близкую тему и при желании
                      добавьте короткий комментарий.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={60}>
                  <form
                    onSubmit={handleSubmit}
                    onFocusCapture={markApplicationStarted}
                    onChangeCapture={markApplicationStarted}
                    noValidate
                    className="ym-hide-content ym-disable-keys p-5 md:p-7"
                    style={{
                      backgroundColor: C.surface,
                      borderRadius: radius.lg,
                      boxShadow: shadow.soft,
                    }}
                  >
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
                                selectContactMethod(option.value)
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

                    <FormField>
                      <FieldLabel>
                        Какая тема ближе всего к тому, с чем
                        вы хотите прийти?
                      </FieldLabel>

                      <div className="grid gap-2 sm:grid-cols-2">
                        {topicOptions.map((option) => {
                          const selected =
                            topic === option.value;

                          return (
                            <label
                              key={option.value}
                              className="flex min-h-[58px] cursor-pointer items-center gap-3 px-4 py-3 transition"
                              style={{
                                ...sans,
                                backgroundColor: selected
                                  ? 'rgba(184, 92, 60, 0.08)'
                                  : C.bg,
                                border: `1px solid ${
                                  selected
                                    ? C.terracotta
                                    : C.line
                                }`,
                                borderRadius: radius.sm,
                                color: C.ink,
                              }}
                            >
                              <input
                                type="radio"
                                name="topic"
                                value={option.value}
                                checked={selected}
                                onChange={() => {
                                  setTopic(option.value);

                                  setErrors((current) => ({
                                    ...current,
                                    topic: undefined,
                                  }));
                                }}
                                className="h-4 w-4 shrink-0"
                                style={{
                                  accentColor:
                                    C.terracotta,
                                }}
                              />

                              <span className="text-[13px] leading-[1.45]">
                                {option.label}
                              </span>
                            </label>
                          );
                        })}
                      </div>

                      {errors.topic && (
                        <FieldError>
                          {errors.topic}
                        </FieldError>
                      )}
                    </FormField>

                    <FormField>
                      <FieldLabel htmlFor="comment">
                        Хотите что-то добавить?{' '}
                        <span
                          style={{
                            color: C.inkSoft,
                            fontWeight: 400,
                          }}
                        >
                          Необязательно
                        </span>
                      </FieldLabel>

                      <textarea
                        id="comment"
                        name="comment"
                        rows={4}
                        maxLength={500}
                        value={comment}
                        onChange={(event) => {
                          setComment(event.target.value);

                          if (
                            event.target.value.length <= 500
                          ) {
                            setErrors((current) => ({
                              ...current,
                              comment: undefined,
                            }));
                          }
                        }}
                        placeholder="Например, можно коротко уточнить, что для вас сейчас особенно важно или что хотелось бы обсудить на встрече."
                        className="w-full resize-y px-4 py-3.5 outline-none transition"
                        style={{
                          ...inputStyle(
                            Boolean(errors.comment),
                          ),
                          ...sans,
                          minHeight: '105px',
                          lineHeight: 1.6,
                        }}
                      />

                      <div className="mt-2 flex items-start justify-between gap-4">
                        <p
                          className="max-w-lg text-[11.5px] leading-[1.55]"
                          style={{
                            ...sans,
                            color: C.inkSoft,
                          }}
                        >
                          Не указывайте здесь диагнозы,
                          сведения о здоровье, лечении,
                          принимаемых препаратах или другие
                          чувствительные данные. Их при
                          необходимости можно обсудить лично.
                        </p>

                        <span
                          className="shrink-0 text-[11px]"
                          style={{
                            ...sans,
                            color: C.inkSoft,
                          }}
                        >
                          {comment.length}/500
                        </span>
                      </div>

                      {errors.comment && (
                        <FieldError>
                          {errors.comment}
                        </FieldError>
                      )}
                    </FormField>

                    <FormField>
                      <CheckRow
                        checked={termsAgreed}
                        onChange={(checked) => {
                          setTermsAgreed(checked);

                          if (checked) {
                            setErrors((current) => ({
                              ...current,
                              termsAgreed: undefined,
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
                            </Link>{' '}
                            и{' '}
                            <Link
                              href="/legal/offer"
                              target="_blank"
                              style={inlineLinkStyle}
                            >
                              публичной офертой
                            </Link>
                            .
                          </>
                        }
                      />

                      {errors.termsAgreed && (
                        <FieldError>
                          {errors.termsAgreed}
                        </FieldError>
                      )}
                    </FormField>

                    <FormField>
                      <CheckRow
                        checked={personalDataConsent}
                        onChange={(checked) => {
                          setPersonalDataConsent(checked);

                          if (checked) {
                            setErrors((current) => ({
                              ...current,
                              personalDataConsent:
                                undefined,
                            }));
                          }
                        }}
                        label={
                          <>
                            Я даю{' '}
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

                      {errors.personalDataConsent && (
                        <FieldError>
                          {errors.personalDataConsent}
                        </FieldError>
                      )}

                      <p
                        className="mt-2 pl-[30px] text-[11.5px] leading-[1.55]"
                        style={{
                          ...sans,
                          color: C.inkSoft,
                        }}
                      >
                        Подробнее о том, как обрабатываются
                        данные, можно прочитать в{' '}
                        <Link
                          href="/legal/privacy"
                          target="_blank"
                          style={inlineLinkStyle}
                        >
                          политике конфиденциальности
                        </Link>
                        .
                      </p>
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