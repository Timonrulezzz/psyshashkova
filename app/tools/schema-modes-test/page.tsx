'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { C, serif, sans } from '@/app/lib/theme';
import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import Eyebrow from '@/app/components/Eyebrow';
import Reveal from '@/app/components/Reveal';
import {
  questions,
  modes,
  answerOptions,
  levelLabels,
  computeAllResults,
  getTopDysfunctional,
  getHealthyLevel,
  groupResultsByCategory,
  categoryLabels,
  getLevelColor,
  type ModeResult,
  type ModeCategory,
} from './data';

const STORAGE_KEY = 'schema-modes-test-progress-v1';

type SavedState = {
  answers: Record<number, number>;
  currentIndex: number; // 0-based позиция в массиве questions
  completed: boolean;
  updatedAt: number;
};

type Stage = 'intro' | 'quiz' | 'results';

export default function SchemaModesTest() {
  const [stage, setStage] = useState<Stage>('intro');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  // === Загрузка прогресса при монтировании ===
  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed: SavedState = JSON.parse(raw);
      if (parsed.completed) {
        setAnswers(parsed.answers || {});
        setStage('results');
      } else if (Object.keys(parsed.answers || {}).length > 0) {
        setHasSavedProgress(true);
      }
    } catch {
      // Игнорируем повреждённые данные
    }
  }, []);

  // === Сохранение прогресса ===
  useEffect(() => {
    if (!mounted) return;
    if (stage === 'intro') return;
    const state: SavedState = {
      answers,
      currentIndex,
      completed: stage === 'results',
      updatedAt: Date.now(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Если localStorage переполнен — молча игнорируем
    }
  }, [answers, currentIndex, stage, mounted]);

  // === Действия ===

  const startFresh = () => {
    setAnswers({});
    setCurrentIndex(0);
    setStage('quiz');
    setHasSavedProgress(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const continueProgress = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed: SavedState = JSON.parse(raw);
      setAnswers(parsed.answers || {});
      setCurrentIndex(parsed.currentIndex ?? 0);
      setStage('quiz');
      setHasSavedProgress(false);
    } catch {
      startFresh();
    }
  };

  const handleAnswer = (value: number) => {
    if (transitioning) return;
    const questionNumber = currentIndex + 1; // 1-indexed
    const newAnswers = { ...answers, [questionNumber]: value };
    setAnswers(newAnswers);

    setTransitioning(true);
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setTransitioning(false);
      } else {
        // Тест пройден
        setStage('results');
        setTransitioning(false);
      }
    }, 220);
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const retake = () => {
    if (confirm('Начать тест заново? Текущие результаты будут удалены.')) {
      startFresh();
    }
  };

  // === Рендер ===

  return (
    <div style={{ ...serif, backgroundColor: C.bg, color: C.ink }} className="min-h-screen">
      <Nav active="/tools" />

      {stage === 'intro' && <IntroSection
        hasSavedProgress={hasSavedProgress}
        onStart={startFresh}
        onContinue={continueProgress}
      />}

      {stage === 'quiz' && <QuizSection
        currentIndex={currentIndex}
        currentAnswer={answers[currentIndex + 1]}
        transitioning={transitioning}
        onAnswer={handleAnswer}
        onBack={goBack}
      />}

      {stage === 'results' && <ResultsSection
        answers={answers}
        onRetake={retake}
      />}

      <Footer />
    </div>
  );
}

// ================== INTRO ==================

function IntroSection({
  hasSavedProgress,
  onStart,
  onContinue,
}: {
  hasSavedProgress: boolean;
  onStart: () => void;
  onContinue: () => void;
}) {
  return (
    <>
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 md:pt-28">
        <Reveal>
          <Eyebrow>Опросник · 20–25 минут</Eyebrow>
          <h1 className="text-4xl md:text-5xl leading-[1.1] tracking-tight font-normal mb-8">
            Опросник режимов схема-терапии
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="text-lg leading-relaxed mb-6" style={{ color: C.inkSoft }}>
            Это полная версия опросника SMI Дж. Янга в адаптации П. М. Касьяника и Е. В. Романовой. 124 утверждения, 14 шкал — детские, копинговые, родительские и здоровые режимы.
          </p>
          <p className="text-base leading-relaxed mb-6" style={{ color: C.inkSoft }}>
            «Режим» в схема-терапии — это сиюминутное состояние, набор чувств, мыслей и реакций, который активируется в ответ на триггеры. У одного человека за день может включаться несколько разных режимов.
          </p>
          <p className="text-base leading-relaxed mb-6" style={{ color: C.inkSoft }}>
            На каждое утверждение нужно выбрать, насколько часто оно про вас за последние полгода. Прогресс сохраняется в браузере — можно прерваться и вернуться позже.
          </p>
        </Reveal>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-12">
        <Reveal>
          <div className="border-l-2 pl-8" style={{ borderColor: C.terracotta }}>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ ...sans, color: C.terracotta }}>
              Важно
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: C.inkSoft }}>
              Опросник режимов — вспомогательный инструмент, а не диагностика. Окончательно сформулированной и клинически апробированной модели режимов на сегодняшний день не существует, поэтому результаты — это материал для размышления, а не приговор.
            </p>
            <p className="text-base leading-relaxed" style={{ color: C.inkSoft }}>
              Реальная работа с режимами идёт через наблюдение, разговор и терапевтические отношения. Опросник может только указать направление.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-24">
        <Reveal>
          <div className="flex flex-col sm:flex-row gap-4">
            {hasSavedProgress ? (
              <>
                <button
                  onClick={onContinue}
                  className="px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-[1.04]"
                  style={{ ...sans, backgroundColor: C.ink, color: C.bg }}
                >
                  Продолжить с того места, где остановились
                </button>
                <button
                  onClick={onStart}
                  className="px-8 py-4 rounded-full text-base transition-all duration-300 hover:-translate-y-0.5"
                  style={{ ...sans, backgroundColor: 'transparent', color: C.ink, border: `1px solid ${C.line}` }}
                >
                  Начать заново
                </button>
              </>
            ) : (
              <button
                onClick={onStart}
                className="px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-[1.04]"
                style={{ ...sans, backgroundColor: C.ink, color: C.bg }}
              >
                Начать опросник
              </button>
            )}
          </div>
        </Reveal>
      </section>
    </>
  );
}

// ================== QUIZ ==================

function QuizSection({
  currentIndex,
  currentAnswer,
  transitioning,
  onAnswer,
  onBack,
}: {
  currentIndex: number;
  currentAnswer: number | undefined;
  transitioning: boolean;
  onAnswer: (value: number) => void;
  onBack: () => void;
}) {
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <section className="max-w-3xl mx-auto px-6 pt-16 pb-24 md:pt-20">
      {/* Прогресс */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-3 text-xs" style={{ ...sans, color: C.inkSoft }}>
          <span>Вопрос {currentIndex + 1} из {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: C.line }}>
          <div
            className="h-full transition-all duration-300"
            style={{ width: `${progress}%`, backgroundColor: C.terracotta }}
          />
        </div>
      </div>

      {/* Вопрос */}
      <div
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? 'translateY(8px)' : 'translateY(0)',
          transition: 'opacity 0.22s ease-out, transform 0.22s ease-out',
        }}
      >
        <p className="text-xs tracking-widest uppercase mb-4" style={{ ...sans, color: C.terracotta }}>
          Насколько часто это про вас
        </p>
        <h2 className="text-2xl md:text-3xl leading-snug mb-12">
          {questions[currentIndex]}
        </h2>

        <div className="space-y-3">
          {answerOptions.map((opt) => {
            const active = currentAnswer === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onAnswer(opt.value)}
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
          {currentIndex > 0 ? (
            <button
              onClick={onBack}
              className="text-sm transition-colors hover:opacity-70"
              style={{ ...sans, color: C.inkSoft }}
            >
              ← Назад
            </button>
          ) : <span />}
          <p className="text-xs" style={{ ...sans, color: C.inkSoft }}>
            Ответ можно изменить, вернувшись назад
          </p>
        </div>
      </div>
    </section>
  );
}

// ================== RESULTS ==================

function ResultsSection({
  answers,
  onRetake,
}: {
  answers: Record<number, number>;
  onRetake: () => void;
}) {
  const allResults = computeAllResults(answers);
  const topDysfunctional = getTopDysfunctional(allResults, 3);
  const healthy = getHealthyLevel(allResults);
  const grouped = groupResultsByCategory(allResults);

  // Решаем, что показать в CTA: насколько вообще «грузит» результат
  const hasNotablyElevated = allResults.some(
    (r) => !r.mode.isHealthy && r.levelIndex >= 3
  );

  return (
    <>
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 md:pt-28">
        <Reveal>
          <Eyebrow>Ваш профиль режимов</Eyebrow>
          <h1 className="text-4xl md:text-5xl leading-[1.1] tracking-tight font-normal mb-8">
            Результаты опросника
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="text-base leading-relaxed mb-4" style={{ color: C.inkSoft }}>
            Это самонаблюдение, а не диагноз. Профиль показывает, какие режимы у вас сейчас активнее других — это материал для размышления и работы.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>
            Результаты сохранены в браузере. Если очистите кеш или зайдёте с другого устройства — придётся пройти заново.
          </p>
        </Reveal>
      </section>

      {/* Топ-3 наиболее выраженных дисфункциональных режима */}
      {topDysfunctional.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 py-8">
          <Reveal>
            <h2 className="text-2xl md:text-3xl leading-tight font-normal mb-3">
              Наиболее выраженные режимы
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: C.inkSoft }}>
              Три режима, которые у вас сейчас активнее остальных. Это не «вы», а ваши частые внутренние состояния.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {topDysfunctional.map((r, i) => (
              <Reveal key={r.mode.key} delay={i * 100}>
                <div
                  className="rounded-sm p-8 h-full flex flex-col"
                  style={{ backgroundColor: C.surface }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{ backgroundColor: getLevelColor(r.level, r.mode.isHealthy) }}
                    />
                    <p
                      className="text-xs tracking-widest uppercase"
                      style={{ ...sans, color: getLevelColor(r.level, r.mode.isHealthy), fontWeight: 500 }}
                    >
                      {levelLabels[r.level]} уровень · {r.rawScore.toFixed(2)}
                    </p>
                  </div>
                  <h3 className="text-2xl mb-4 leading-snug">{r.mode.name}</h3>
                  <p className="text-[14px] tracking-wider uppercase mb-4" style={{ ...sans, color: C.inkSoft }}>
                    {r.mode.nameEn}
                  </p>
                  <p className="text-[15px] leading-relaxed flex-1" style={{ color: C.ink }}>
                    {r.mode.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Здоровые режимы — отдельный блок */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <Reveal>
          <div
            className="rounded-sm p-10 md:p-12"
            style={{ backgroundColor: C.surface, borderLeft: `3px solid ${C.moss}` }}
          >
            <p className="text-xs tracking-widest uppercase mb-4" style={{ ...sans, color: C.moss }}>
              Ресурсные режимы · {levelLabels[healthy.level]} уровень
            </p>
            <h2 className="text-2xl md:text-3xl leading-tight font-normal mb-6">
              Здоровый Взрослый и Счастливый Ребёнок
            </h2>
            <p className="text-base leading-relaxed" style={{ color: C.inkSoft }}>
              Это части личности, которые отвечают за здоровое функционирование, способность заботиться о себе, радоваться, поддерживать отношения. Цель схема-терапии — укрепить именно их. Чем выше этот уровень, тем устойчивее общее состояние.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Полный профиль — горизонтальные шкалы по категориям */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <Reveal>
          <h2 className="text-2xl md:text-3xl leading-tight font-normal mb-3">
            Полный профиль
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: C.inkSoft }}>
            Балл — это среднее по вопросам каждой шкалы. Диапазон от 1 до 6.
          </p>
        </Reveal>

        {(['child', 'coping', 'parent', 'healthy'] as ModeCategory[]).map((cat, catI) => (
          <div key={cat} className="mb-12">
            <Reveal delay={catI * 80}>
              <p className="text-xs tracking-widest uppercase mb-6" style={{ ...sans, color: C.inkSoft }}>
                {categoryLabels[cat]}
              </p>
            </Reveal>
            <div className="space-y-5">
              {grouped[cat].map((r, i) => (
                <Reveal key={r.mode.key} delay={catI * 80 + i * 40}>
                  <ScaleRow result={r} />
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="rounded-sm p-12 md:p-20 text-center" style={{ backgroundColor: C.ink, color: C.bg }}>
            <h2 className="text-3xl md:text-4xl leading-tight font-normal mb-8 max-w-3xl mx-auto">
              {hasNotablyElevated
                ? 'С выраженными режимами лучше работать со специалистом'
                : 'Если хочется лучше понять свои режимы'}
            </h2>
            <p className="text-lg leading-relaxed max-w-xl mx-auto mb-10" style={{ color: '#C9C2B5' }}>
              {hasNotablyElevated
                ? 'Опросник показал режимы повышенного и высокого уровня. Это не диагноз, но повод поговорить — в схема-терапии мы разбираем такие состояния и учимся выходить из них через Здорового Взрослого.'
                : 'Результаты опросника — отправная точка, а не итог. На сессии мы разбираем, как режимы запускаются, что под ними лежит, и как с ними обходиться.'}
            </p>
            <Link
              href="/book"
              className="inline-block px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl"
              style={{ ...sans, backgroundColor: C.ochre, color: C.ink }}
            >
              Записаться на сессию
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Пройти заново */}
      <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
        <button
          onClick={onRetake}
          className="text-sm transition-colors hover:opacity-70"
          style={{ ...sans, color: C.inkSoft, textDecoration: 'underline' }}
        >
          Пройти опросник заново
        </button>
      </section>
    </>
  );
}

// ================== SCALE ROW ==================

function ScaleRow({ result }: { result: ModeResult }) {
  const { mode, rawScore, level } = result;
  // Шкала от 1 до 6, преобразуем в проценты для ширины полосы
  const percent = ((rawScore - 1) / 5) * 100;
  const levelColor = getLevelColor(level, mode.isHealthy);

  return (
    <div>
      <div className="flex justify-between items-baseline mb-2 gap-4 flex-wrap">
        <div className="flex items-baseline gap-3">
          <span className="text-[17px]" style={{ color: C.ink }}>
            {mode.name}
          </span>
          <span className="text-xs" style={{ ...sans, color: C.inkSoft }}>
            {mode.nameEn}
          </span>
        </div>
        <div className="flex items-baseline gap-3 text-sm" style={{ ...sans }}>
          <span style={{ color: levelColor, fontWeight: 500 }}>
            {levelLabels[level]}
          </span>
          <span style={{ color: levelColor, fontWeight: 500 }}>
            {rawScore.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: C.line }}>
        <div
          className="h-full transition-all duration-700 ease-out"
          style={{
            width: `${percent}%`,
            backgroundColor: levelColor,
          }}
        />
      </div>
    </div>
  );
}