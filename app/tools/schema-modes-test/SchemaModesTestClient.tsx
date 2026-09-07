'use client';

import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import Link from 'next/link';

import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import Eyebrow from '@/app/components/Eyebrow';
import Reveal from '@/app/components/Reveal';

import {
  C,
  radius,
  sans,
  serif,
  shadow,
} from '@/app/lib/theme';

import {
  answerOptions,
  computeAllResults,
  levelLabels,
  modes,
  questions as rawQuestions,
  type ModeCategory,
  type ModeResult,
} from './data';

function stripTrailingPeriod(text: string) {
  const trimmed = text.trim();

  if (
    trimmed.endsWith('.') &&
    !trimmed.endsWith('...')
  ) {
    return trimmed.slice(0, -1);
  }

  return trimmed;
}

const questions = rawQuestions.map(
  stripTrailingPeriod
);

type Stage = 'intro' | 'quiz' | 'results';
type Answers = Record<number, number>;

type SavedState = {
  answers: Answers;
  currentIndex: number;
  completed: boolean;
  completedAt?: string;
};

const STORAGE_KEY = 'psyshashkova:smi:progress:v2';

const CATEGORY_ORDER: ModeCategory[] = [
  'child',
  'coping',
  'parent',
  'healthy',
];

const CATEGORY_NAMES: Record<ModeCategory, string> = {
  child: 'Детские режимы',
  coping: 'Копинговые режимы',
  parent: 'Родительские режимы',
  healthy: 'Здоровые режимы',
};

function formatDate() {
  return new Date().toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function answerLabel(value: number | undefined) {
  return (
    answerOptions.find((option) => option.value === value)?.label ??
    'Нет ответа'
  );
}

export default function SchemaModesTestClient() {
  const [stage, setStage] = useState<Stage>('intro');
  const [answers, setAnswers] = useState<Answers>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [completedAt, setCompletedAt] = useState('');
  const [showAnswers, setShowAnswers] = useState(false);
  const [includeAnswersInPdf, setIncludeAnswersInPdf] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);

      if (raw) {
        const parsed = JSON.parse(raw) as SavedState;
        const parsedAnswers = parsed.answers ?? {};

        setAnswers(parsedAnswers);
        setCompletedAt(parsed.completedAt ?? '');

        if (parsed.completed) {
          setStage('results');
        } else if (Object.keys(parsedAnswers).length > 0) {
          setCurrentIndex(
            Math.min(
              Math.max(parsed.currentIndex ?? 0, 0),
              questions.length - 1
            )
          );
        }
      }
    } catch (error) {
      console.error('SMI progress load failed', error);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;

    try {
      const state: SavedState = {
        answers,
        currentIndex,
        completed: stage === 'results',
        completedAt,
      };

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('SMI progress save failed', error);
    }
  }, [answers, currentIndex, stage, completedAt, ready]);

  const answeredCount = Object.keys(answers).length;
  const hasDraft = answeredCount > 0 && stage !== 'results';

  const results = useMemo(() => {
    if (answeredCount < questions.length) return [];
    return computeAllResults(answers);
  }, [answers, answeredCount]);

  const topDysfunctional = useMemo(
    () =>
      [...results]
        .filter((result) => !result.mode.isHealthy)
        .sort((a, b) => b.rawScore - a.rawScore)
        .slice(0, 3),
    [results]
  );

  const healthyResults = useMemo(
    () =>
      [...results]
        .filter((result) => result.mode.isHealthy)
        .sort((a, b) => b.rawScore - a.rawScore),
    [results]
  );

  const groupedResults = useMemo(() => {
    return CATEGORY_ORDER.map((category) => ({
      category,
      results: results
        .filter((result) => result.mode.category === category)
        .sort((a, b) => b.rawScore - a.rawScore),
    }));
  }, [results]);

  const selfHarmFlag = (answers[5] ?? 1) > 1;
  const violenceFlag = (answers[60] ?? 1) > 1;
  const attentionTriggered = selfHarmFlag || violenceFlag;

  function start() {
    if (stage === 'results') return;

    if (answeredCount > 0) {
      const firstUnanswered = questions.findIndex(
        (_, index) => answers[index + 1] === undefined
      );

      if (firstUnanswered >= 0) {
        setCurrentIndex(firstUnanswered);
      }
    } else {
      setCurrentIndex(0);
    }

    setStage('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function answer(value: number) {
    if (transitioning) return;

    const questionNumber = currentIndex + 1;

    setAnswers((previous) => ({
      ...previous,
      [questionNumber]: value,
    }));

    setTransitioning(true);

    window.setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((previous) => previous + 1);
        setTransitioning(false);
        return;
      }

      const date = formatDate();
      setCompletedAt(date);
      setTransitioning(false);
      setStage('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 180);
  }

  function goBack() {
    if (transitioning || currentIndex === 0) return;
    setCurrentIndex((previous) => previous - 1);
  }

  function exitQuiz() {
    setStage('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function reset() {
    if (
      answeredCount > 0 &&
      !window.confirm('Начать заново? Текущие ответы будут удалены.')
    ) {
      return;
    }

    setAnswers({});
    setCurrentIndex(0);
    setCompletedAt('');
    setShowAnswers(false);
    setIncludeAnswersInPdf(false);
    setStage('intro');

    window.localStorage.removeItem(STORAGE_KEY);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function exportPdf() {
    try {
      setExporting(true);

      await new Promise<void>((resolve) =>
        requestAnimationFrame(() =>
          requestAnimationFrame(() => resolve())
        )
      );

      if ('fonts' in document) {
        await document.fonts.ready;
      }

      const node = pdfRef.current;
      if (!node) throw new Error('PDF report not rendered');

      const html2canvasModule = await import('html2canvas');
      const html2canvas = html2canvasModule.default;

      const jspdfModule = await import('jspdf');
      const { jsPDF } = jspdfModule;

      const canvas = await html2canvas(node, {
        scale: 2,
        backgroundColor: C.bg,
        logging: false,
        useCORS: true,
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 12;
      const usableWidth = pageWidth - margin * 2;
      const usableHeight = pageHeight - margin * 2;
      const pxPerMm = canvas.width / usableWidth;
      const pageHeightPx = Math.floor(usableHeight * pxPerMm);

      let offsetY = 0;
      let pageIndex = 0;

      while (offsetY < canvas.height) {
        const sliceHeight = Math.min(
          pageHeightPx,
          canvas.height - offsetY
        );

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;

        const context = pageCanvas.getContext('2d');
        if (!context) throw new Error('Canvas context unavailable');

        context.drawImage(
          canvas,
          0,
          offsetY,
          canvas.width,
          sliceHeight,
          0,
          0,
          canvas.width,
          sliceHeight
        );

        const image = pageCanvas.toDataURL('image/png');
        const sliceHeightMm =
          (sliceHeight / canvas.width) * usableWidth;

        if (pageIndex > 0) pdf.addPage();

        pdf.addImage(
          image,
          'PNG',
          margin,
          margin,
          usableWidth,
          sliceHeightMm
        );

        offsetY += sliceHeight;
        pageIndex += 1;
      }

      const date = new Date().toISOString().slice(0, 10);
      pdf.save(`smi-${date}.pdf`);
    } catch (error) {
      console.error(error);
      window.alert('Не получилось создать PDF. Попробуйте еще раз.');
    } finally {
      setExporting(false);
    }
  }

  if (!ready) {
    return (
      <div
        className="min-h-screen"
        style={{
          ...serif,
          backgroundColor: C.bg,
          color: C.ink,
        }}
      />
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        ...serif,
        backgroundColor: C.bg,
        color: C.ink,
      }}
    >
      <Nav active="/tools" />

      <main>
        {stage === 'intro' && (
          <Intro
            answeredCount={answeredCount}
            hasDraft={hasDraft}
            onStart={start}
            onReset={reset}
          />
        )}

        {stage === 'quiz' && (
          <Quiz
            currentIndex={currentIndex}
            currentAnswer={answers[currentIndex + 1]}
            transitioning={transitioning}
            onAnswer={answer}
            onBack={goBack}
            onExit={exitQuiz}
          />
        )}

        {stage === 'results' && (
          <Results
            answers={answers}
            results={results}
            topDysfunctional={topDysfunctional}
            healthyResults={healthyResults}
            groupedResults={groupedResults}
            attentionTriggered={attentionTriggered}
            selfHarmFlag={selfHarmFlag}
            violenceFlag={violenceFlag}
            showAnswers={showAnswers}
            includeAnswersInPdf={includeAnswersInPdf}
            exporting={exporting}
            onToggleAnswers={() => setShowAnswers((value) => !value)}
            onTogglePdfAnswers={() =>
              setIncludeAnswersInPdf((value) => !value)
            }
            onExportPdf={exportPdf}
            onReset={reset}
          />
        )}
      </main>

      {stage !== 'quiz' && <Footer />}

      {stage === 'results' && (
        <SmiPdf
          ref={pdfRef}
          completedAt={completedAt || formatDate()}
          topDysfunctional={topDysfunctional}
          healthyResults={healthyResults}
          groupedResults={groupedResults}
          answers={answers}
          attentionTriggered={attentionTriggered}
          includeAnswers={includeAnswersInPdf}
        />
      )}
    </div>
  );
}

function Intro({
  answeredCount,
  hasDraft,
  onStart,
  onReset,
}: {
  answeredCount: number;
  hasDraft: boolean;
  onStart: () => void;
  onReset: () => void;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-8 pt-7 md:px-8 md:pt-9">
      <Reveal>
        <Link
          href="/tools"
          className="mb-4 inline-block text-[12px] underline underline-offset-4"
          style={{ ...sans, color: C.inkSoft }}
        >
          ← Все инструменты
        </Link>

        <Eyebrow>Опросник · около 20–25 минут</Eyebrow>

        <h1 className="mt-3 w-full text-[34px] font-normal leading-[1.04] tracking-[-0.025em] md:text-[42px]">
          Опросник режимов схема-терапии SMI
        </h1>

        <p
          className="mt-3 w-full text-[14px] leading-[1.65] md:text-[15px]"
          style={{ ...sans, color: C.inkSoft }}
        >
          124 утверждения о состояниях и способах реагирования,
          которые могут включаться в разных ситуациях. Отвечайте,
          насколько часто каждое утверждение было похоже на вас
          в последние полгода.
        </p>
      </Reveal>

      <Reveal delay={40}>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <InfoCard
            title="124 утверждения"
            text="На каждый пункт нужно выбрать частоту — от «никогда или почти никогда» до «всегда»."
          />
          <InfoCard
            title="14 режимов"
            text="В результате получится профиль детских, копинговых, родительских и здоровых режимов."
          />
          <InfoCard
            title="Можно сделать перерыв"
            text="Ответы сохраняются в этом браузере на этом устройстве, поэтому к прохождению можно вернуться позже. Если этим устройством пользуется кто-то еще, сохраненные ответы могут быть доступны и ему."
          />
        </div>
      </Reveal>

      <Reveal delay={70}>
        <div
          className="mt-4 grid gap-y-3 px-5 py-4 md:grid-cols-[0.72fr_1.28fr] md:gap-x-8 md:px-6"
          style={{
            backgroundColor: C.surfaceWarm,
            borderRadius: radius.lg,
          }}
        >
          <div>
  <h2 className="text-[20px] leading-[1.2]">
    Что такое режим
  </h2>
</div>

<div
  className="space-y-2.5 text-[12.5px] leading-[1.6] md:pt-[2px]"
            style={{ ...sans, color: C.ink }}
          >
            <p>
              В схема-терапии режимом называют состояние, в котором
              одновременно меняются чувства, мысли и поведение.
              Один человек может переходить между несколькими режимами
              даже в течение одного дня.
            </p>
            <p>
              SMI помогает увидеть, какие режимы чаще проявляются в
              ответах. Это не тест на тип личности и не диагноз:
              результат полезнее рассматривать как профиль и связывать
              с конкретными ситуациями из жизни.
            </p>
          </div>
        </div>
      </Reveal>

      {hasDraft && (
        <Reveal delay={90}>
          <div
            className="mt-5 flex flex-wrap items-center justify-between gap-4 px-5 py-4"
            style={{
              backgroundColor: C.surface,
              borderRadius: radius.md,
            }}
          >
            <div>
              <p className="text-[15px]">
                Есть незавершенное прохождение
              </p>
              <p
                className="mt-1 text-[11.5px]"
                style={{ ...sans, color: C.inkSoft }}
              >
                Уже отвечено: {answeredCount} из {questions.length}
              </p>
            </div>

            <button
              type="button"
              onClick={onReset}
              className="text-[11.5px] underline underline-offset-4"
              style={{ ...sans, color: C.inkSoft }}
            >
              Начать заново
            </button>
          </div>
        </Reveal>
      )}

      <Reveal delay={110}>
        <div className="mt-5">
          <button
            type="button"
            onClick={onStart}
            className="px-7 py-3 text-[13px] transition-all duration-300 hover:-translate-y-0.5"
            style={{
              ...sans,
              backgroundColor: C.ink,
              color: C.bg,
              borderRadius: radius.pill,
            }}
          >
            {hasDraft ? 'Продолжить' : 'Начать'}
          </button>
        </div>
      </Reveal>
    </section>
  );
}

function Quiz({
  currentIndex,
  currentAnswer,
  transitioning,
  onAnswer,
  onBack,
  onExit,
}: {
  currentIndex: number;
  currentAnswer: number | undefined;
  transitioning: boolean;
  onAnswer: (value: number) => void;
  onBack: () => void;
  onExit: () => void;
}) {
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <section className="ym-hide-content ym-disable-clickmap mx-auto max-w-4xl px-6 pb-8 pt-5 md:px-8 md:pt-6">
      <div className="mb-4">
        <div className="mb-2.5 flex items-center justify-between gap-4">
          <p
            className="text-[12px]"
            style={{ ...sans, color: C.inkSoft }}
          >
            Вопрос {currentIndex + 1} из {questions.length}
          </p>

          <button
            type="button"
            onClick={onExit}
            className="text-[12px] underline underline-offset-4"
            style={{ ...sans, color: C.inkSoft }}
          >
            Сохранить и выйти
          </button>
        </div>

        <div
          className="h-1 overflow-hidden rounded-full"
          style={{ backgroundColor: C.surface }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
              backgroundColor: C.terracotta,
            }}
          />
        </div>
      </div>

      <div
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? 'translateY(6px)' : 'translateY(0)',
          transition: 'opacity 0.18s ease, transform 0.18s ease',
        }}
      >
        <p
          className="text-[10px] uppercase tracking-[0.12em]"
          style={{ ...sans, color: C.terracotta }}
        >
          Насколько часто это было похоже на вас за последние полгода?
        </p>

        <h1 className="mt-2.5 max-w-[820px] text-[24px] font-normal leading-[1.1] tracking-[-0.02em] md:text-[29px]">
          {questions[currentIndex]}
        </h1>

        <div className="mt-4 space-y-1.5">
          {answerOptions.map((option) => {
            const active = currentAnswer === option.value;

            return (
              <button
                key={option.value}
                type="button"
                disabled={transitioning}
                onClick={() => onAnswer(option.value)}
                className="group flex w-full items-center gap-3 px-4 py-2.5 text-left transition-all duration-200 hover:translate-x-1 disabled:pointer-events-none"
                style={{
                  backgroundColor: active ? C.surfaceWarm : C.surface,
                  borderRadius: radius.md,
                  boxShadow: active ? shadow.soft : 'none',
                }}
              >
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10.5px]"
                  style={{
                    ...sans,
                    color: active ? C.bg : C.terracotta,
                    backgroundColor: active ? C.terracotta : 'transparent',
                    border: `1px solid ${C.terracotta}`,
                  }}
                >
                  {option.value}
                </span>

                <span className="flex-1 text-[13.5px] leading-[1.4] md:text-[14px]">
                  {option.label}
                </span>

                <span
                  className="text-[14px] transition-transform duration-200 group-hover:translate-x-1"
                  style={{ ...sans, color: C.inkSoft }}
                >
                  →
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex items-center justify-between gap-4">
          {currentIndex > 0 ? (
            <button
              type="button"
              onClick={onBack}
              className="text-[12px] underline underline-offset-4"
              style={{ ...sans, color: C.inkSoft }}
            >
              ← Предыдущий вопрос
            </button>
          ) : (
            <span />
          )}

          <p
            className="text-[11px]"
            style={{ ...sans, color: C.inkSoft }}
          >
            Ответы сохраняются автоматически
          </p>
        </div>
      </div>
    </section>
  );
}

type GroupedResults = {
  category: ModeCategory;
  results: ModeResult[];
}[];

function Results({
  answers,
  results,
  topDysfunctional,
  healthyResults,
  groupedResults,
  attentionTriggered,
  selfHarmFlag,
  violenceFlag,
  showAnswers,
  includeAnswersInPdf,
  exporting,
  onToggleAnswers,
  onTogglePdfAnswers,
  onExportPdf,
  onReset,
}: {
  answers: Answers;
  results: ModeResult[];
  topDysfunctional: ModeResult[];
  healthyResults: ModeResult[];
  groupedResults: GroupedResults;
  attentionTriggered: boolean;
  selfHarmFlag: boolean;
  violenceFlag: boolean;
  showAnswers: boolean;
  includeAnswersInPdf: boolean;
  exporting: boolean;
  onToggleAnswers: () => void;
  onTogglePdfAnswers: () => void;
  onExportPdf: () => void;
  onReset: () => void;
}) {
  return (
    <>
      <section className="ym-hide-content ym-disable-clickmap mx-auto max-w-6xl px-6 pb-7 pt-10 md:px-8 md:pt-14">
        <Eyebrow>Ваш профиль режимов</Eyebrow>

        <h1 className="mt-4 max-w-[950px] text-[38px] font-normal leading-[1.04] tracking-[-0.025em] md:text-[48px]">
          Что выделилось сильнее
        </h1>

        <p
  className="mt-4 w-full text-[13.5px] leading-[1.65]"
  style={{ ...sans, color: C.inkSoft }}
>
  У режима нет статуса «хороший человек» или «плохой человек».
  Профиль показывает, какие состояния и способы реагирования
  чаще откликались в ваших ответах. Значение результата лучше
  проверять на реальных ситуациях, а не только по цифрам.
</p>

        <div className="mt-7 grid gap-3 md:grid-cols-3">
          {topDysfunctional.map((result, index) => (
            <ModeSummaryCard
              key={result.mode.key}
              result={result}
              highlighted={index === 0}
            />
          ))}
        </div>
      </section>

      <section className="ym-hide-content ym-disable-clickmap mx-auto max-w-6xl px-6 py-7 md:px-8 md:py-9">
        <div className="grid gap-y-3 md:grid-cols-2 md:gap-x-3">
  <div>
    <Eyebrow>Здоровые режимы</Eyebrow>
  </div>

  <div className="hidden md:block" />

  <h2 className="text-[29px] leading-[1.08] md:text-[36px]">
    Не только то, что мешает
  </h2>

  <p
    className="text-[13px] leading-[1.65] md:pt-[4px]"
    style={{ ...sans, color: C.inkSoft }}
  >
    SMI отдельно оценивает Счастливого Ребенка и Здорового
    Взрослого. Их показатели полезно смотреть рядом с
    дисфункциональными режимами, а не воспринимать как
    противоположный «итоговый балл здоровья».
  </p>
</div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {healthyResults.map((result) => (
            <ModeSummaryCard
              key={result.mode.key}
              result={result}
              healthy
            />
          ))}
        </div>
      </section>

      <section className="ym-hide-content ym-disable-clickmap mx-auto max-w-6xl px-6 py-7 md:px-8 md:py-9">
        <div className="grid gap-y-3 md:grid-cols-[0.38fr_0.62fr] md:gap-x-8">
  <div>
    <Eyebrow>Все режимы</Eyebrow>
  </div>

  <div className="hidden md:block" />

  <h2 className="text-[29px] leading-[1.08] md:text-[36px]">
    Весь профиль
  </h2>

  <p
    className="text-[13px] leading-[1.65] md:pt-[4px]"
    style={{ ...sans, color: C.inkSoft }}
  >
    Средний балл каждого режима находится в диапазоне от 1 до 6.
    Подпись уровня — дополнительный ориентир по используемым
    нормативам. Важнее смотреть на соотношение режимов и узнавать
    эти состояния в конкретных ситуациях своей жизни.
  </p>
</div>

        <div className="mt-6 space-y-6">
          {groupedResults.map((group) => (
            <div key={group.category}>
              <h3 className="mb-2 text-[17px] leading-[1.2]">
                {CATEGORY_NAMES[group.category]}
              </h3>

              <div className="space-y-2">
                {group.results.map((result) => (
                  <ModeBar key={result.mode.key} result={result} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-5 px-5 py-5"
          style={{
            backgroundColor: C.surfaceWarm,
            borderRadius: radius.lg,
          }}
        >
          <h3 className="text-[19px] leading-[1.25]">
            Как читать профиль
          </h3>

          <p
            className="mt-2 text-[12.5px] leading-[1.65]"
            style={{ ...sans, color: C.inkSoft }}
          >
            Высокий показатель не означает, что человек постоянно
            находится в этом режиме. Режимы включаются в определенных
            обстоятельствах и могут быстро сменять друг друга.
            Полезнее спросить: в каких ситуациях этот режим появляется,
            что его запускает и что происходит дальше.
          </p>
        </div>
      </section>

      {attentionTriggered && (
        <section className="ym-hide-content ym-disable-clickmap mx-auto max-w-6xl px-6 py-7 md:px-8">
          <div
            className="px-5 py-5 md:px-6"
            style={{
              backgroundColor: 'rgba(150, 59, 89, 0.08)',
              borderRadius: radius.lg,
            }}
          >
            <Eyebrow>Отдельно о важных ответах</Eyebrow>

            <h2 className="mt-3 text-[25px] leading-[1.12]">
              Некоторые ответы лучше не оставлять только внутри опросника
            </h2>

            {selfHarmFlag && (
              <p
                className="mt-3 text-[12.5px] leading-[1.65]"
                style={{ ...sans, color: C.inkSoft }}
              >
                Вы отметили, что хотя бы иногда возникают порывы
                причинить себе боль. Такой ответ сам по себе не говорит
                о суицидальном намерении, но его стоит отдельно обсудить
                со специалистом.
              </p>
            )}

            {violenceFlag && (
              <p
                className="mt-3 text-[12.5px] leading-[1.65]"
                style={{ ...sans, color: C.inkSoft }}
              >
                Вы отметили, что хотя бы иногда в сильной злости
                появляются мысли о том, чтобы серьезно ранить другого
                человека. Один ответ не определяет реальный риск, но
                эту тему важно оценивать отдельно от общего профиля.
              </p>
            )}

            <div
              className="mt-4 px-4 py-4"
              style={{
                backgroundColor: C.bg,
                borderRadius: radius.md,
              }}
            >
              <p
                className="text-[12px] leading-[1.65]"
                style={{ ...sans, color: C.ink }}
              >
                Если прямо сейчас есть намерение причинить серьезный
                вред себе или другому человеку и вы не уверены, что
                сможете остановиться, не ждите ответа психолога:
                обратитесь за экстренной медицинской или психиатрической
                помощью по номеру 112 или в ближайшую доступную службу.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="ym-hide-content ym-disable-clickmap mx-auto max-w-6xl px-6 py-7 md:px-8 md:py-9">
        <div
          className="px-5 py-5 md:px-6"
          style={{
            backgroundColor: C.surface,
            borderRadius: radius.lg,
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Eyebrow>Ваши ответы</Eyebrow>
              <h2 className="mt-2 text-[25px] leading-[1.1]">
                Посмотреть, из чего сложился профиль
              </h2>
            </div>

            <button
              type="button"
              onClick={onToggleAnswers}
              className="px-5 py-3 text-[12px]"
              style={{
                ...sans,
                backgroundColor: C.bg,
                borderRadius: radius.pill,
              }}
            >
              {showAnswers ? 'Скрыть ответы' : 'Показать мои ответы'}
            </button>
          </div>

          {showAnswers && (
            <div className="mt-5 space-y-2">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="grid gap-2 px-4 py-3.5 md:grid-cols-[1fr_230px] md:items-center md:gap-6"
                  style={{
                    backgroundColor: C.bg,
                    borderRadius: radius.md,
                  }}
                >
                  <div className="flex gap-3">
                    <span
                      className="shrink-0 text-[10px]"
                      style={{ ...sans, color: C.terracotta }}
                    >
                      {String(index + 1).padStart(3, '0')}
                    </span>

                    <p className="text-[12.5px] leading-[1.5]">
                      {question}
                    </p>
                  </div>

                  <p
                    className="text-[11.5px] md:text-right"
                    style={{ ...sans, color: C.inkSoft }}
                  >
                    {answerLabel(answers[index + 1])}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={exporting}
            onClick={onExportPdf}
            className="px-6 py-3 text-[13px] disabled:opacity-50"
            style={{
              ...sans,
              backgroundColor: C.ink,
              color: C.bg,
              borderRadius: radius.pill,
            }}
          >
            {exporting ? 'Создаю PDF...' : 'Скачать PDF'}
          </button>

          <label
            className="flex cursor-pointer items-center gap-2 px-4 py-3 text-[11.5px]"
            style={{ ...sans, color: C.inkSoft }}
          >
            <input
              type="checkbox"
              checked={includeAnswersInPdf}
              onChange={onTogglePdfAnswers}
            />
            добавить в PDF все 124 ответа
          </label>

          <button
            type="button"
            onClick={onReset}
            className="px-4 py-3 text-[12px] underline underline-offset-4"
            style={{ ...sans, color: C.inkSoft }}
          >
            Пройти еще раз
          </button>

          <Link
            href="/tools"
            className="px-4 py-3 text-[12px] underline underline-offset-4"
            style={{ ...sans, color: C.inkSoft }}
          >
            ← Все инструменты
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-3 pt-4 md:px-8">
        <div
          className="grid gap-6 px-6 py-7 md:grid-cols-[1fr_auto] md:items-center md:px-8 md:py-8"
          style={{
            backgroundColor: C.ink,
            color: C.bg,
            borderRadius: radius.lg,
            boxShadow: shadow.soft,
          }}
        >
          <div className="max-w-3xl">
  <Eyebrow>Если хочется разобраться глубже</Eyebrow>

  <h2 className="mt-3 text-[28px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[34px]">
    Профиль показывает режимы, но не объясняет, почему они включаются
  </h2>

  <p
    className="mt-3 text-[13px] leading-[1.6]"
    style={{ ...sans, color: '#C9C2B5' }}
  >
    На встрече разберем несколько реальных ситуаций: что запускало
    переключение, какие схемы были активны и как в этих обстоятельствах
    можно было бы реагировать более гибко.
  </p>
</div>

          <Link
            href="/book"
            className="inline-flex justify-center px-7 py-3 text-[13px] font-medium transition-all duration-300 hover:-translate-y-0.5"
            style={{
              ...sans,
              backgroundColor: C.bg,
              color: C.ink,
              borderRadius: radius.pill,
            }}
          >
            Оставить заявку
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12 pt-4 md:px-8 md:pb-14">
        <div
          className="flex flex-wrap items-center justify-between gap-4 px-5 py-4"
          style={{
            backgroundColor: C.surface,
            borderRadius: radius.md,
          }}
        >
          <div>
            <p className="text-[14px]">
              Хотите сначала разобраться в самих режимах?
            </p>

            <p
              className="mt-1 text-[11.5px] leading-[1.5]"
              style={{ ...sans, color: C.inkSoft }}
            >
              В отдельной карте можно открыть описание каждого режима,
              его триггеры и типичные реакции.
            </p>
          </div>

          <Link
            href="/tools/schema-modes"
            className="text-[12px] underline underline-offset-4"
            style={{ ...sans, color: C.ink }}
          >
            Открыть карту режимов →
          </Link>
        </div>
      </section>
    </>
  );
}

function ModeSummaryCard({
  result,
  highlighted = false,
  healthy = false,
}: {
  result: ModeResult;
  highlighted?: boolean;
  healthy?: boolean;
}) {
  return (
    <div
      className="px-5 py-5"
      style={{
        backgroundColor: highlighted ? C.surfaceWarm : C.surface,
        borderRadius: radius.md,
      }}
    >
      <p
        className="text-[10px] uppercase tracking-[0.1em]"
        style={{
          ...sans,
          color: healthy ? C.moss : C.terracotta,
        }}
      >
        {levelLabels[result.level]}
      </p>

      <h2 className="mt-2 text-[18px] leading-[1.25]">
        {result.mode.name}
      </h2>

      <div className="mt-4 flex items-end gap-2">
        <span className="text-[31px] leading-none">
          {result.rawScore.toFixed(2)}
        </span>
        <span
          className="pb-0.5 text-[12px]"
          style={{ ...sans, color: C.inkSoft }}
        >
          из 6
        </span>
      </div>

      <p
        className="mt-3 text-[11.5px] leading-[1.55]"
        style={{ ...sans, color: C.inkSoft }}
      >
        {result.mode.description}
      </p>

      <Link
        href={`/tools/schema-modes#${result.mode.key}`}
        className="mt-4 inline-block text-[11.5px] underline underline-offset-4"
        style={{ ...sans, color: C.ink }}
      >
        Подробнее о режиме →
      </Link>
    </div>
  );
}

function ModeBar({ result }: { result: ModeResult }) {
  const width = `${Math.min(
    100,
    Math.max(0, ((result.rawScore - 1) / 5) * 100)
  )}%`;

  return (
    <div
      className="grid gap-3 px-4 py-4 md:grid-cols-[1fr_330px] md:items-center md:gap-6"
      style={{
        backgroundColor: C.surface,
        borderRadius: radius.md,
      }}
    >
      <div>
        <p className="text-[14px] leading-[1.35]">
          {result.mode.name}
        </p>
        <p
          className="mt-1 text-[10.5px]"
          style={{ ...sans, color: C.inkSoft }}
        >
          {levelLabels[result.level]}
        </p>
      </div>

      <div className="grid grid-cols-[1fr_54px] items-center gap-3">
        <div
          className="h-2 overflow-hidden rounded-full"
          style={{ backgroundColor: C.bg }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width,
              backgroundColor: result.mode.isHealthy
                ? C.moss
                : result.mode.color || C.terracotta,
            }}
          />
        </div>

        <p
          className="text-right text-[11.5px]"
          style={{ ...sans, color: C.inkSoft }}
        >
          {result.rawScore.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div
      className="px-5 py-4"
      style={{
        backgroundColor: C.surface,
        borderRadius: radius.md,
      }}
    >
      <h2 className="text-[15px] leading-[1.3]">{title}</h2>

      <p
        className="mt-2 text-[11.5px] leading-[1.55]"
        style={{ ...sans, color: C.inkSoft }}
      >
        {text}
      </p>
    </div>
  );
}

const SmiPdf = forwardRef<
  HTMLDivElement,
  {
    completedAt: string;
    topDysfunctional: ModeResult[];
    healthyResults: ModeResult[];
    groupedResults: GroupedResults;
    answers: Answers;
    attentionTriggered: boolean;
    includeAnswers: boolean;
  }
>(function SmiPdf(
  {
    completedAt,
    topDysfunctional,
    healthyResults,
    groupedResults,
    answers,
    attentionTriggered,
    includeAnswers,
  },
  ref
) {
  return (
    <div
      ref={ref}
      className="ym-hide-content"
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: '-10000px',
        top: 0,
        width: '794px',
        padding: '52px',
        backgroundColor: C.bg,
        color: C.ink,
        ...serif,
        zIndex: -100,
      }}
    >
      <p
        style={{
          ...sans,
          margin: 0,
          fontSize: '11px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: C.terracotta,
        }}
      >
        Юлия Шашкова · психологические инструменты
      </p>

      <h1
        style={{
          margin: '16px 0 6px',
          fontSize: '34px',
          lineHeight: 1.08,
          fontWeight: 400,
        }}
      >
        Опросник режимов схема-терапии SMI
      </h1>

      <p
        style={{
          ...sans,
          margin: 0,
          fontSize: '12px',
          color: C.inkSoft,
        }}
      >
        {completedAt}
      </p>

      <PdfSection title="Что выделилось сильнее">
        {topDysfunctional.map((result) => (
          <PdfResultRow key={result.mode.key} result={result} />
        ))}
      </PdfSection>

      <PdfSection title="Здоровые режимы">
        {healthyResults.map((result) => (
          <PdfResultRow key={result.mode.key} result={result} />
        ))}
      </PdfSection>

      {groupedResults.map((group) => (
        <PdfSection
          key={group.category}
          title={CATEGORY_NAMES[group.category]}
        >
          {group.results.map((result) => (
            <PdfResultRow key={result.mode.key} result={result} />
          ))}
        </PdfSection>
      ))}

      {attentionTriggered && (
        <div
          style={{
            marginTop: '24px',
            padding: '18px',
            backgroundColor: 'rgba(150, 59, 89, 0.08)',
            borderRadius: '16px',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '14px',
            }}
          >
            Отдельно о важных ответах
          </p>

          <p
            style={{
              ...sans,
              margin: '7px 0 0',
              fontSize: '10px',
              lineHeight: 1.6,
              color: C.inkSoft,
            }}
          >
            В ответах были отмечены темы причинения вреда себе или
            другому человеку. Сам по себе пункт опросника не определяет
            текущий риск. Если такие мысли актуальны сейчас, их важно
            оценить отдельно со специалистом.
          </p>
        </div>
      )}

      {includeAnswers && (
        <>
          <h2
            style={{
              margin: '30px 0 12px',
              fontSize: '22px',
              fontWeight: 400,
            }}
          >
            Все 124 ответа
          </h2>

          {questions.map((question, index) => (
            <div
              key={index}
              style={{
                padding: '9px 0',
                borderBottom: `1px solid ${C.line}`,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: '11.5px',
                  lineHeight: 1.45,
                }}
              >
                {index + 1}. {question}
              </p>

              <p
                style={{
                  ...sans,
                  margin: '4px 0 0',
                  fontSize: '10px',
                  color: C.inkSoft,
                }}
              >
                {answerLabel(answers[index + 1])}
              </p>
            </div>
          ))}
        </>
      )}

      <div
        style={{
          marginTop: '28px',
          padding: '18px',
          backgroundColor: C.surface,
          borderRadius: '16px',
        }}
      >
        <p
          style={{
            ...sans,
            margin: 0,
            fontSize: '10px',
            lineHeight: 1.6,
            color: C.inkSoft,
          }}
        >
          SMI помогает описать профиль режимов схема-терапии.
          Результат не является медицинским диагнозом и не означает,
          что человек постоянно находится в режиме с высоким баллом.
          Значение профиля лучше рассматривать вместе с конкретными
          ситуациями и контекстом.
        </p>
      </div>

      <p
        style={{
          ...sans,
          margin: '10px 0 0',
          fontSize: '10px',
          color: C.inkSoft,
        }}
      >
        psyshashkova.ru/tools/schema-modes-test
      </p>
    </div>
  );
});

SmiPdf.displayName = 'SmiPdf';

function PdfSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginTop: '28px' }}>
      <h2
        style={{
          margin: '0 0 10px',
          fontSize: '21px',
          fontWeight: 400,
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function PdfResultRow({ result }: { result: ModeResult }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 120px',
        gap: '16px',
        padding: '10px 0',
        borderBottom: `1px solid ${C.line}`,
      }}
    >
      <span style={{ fontSize: '13px' }}>{result.mode.name}</span>

      <span
        style={{
          ...sans,
          fontSize: '10.5px',
          textAlign: 'right',
          color: C.inkSoft,
        }}
      >
        {result.rawScore.toFixed(2)} / 6 · {levelLabels[result.level]}
      </span>
    </div>
  );
}