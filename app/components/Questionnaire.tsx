'use client';

import {
  forwardRef,
  useMemo,
  useRef,
  useState,
} from 'react';

import Link from 'next/link';

import Eyebrow from '@/app/components/Eyebrow';

import {
  C,
  radius,
  sans,
  serif,
  shadow,
} from '@/app/lib/theme';

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

export type FollowUpOption = {
  label: string;
  value: string;
};

export type QuestionnaireConfig = {
  slug: string;
  title: string;
  shortName: string;
  duration: string;

  intro: string[];

  disclaimer: string;
resultNote?: string;
source: string;

  questionPrompt: string;

  questions: string[];
  options: QuestionnaireOption[];

  bands: ScoreBand[];

  resultHeading: string;

  followUp?: {
    eyebrow?: string;
    prompt: string;
    help?: string;
    options: FollowUpOption[];
  };

  ctaHeading?: string;
  ctaText?: string;

  pdfDisclaimer?: string;

  attention?: {
    questionIndex: number;
    triggerValues: number[];
    title: string;
    text: string;
    urgentText: string;
  };
};

type Stage =
  | 'intro'
  | 'test'
  | 'followup'
  | 'result';

function formatDate() {
  return new Date().toLocaleString(
    'ru-RU',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  );
}

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

export default function Questionnaire({
  config: rawConfig,
}: {
  config: QuestionnaireConfig;
}) {
  const config = useMemo(
    () => ({
      ...rawConfig,
      questions: rawConfig.questions.map(
        stripTrailingPeriod
      ),
    }),
    [rawConfig]
  );
  const [stage, setStage] =
    useState<Stage>('intro');

  const [answers, setAnswers] =
    useState<Record<number, number>>({});

  const [current, setCurrent] =
    useState(0);

  const [transitioning, setTransitioning] =
    useState(false);

  const [
    followUpAnswer,
    setFollowUpAnswer,
  ] = useState<string | null>(null);

  const [completedAt, setCompletedAt] =
    useState('');

  const [exporting, setExporting] =
    useState(false);

  const pdfRef =
    useRef<HTMLDivElement>(null);

  const total = config.questions.length;

  const totalScore = useMemo(
    () =>
      Object.values(answers).reduce(
        (sum, value) => sum + value,
        0
      ),
    [answers]
  );

  const maxScore =
    total *
    Math.max(
      ...config.options.map(
        (option) => option.value
      )
    );

    const band =
    config.bands.find(
      (item) =>
        totalScore >= item.min &&
        totalScore <= item.max
    ) ?? config.bands[0];

  const attentionTriggered =
    Boolean(
      config.attention &&
        config.attention.triggerValues.includes(
          answers[
            config.attention.questionIndex
          ]
        )
    );

  const progress =
    total > 0
      ? (current / total) * 100
      : 0;

  function getAnswerLabel(
    questionIndex: number
  ) {
    const value =
      answers[questionIndex];

    return (
      config.options.find(
        (option) =>
          option.value === value
      )?.label ?? 'Нет ответа'
    );
  }

  function finishQuestionnaire() {
    setCompletedAt(formatDate());
    setStage('result');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function handleAnswer(value: number) {
    if (transitioning) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [current]: value,
    }));

    setTransitioning(true);

    window.setTimeout(() => {
      if (current < total - 1) {
        setCurrent(
          (previous) => previous + 1
        );

        setTransitioning(false);

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

        return;
      }

      setTransitioning(false);

      if (config.followUp) {
        setStage('followup');

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

        return;
      }

      finishQuestionnaire();
    }, 220);
  }

  function goBack() {
    if (
      transitioning ||
      current === 0
    ) {
      return;
    }

    setCurrent(
      (previous) => previous - 1
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function reset() {
    setAnswers({});
    setCurrent(0);
    setTransitioning(false);
    setFollowUpAnswer(null);
    setCompletedAt('');
    setStage('intro');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  async function exportPdf() {
    try {
      setExporting(true);

      await new Promise<void>(
        (resolve) =>
          requestAnimationFrame(() =>
            requestAnimationFrame(() =>
              resolve()
            )
          )
      );

      if ('fonts' in document) {
        await document.fonts.ready;
      }

      const node = pdfRef.current;

      if (!node) {
        throw new Error(
          'PDF report not rendered'
        );
      }

      const html2canvasModule =
        await import('html2canvas');

      const html2canvas =
        html2canvasModule.default;

      const jspdfModule =
        await import('jspdf');

      const { jsPDF } = jspdfModule;

      const canvas =
        await html2canvas(node, {
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

      const usableWidth =
        pageWidth - margin * 2;

      const usableHeight =
        pageHeight - margin * 2;

      const pxPerMm =
        canvas.width / usableWidth;

      const pageHeightPx =
        Math.floor(
          usableHeight * pxPerMm
        );

      let offsetY = 0;
      let pageIndex = 0;

      while (
        offsetY < canvas.height
      ) {
        const sliceHeight =
          Math.min(
            pageHeightPx,
            canvas.height - offsetY
          );

        const pageCanvas =
          document.createElement(
            'canvas'
          );

        pageCanvas.width =
          canvas.width;

        pageCanvas.height =
          sliceHeight;

        const context =
          pageCanvas.getContext('2d');

        if (!context) {
          throw new Error(
            'Canvas context unavailable'
          );
        }

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

        const image =
          pageCanvas.toDataURL(
            'image/png'
          );

        const sliceHeightMm =
          (sliceHeight /
            canvas.width) *
          usableWidth;

        if (pageIndex > 0) {
          pdf.addPage();
        }

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

      const date =
        new Date()
          .toISOString()
          .slice(0, 10);

      pdf.save(
        `${config.slug}-${date}.pdf`
      );
    } catch (error) {
      console.error(error);

      window.alert(
        'Не получилось создать PDF. Попробуйте еще раз.'
      );
    } finally {
      setExporting(false);
    }
  }

  return (
    <main>
      {/* INTRO */}

      {stage === 'intro' && (
        <section className="mx-auto max-w-6xl px-6 pb-12 pt-10 md:px-8 md:pt-14">
          <Link
            href="/tools"
            className="mb-5 inline-block text-[12px] underline underline-offset-4"
            style={{
              ...sans,
              color: C.inkSoft,
            }}
          >
            ← Все инструменты
          </Link>

          <Eyebrow>
            Опросник · {config.duration}
          </Eyebrow>

          <h1 className="mt-4 w-full text-[38px] font-normal leading-[1.04] tracking-[-0.025em] md:text-[48px]">
            {config.title}
          </h1>

          <div
  className="mt-5 max-w-[980px] space-y-3 text-[14px] leading-[1.7] md:text-[15px]"
            style={{
              ...sans,
              color: C.inkSoft,
            }}
          >
            {config.intro.map(
              (paragraph) => (
                <p key={paragraph}>
                  {paragraph}
                </p>
              )
            )}
          </div>

          <div className="mt-7 grid gap-3 md:grid-cols-3">
            <InfoCard
              title={`${total} вопросов`}
              text="На каждый вопрос нужно выбрать один вариант ответа."
            />

            <InfoCard
              title="Последние две недели"
              text="Отвечайте про указанный период, а не про то, как вы обычно чувствуете себя в целом."
            />

            <InfoCard
              title="Результат не является диагнозом"
              text="Баллы помогают оценить выраженность симптомов, но не определяют наличие расстройства."
            />
          </div>

          <div
            className="mt-6 px-5 py-5 md:px-6"
            style={{
              backgroundColor:
                C.surfaceWarm,
              borderRadius: radius.lg,
            }}
          >
            <p
              className="text-[13px] leading-[1.65]"
              style={{
                ...sans,
                color: C.ink,
              }}
            >
              <strong>
                Важно.
              </strong>{' '}
              {config.disclaimer}
            </p>

            <p
              className="mt-3 text-[11.5px] leading-[1.6]"
              style={{
                ...sans,
                color: C.inkSoft,
              }}
            >
              {config.source}
            </p>
          </div>

          <div className="mt-7">
            <button
              type="button"
              onClick={() =>
                setStage('test')
              }
              className="px-7 py-3 text-[13px] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                ...sans,
                backgroundColor: C.ink,
                color: C.bg,
                borderRadius:
                  radius.pill,
              }}
            >
              Начать
            </button>
          </div>
        </section>
      )}

      {/* TEST */}

      {stage === 'test' && (
        <section className="ym-hide-content ym-disable-clickmap mx-auto max-w-4xl px-6 pb-12 pt-7 md:px-8 md:pt-8">
          <div className="mb-5">
            <div className="mb-3 flex items-center justify-between gap-4">
              <p
                className="text-[12px]"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                Вопрос {current + 1} из{' '}
                {total}
              </p>

              <button
                type="button"
                onClick={() =>
                  setStage('intro')
                }
                className="text-[12px] underline underline-offset-4"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                Выйти
              </button>
            </div>

            <div
              className="h-1 overflow-hidden rounded-full"
              style={{
                backgroundColor:
                  C.surface,
              }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  backgroundColor:
                    C.terracotta,
                }}
              />
            </div>
          </div>

          <div
            style={{
              opacity: transitioning
                ? 0
                : 1,

              transform: transitioning
                ? 'translateY(6px)'
                : 'translateY(0)',

              transition:
                'opacity 0.2s ease, transform 0.2s ease',
            }}
          >
            <p
              className="text-[10px] uppercase tracking-[0.12em]"
              style={{
                ...sans,
                color: C.terracotta,
              }}
            >
              {config.questionPrompt}
            </p>

            <h1 className="mt-3 max-w-[760px] text-[26px] font-normal leading-[1.1] tracking-[-0.02em] md:text-[32px]">
              {config.questions[current]}
            </h1>

            <div className="mt-5 space-y-2">
              {config.options.map(
                (option) => {
                  const selected =
                    answers[current] ===
                    option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      disabled={
                        transitioning
                      }
                      onClick={() =>
                        handleAnswer(
                          option.value
                        )
                      }
                      className="group flex w-full items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:translate-x-1 disabled:pointer-events-none"
                      style={{
                        backgroundColor:
                          selected
                            ? C.surfaceWarm
                            : C.surface,

                        borderRadius:
                          radius.md,

                        boxShadow:
                          selected
                            ? shadow.soft
                            : 'none',
                      }}
                    >
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px]"
                        style={{
                          ...sans,

                          color: selected
                            ? C.bg
                            : C.terracotta,

                          backgroundColor:
                            selected
                              ? C.terracotta
                              : 'transparent',

                          border:
                            `1px solid ${C.terracotta}`,
                        }}
                      >
                        {option.value}
                      </span>

                      <span className="flex-1 text-[14px] leading-[1.4] md:text-[15px]">
                        {option.label}
                      </span>

                      <span
                        className="text-[14px] transition-transform duration-200 group-hover:translate-x-1"
                        style={{
                          ...sans,
                          color: C.inkSoft,
                        }}
                      >
                        →
                      </span>
                    </button>
                  );
                }
              )}
            </div>

            <div className="mt-4">
              {current > 0 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="text-[12px] underline underline-offset-4"
                  style={{
                    ...sans,
                    color: C.inkSoft,
                  }}
                >
                  ← Предыдущий вопрос
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FOLLOW UP */}

      {stage === 'followup' &&
        config.followUp && (
          <section className="ym-hide-content ym-disable-clickmap mx-auto max-w-4xl px-6 pb-12 pt-7 md:px-8 md:pt-8">
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <p
                  className="text-[12px]"
                  style={{
                    ...sans,
                    color: C.inkSoft,
                  }}
                >
                  Дополнительный вопрос
                </p>

                <span
                  className="text-[12px]"
                  style={{
                    ...sans,
                    color: C.moss,
                  }}
                >
                  не влияет на балл
                </span>
              </div>

              <div
                className="h-1 rounded-full"
                style={{
                  backgroundColor:
                    C.terracotta,
                }}
              />
            </div>

            <p
              className="text-[10px] uppercase tracking-[0.12em]"
              style={{
                ...sans,
                color: C.terracotta,
              }}
            >
              {config.followUp
                .eyebrow ??
                'Как это влияет на жизнь'}
            </p>

            <h1 className="mt-3 max-w-[780px] text-[26px] font-normal leading-[1.1] tracking-[-0.02em] md:text-[32px]">
              {config.followUp.prompt}
            </h1>

            {config.followUp.help && (
              <p
                className="mt-3 max-w-[760px] text-[13px] leading-[1.6]"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                {config.followUp.help}
              </p>
            )}

            <div className="mt-7 space-y-2.5">
              {config.followUp.options.map(
                (option) => {
                  const selected =
                    followUpAnswer ===
                    option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setFollowUpAnswer(
                          option.value
                        )
                      }
                      className="flex w-full items-center gap-4 px-5 py-4 text-left transition-all duration-200"
                      style={{
                        backgroundColor:
                          selected
                            ? C.surfaceWarm
                            : C.surface,

                        borderRadius:
                          radius.md,

                        boxShadow:
                          selected
                            ? shadow.soft
                            : 'none',
                      }}
                    >
                      <span
                        className="h-3 w-3 shrink-0 rounded-full"
                        style={{
                          backgroundColor:
                            selected
                              ? C.terracotta
                              : C.line,
                        }}
                      />

                      <span className="text-[14px] leading-[1.4] md:text-[15px]">
                        {option.label}
                      </span>
                    </button>
                  );
                }
              )}
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => {
                  setCurrent(total - 1);
                  setStage('test');
                }}
                className="text-[12px] underline underline-offset-4"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                ← Назад
              </button>

              <button
                type="button"
                disabled={
                  !followUpAnswer
                }
                onClick={
                  finishQuestionnaire
                }
                className="px-7 py-3 text-[13px] disabled:cursor-not-allowed disabled:opacity-30"
                style={{
                  ...sans,
                  backgroundColor: C.ink,
                  color: C.bg,
                  borderRadius:
                    radius.pill,
                }}
              >
                Посмотреть результат
              </button>
            </div>
          </section>
        )}

      {/* RESULT */}

      {stage === 'result' && (
        <>
          <section className="ym-hide-content ym-disable-clickmap mx-auto max-w-5xl px-6 pb-8 pt-10 md:px-8 md:pt-14">
            <Eyebrow>
              Ваш результат
            </Eyebrow>

            <h1 className="mt-4 max-w-[900px] text-[36px] font-normal leading-[1.06] tracking-[-0.02em] md:text-[44px]">
              {config.resultHeading}
            </h1>

            <div
              className="mt-7 p-6 md:p-8"
              style={{
                backgroundColor:
                  C.surface,

                borderRadius:
                  radius.lg,

                boxShadow: shadow.soft,
              }}
            >
              <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
                <span
                  className="text-[54px] leading-none md:text-[64px]"
                  style={{
                    color: band.color,
                  }}
                >
                  {totalScore}
                </span>

                <span
                  className="pb-1 text-[18px]"
                  style={{
                    color: C.inkSoft,
                  }}
                >
                  из {maxScore}
                </span>
              </div>

              <h2
                className="mt-5 text-[22px] leading-[1.2]"
                style={{
                  color: band.color,
                }}
              >
                {band.label}
              </h2>

              <div
                className="mt-4 h-2 overflow-hidden rounded-full"
                style={{
                  backgroundColor: C.bg,
                }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width:
                      maxScore > 0
                        ? `${
                            (totalScore /
                              maxScore) *
                            100
                          }%`
                        : '0%',

                    backgroundColor:
                      band.color,
                  }}
                />
              </div>

              <p
                className="mt-5 text-[14px] leading-[1.65]"
                style={{
                  ...sans,
                  color: C.ink,
                }}
              >
                {band.description}
              </p>

              <p
                className="mt-3 text-[13px] leading-[1.65]"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                {band.recommendation}
              </p>
            </div>

            {config.followUp &&
              followUpAnswer && (
                <div
                  className="mt-4 px-5 py-5"
                  style={{
                    backgroundColor:
                      C.surfaceWarm,

                    borderRadius:
                      radius.lg,
                  }}
                >
                  <p
                    className="text-[10px] uppercase tracking-[0.1em]"
                    style={{
                      ...sans,
                      color: C.terracotta,
                    }}
                  >
                    Влияние на повседневную
                    жизнь
                  </p>

                  <p className="mt-2 text-[16px]">
                    {config.followUp.options.find(
                      (option) =>
                        option.value ===
                        followUpAnswer
                    )?.label ??
                      followUpAnswer}
                  </p>

                  <p
                    className="mt-2 text-[11.5px] leading-[1.55]"
                    style={{
                      ...sans,
                      color: C.inkSoft,
                    }}
                  >
                    Этот ответ не входит в
                    итоговый балл, но помогает
                    лучше понять значение
                    результата именно для вас.
                  </p>
                </div>
              )}

                        <div
              className="mt-4 px-5 py-5"
              style={{
                backgroundColor:
                  C.surfaceWarm,

                borderRadius:
                  radius.lg,
              }}
            >
              <h2 className="text-[19px] leading-[1.2]">
                Как читать этот результат
              </h2>

              <p
                className="mt-2 text-[13px] leading-[1.65]"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                {config.resultNote ?? config.disclaimer}
              </p>
            </div>

            {attentionTriggered &&
              config.attention && (
                <div
                  className="mt-4 px-5 py-5"
                  style={{
                    backgroundColor:
                      'rgba(150, 59, 89, 0.08)',

                    borderRadius:
                      radius.lg,
                  }}
                >
                  <p
                    className="text-[10px] uppercase tracking-[0.1em]"
                    style={{
                      ...sans,
                      color: C.berry,
                    }}
                  >
                    Отдельно об одном из
                    ответов
                  </p>

                  <h2 className="mt-2 text-[19px] leading-[1.25]">
                    {
                      config.attention
                        .title
                    }
                  </h2>

                  <p
                    className="mt-2 text-[13px] leading-[1.65]"
                    style={{
                      ...sans,
                      color: C.inkSoft,
                    }}
                  >
                    {
                      config.attention
                        .text
                    }
                  </p>

                  <div
                    className="mt-4 px-4 py-4"
                    style={{
                      backgroundColor:
                        C.bg,

                      borderRadius:
                        radius.md,
                    }}
                  >
                    <p
                      className="text-[12.5px] leading-[1.65]"
                      style={{
                        ...sans,
                        color: C.ink,
                      }}
                    >
                      {
                        config.attention
                          .urgentText
                      }
                    </p>
                  </div>
                </div>
              )}
          </section>

          {/* ANSWERS */}

          <section className="ym-hide-content ym-disable-clickmap mx-auto max-w-5xl px-6 py-7 md:px-8 md:py-9">
            <div className="grid gap-y-3 md:grid-cols-[0.72fr_1.28fr] md:gap-x-10">
              <div>
                <Eyebrow>
                  Ваши ответы
                </Eyebrow>
              </div>

              <div className="hidden md:block" />

              <h2 className="text-[28px] leading-[1.08] md:text-[34px]">
                Из чего сложился результат
              </h2>

              <p
                className="text-[13px] leading-[1.65]"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                Итоговый балл — это сумма
                семи ответов. Ни один
                отдельный пункт сам по себе
                ничего не диагностирует.
              </p>
            </div>

            <div className="mt-5 space-y-2">
              {config.questions.map(
                (
                  question,
                  index
                ) => (
                  <div
                    key={question}
                    className="grid gap-2 px-4 py-4 md:grid-cols-[1fr_220px] md:items-center md:gap-6"
                    style={{
                      backgroundColor:
                        C.surface,

                      borderRadius:
                        radius.md,
                    }}
                  >
                    <div className="flex gap-3">
                      <span
                        className="shrink-0 text-[11px]"
                        style={{
                          ...sans,
                          color:
                            C.terracotta,
                        }}
                      >
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          '0'
                        )}
                      </span>

                      <p className="text-[13.5px] leading-[1.5]">
                        {question}
                      </p>
                    </div>

                    <p
                      className="text-[12px] md:text-right"
                      style={{
                        ...sans,
                        color:
                          C.inkSoft,
                      }}
                    >
                      {getAnswerLabel(
                        index
                      )}
                    </p>
                  </div>
                )
              )}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
  <button
    type="button"
    disabled={exporting}
    onClick={exportPdf}
    className="px-6 py-3 text-[13px] disabled:opacity-50"
    style={{
      ...sans,
      backgroundColor: C.ink,
      color: C.bg,
      borderRadius: radius.pill,
    }}
  >
    {exporting
      ? 'Создаю PDF...'
      : 'Скачать PDF'}
  </button>

  <button
    type="button"
    onClick={reset}
    className="px-6 py-3 text-[13px]"
    style={{
      ...sans,
      backgroundColor: C.surface,
      color: C.ink,
      borderRadius: radius.pill,
    }}
  >
    Пройти еще раз
  </button>

  <Link
    href="/tools"
    className="px-4 py-3 text-[12px] underline underline-offset-4 transition-opacity hover:opacity-60"
    style={{
      ...sans,
      color: C.inkSoft,
    }}
  >
    ← Все инструменты
  </Link>
</div>
          </section>

          {/* RANGES */}

          <section className="mx-auto max-w-5xl px-6 py-7 md:px-8 md:py-9">
            <Eyebrow>
              Диапазоны шкалы
            </Eyebrow>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {config.bands.map(
                (item) => {
                  const active =
                    totalScore >=
                      item.min &&
                    totalScore <=
                      item.max;

                  return (
                    <div
                      key={item.label}
                      className="px-4 py-4"
                      style={{
                        backgroundColor:
                          active
                            ? C.surfaceWarm
                            : C.surface,

                        borderRadius:
                          radius.md,
                      }}
                    >
                      <p
                        className="text-[11px]"
                        style={{
                          ...sans,
                          color:
                            item.color,
                        }}
                      >
                        {item.min}–
                        {item.max}
                      </p>

                      <p className="mt-2 text-[14px] leading-[1.35]">
                        {item.label}
                      </p>
                    </div>
                  );
                }
              )}
            </div>
          </section>

          {/* CTA */}

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
                  Если хочется разобраться
                  глубже
                </Eyebrow>

                <h2 className="mt-3 max-w-3xl text-[28px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[34px]">
                  {config.ctaHeading ??
                    'Цифра показывает только часть картины'}
                </h2>

                <p
                  className="mt-3 max-w-3xl text-[13px] leading-[1.6] md:text-[14px]"
                  style={{
                    ...sans,
                    color: '#C9C2B5',
                  }}
                >
                  {config.ctaText ??
                    'Если результат оказался для вас важным, его можно использовать как начало разговора о том, что происходит и что это поддерживает.'}
                </p>
              </div>

              <Link
                href="/book"
                className="inline-flex justify-center px-7 py-3 text-[13px] font-medium transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  ...sans,
                  backgroundColor: C.bg,
                  color: C.ink,
                  borderRadius:
                    radius.pill,
                }}
              >
                Оставить заявку
              </Link>
            </div>
          </section>

          <QuestionnairePdf
            ref={pdfRef}
            config={config}
            totalScore={totalScore}
            maxScore={maxScore}
            band={band}
            answers={answers}
            followUpAnswer={
              followUpAnswer
            }
            completedAt={
              completedAt ||
              formatDate()
            }
          />
        </>
      )}
    </main>
  );
}

/* =========================================
   PDF
========================================= */

const QuestionnairePdf = forwardRef<
  HTMLDivElement,
  {
    config: QuestionnaireConfig;
    totalScore: number;
    maxScore: number;
    band: ScoreBand;
    answers: Record<number, number>;
    followUpAnswer: string | null;
    completedAt: string;
  }
>(function QuestionnairePdf(
  {
    config,
    totalScore,
    maxScore,
    band,
    answers,
    followUpAnswer,
    completedAt,
  },
  ref
) {
  function getAnswer(
    questionIndex: number
  ) {
    const value =
      answers[questionIndex];

    return (
      config.options.find(
        (option) =>
          option.value === value
      )?.label ?? 'Нет ответа'
    );
  }

  const followUpLabel =
    config.followUp &&
    followUpAnswer
      ? config.followUp.options.find(
          (option) =>
            option.value ===
            followUpAnswer
        )?.label
      : null;
        const attentionTriggered =
    Boolean(
      config.attention &&
        config.attention.triggerValues.includes(
          answers[
            config.attention.questionIndex
          ]
        )
    );

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
        Юлия Шашкова · психологические
        инструменты
      </p>

      <h1
        style={{
          margin: '16px 0 6px',
          fontSize: '36px',
          lineHeight: 1.08,
          fontWeight: 400,
        }}
      >
        {config.title}
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
          backgroundColor: C.surface,
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
          Результат
        </p>

        <p
          style={{
            margin: '8px 0 0',
            fontSize: '38px',
            lineHeight: 1,
            color: band.color,
          }}
        >
          {totalScore}{' '}
          <span
            style={{
              fontSize: '17px',
              color: C.inkSoft,
            }}
          >
            из {maxScore}
          </span>
        </p>

        <p
          style={{
            margin: '14px 0 0',
            fontSize: '18px',
            color: band.color,
          }}
        >
          {band.label}
        </p>

        <p
          style={{
            ...sans,
            margin: '12px 0 0',
            fontSize: '12px',
            lineHeight: 1.55,
            color: C.ink,
          }}
        >
          {band.description}
        </p>
      </div>

            {followUpLabel && (
        <PdfField
          label="Влияние на повседневную жизнь"
          value={followUpLabel}
        />
      )}

      {attentionTriggered &&
        config.attention && (
          <PdfField
            label="Отдельно об одном из ответов"
            value={`${config.attention.text} ${config.attention.urgentText}`}
          />
        )}

      <div
        style={{
          marginTop: '26px',
        }}
      >
        {config.questions.map(
          (question, index) => (
            <PdfQuestion
              key={question}
              number={index + 1}
              question={question}
              answer={getAnswer(index)}
            />
          )
        )}
      </div>

      <p
        style={{
          ...sans,
          margin: '24px 0 0',
          fontSize: '10px',
          lineHeight: 1.55,
          color: C.inkSoft,
        }}
      >
        {config.pdfDisclaimer ??
          config.disclaimer}
      </p>

      <p
        style={{
          ...sans,
          margin: '8px 0 0',
          fontSize: '10px',
          color: C.inkSoft,
        }}
      >
        psyshashkova.ru/tools/
        {config.slug}
      </p>
    </div>
  );
});

QuestionnairePdf.displayName =
  'QuestionnairePdf';

function PdfQuestion({
  number,
  question,
  answer,
}: {
  number: number;
  question: string;
  answer: string;
}) {
  return (
    <div
      style={{
        padding: '13px 0',
        borderBottom:
          `1px solid ${C.line}`,
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: '14px',
          lineHeight: 1.45,
        }}
      >
        {number}. {question}
      </p>

      <p
        style={{
          ...sans,
          margin: '5px 0 0',
          fontSize: '11px',
          color: C.inkSoft,
        }}
      >
        {answer}
      </p>
    </div>
  );
}

function PdfField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        marginTop: '20px',
        padding: '16px 18px',
        backgroundColor:
          C.surfaceWarm,
        borderRadius: '16px',
      }}
    >
      <p
        style={{
          ...sans,
          margin: 0,
          fontSize: '9px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: C.terracotta,
        }}
      >
        {label}
      </p>

      <p
        style={{
          margin: '6px 0 0',
          fontSize: '14px',
        }}
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================
   SMALL UI
========================================= */

function InfoCard({
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
      <h2 className="text-[15px] leading-[1.3]">
        {title}
      </h2>

      <p
        className="mt-2 text-[11.5px] leading-[1.55]"
        style={{
          ...sans,
          color: C.inkSoft,
        }}
      >
        {text}
      </p>
    </div>
  );
}