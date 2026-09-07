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
  ANSWER_OPTIONS,
  NEED_GROUPS,
  QUESTIONS as RAW_QUESTIONS,
  SCHEMAS,
  answerLabel,
  scoredValue,
  type MssSchema,
} from './mssData';

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

const QUESTIONS = RAW_QUESTIONS.map(
  (question) => ({
    ...question,
    text: stripTrailingPeriod(
      question.text
    ),
  })
);

type Stage = 'intro' | 'test' | 'result';
type Answers = Record<number, number>;

const STORAGE_KEY = 'psyshashkova:mss-ysq:answers:v1';
const DATE_KEY = 'psyshashkova:mss-ysq:completed:v1';

type SchemaResult = {
  schema: MssSchema;
  average: number;
  agreementPercent: number;
};

type NeedResult = {
  name: string;
  average: number;
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

function round(value: number) {
  return Math.round(value * 100) / 100;
}

export default function SchemaTestClient() {
  const [stage, setStage] = useState<Stage>('intro');
  const [answers, setAnswers] = useState<Answers>({});
  const [current, setCurrent] = useState(0);
  const [ready, setReady] = useState(false);
  const [completedAt, setCompletedAt] = useState('');
  const [showAnswers, setShowAnswers] = useState(false);
  const [includeAnswersInPdf, setIncludeAnswersInPdf] = useState(false);
  const [exporting, setExporting] = useState(false);

  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const storedDate = window.localStorage.getItem(DATE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored) as Answers;
        setAnswers(parsed);

        const answeredCount = Object.keys(parsed).length;

        if (answeredCount === QUESTIONS.length) {
          setStage('result');
          setCompletedAt(storedDate || formatDate());
        } else if (answeredCount > 0) {
          const firstUnanswered = QUESTIONS.findIndex(
            (question) => parsed[question.id] === undefined
          );
          setCurrent(firstUnanswered >= 0 ? firstUnanswered : 0);
        }
      }
    } catch (error) {
      console.error('MSS draft load failed', error);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch (error) {
      console.error('MSS draft save failed', error);
    }
  }, [answers, ready]);

  const answeredCount = Object.keys(answers).length;
  const hasDraft = answeredCount > 0 && answeredCount < QUESTIONS.length;
  const isComplete = answeredCount === QUESTIONS.length;

  const schemaResults = useMemo<SchemaResult[]>(() => {
    return SCHEMAS.map((schema) => {
      const scores = schema.itemIds
        .map((id) => {
          const question = QUESTIONS.find((item) => item.id === id);
          const raw = answers[id];

          if (!question || raw === undefined) return null;
          return scoredValue(question, raw);
        })
        .filter((value): value is number => value !== null);

      const average =
        scores.length > 0
          ? scores.reduce((sum, value) => sum + value, 0) / scores.length
          : 0;

      const agreementPercent =
        scores.length > 0
          ? (scores.filter((value) => value >= 3).length / scores.length) * 100
          : 0;

      return {
        schema,
        average: round(average),
        agreementPercent: Math.round(agreementPercent),
      };
    }).sort((a, b) => b.average - a.average);
  }, [answers]);

  const needResults = useMemo<NeedResult[]>(() => {
    return NEED_GROUPS.map((group) => {
      const scores = group.itemIds
        .map((id) => {
          const question = QUESTIONS.find((item) => item.id === id);
          const raw = answers[id];

          if (!question || raw === undefined) return null;
          return scoredValue(question, raw);
        })
        .filter((value): value is number => value !== null);

      const average =
        scores.length > 0
          ? scores.reduce((sum, value) => sum + value, 0) / scores.length
          : 0;

      return {
        name: group.name,
        average: round(average),
      };
    }).sort((a, b) => b.average - a.average);
  }, [answers]);

  const highlightedSchemas = useMemo(() => {
    const aboveGuide = schemaResults.filter((result) => result.average >= 2.5);
    return aboveGuide.length > 0
      ? aboveGuide.slice(0, 5)
      : schemaResults.slice(0, 3);
  }, [schemaResults]);

  function start() {
    if (isComplete) {
      setStage('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (hasDraft) {
      const firstUnanswered = QUESTIONS.findIndex(
        (question) => answers[question.id] === undefined
      );
      setCurrent(firstUnanswered >= 0 ? firstUnanswered : 0);
    } else {
      setCurrent(0);
    }

    setStage('test');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function answer(value: number) {
    const question = QUESTIONS[current];
    const nextAnswers = {
      ...answers,
      [question.id]: value,
    };

    setAnswers(nextAnswers);

    if (current < QUESTIONS.length - 1) {
      setCurrent((previous) => previous + 1);
      return;
    }

    const date = formatDate();
    setCompletedAt(date);
    window.localStorage.setItem(DATE_KEY, date);
    setStage('result');
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
    setCurrent(0);
    setCompletedAt('');
    setShowAnswers(false);
    setIncludeAnswersInPdf(false);
    setStage('intro');

    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(DATE_KEY);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function exportPdf() {
    try {
      setExporting(true);

      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
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
        const sliceHeightMm = (sliceHeight / canvas.width) * usableWidth;

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
      pdf.save(`mss-ysq-${date}.pdf`);
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
        style={{ ...serif, backgroundColor: C.bg, color: C.ink }}
      />
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ ...serif, backgroundColor: C.bg, color: C.ink }}
    >
      <Nav active="/tools" />

      <main>
        {stage === 'intro' && (
          <Intro
            hasDraft={hasDraft}
            isComplete={isComplete}
            answeredCount={answeredCount}
            onStart={start}
            onReset={reset}
          />
        )}

        {stage === 'test' && (
          <Test
            current={current}
            answers={answers}
            onAnswer={answer}
            onBack={() => setCurrent((previous) => Math.max(0, previous - 1))}
            onExit={() => setStage('intro')}
          />
        )}

        {stage === 'result' && (
          <Result
            answers={answers}
            schemaResults={schemaResults}
            needResults={needResults}
            highlightedSchemas={highlightedSchemas}
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

      {stage !== 'test' && <Footer />}

      {stage === 'result' && (
        <MssPdf
          ref={pdfRef}
          completedAt={completedAt || formatDate()}
          schemaResults={schemaResults}
          needResults={needResults}
          highlightedSchemas={highlightedSchemas}
          answers={answers}
          includeAnswers={includeAnswersInPdf}
        />
      )}
    </div>
  );
}

function Intro({
  hasDraft,
  isComplete,
  answeredCount,
  onStart,
  onReset,
}: {
  hasDraft: boolean;
  isComplete: boolean;
  answeredCount: number;
  onStart: () => void;
  onReset: () => void;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-12 pt-10 md:px-8 md:pt-14">
      <Reveal>
        <Link
          href="/tools"
          className="mb-5 inline-block text-[12px] underline underline-offset-4"
          style={{ ...sans, color: C.inkSoft }}
        >
          ← Все инструменты
        </Link>

        <Eyebrow>Опросник · около 10–15 минут</Eyebrow>

        <h1 className="mt-4 w-full text-[38px] font-normal leading-[1.04] tracking-[-0.025em] md:text-[48px]">
          Опросник ранних схем MSS-YSQ
        </h1>

        <p
          className="mt-5 max-w-[920px] text-[15px] leading-[1.7]"
          style={{ ...sans, color: C.inkSoft }}
        >
          76 утверждений о том, как вы обычно воспринимаете себя,
          других людей и отношения. Здесь нет правильных ответов:
          отмечайте, насколько каждое утверждение похоже на ваш
          собственный опыт.
        </p>
      </Reveal>

      <Reveal delay={40}>
        <div className="mt-7 grid gap-3 md:grid-cols-3">
          <IntroCard
            title="76 утверждений"
            text="На каждый пункт нужно выбрать один из пяти вариантов — от полного несогласия до полного согласия."
          />
          <IntroCard
            title="19 шкал"
            text="В конце получится профиль: какие темы сильнее откликнулись в ответах, а какие почти не выделяются."
          />
          <IntroCard
            title="Можно сделать перерыв"
            text="Незавершенные ответы сохраняются только в этом браузере. Можно закрыть страницу и вернуться позже."
          />
        </div>
      </Reveal>

      <Reveal delay={70}>
        <div
          className="mt-5 px-5 py-5 md:px-6"
          style={{
            backgroundColor: C.surfaceWarm,
            borderRadius: radius.lg,
          }}
        >
          <h2 className="text-[17px] leading-[1.3]">О русской версии</h2>

          <p
            className="mt-2 max-w-[980px] text-[12.5px] leading-[1.65]"
            style={{ ...sans, color: C.ink }}
          >
            Это мой перевод MSS-YSQ на русский. Я использую его в своей
            исследовательской работе и в дальнейшем планирую отдельно
            проверить, как русская версия работает на большой выборке.
            Пока результат лучше воспринимать как ориентир: он показывает,
            какие темы сильнее откликаются, но не дает готового заключения.
          </p>

          <p
            className="mt-3 text-[11px] leading-[1.55]"
            style={{ ...sans, color: C.inkSoft }}
          >
            В основе — Maladaptive Schema Scale – Young Schema
            Questionnaire Aligned (MSS-YSQ). Структура шкал и подсчет
            результатов сохранены по оригинальной версии.
          </p>
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
              <p className="text-[15px]">Есть незавершенное прохождение</p>
              <p
                className="mt-1 text-[11.5px]"
                style={{ ...sans, color: C.inkSoft }}
              >
                Уже отвечено: {answeredCount} из {QUESTIONS.length}
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
        <div className="mt-7 flex flex-wrap items-center gap-3">
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
            {isComplete
              ? 'Посмотреть сохраненный результат'
              : hasDraft
                ? 'Продолжить'
                : 'Начать'}
          </button>

          {isComplete && (
            <button
              type="button"
              onClick={onReset}
              className="px-5 py-3 text-[12px] underline underline-offset-4"
              style={{ ...sans, color: C.inkSoft }}
            >
              Пройти заново
            </button>
          )}
        </div>
      </Reveal>
    </section>
  );
}

function Test({
  current,
  answers,
  onAnswer,
  onBack,
  onExit,
}: {
  current: number;
  answers: Answers;
  onAnswer: (value: number) => void;
  onBack: () => void;
  onExit: () => void;
}) {
  const question = QUESTIONS[current];
  const selected = answers[question.id];
  const progress = ((current + 1) / QUESTIONS.length) * 100;

  return (
    <section className="ym-hide-content ym-disable-clickmap mx-auto max-w-4xl px-6 pb-12 pt-7 md:px-8 md:pt-8">
      <div>
        <div className="mb-3 flex items-center justify-between gap-4">
          <p
            className="text-[12px]"
            style={{ ...sans, color: C.inkSoft }}
          >
            Вопрос {current + 1} из {QUESTIONS.length}
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

      <div className="mt-6">
        <p
          className="text-[10px] uppercase tracking-[0.12em]"
          style={{ ...sans, color: C.terracotta }}
        >
          Насколько это похоже на ваш опыт?
        </p>

        <h1 className="mt-3 max-w-[820px] text-[26px] font-normal leading-[1.1] tracking-[-0.02em] md:text-[32px]">
          {question.text}
        </h1>

        <div className="mt-5 space-y-2">
          {ANSWER_OPTIONS.map((option) => {
            const active = selected === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onAnswer(option.value)}
                className="group flex w-full items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:translate-x-1"
                style={{
                  backgroundColor: active ? C.surfaceWarm : C.surface,
                  borderRadius: radius.md,
                  boxShadow: active ? shadow.soft : 'none',
                }}
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px]"
                  style={{
                    ...sans,
                    color: active ? C.bg : C.terracotta,
                    backgroundColor: active ? C.terracotta : 'transparent',
                    border: `1px solid ${C.terracotta}`,
                  }}
                >
                  {option.value}
                </span>

                <span className="flex-1 text-[14px] leading-[1.4] md:text-[15px]">
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

        <div className="mt-4 flex items-center justify-between gap-4">
          {current > 0 ? (
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

function Result({
  answers,
  schemaResults,
  needResults,
  highlightedSchemas,
  showAnswers,
  includeAnswersInPdf,
  exporting,
  onToggleAnswers,
  onTogglePdfAnswers,
  onExportPdf,
  onReset,
}: {
  answers: Answers;
  schemaResults: SchemaResult[];
  needResults: NeedResult[];
  highlightedSchemas: SchemaResult[];
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
        <Eyebrow>Ваш результат</Eyebrow>

        <h1 className="mt-4 max-w-[950px] text-[38px] font-normal leading-[1.04] tracking-[-0.025em] md:text-[48px]">
          Что сильнее откликнулось в ответах
        </h1>

        <p
          className="mt-4 max-w-[900px] text-[13.5px] leading-[1.65]"
          style={{ ...sans, color: C.inkSoft }}
        >
          Здесь нет общего балла и нет списка «обнаруженных схем».
          Важнее смотреть на профиль целиком: какие темы заметно
          выделяются относительно остальных и насколько вы узнаете
          себя в самих утверждениях.
        </p>

        <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {highlightedSchemas.map((result, index) => (
            <div
              key={result.schema.key}
              className="px-5 py-5"
              style={{
                backgroundColor:
                  index === 0 ? C.surfaceWarm : C.surface,
                borderRadius: radius.md,
              }}
            >
              <p
                className="text-[10px] uppercase tracking-[0.1em]"
                style={{ ...sans, color: C.terracotta }}
              >
                {String(index + 1).padStart(2, '0')}
              </p>

              <h2 className="mt-2 text-[18px] leading-[1.25]">
                {result.schema.name}
              </h2>

              <div className="mt-4 flex items-end gap-2">
                <span className="text-[31px] leading-none">
                  {result.average.toFixed(2)}
                </span>
                <span
                  className="pb-0.5 text-[12px]"
                  style={{ ...sans, color: C.inkSoft }}
                >
                  из 4
                </span>
              </div>

              <p
                className="mt-2 text-[11.5px] leading-[1.55]"
                style={{ ...sans, color: C.inkSoft }}
              >
                {result.agreementPercent}% ответов дали 3–4 балла
                после учета обратных пунктов.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="ym-hide-content ym-disable-clickmap mx-auto max-w-6xl px-6 py-7 md:px-8 md:py-9">
        <div className="grid gap-y-3 md:grid-cols-[0.72fr_1.28fr] md:gap-x-10">
          <div>
            <Eyebrow>Все шкалы</Eyebrow>
          </div>
          <div className="hidden md:block" />

          <h2 className="text-[29px] leading-[1.08] md:text-[36px]">
            Профиль по 19 темам
          </h2>

          <p
            className="text-[13px] leading-[1.65]"
            style={{ ...sans, color: C.inkSoft }}
          >
            Чем длиннее полоса, тем сильнее вы в среднем соглашались
            с утверждениями этой шкалы. Порядок отсортирован от
            наиболее высокого показателя к наиболее низкому.
          </p>
        </div>

        <div className="mt-6 space-y-2.5">
          {schemaResults.map((result) => (
            <SchemaBar key={result.schema.key} result={result} />
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
            Как читать эти цифры
          </h3>

          <p
            className="mt-2 text-[12.5px] leading-[1.65]"
            style={{ ...sans, color: C.inkSoft }}
          >
            В оригинальной версии MSS-YSQ среднее значение 2,5 и выше
            используется как ориентир для заметно выраженной темы.
            Для этой русской версии я бы не воспринимала 2,5 как
            жесткую границу. Полезнее смотреть, какие показатели
            выделяются именно в вашем профиле и какие конкретные
            утверждения за ними стоят.
          </p>
        </div>
      </section>

      <section className="ym-hide-content ym-disable-clickmap mx-auto max-w-6xl px-6 py-7 md:px-8 md:py-9">
        <div className="grid gap-y-3 md:grid-cols-[0.72fr_1.28fr] md:gap-x-10">
          <div>
            <Eyebrow>Области потребностей</Eyebrow>
          </div>
          <div className="hidden md:block" />

          <h2 className="text-[29px] leading-[1.08] md:text-[36px]">
            Где ответы концентрируются сильнее
          </h2>

          <p
            className="text-[13px] leading-[1.65]"
            style={{ ...sans, color: C.inkSoft }}
          >
            В MSS-YSQ шкалы объединены в пять более широких областей.
            Это дополнительный способ посмотреть на результат, а не
            отдельный диагноз или оценка того, насколько «удовлетворена»
            потребность.
          </p>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {needResults.map((result) => (
            <NeedCard key={result.name} result={result} />
          ))}
        </div>
      </section>

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
                Хотите посмотреть, из чего сложился профиль?
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
              {QUESTIONS.map((question) => (
                <div
                  key={question.id}
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
                      {String(question.id).padStart(2, '0')}
                    </span>

                    <p className="text-[12.5px] leading-[1.5]">
                      {question.text}
                    </p>
                  </div>

                  <p
                    className="text-[11.5px] md:text-right"
                    style={{ ...sans, color: C.inkSoft }}
                  >
                    {answerLabel(answers[question.id])}
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
            добавить в PDF все 76 ответов
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

      <section className="mx-auto max-w-6xl px-6 pb-12 pt-4 md:px-8 md:pb-14">
  <div
    className="grid gap-6 px-6 py-7 md:grid-cols-[1fr_auto] md:items-center md:px-8 md:py-8"
    style={{
      backgroundColor: C.ink,
      color: C.bg,
      borderRadius: radius.lg,
      boxShadow: shadow.soft,
    }}
  >
    <div>
      <Eyebrow>
        Если хочется разобраться глубже
      </Eyebrow>

      <h2 className="mt-3 max-w-3xl text-[28px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[34px]">
        Опросник показывает темы, но не объясняет, почему они повторяются
      </h2>

      <p
  className="mt-3 max-w-3xl text-[13px] leading-[1.6] md:text-[14px]"
        style={{
          ...sans,
          color: '#C9C2B5',
        }}
      >
        На встрече свяжем результат с конкретными ситуациями из вашей
жизни: когда эти темы особенно проявляются, как вы обычно
реагируете и что помогает им повторяться снова.
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

  <div
    className="mt-4 flex flex-wrap items-center justify-between gap-4 px-5 py-4"
    style={{
      backgroundColor: C.surface,
      borderRadius: radius.md,
    }}
  >
    <div>
      <p className="text-[14px]">
        Хотите сначала разобраться в самих схемах?
      </p>

      <p
        className="mt-1 text-[11.5px] leading-[1.5]"
        style={{
          ...sans,
          color: C.inkSoft,
        }}
      >
        В отдельной карте можно открыть описания схем, потребностей и
        способов совладания.
      </p>
    </div>

    <Link
      href="/tools/schemas-needs"
      className="text-[12px] underline underline-offset-4 transition-opacity hover:opacity-60"
      style={{
        ...sans,
        color: C.ink,
      }}
    >
      Открыть карту схем →
    </Link>
  </div>
</section>
    </>
  );
}

function SchemaBar({ result }: { result: SchemaResult }) {
  const width = `${Math.min(100, Math.max(0, (result.average / 4) * 100))}%`;

  return (
    <div
      className="grid gap-3 px-4 py-4 md:grid-cols-[1fr_320px] md:items-center md:gap-6"
      style={{
        backgroundColor: C.surface,
        borderRadius: radius.md,
      }}
    >
      <div>
        <p className="text-[14px] leading-[1.35]">
          {result.schema.name}
        </p>
        <p
          className="mt-1 text-[10.5px]"
          style={{ ...sans, color: C.inkSoft }}
        >
          {result.agreementPercent}% ответов 3–4 балла
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
              backgroundColor:
                result.average >= 2.5 ? C.terracotta : C.moss,
            }}
          />
        </div>

        <p
          className="text-right text-[11.5px]"
          style={{ ...sans, color: C.inkSoft }}
        >
          {result.average.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

function NeedCard({ result }: { result: NeedResult }) {
  return (
    <div
      className="px-5 py-5"
      style={{
        backgroundColor: C.surface,
        borderRadius: radius.md,
      }}
    >
      <h3 className="text-[16px] leading-[1.3]">{result.name}</h3>

      <div className="mt-4 flex items-center gap-3">
        <div
          className="h-2 flex-1 overflow-hidden rounded-full"
          style={{ backgroundColor: C.bg }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${(result.average / 4) * 100}%`,
              backgroundColor: C.ochre,
            }}
          />
        </div>

        <span
          className="text-[11.5px]"
          style={{ ...sans, color: C.inkSoft }}
        >
          {result.average.toFixed(2)} / 4
        </span>
      </div>
    </div>
  );
}

function IntroCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div
      className="px-5 py-5"
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

const MssPdf = forwardRef<
  HTMLDivElement,
  {
    completedAt: string;
    schemaResults: SchemaResult[];
    needResults: NeedResult[];
    highlightedSchemas: SchemaResult[];
    answers: Answers;
    includeAnswers: boolean;
  }
>(function MssPdf(
  {
    completedAt,
    schemaResults,
    needResults,
    highlightedSchemas,
    answers,
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
          fontSize: '36px',
          lineHeight: 1.08,
          fontWeight: 400,
        }}
      >
        Опросник ранних схем MSS-YSQ
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

      <div
        style={{
          marginTop: '28px',
          padding: '24px',
          backgroundColor: C.surfaceWarm,
          borderRadius: '22px',
        }}
      >
        <p
          style={{
            ...sans,
            margin: 0,
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: C.terracotta,
          }}
        >
          Что сильнее выделилось
        </p>

        {highlightedSchemas.map((result, index) => (
          <div
            key={result.schema.key}
            style={{
              marginTop: index === 0 ? '14px' : '12px',
              paddingTop: index === 0 ? 0 : '12px',
              borderTop: index === 0 ? 'none' : `1px solid ${C.line}`,
            }}
          >
            <p style={{ margin: 0, fontSize: '16px' }}>
              {result.schema.name}
            </p>

            <p
              style={{
                ...sans,
                margin: '4px 0 0',
                fontSize: '11px',
                color: C.inkSoft,
              }}
            >
              {result.average.toFixed(2)} / 4 · {result.agreementPercent}% ответов 3–4 балла
            </p>
          </div>
        ))}
      </div>

      <h2
        style={{
          margin: '30px 0 12px',
          fontSize: '22px',
          fontWeight: 400,
        }}
      >
        Все 19 шкал
      </h2>

      {schemaResults.map((result) => (
        <div
          key={result.schema.key}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 90px',
            gap: '16px',
            padding: '10px 0',
            borderBottom: `1px solid ${C.line}`,
          }}
        >
          <span style={{ fontSize: '13px' }}>{result.schema.name}</span>
          <span
            style={{
              ...sans,
              fontSize: '11px',
              textAlign: 'right',
              color: C.inkSoft,
            }}
          >
            {result.average.toFixed(2)} / 4
          </span>
        </div>
      ))}

      <h2
        style={{
          margin: '30px 0 12px',
          fontSize: '22px',
          fontWeight: 400,
        }}
      >
        Области потребностей
      </h2>

      {needResults.map((result) => (
        <div
          key={result.name}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 90px',
            gap: '16px',
            padding: '10px 0',
            borderBottom: `1px solid ${C.line}`,
          }}
        >
          <span style={{ fontSize: '13px' }}>{result.name}</span>
          <span
            style={{
              ...sans,
              fontSize: '11px',
              textAlign: 'right',
              color: C.inkSoft,
            }}
          >
            {result.average.toFixed(2)} / 4
          </span>
        </div>
      ))}

      {includeAnswers && (
        <>
          <h2
            style={{
              margin: '32px 0 12px',
              fontSize: '22px',
              fontWeight: 400,
            }}
          >
            Все ответы
          </h2>

          {QUESTIONS.map((question) => (
            <div
              key={question.id}
              style={{
                padding: '10px 0',
                borderBottom: `1px solid ${C.line}`,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: '12px',
                  lineHeight: 1.45,
                }}
              >
                {question.id}. {question.text}
              </p>

              <p
                style={{
                  ...sans,
                  margin: '4px 0 0',
                  fontSize: '10px',
                  color: C.inkSoft,
                }}
              >
                {answerLabel(answers[question.id])}
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
          Это перевод MSS-YSQ на русский язык, подготовленный Юлией Шашковой
          для исследовательской работы. В дальнейшем планируется отдельно
          проверить, как русская версия работает на большой выборке.
          Пока результат лучше использовать как ориентир, а не как готовое заключение.
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
        psyshashkova.ru/tools/schema-test
      </p>
    </div>
  );
});

MssPdf.displayName = 'MssPdf';