'use client';

import Link from 'next/link';
import { C, serif, sans } from '@/app/lib/theme';
import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import Eyebrow from '@/app/components/Eyebrow';
import Reveal from '@/app/components/Reveal';

const tools = [
  {
    href: '/tools/schema-test',
    eyebrow: 'тест · 10-15 минут',
    title: 'Тест на ранние дезадаптивные схемы',
    text: 'Адаптированная версия опросника Янга (YSQ-S3). Помогает увидеть, какие из 18 устойчивых сценариев — про привязанность, автономию, ожидания, ограничения — у вас сейчас активны.',
    color: C.terracotta,
    ready: true,
  },
  {
    href: '/tools/thought-diary',
    eyebrow: 'инструмент · постоянно',
    title: 'Дневник мыслей',
    text: 'Классическая ABC-таблица из КПТ. Учит замечать связку «ситуация → мысль → чувство → поведение» и видеть, где можно поменять реакцию.',
    color: C.ochre,
    ready: true,
  },
  {
    href: '/tools/anxiety-scale',
    eyebrow: 'опросник · 3 минуты',
    title: 'Шкала тревоги GAD-7',
    text: 'Короткий клинический скрининг на генерализованную тревогу. Не диагноз, но точка отсчёта — можно отслеживать, как меняется состояние со временем.',
    color: C.moss,
    ready: true,
  },
  {
    href: '/tools/depression-scale',
    eyebrow: 'опросник · 3 минуты',
    title: 'Шкала депрессии PHQ-9',
    text: 'Скрининг на депрессивные симптомы. Используется в клинической практике по всему миру. Помогает решить, стоит ли обратиться к специалисту.',
    color: C.terracotta,
    ready: true,
  },
  {
    href: '/tools/emotion-wheel',
    eyebrow: 'инструмент · постоянно',
    title: 'Колесо эмоций',
    text: 'Интерактивная схема Плутчика. Помогает точнее распознавать чувства — не «плохо», а конкретно: разочарование, тревога, обида, апатия.',
    color: C.ochre,
    ready: false,
  },
];

export default function Tools() {
  return (
    <div style={{ ...serif, backgroundColor: C.bg, color: C.ink }} className="min-h-screen">
      <Nav active="/tools" />

      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Инструменты</Eyebrow>
            <h1 className="text-4xl md:text-6xl leading-[1.1] tracking-tight font-normal mb-8">
              Бесплатные инструменты, чтобы лучше понять себя
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-lg leading-relaxed mb-6" style={{ color: C.inkSoft }}>
              Это не замена терапии и не диагностика. Это рабочие инструменты, которые помогают увидеть, что с вами происходит — точнее, чем «всё плохо» или «всё хорошо».
            </p>
          </Reveal>
          <Reveal delay={250}>
            <p className="text-base leading-relaxed" style={{ color: C.inkSoft }}>
              Все инструменты анонимны: ничего не сохраняется на сервере, ничего не отправляется никуда. Результаты можно показать на сессии, если вы со мной работаете, или просто использовать для себя.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((t, i) => (
            <Reveal key={t.href} delay={i * 100}>
              {t.ready ? (
                <Link
                  href={t.href}
                  className="block p-10 rounded-sm transition-all duration-300 hover:-translate-y-1 group"
                  style={{ backgroundColor: C.surface, height: '100%' }}
                >
                  <p className="text-xs tracking-widest uppercase mb-6" style={{ ...sans, color: t.color }}>
                    {t.eyebrow}
                  </p>
                  <h2 className="text-2xl mb-4 leading-snug">{t.title}</h2>
                  <p className="text-[15px] leading-relaxed mb-8" style={{ color: C.inkSoft }}>
                    {t.text}
                  </p>
                  <span className="text-sm transition-transform duration-300 group-hover:translate-x-1 inline-block" style={{ ...sans, color: C.ink }}>
                    Пройти →
                  </span>
                </Link>
              ) : (
                <div
                  className="block p-10 rounded-sm cursor-not-allowed"
                  style={{ backgroundColor: C.surface, height: '100%', opacity: 0.6 }}
                >
                  <p className="text-xs tracking-widest uppercase mb-6" style={{ ...sans, color: t.color }}>
                    {t.eyebrow}
                  </p>
                  <h2 className="text-2xl mb-4 leading-snug">{t.title}</h2>
                  <p className="text-[15px] leading-relaxed mb-8" style={{ color: C.inkSoft }}>
                    {t.text}
                  </p>
                  <span className="text-sm" style={{ ...sans, color: C.inkSoft }}>
                    Скоро →
                  </span>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-24 md:py-28">
        <Reveal>
          <div className="border-l-2 pl-8" style={{ borderColor: C.terracotta }}>
            <Eyebrow>Важно</Eyebrow>
            <h2 className="text-2xl md:text-3xl leading-tight font-normal mb-6">
              Это не диагностика
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: C.inkSoft }}>
              Все инструменты на этой странице — скрининговые и образовательные. Они помогают увидеть закономерности и говорить о себе точнее, но они не ставят диагнозов и не назначают лечения.
            </p>
            <p className="text-base leading-relaxed" style={{ color: C.inkSoft }}>
              Если результаты вас встревожили или вы давно живёте с тяжёлыми состояниями — это повод поговорить со специалистом, а не пытаться разобраться через ещё больше тестов.
            </p>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}