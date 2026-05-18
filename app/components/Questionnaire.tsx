'use client';

import { useState } from 'react';
import Link from 'next/link';
import { C, serif, sans } from '@/app/lib/theme';
import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import Eyebrow from '@/app/components/Eyebrow';
import Reveal from '@/app/components/Reveal';

export type QuestionnaireOption = {
  label: string;
  value: number;
};

export type ScoreBand = {
  min: number;
  max: number;
  label: string;
  description: string;
  color: string;
  recommendation: string;
};

export type QuestionnaireConfig = {
  slug: string;
  title: string;
  shortName: string;
  duration: string;
  intro: string[];
  disclaimer: string;
  source: string;
  questionPrompt: string;
  questions: string[];
  options: QuestionnaireOption[];
  bands: ScoreBand[];
  resultHeading: string;
};

export default function Questionnaire({ config }: { config: QuestionnaireConfig }) {
  const [step, setStep] = useState<'intro' | 'test' | 'result'>('intro');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const total = config.questions.length;
  const answeredCount = Object.keys(answers).length;
  const progress = ((current + (transitioning ? 1 : 0)) / total) * 100;
  const currentAnswer = answers[current];

  const handleAnswer = (value: number) => {
    setAnswers({ ...answers, [current]: value });
    setTransitioning(true);
    setTimeout(() => {
      if (current < total - 1) {
        setCurrent(current + 1);
        setTransitioning(false);
      } else {
        setStep('result');
        setTransitioning(false);
      }
    }, 280);
  };

  const goBack = () => {
    if (current > 0) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrent(current - 1);
        setTransitioning(false);
      }, 200);
    }
  };

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const band = config.bands.find((b) => totalScore >= b.min && totalScore <= b.max) ?? config.bands[0];
  const maxScore = total * Math.max(...config.options.map((o) => o.value));

  return (
    <div style={{ ...serif, backgroundColor: C.bg, color: C.ink }} className="min-h-screen">
      <Nav active="/tools" />

      {step === 'intro' && (
        <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 md:pt-28">
          <Reveal>
            <Eyebrow>Опросник · {config.duration}</Eyebrow>
            <h1 className="text-4xl md:text-5xl leading-[1.1] tracking-tight font-normal mb-8">
              {config.title}
            </h1>
          </Reveal>
          <Reveal delay={150}>
            {config.intro.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed mb-6" style={{ color: C.inkSoft }}>
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={300}>
            <div className="border-l-2 pl-6 py-2 mb-10" style={{ borderColor: C.terracotta }}>
              <p className="text-sm leading-relaxed mb-3" style={{ color: C.inkSoft }}>
                <strong style={{ color: C.ink }}>Важно.</strong> {config.disclaimer}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>
                {config.source}
              </p>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <button
              onClick={() => setStep('test')}
              className="px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
              style={{ ...sans, backgroundColor: C.ink, color: C.bg }}
            >
              Начать →
            </button>
          </Reveal>
        </section>
      )}

      {step === 'test' && (
        <section className="max-w-3xl mx-auto px-6 pt-20 pb-32 md:pt-28">
          <div className="mb-12">
            <div className="flex justify-between items-baseline mb-3">
              <p className="text-sm" style={{ ...sans, color: C.inkSoft }}>
                Вопрос {current + 1} из {total}
              </p>
              <p className="text-sm" style={{ ...sans, color: C.terracotta }}>
                {Math.round(progress)}%
              </p>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: C.surface }}>
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%`, backgroundColor: C.terracotta }}
              />
            </div>
          </div>

          <div
            style={{
              opacity: transitioning ? 0 : 1,
              transform: transitioning ? 'translateY(8px)' : 'translateY(0)',
              transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
            }}
          >
            <p className="text-xs tracking-widest uppercase mb-4" style={{ ...sans, color: C.terracotta }}>
              {config.questionPrompt}
            </p>
            <h2 className="text-2xl md:text-3xl leading-snug mb-12">
              {config.questions[current]}
            </h2>

            <div className="space-y-3">
              {config.options.map((opt) => {
                const active = currentAnswer === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className="w-full text-left p-5 rounded-sm transition-all duration-200 hover:translate-x-1 group"
                    style={{
                      backgroundColor: active ? C.surfaceWarm : C.surface,
                      boxShadow: active ? '0 4px 16px rgba(31, 27, 22, 0.08)' : 'none',
                    }}
                  >
                    <div className="flex items-center gap-5">
                      <span
                        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors"
                        style={{
                          ...sans,
                          backgroundColor: active ? C.terracotta : 'transparent',
                          color: active ? C.bg : C.terracotta,
                          border: `1px solid ${C.terracotta}`,
                        }}
                      >
                        {opt.value}
                      </span>
                      <span className="text-base flex-1" style={{ color: C.ink }}>
                        {opt.label}
                      </span>
                      <span
                        className="text-lg shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                        style={{ color: active ? C.terracotta : C.inkSoft }}
                      >
                        →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 flex justify-between items-center">
              {current > 0 ? (
                <button
                  onClick={goBack}
                  className="text-sm underline underline-offset-4 transition-opacity hover:opacity-60"
                  style={{ ...sans, color: C.inkSoft }}
                >
                  ← Предыдущий вопрос
                </button>
              ) : (
                <div />
              )}
              <p className="text-xs" style={{ ...sans, color: C.inkSoft }}>
                Ответов: {answeredCount}/{total}
              </p>
            </div>
          </div>
        </section>
      )}

      {step === 'result' && (
        <>
          <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 md:pt-28">
            <Reveal>
              <Eyebrow>Ваш результат</Eyebrow>
              <h1 className="text-4xl md:text-5xl leading-[1.1] tracking-tight font-normal mb-8">
                {config.resultHeading}
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <div className="p-10 rounded-sm mb-8" style={{ backgroundColor: C.surface }}>
                <div className="flex flex-wrap items-baseline gap-4 mb-6">
                  <p className="text-6xl md:text-7xl" style={{ color: band.color }}>
                    {totalScore}
                  </p>
                  <p className="text-2xl" style={{ color: C.inkSoft }}>
                    из {maxScore}
                  </p>
                </div>
                <p className="text-xl mb-4" style={{ color: band.color }}>
                  {band.label}
                </p>
                <div className="h-2 rounded-full overflow-hidden mb-6" style={{ backgroundColor: C.bg }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${(totalScore / maxScore) * 100}%`, backgroundColor: band.color }}
                  />
                </div>
                <p className="text-[16px] leading-relaxed mb-4" style={{ color: C.ink }}>
                  {band.description}
                </p>
                <p className="text-[15px] leading-relaxed" style={{ color: C.inkSoft }}>
                  {band.recommendation}
                </p>
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className="p-6 rounded-sm border-l-2" style={{ backgroundColor: C.surface, borderColor: C.terracotta }}>
                <p className="text-sm tracking-widest uppercase mb-3" style={{ ...sans, color: C.terracotta }}>
                  Все диапазоны
                </p>
                <div className="space-y-2 text-[14px] leading-relaxed">
                  {config.bands.map((b) => (
                    <p key={b.label} style={{ color: totalScore >= b.min && totalScore <= b.max ? C.ink : C.inkSoft }}>
                      <strong style={{ color: b.color }}>{b.min}–{b.max}:</strong> {b.label}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
            <Reveal>
              <div className="rounded-sm p-12 md:p-20 text-center" style={{ backgroundColor: C.ink, color: C.bg }}>
                <h2 className="text-3xl md:text-4xl leading-tight font-normal mb-8 max-w-3xl mx-auto">
                  Что дальше?
                </h2>
                <p className="text-lg leading-relaxed max-w-xl mx-auto mb-10" style={{ color: '#C9C2B5' }}>
                  Опросник — это точка отсчёта, а не диагноз. На сессии можно разобрать, что стоит за этими цифрами, и решить, как двигаться дальше.
                </p>
                <Link
                  href="/book"
                  className="inline-block px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl"
                  style={{ ...sans, backgroundColor: C.ochre, color: C.ink }}
                >
                  Записаться на сессию
                </Link>
                <p className="text-sm mt-8" style={{ ...sans, color: '#C9C2B5' }}>
                  Онлайн · 50 минут · 3 500 ₽
                </p>
              </div>
            </Reveal>
          </section>

          <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
            <button
              onClick={() => {
                setAnswers({});
                setCurrent(0);
                setStep('intro');
              }}
              className="text-sm underline underline-offset-4 transition-opacity hover:opacity-60"
              style={{ ...sans, color: C.inkSoft }}
            >
              Пройти ещё раз
            </button>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}