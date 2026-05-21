'use client';

import { useState } from 'react';
import Link from 'next/link';
import { C, serif, sans } from '@/app/lib/theme';
import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import Eyebrow from '@/app/components/Eyebrow';
import Reveal from '@/app/components/Reveal';

const TELEGRAM_USERNAME = 'timonrulez';

export default function Book() {
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [agreedError, setAgreedError] = useState(false);

  const handleSubmit = () => {
    let hasError = false;

    if (!name.trim()) {
      setNameError(true);
      hasError = true;
    } else {
      setNameError(false);
    }

    if (!agreed) {
      setAgreedError(true);
      hasError = true;
    } else {
      setAgreedError(false);
    }

    if (hasError) return;

    // Формируем сообщение для Telegram
    const trimmedName = name.trim();
    const trimmedRequest = request.trim();

    let message = `Здравствуйте! Меня зовут ${trimmedName}. Хочу записаться на консультацию.`;
    if (trimmedRequest) {
      message += `\n\nКратко о запросе: ${trimmedRequest}`;
    }

    const encodedMessage = encodeURIComponent(message);
    const telegramUrl = `https://t.me/${TELEGRAM_USERNAME}?text=${encodedMessage}`;

    setSubmitted(true);

    // Небольшая задержка для UX — пользователь видит подтверждение, потом открывается Telegram
    setTimeout(() => {
      window.open(telegramUrl, '_blank');
    }, 600);
  };

  return (
    <div style={{ ...serif, backgroundColor: C.bg, color: C.ink }} className="min-h-screen">
      <Nav active="/book" />

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 md:pt-28">
        <Reveal>
          <Eyebrow>Запись на консультацию</Eyebrow>
          <h1 className="text-4xl md:text-5xl leading-[1.1] tracking-tight font-normal mb-8">
            Если решились — давайте познакомимся
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="text-lg leading-relaxed mb-6" style={{ color: C.inkSoft }}>
            Я провожу индивидуальные онлайн-консультации через Телемост. Одна встреча — 50 минут, 3 500 рублей.
          </p>
          <p className="text-base leading-relaxed" style={{ color: C.inkSoft }}>
            Заполните короткую форму ниже — после этого откроется Telegram с готовым сообщением мне. Дальше мы согласуем время, и я расскажу про оплату.
          </p>
        </Reveal>
      </section>

      {/* Условия — для тех, кто читает внимательно */}
      <section className="max-w-3xl mx-auto px-6 py-8">
        <Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            <ConditionCard
              label="Формат"
              value="Онлайн через Телемост"
            />
            <ConditionCard
              label="Длительность"
              value="50 минут"
            />
            <ConditionCard
              label="Стоимость"
              value="3 500 ₽"
            />
          </div>
        </Reveal>
      </section>

      {/* Форма */}
      <section className="max-w-2xl mx-auto px-6 py-12 md:py-16">
        <Reveal>
          <div className="p-8 md:p-10 rounded-sm" style={{ backgroundColor: C.surface }}>
            {!submitted ? (
              <>
                <h2 className="text-2xl leading-tight font-normal mb-8">
                  Заявка
                </h2>

                {/* Имя */}
                <div className="mb-6">
                  <label className="block text-sm mb-2" style={{ ...sans, color: C.ink }}>
                    Как к вам обращаться
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (e.target.value.trim()) setNameError(false);
                    }}
                    placeholder="Имя"
                    className="w-full px-4 py-3 rounded-sm transition-all focus:outline-none"
                    style={{
                      ...sans,
                      backgroundColor: C.bg,
                      color: C.ink,
                      fontSize: '16px',
                      border: `1px solid ${nameError ? C.terracotta : C.line}`,
                    }}
                  />
                  {nameError && (
                    <p className="text-xs mt-2" style={{ ...sans, color: C.terracotta }}>
                      Пожалуйста, укажите имя
                    </p>
                  )}
                </div>

                {/* Запрос */}
                <div className="mb-8">
                  <label className="block text-sm mb-2" style={{ ...sans, color: C.ink }}>
                    Коротко о запросе{' '}
                    <span style={{ color: C.inkSoft, fontSize: '13px' }}>
                      (необязательно)
                    </span>
                  </label>
                  <textarea
                    value={request}
                    onChange={(e) => setRequest(e.target.value)}
                    placeholder="С чем хотите поработать — одной-двумя фразами. Можно ничего не писать, разберёмся в переписке."
                    rows={4}
                    className="w-full px-4 py-3 rounded-sm transition-all focus:outline-none resize-none"
                    style={{
                      ...sans,
                      backgroundColor: C.bg,
                      color: C.ink,
                      fontSize: '16px',
                      border: `1px solid ${C.line}`,
                      lineHeight: 1.5,
                    }}
                  />
                  <p className="text-xs mt-2" style={{ ...sans, color: C.inkSoft }}>
                    Это поле увидите только вы и я — всё, что вы напишете, конфиденциально.
                  </p>
                </div>

                {/* Галочка согласия */}
                <div className="mb-8">
                  <label
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <div
                      className="shrink-0 mt-0.5 w-5 h-5 rounded-sm flex items-center justify-center transition-all"
                      style={{
                        border: `1.5px solid ${agreedError ? C.terracotta : agreed ? C.terracotta : C.inkSoft}`,
                        backgroundColor: agreed ? C.terracotta : 'transparent',
                      }}
                    >
                      {agreed && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke={C.bg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => {
                        setAgreed(e.target.checked);
                        if (e.target.checked) setAgreedError(false);
                      }}
                      className="sr-only"
                    />
                    <span className="text-[14px] leading-relaxed" style={{ ...sans, color: C.ink }}>
                      Я ознакомился(-ась) с{' '}
                      <Link href="/legal/offer" target="_blank" style={{ color: C.terracotta, textDecoration: 'underline' }}>
                        офертой
                      </Link>
                      ,{' '}
                      <Link href="/legal/privacy" target="_blank" style={{ color: C.terracotta, textDecoration: 'underline' }}>
                        политикой конфиденциальности
                      </Link>
                      {' '}и даю{' '}
                      <Link href="/legal/consent" target="_blank" style={{ color: C.terracotta, textDecoration: 'underline' }}>
                        согласие на обработку персональных данных
                      </Link>
                      .
                    </span>
                  </label>
                  {agreedError && (
                    <p className="text-xs mt-2 ml-8" style={{ ...sans, color: C.terracotta }}>
                      Без согласия с документами я не смогу принять заявку
                    </p>
                  )}
                </div>

                {/* Кнопка */}
                <button
                  onClick={handleSubmit}
                  className="w-full px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  style={{ ...sans, backgroundColor: C.ink, color: C.bg }}
                >
                  Перейти в Telegram →
                </button>

                <p className="text-xs mt-5 text-center" style={{ ...sans, color: C.inkSoft }}>
                  Откроется чат со мной с готовым сообщением. Останется только нажать «Отправить».
                </p>
              </>
            ) : (
              <SubmittedView name={name} />
            )}
          </div>
        </Reveal>
      </section>

      {/* Что будет дальше */}
      <section className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <Reveal>
          <Eyebrow>Что будет дальше</Eyebrow>
          <h2 className="text-2xl md:text-3xl leading-tight font-normal mb-8">
            Как мы дойдём до первой встречи
          </h2>
        </Reveal>
        <div className="space-y-6">
          <Reveal delay={50}>
            <StepRow number="1" title="Вы напишете">
              После заполнения формы откроется Telegram с готовым сообщением. Останется его отправить.
            </StepRow>
          </Reveal>
          <Reveal delay={100}>
            <StepRow number="2" title="Я отвечу в течение суток">
              Обычно — в тот же день. Я работаю на сессиях, поэтому ночью или в выходной может быть задержка.
            </StepRow>
          </Reveal>
          <Reveal delay={150}>
            <StepRow number="3" title="Согласуем время">
              Если ваш запрос подходит для моей работы — обсудим, в какое время удобно встретиться. Если не подходит — я честно скажу и помогу с навигацией к нужному специалисту.
            </StepRow>
          </Reveal>
          <Reveal delay={200}>
            <StepRow number="4" title="Оплата за час до встречи">
              Перевод по номеру телефона на карту Альфа-банка. Реквизиты пришлю после согласования времени. После оплаты — чек из «Мой налог».
            </StepRow>
          </Reveal>
          <Reveal delay={250}>
            <StepRow number="5" title="Встретимся в Телемосте">
              За несколько минут до сессии я пришлю ссылку. На первой встрече познакомимся, обсудим запрос и план работы.
            </StepRow>
          </Reveal>
        </div>
      </section>

      {/* FAQ — короткий */}
      <section className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <Reveal>
          <Eyebrow>Частые сомнения</Eyebrow>
          <h2 className="text-2xl md:text-3xl leading-tight font-normal mb-8">
            На что обычно спотыкаются
          </h2>
        </Reveal>
        <div className="space-y-5">
          <Reveal delay={50}>
            <FaqRow question="А вдруг мне не нужно к психологу?">
              Никто не приходит к психологу, потому что «нужно». Приходят, потому что что-то не складывается, болит, мешает. Если у вас есть что обсудить — этого достаточно. Решение продолжать после первой встречи остаётся за вами.
            </FaqRow>
          </Reveal>
          <Reveal delay={100}>
            <FaqRow question="Что если мы не подойдём друг другу?">
              Это нормально. На первой встрече мы оба смотрим, есть ли контакт. Если нет — я порекомендую коллег, которым доверяю. Психологическая работа без живого контакта не работает, и насильно держать никого не имеет смысла.
            </FaqRow>
          </Reveal>
          <Reveal delay={150}>
            <FaqRow question="Что если я не знаю, с чего начать?">
              Начнём с того, что есть. Не нужно готовить «правильный запрос» заранее. Часто на первой встрече формулируется именно тогда, когда мы разговариваем.
            </FaqRow>
          </Reveal>
          <Reveal delay={200}>
            <FaqRow question="Можно ли сначала задать вопросы, а потом записаться?">
              Да, конечно. Напишите в Telegram —{' '}
              <a
                href={`https://t.me/${TELEGRAM_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: C.terracotta, textDecoration: 'underline' }}
              >
                @{TELEGRAM_USERNAME}
              </a>
              {' '}— и спросите. Никаких обязательств это не создаёт.
            </FaqRow>
          </Reveal>
        </div>
      </section>

      {/* Этика — ссылка для тех, кто хочет читать ещё */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <Reveal>
          <div className="p-8 rounded-sm" style={{ backgroundColor: C.surface, borderLeft: `3px solid ${C.moss}` }}>
            <p className="text-base leading-relaxed mb-3" style={{ color: C.ink }}>
              Если хочется заранее понять, как у меня устроена работа — конфиденциальность, границы, что в кризисной ситуации — почитайте страницу{' '}
              <Link href="/ethics" style={{ color: C.terracotta, textDecoration: 'underline' }}>
                «Этика работы»
              </Link>
              .
            </p>
            <p className="text-base leading-relaxed" style={{ color: C.ink }}>
              Если плохо прямо сейчас и нужна срочная помощь — там же указаны телефоны бесплатных кризисных линий, которые работают круглосуточно.
            </p>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}

// ============================================================
// Подкомпоненты
// ============================================================

function ConditionCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-5 rounded-sm" style={{ backgroundColor: C.surface }}>
      <p className="text-xs tracking-widest uppercase mb-2" style={{ ...sans, color: C.inkSoft }}>
        {label}
      </p>
      <p className="text-base" style={{ color: C.ink }}>
        {value}
      </p>
    </div>
  );
}

function StepRow({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-5">
      <span
        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm"
        style={{
          ...sans,
          backgroundColor: C.surface,
          color: C.terracotta,
        }}
      >
        {number}
      </span>
      <div className="flex-1">
        <h3 className="text-lg mb-2">{title}</h3>
        <p className="text-[15px] leading-relaxed" style={{ color: C.inkSoft }}>
          {children}
        </p>
      </div>
    </div>
  );
}

function FaqRow({ question, children }: { question: string; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-sm" style={{ backgroundColor: C.surface }}>
      <h3 className="text-lg mb-3">{question}</h3>
      <p className="text-[15px] leading-relaxed" style={{ color: C.inkSoft }}>
        {children}
      </p>
    </div>
  );
}

function SubmittedView({ name }: { name: string }) {
  return (
    <div className="py-8 text-center">
      <div
        className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
        style={{ backgroundColor: C.moss }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M6 14L11 19L22 8"
            stroke={C.bg}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className="text-2xl mb-4">Открываю Telegram, {name.trim()}…</h2>
      <p className="text-base leading-relaxed max-w-md mx-auto mb-6" style={{ color: C.inkSoft }}>
        Если ничего не открылось автоматически — нажмите кнопку ниже.
      </p>
      <a
        href={`https://t.me/${TELEGRAM_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-[1.02]"
        style={{ ...sans, backgroundColor: C.ink, color: C.bg }}
      >
        Открыть Telegram
      </a>
    </div>
  );
}
