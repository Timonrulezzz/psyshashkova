'use client';

import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import Link from 'next/link';

import Eyebrow from '@/app/components/Eyebrow';
import Reveal from '@/app/components/Reveal';

import {
  C,
  radius,
  sans,
  serif,
  shadow,
} from '@/app/lib/theme';

type Entry = {
  id: string;
  date: string;

  situation: string;
  automaticThought: string;

  emotion: string;
  intensity: number;

  behavior: string;
  urge: string;

  evidenceFor: string;
  evidenceAgainst: string;

  balancedThought: string;
  newIntensity: number;

  takeaway: string;
};

type Draft = Omit<Entry, 'id' | 'date'>;

type Mode =
  | 'intro'
  | 'fill'
  | 'result'
  | 'history';

const STORAGE_KEY = 'thought-diary-entries';
const DRAFT_KEY = 'thought-diary-draft';

const TOTAL_STEPS = 8;

const emptyDraft: Draft = {
  situation: '',
  automaticThought: '',

  emotion: '',
  intensity: 5,

  behavior: '',
  urge: '',

  evidenceFor: '',
  evidenceAgainst: '',

  balancedThought: '',
  newIntensity: 5,

  takeaway: '',
};

function formatDate(date: Date) {
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function hasMeaningfulDraft(
  draft: Draft,
  step: number
) {
  return (
    step > 0 ||
    draft.situation.trim() !== '' ||
    draft.automaticThought.trim() !== '' ||
    draft.emotion.trim() !== '' ||
    draft.behavior.trim() !== '' ||
    draft.urge.trim() !== '' ||
    draft.evidenceFor.trim() !== '' ||
    draft.evidenceAgainst.trim() !== '' ||
    draft.balancedThought.trim() !== '' ||
    draft.takeaway.trim() !== ''
  );
}

function normalizeEntry(raw: any): Entry {
  return {
    id:
      typeof raw?.id === 'string'
        ? raw.id
        : String(Date.now()),

    date:
      typeof raw?.date === 'string'
        ? raw.date
        : formatDate(new Date()),

    situation:
      typeof raw?.situation === 'string'
        ? raw.situation
        : '',

    automaticThought:
      typeof raw?.automaticThought === 'string'
        ? raw.automaticThought
        : typeof raw?.thought === 'string'
          ? raw.thought
          : '',

    emotion:
      typeof raw?.emotion === 'string'
        ? raw.emotion
        : '',

    intensity: clampIntensity(raw?.intensity),

    behavior:
      typeof raw?.behavior === 'string'
        ? raw.behavior
        : '',

    urge:
      typeof raw?.urge === 'string'
        ? raw.urge
        : '',

    evidenceFor:
      typeof raw?.evidenceFor === 'string'
        ? raw.evidenceFor
        : '',

    evidenceAgainst:
      typeof raw?.evidenceAgainst === 'string'
        ? raw.evidenceAgainst
        : '',

    balancedThought:
      typeof raw?.balancedThought === 'string'
        ? raw.balancedThought
        : typeof raw?.alternative === 'string'
          ? raw.alternative
          : '',

    newIntensity: clampIntensity(
      raw?.newIntensity
    ),

    takeaway:
      typeof raw?.takeaway === 'string'
        ? raw.takeaway
        : '',
  };
}

function clampIntensity(value: unknown) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 5;
  }

  return Math.min(
    10,
    Math.max(0, Math.round(number))
  );
}

export default function ThoughtDiaryClient() {
  const [entries, setEntries] = useState<Entry[]>(
    []
  );

  const [current, setCurrent] =
    useState<Draft>(emptyDraft);

  const [step, setStep] = useState(0);

  const [mode, setMode] =
    useState<Mode>('intro');

  const [loaded, setLoaded] = useState(false);

  const [draftExists, setDraftExists] =
    useState(false);

  const [resultSavedId, setResultSavedId] =
    useState<string | null>(null);

  const [expandedId, setExpandedId] =
    useState<string | null>(null);

  const [pdfEntry, setPdfEntry] =
    useState<Entry | null>(null);

  const [exporting, setExporting] =
    useState(false);

  const pdfRef = useRef<HTMLDivElement>(null);

  /*
   * LOAD LOCAL DATA
   */

  useEffect(() => {
    try {
      const saved = localStorage.getItem(
        STORAGE_KEY
      );

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setEntries(
            parsed.map(normalizeEntry)
          );
        }
      }
    } catch {}

    try {
      const savedDraft =
        localStorage.getItem(DRAFT_KEY);

      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);

        const restoredDraft: Draft = {
          ...emptyDraft,
          ...(parsed?.current ?? {}),
        };

        const restoredStep =
          typeof parsed?.step === 'number'
            ? Math.min(
                TOTAL_STEPS - 1,
                Math.max(0, parsed.step)
              )
            : 0;

        setCurrent(restoredDraft);
        setStep(restoredStep);

        if (
          hasMeaningfulDraft(
            restoredDraft,
            restoredStep
          )
        ) {
          setDraftExists(true);
        }
      }
    } catch {}

    setLoaded(true);
  }, []);

  /*
   * SAVE HISTORY
   */

  useEffect(() => {
    if (!loaded) {
      return;
    }

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(entries)
      );
    } catch {}
  }, [entries, loaded]);

  /*
   * SAVE DRAFT
   */

  useEffect(() => {
    if (!loaded) {
      return;
    }

    if (
      mode !== 'fill' &&
      mode !== 'result'
    ) {
      return;
    }

    if (resultSavedId) {
      return;
    }

    const meaningful =
      hasMeaningfulDraft(current, step);

    if (!meaningful) {
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {}

      setDraftExists(false);
      return;
    }

    try {
      localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({
          current,
          step,
        })
      );

      setDraftExists(true);
    } catch {}
  }, [
    current,
    step,
    mode,
    loaded,
    resultSavedId,
  ]);

  const progress =
    ((step + 1) / TOTAL_STEPS) * 100;

  const savedResult = useMemo(() => {
    if (!resultSavedId) {
      return null;
    }

    return (
      entries.find(
        (entry) =>
          entry.id === resultSavedId
      ) ?? null
    );
  }, [entries, resultSavedId]);

  const resultEntry: Entry = {
    id: resultSavedId ?? 'preview',
    date:
      savedResult?.date ??
      formatDate(new Date()),
    ...current,
  };

  function updateCurrent(
    patch: Partial<Draft>
  ) {
    setCurrent((previous) => ({
      ...previous,
      ...patch,
    }));
  }

  function canContinue() {
    switch (step) {
      case 0:
        return (
          current.situation.trim().length > 0
        );

      case 1:
        return (
          current.automaticThought.trim()
            .length > 0
        );

      case 2:
        return (
          current.emotion.trim().length > 0
        );

      case 3:
        return true;

      case 4:
        return (
          current.behavior.trim().length > 0
        );

      case 5:
        return (
          current.evidenceFor.trim().length >
            0 ||
          current.evidenceAgainst.trim()
            .length > 0
        );

      case 6:
        return (
          current.balancedThought.trim()
            .length > 0
        );

      case 7:
        return true;

      default:
        return false;
    }
  }

  function handleNext() {
    if (!canContinue()) {
      return;
    }

    if (step < TOTAL_STEPS - 1) {
      setStep((previous) => previous + 1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      return;
    }

    setMode('result');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function handleBack() {
    if (step === 0) {
      return;
    }

    setStep((previous) => previous - 1);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function startFresh() {
    setCurrent(emptyDraft);
    setStep(0);
    setResultSavedId(null);

    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {}

    setDraftExists(false);
    setMode('fill');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function discardDraft() {
    const confirmed = window.confirm(
      'Удалить незавершенную запись? Введенные ответы восстановить не получится.'
    );

    if (!confirmed) {
      return;
    }

    setCurrent(emptyDraft);
    setStep(0);

    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {}

    setDraftExists(false);
  }

  function handleSaveResult() {
    if (resultSavedId) {
      return;
    }

    const entry: Entry = {
      id: Date.now().toString(),
      date: formatDate(new Date()),
      ...current,
    };

    setEntries((previous) => [
      entry,
      ...previous,
    ]);

    setResultSavedId(entry.id);
    setDraftExists(false);

    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {}
  }

  function handleTakeawayChange(
    value: string
  ) {
    updateCurrent({
      takeaway: value,
    });

    if (resultSavedId) {
      setEntries((previous) =>
        previous.map((entry) =>
          entry.id === resultSavedId
            ? {
                ...entry,
                takeaway: value,
              }
            : entry
        )
      );
    }
  }

  function handleNewAfterResult() {
    if (!resultSavedId) {
      const confirmed = window.confirm(
        'Начать новый разбор без сохранения этой записи?'
      );

      if (!confirmed) {
        return;
      }
    }

    startFresh();
  }

  function deleteEntry(id: string) {
    const confirmed = window.confirm(
      'Удалить эту запись?'
    );

    if (!confirmed) {
      return;
    }

    setEntries((previous) =>
      previous.filter(
        (entry) => entry.id !== id
      )
    );

    if (expandedId === id) {
      setExpandedId(null);
    }
  }

  function clearAllEntries() {
    const confirmed = window.confirm(
      'Удалить все сохраненные записи? Это действие нельзя отменить.'
    );

    if (!confirmed) {
      return;
    }

    setEntries([]);
    setExpandedId(null);
  }

  async function exportPdf(entry: Entry) {
    try {
      setExporting(true);
      setPdfEntry(entry);

      await new Promise<void>((resolve) =>
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
          'PDF node was not rendered'
        );
      }

      const html2canvasModule =
        await import('html2canvas');

      const html2canvas =
        html2canvasModule.default;

      const jspdfModule =
        await import('jspdf');

      const { jsPDF } = jspdfModule;

      const canvas = await html2canvas(
        node,
        {
          scale: 2,
          backgroundColor: C.bg,
          logging: false,
          useCORS: true,
        }
      );

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

      while (offsetY < canvas.height) {
        const sliceHeight = Math.min(
          pageHeightPx,
          canvas.height - offsetY
        );

        const pageCanvas =
          document.createElement('canvas');

        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;

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
          (sliceHeight / canvas.width) *
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

      const fileDate = new Date()
        .toISOString()
        .slice(0, 10);

      pdf.save(
        `dnevnik-mysley-${fileDate}.pdf`
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
      {mode === 'intro' && (
        <Intro
          entriesCount={entries.length}
          draftExists={draftExists}
          onStart={startFresh}
          onContinue={() =>
            setMode('fill')
          }
          onDiscardDraft={discardDraft}
          onHistory={() =>
            setMode('history')
          }
        />
      )}

      {mode === 'fill' && (
        <FillMode
          step={step}
          progress={progress}
          current={current}
          updateCurrent={updateCurrent}
          canContinue={canContinue()}
          onNext={handleNext}
          onBack={handleBack}
          onExit={() =>
            setMode('intro')
          }
        />
      )}

      {mode === 'result' && (
        <ResultMode
          entry={resultEntry}
          saved={Boolean(resultSavedId)}
          exporting={exporting}
          onTakeawayChange={
            handleTakeawayChange
          }
          onSave={handleSaveResult}
          onPdf={() =>
            exportPdf(resultEntry)
          }
          onNew={handleNewAfterResult}
          onHistory={() =>
            setMode('history')
          }
        />
      )}

      {mode === 'history' && (
        <HistoryMode
          entries={entries}
          expandedId={expandedId}
          exporting={exporting}
          onToggle={(id) =>
            setExpandedId((currentId) =>
              currentId === id
                ? null
                : id
            )
          }
          onPdf={exportPdf}
          onDelete={deleteEntry}
          onClearAll={clearAllEntries}
          onNew={startFresh}
          onBack={() =>
            setMode('intro')
          }
        />
      )}

      {pdfEntry && (
        <PdfReport
          ref={pdfRef}
          entry={pdfEntry}
        />
      )}
    </main>
  );
}

/* =========================================
   INTRO
========================================= */

function Intro({
  entriesCount,
  draftExists,
  onStart,
  onContinue,
  onDiscardDraft,
  onHistory,
}: {
  entriesCount: number;
  draftExists: boolean;
  onStart: () => void;
  onContinue: () => void;
  onDiscardDraft: () => void;
  onHistory: () => void;
}) {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-10 md:px-8 md:pb-10 md:pt-14">
        <Reveal>
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
            Дневник · по ситуации
          </Eyebrow>

          <h1 className="mt-4 max-w-[800px] text-[38px] font-normal leading-[1.04] tracking-[-0.025em] md:text-[48px]">
            Дневник мыслей
          </h1>

          <p
            className="mt-5 max-w-[850px] text-[15px] leading-[1.7] md:text-[16px]"
            style={{
              ...sans,
              color: C.inkSoft,
            }}
          >
            Когда реакция на ситуацию
            оказывается сильной, полезно
            отделить то, что произошло, от
            того, что мы успели про это
            подумать. Этот дневник помогает
            последовательно разобрать
            ситуацию, проверить
            автоматическую мысль и
            сформулировать более точный
            взгляд на происходящее.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div
            className="mt-7 grid gap-3 md:grid-cols-3"
          >
            <InfoCard
              title="Не нужно убеждать себя, что все хорошо"
              text="Задача не в позитивной мысли, а в том, чтобы посмотреть на исходный вывод внимательнее и учесть больше фактов."
            />

            <InfoCard
              title="8 коротких шагов"
              text="Ситуация, мысль, эмоция, реакция, проверка мысли и повторная оценка того, что вы чувствуете."
            />

            <InfoCard
              title="Записи остаются в этом браузере"
              text="Их можно хранить в истории или сохранить отдельный разбор в PDF."
            />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-7 flex flex-wrap gap-3">
            {draftExists ? (
              <>
                <button
                  type="button"
                  onClick={onContinue}
                  className="px-7 py-3 text-[13px] transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    ...sans,
                    backgroundColor: C.ink,
                    color: C.bg,
                    borderRadius:
                      radius.pill,
                  }}
                >
                  Продолжить черновик
                </button>

                <button
                  type="button"
                  onClick={onDiscardDraft}
                  className="px-6 py-3 text-[13px]"
                  style={{
                    ...sans,
                    color: C.inkSoft,
                    border:
                      `1px solid ${C.line}`,
                    borderRadius:
                      radius.pill,
                  }}
                >
                  Удалить черновик
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onStart}
                className="px-7 py-3 text-[13px] transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  ...sans,
                  backgroundColor: C.ink,
                  color: C.bg,
                  borderRadius:
                    radius.pill,
                }}
              >
                Начать разбор
              </button>
            )}

            {entriesCount > 0 && (
              <button
                type="button"
                onClick={onHistory}
                className="px-6 py-3 text-[13px]"
                style={{
                  ...sans,
                  color: C.ink,
                  backgroundColor:
                    C.surface,
                  borderRadius:
                    radius.pill,
                }}
              >
                Мои записи ({entriesCount})
              </button>
            )}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-7 md:px-8 md:py-9">
        <Reveal>
          <div
            className="px-6 py-6 md:px-8"
            style={{
              backgroundColor:
                C.surfaceWarm,
              borderRadius: radius.lg,
            }}
          >
            <div className="grid gap-5 md:grid-cols-[0.7fr_1.3fr] md:gap-10">
              <div>
                <Eyebrow>
                  Перед началом
                </Eyebrow>

                <h2 className="mt-3 text-[28px] leading-[1.08] md:text-[34px]">
                  Что происходит с вашими
                  записями
                </h2>
              </div>

              <div
                className="space-y-3 text-[13px] leading-[1.65] md:text-[14px]"
                style={{
                  ...sans,
                  color: C.ink,
                }}
              >
                <p>
                  Записи сохраняются в
                  локальном хранилище
                  браузера на этом
                  устройстве. На другом
                  устройстве или в другом
                  браузере они
                  автоматически не
                  появятся.
                </p>

                
                <p>
                  Если этим устройством
                  пользуется кто-то еще,
                  учитывайте, что человек
                  с доступом к этому же
                  браузеру сможет открыть
                  сохраненную историю.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* =========================================
   FILL
========================================= */

function FillMode({
  step,
  progress,
  current,
  updateCurrent,
  canContinue,
  onNext,
  onBack,
  onExit,
}: {
  step: number;
  progress: number;
  current: Draft;
  updateCurrent: (
    patch: Partial<Draft>
  ) => void;
  canContinue: boolean;
  onNext: () => void;
  onBack: () => void;
  onExit: () => void;
}) {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-20 pt-10 md:px-8 md:pt-14">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between gap-4">
          <p
            className="text-[12px]"
            style={{
              ...sans,
              color: C.inkSoft,
            }}
          >
            Шаг {step + 1} из{' '}
            {TOTAL_STEPS}
          </p>

          <button
            type="button"
            onClick={onExit}
            className="text-[12px] underline underline-offset-4"
            style={{
              ...sans,
              color: C.inkSoft,
            }}
          >
            Сохранить и выйти
          </button>
        </div>

        <div
          className="h-1 overflow-hidden rounded-full"
          style={{
            backgroundColor: C.surface,
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
        className="px-5 py-6 md:px-7 md:py-7"
        style={{
          backgroundColor:
            'rgba(237, 229, 214, 0.58)',
          borderRadius: radius.lg,
        }}
      >
        <StepContent
          step={step}
          current={current}
          updateCurrent={updateCurrent}
        />
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        {step > 0 ? (
          <button
            type="button"
            onClick={onBack}
            className="text-[12px] underline underline-offset-4"
            style={{
              ...sans,
              color: C.inkSoft,
            }}
          >
            ← Назад
          </button>
        ) : (
          <div />
        )}

        <button
          type="button"
          disabled={!canContinue}
          onClick={onNext}
          className="px-7 py-3 text-[13px] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30"
          style={{
            ...sans,
            backgroundColor: C.ink,
            color: C.bg,
            borderRadius: radius.pill,
          }}
        >
          {step === TOTAL_STEPS - 1
            ? 'Посмотреть разбор'
            : 'Дальше →'}
        </button>
      </div>
    </section>
  );
}

function StepContent({
  step,
  current,
  updateCurrent,
}: {
  step: number;
  current: Draft;
  updateCurrent: (
    patch: Partial<Draft>
  ) => void;
}) {
  if (step === 0) {
    return (
      <StepText
        eyebrow="Ситуация"
        title="Что произошло?"
        help="Опишите конкретный эпизод: где вы были, что произошло, кто что сказал или сделал. Только то, что можно было бы увидеть или услышать со стороны."
        example="Например: я уронила чашку на кухне, когда была дома одна."
      >
        <PrivateTextarea
          value={current.situation}
          onChange={(value) =>
            updateCurrent({
              situation: value,
            })
          }
          placeholder="Опишите ситуацию..."
        />
      </StepText>
    );
  }

  if (step === 1) {
    return (
      <StepText
        eyebrow="Автоматическая мысль"
        title="Что вы в этот момент подумали?"
        help="Это может быть короткая фраза, вывод о себе или другом человеке, прогноз или даже образ, который возник почти мгновенно."
        example="Например: я растяпа, со мной всегда так."
      >
        <PrivateTextarea
          value={
            current.automaticThought
          }
          onChange={(value) =>
            updateCurrent({
              automaticThought: value,
            })
          }
          placeholder="Запишите мысль так, как она прозвучала в голове..."
        />
      </StepText>
    );
  }

  if (step === 2) {
    return (
      <StepText
        eyebrow="Эмоция"
        title="Какая эмоция была самой сильной?"
        help="Выберите одну главную эмоцию, чтобы дальше было понятно, интенсивность чего именно мы оцениваем."
        example="Например: стыд."
      >
        <PrivateTextarea
          value={current.emotion}
          onChange={(value) =>
            updateCurrent({
              emotion: value,
            })
          }
          placeholder="Например: тревога, стыд, злость, грусть..."
          minHeight={110}
        />
      </StepText>
    );
  }

  if (step === 3) {
    return (
      <StepText
        eyebrow="Интенсивность"
        title={`Насколько сильно чувствовалась эмоция «${current.emotion}»?`}
        help="Оцените именно тот момент, который вы разбираете."
      >
        <IntensitySlider
          value={current.intensity}
          onChange={(value) =>
            updateCurrent({
              intensity: value,
            })
          }
        />
      </StepText>
    );
  }

  if (step === 4) {
    return (
      <StepText
        eyebrow="Реакция"
        title="Что вы сделали после этого?"
        help="Отдельно можно записать то, что вы действительно сделали, и импульс, который возник, даже если вы ему не последовали."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <PrivateTextarea
            label="Что сделали"
            value={current.behavior}
            onChange={(value) =>
              updateCurrent({
                behavior: value,
              })
            }
            placeholder="Например: быстро убрала осколки и продолжила ругать себя."
            minHeight={150}
          />

          <PrivateTextarea
            label="Что хотелось сделать"
            value={current.urge}
            onChange={(value) =>
              updateCurrent({
                urge: value,
              })
            }
            placeholder="Например: спрятаться, уйти, позвонить кому-то."
            minHeight={150}
          />
        </div>
      </StepText>
    );
  }

  if (step === 5) {
    return (
      <StepText
        eyebrow="Проверка мысли"
        title="Посмотрим на мысль чуть внимательнее"
        help={`Не нужно доказывать себе, что мысль «${current.automaticThought}» неправильная. Задача — проверить, насколько полно она описывает ситуацию.`}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <PrivateTextarea
            label="Что говорит в пользу этой мысли?"
            value={current.evidenceFor}
            onChange={(value) =>
              updateCurrent({
                evidenceFor: value,
              })
            }
            placeholder="Какие факты делают эту мысль убедительной?"
            minHeight={175}
          />

          <PrivateTextarea
            label="Что в нее не помещается?"
            value={
              current.evidenceAgainst
            }
            onChange={(value) =>
              updateCurrent({
                evidenceAgainst: value,
              })
            }
            placeholder="Какие факты она не учитывает? Есть ли другие объяснения?"
            minHeight={175}
          />
        </div>
      </StepText>
    );
  }

  if (step === 6) {
    return (
      <StepText
        eyebrow="Более точная мысль"
        title="Как теперь можно сформулировать эту мысль?"
        help="Не обязательно делать ее позитивной или успокаивающей. Попробуйте просто учесть больше фактов и убрать то, для чего у вас нет оснований."
        example="Например: я уронила чашку. Это неприятно, но один такой эпизод не доказывает, что я растяпа."
      >
        <PrivateTextarea
          value={
            current.balancedThought
          }
          onChange={(value) =>
            updateCurrent({
              balancedThought: value,
            })
          }
          placeholder="Сформулируйте более точную мысль..."
        />

        <p
          className="mt-3 text-[11.5px] leading-[1.55]"
          style={{
            ...sans,
            color: C.inkSoft,
          }}
        >
          Иногда после проверки исходная
          мысль почти не меняется. Это тоже
          результат.
        </p>
      </StepText>
    );
  }

  return (
    <StepText
      eyebrow="Эмоция сейчас"
      title={`Если держать в уме более точную мысль, насколько сильна эмоция «${current.emotion}» сейчас?`}
      help="Здесь нет правильного результата. Эмоция может стать слабее, остаться такой же или даже усилиться."
    >
      <IntensitySlider
        value={current.newIntensity}
        onChange={(value) =>
          updateCurrent({
            newIntensity: value,
          })
        }
      />
    </StepText>
  );
}

function StepText({
  eyebrow,
  title,
  help,
  example,
  children,
}: {
  eyebrow: string;
  title: string;
  help: string;
  example?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <p
        className="text-[10px] uppercase tracking-[0.12em]"
        style={{
          ...sans,
          color: C.terracotta,
        }}
      >
        {eyebrow}
      </p>

      <h1 className="mt-3 max-w-[760px] text-[28px] font-normal leading-[1.12] tracking-[-0.02em] md:text-[36px]">
        {title}
      </h1>

      <p
        className="mt-3 max-w-[760px] text-[13px] leading-[1.62] md:text-[14px]"
        style={{
          ...sans,
          color: C.inkSoft,
        }}
      >
        {help}
      </p>

      {example && (
        <p
          className="mt-2 max-w-[760px] text-[11.5px] leading-[1.55]"
          style={{
            ...sans,
            color: C.inkSoft,
          }}
        >
          {example}
        </p>
      )}

      <div className="mt-6">
        {children}
      </div>
    </>
  );
}

function PrivateTextarea({
  value,
  onChange,
  placeholder,
  label,
  minHeight = 150,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label?: string;
  minHeight?: number;
}) {
  return (
    <label className="block">
      {label && (
        <span
          className="mb-2 block text-[11px] font-medium"
          style={{
            ...sans,
            color: C.ink,
          }}
        >
          {label}
        </span>
      )}

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="ym-disable-keys w-full resize-none border-0 px-4 py-4 text-[14px] leading-[1.6] outline-none"
        style={{
          ...sans,
          minHeight,
          backgroundColor: C.bg,
          color: C.ink,
          borderRadius: radius.md,
          boxShadow:
            'inset 0 0 0 1px rgba(31,27,22,0.05)',
        }}
      />
    </label>
  );
}

function IntensitySlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div
      className="px-5 py-5"
      style={{
        backgroundColor: C.bg,
        borderRadius: radius.md,
      }}
    >
      <div className="flex items-end justify-between gap-4">
        <span
          className="text-[11px]"
          style={{
            ...sans,
            color: C.inkSoft,
          }}
        >
          0 — не чувствуется
        </span>

        <span
          className="text-[42px] leading-none"
          style={{
            color: C.terracotta,
          }}
        >
          {value}
        </span>

        <span
          className="text-right text-[11px]"
          style={{
            ...sans,
            color: C.inkSoft,
          }}
        >
          10 — очень сильно
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={10}
        step={1}
        value={value}
        onChange={(event) =>
          onChange(
            Number(event.target.value)
          )
        }
        className="ym-disable-keys mt-5 w-full"
        style={{
          accentColor: C.terracotta,
        }}
      />
    </div>
  );
}

/* =========================================
   RESULT
========================================= */

function ResultMode({
  entry,
  saved,
  exporting,
  onTakeawayChange,
  onSave,
  onPdf,
  onNew,
  onHistory,
}: {
  entry: Entry;
  saved: boolean;
  exporting: boolean;
  onTakeawayChange: (
    value: string
  ) => void;
  onSave: () => void;
  onPdf: () => void;
  onNew: () => void;
  onHistory: () => void;
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-16 pt-10 md:px-8 md:pt-14">
      <Reveal>
        <Eyebrow>Результат</Eyebrow>

        <h1 className="mt-4 text-[36px] font-normal leading-[1.06] tracking-[-0.02em] md:text-[44px]">
          Вот как сложилась эта ситуация
        </h1>

        <p
          className="mt-3 text-[13px]"
          style={{
            ...sans,
            color: C.inkSoft,
          }}
        >
          Здесь нет правильного итога.
          Смысл разбора — увидеть всю
          цепочку чуть яснее.
        </p>
      </Reveal>

      <Reveal delay={50}>
        <div
          className="ym-hide-content mt-7 p-5 md:p-7"
          style={{
            backgroundColor: C.surface,
            borderRadius: radius.lg,
            boxShadow: shadow.soft,
          }}
        >
          <ResultDetails entry={entry} />
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div
          className="ym-hide-content mt-4 px-5 py-5"
          style={{
            backgroundColor:
              C.surfaceWarm,
            borderRadius: radius.lg,
          }}
        >
          <h2 className="text-[20px] leading-[1.2]">
            Что из этого разбора хочется
            запомнить?
          </h2>

          <p
            className="mt-2 text-[12px] leading-[1.55]"
            style={{
              ...sans,
              color: C.inkSoft,
            }}
          >
            Необязательный итог для себя.
            Он попадет и в сохраненную
            запись, и в PDF.
          </p>

          <textarea
            value={entry.takeaway}
            onChange={(event) =>
              onTakeawayChange(
                event.target.value
              )
            }
            placeholder="Например: я очень быстро превращаю одну ошибку в вывод о себе целиком."
            className="ym-disable-keys mt-4 w-full resize-none border-0 px-4 py-4 text-[13px] leading-[1.6] outline-none"
            style={{
              ...sans,
              minHeight: 110,
              backgroundColor: C.bg,
              color: C.ink,
              borderRadius: radius.md,
            }}
          />
        </div>
      </Reveal>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onSave}
          disabled={saved}
          className="px-6 py-3 text-[13px] disabled:opacity-55"
          style={{
            ...sans,
            backgroundColor: C.ink,
            color: C.bg,
            borderRadius: radius.pill,
          }}
        >
          {saved
            ? 'Сохранено в дневнике'
            : 'Сохранить в дневник'}
        </button>

        <button
          type="button"
          onClick={onPdf}
          disabled={exporting}
          className="px-6 py-3 text-[13px] disabled:opacity-50"
          style={{
            ...sans,
            backgroundColor: C.surface,
            color: C.ink,
            borderRadius: radius.pill,
          }}
        >
          {exporting
            ? 'Создаю PDF...'
            : 'Скачать PDF'}
        </button>

        <button
          type="button"
          onClick={onNew}
          className="px-5 py-3 text-[13px]"
          style={{
            ...sans,
            color: C.inkSoft,
          }}
        >
          Разобрать другую ситуацию
        </button>

        {saved && (
          <button
            type="button"
            onClick={onHistory}
            className="px-5 py-3 text-[13px]"
            style={{
              ...sans,
              color: C.inkSoft,
            }}
          >
            Мои записи
          </button>
        )}
      </div>
    </section>
  );
}

function ResultDetails({
  entry,
}: {
  entry: Entry;
}) {
  return (
    <div className="space-y-5">
      <ResultBlock
        label="Ситуация"
        value={entry.situation}
      />

      <ResultBlock
        label="Автоматическая мысль"
        value={entry.automaticThought}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <ResultBlock
          label="Главная эмоция"
          value={entry.emotion}
        />

        <ResultBlock
          label="Интенсивность"
          value={`${entry.intensity} / 10`}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <ResultBlock
          label="Что сделали"
          value={entry.behavior}
        />

        {entry.urge.trim() !== '' && (
          <ResultBlock
            label="Что хотелось сделать"
            value={entry.urge}
          />
        )}
      </div>

      <div
        className="border-t pt-5"
        style={{
          borderColor: C.line,
        }}
      >
        <p
          className="mb-3 text-[10px] uppercase tracking-[0.12em]"
          style={{
            ...sans,
            color: C.terracotta,
          }}
        >
          Проверка мысли
        </p>

        <div className="grid gap-3 md:grid-cols-2">
          <ResultBlock
            label="Что говорит в пользу"
            value={
              entry.evidenceFor ||
              'Ничего не записано'
            }
          />

          <ResultBlock
            label="Что исходная мысль не учитывает"
            value={
              entry.evidenceAgainst ||
              'Ничего не записано'
            }
          />
        </div>
      </div>

      <div
        className="border-t pt-5"
        style={{
          borderColor: C.line,
        }}
      >
        <ResultBlock
          label="Более точная мысль"
          value={entry.balancedThought}
          accent
        />

        <div
          className="mt-4 flex flex-wrap items-baseline gap-3"
        >
          <span
            className="text-[11px] uppercase tracking-[0.1em]"
            style={{
              ...sans,
              color: C.inkSoft,
            }}
          >
            Интенсивность эмоции
          </span>

          <span className="text-[28px]">
            {entry.intensity}
            <span
              style={{
                color: C.inkSoft,
              }}
            >
              {' '}
              →{' '}
            </span>
            {entry.newIntensity}
          </span>

          <span
            className="text-[11px]"
            style={{
              ...sans,
              color: C.inkSoft,
            }}
          >
            из 10
          </span>
        </div>
      </div>
    </div>
  );
}

function ResultBlock({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p
        className="text-[9.5px] uppercase tracking-[0.1em]"
        style={{
          ...sans,
          color: accent
            ? C.moss
            : C.terracotta,
        }}
      >
        {label}
      </p>

      <p className="mt-1.5 text-[14px] leading-[1.55]">
        {value}
      </p>
    </div>
  );
}

/* =========================================
   HISTORY
========================================= */

function HistoryMode({
  entries,
  expandedId,
  exporting,
  onToggle,
  onPdf,
  onDelete,
  onClearAll,
  onNew,
  onBack,
}: {
  entries: Entry[];
  expandedId: string | null;
  exporting: boolean;
  onToggle: (id: string) => void;
  onPdf: (entry: Entry) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onNew: () => void;
  onBack: () => void;
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-16 pt-10 md:px-8 md:pt-14">
      <button
        type="button"
        onClick={onBack}
        className="text-[12px] underline underline-offset-4"
        style={{
          ...sans,
          color: C.inkSoft,
        }}
      >
        ← К дневнику
      </button>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-5">
        <div>
          <Eyebrow>Мои записи</Eyebrow>

          <h1 className="mt-3 text-[35px] leading-[1.08] md:text-[42px]">
            {entries.length === 0
              ? 'Пока ничего не сохранено'
              : `Записей: ${entries.length}`}
          </h1>
        </div>

        <button
          type="button"
          onClick={onNew}
          className="px-6 py-3 text-[13px]"
          style={{
            ...sans,
            backgroundColor: C.ink,
            color: C.bg,
            borderRadius: radius.pill,
          }}
        >
          + Новый разбор
        </button>
      </div>

      {entries.length === 0 ? (
        <div
          className="mt-7 px-6 py-10 text-center"
          style={{
            backgroundColor: C.surface,
            borderRadius: radius.lg,
          }}
        >
          <p
            className="text-[14px]"
            style={{
              ...sans,
              color: C.inkSoft,
            }}
          >
            Когда вы сохраните первый
            разбор, он появится здесь.
          </p>
        </div>
      ) : (
        <div className="mt-7 space-y-3">
          {entries.map((entry) => {
            const expanded =
              expandedId === entry.id;

            return (
              <div
                key={entry.id}
                className="ym-hide-content overflow-hidden"
                style={{
                  backgroundColor:
                    C.surface,
                  borderRadius: radius.lg,
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    onToggle(entry.id)
                  }
                  className="grid w-full gap-3 px-5 py-5 text-left md:grid-cols-[160px_1fr_auto] md:items-center"
                >
                  <span
                    className="text-[11px]"
                    style={{
                      ...sans,
                      color: C.inkSoft,
                    }}
                  >
                    {entry.date}
                  </span>

                  <span>
                    <span className="block text-[16px] leading-[1.35]">
                      {entry.situation}
                    </span>

                    <span
                      className="mt-1 block text-[11.5px]"
                      style={{
                        ...sans,
                        color: C.inkSoft,
                      }}
                    >
                      {entry.emotion}:{' '}
                      {entry.intensity} →{' '}
                      {entry.newIntensity}
                    </span>
                  </span>

                  <span
                    className="text-[12px]"
                    style={{
                      ...sans,
                      color: C.inkSoft,
                    }}
                  >
                    {expanded
                      ? 'Свернуть ↑'
                      : 'Открыть ↓'}
                  </span>
                </button>

                {expanded && (
                  <div
                    className="border-t px-5 pb-5 pt-5"
                    style={{
                      borderColor: C.line,
                    }}
                  >
                    <ResultDetails
                      entry={entry}
                    />

                    {entry.takeaway && (
                      <div
                        className="mt-5 border-t pt-5"
                        style={{
                          borderColor:
                            C.line,
                        }}
                      >
                        <ResultBlock
                          label="Что хотелось запомнить"
                          value={
                            entry.takeaway
                          }
                          accent
                        />
                      </div>
                    )}

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        disabled={exporting}
                        onClick={() =>
                          onPdf(entry)
                        }
                        className="px-5 py-2.5 text-[12px] disabled:opacity-50"
                        style={{
                          ...sans,
                          backgroundColor:
                            C.bg,
                          color: C.ink,
                          borderRadius:
                            radius.pill,
                        }}
                      >
                        Скачать PDF
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onDelete(entry.id)
                        }
                        className="px-4 py-2.5 text-[12px]"
                        style={{
                          ...sans,
                          color: C.inkSoft,
                        }}
                      >
                        Удалить запись
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {entries.length > 0 && (
        <div className="mt-7">
          <button
            type="button"
            onClick={onClearAll}
            className="text-[11.5px] underline underline-offset-4"
            style={{
              ...sans,
              color: C.inkSoft,
            }}
          >
            Удалить всю историю
          </button>
        </div>
      )}
    </section>
  );
}

/* =========================================
   PDF
========================================= */

const PdfReport = forwardRef<
  HTMLDivElement,
  {
    entry: Entry;
  }
>(function PdfReport(
  {
    entry,
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
          fontSize: '38px',
          lineHeight: 1.08,
          fontWeight: 400,
        }}
      >
        Дневник мыслей
      </h1>

      <p
        style={{
          ...sans,
          margin: 0,
          fontSize: '12px',
          color: C.inkSoft,
        }}
      >
        {entry.date}
      </p>

      <div
        style={{
          marginTop: '30px',
          padding: '26px',
          backgroundColor: C.surface,
          borderRadius: '22px',
        }}
      >
        <PdfField
          label="Ситуация"
          value={entry.situation}
        />

        <PdfField
          label="Автоматическая мысль"
          value={entry.automaticThought}
        />

        <PdfField
          label="Главная эмоция"
          value={`${entry.emotion} · ${entry.intensity}/10`}
        />

        <PdfField
          label="Что сделали"
          value={entry.behavior}
        />

        {entry.urge && (
          <PdfField
            label="Что хотелось сделать"
            value={entry.urge}
          />
        )}

        <PdfField
          label="Что говорит в пользу мысли"
          value={
            entry.evidenceFor ||
            'Ничего не записано'
          }
        />

        <PdfField
          label="Что исходная мысль не учитывает"
          value={
            entry.evidenceAgainst ||
            'Ничего не записано'
          }
        />

        <PdfField
          label="Более точная мысль"
          value={entry.balancedThought}
        />

        <PdfField
          label="Интенсивность эмоции после проверки"
          value={`${entry.newIntensity}/10 · было ${entry.intensity}/10`}
        />

        {entry.takeaway && (
          <PdfField
            label="Что хочется запомнить"
            value={entry.takeaway}
            last
          />
        )}
      </div>

      <p
        style={{
          ...sans,
          margin: '26px 0 0',
          fontSize: '10px',
          lineHeight: 1.55,
          color: C.inkSoft,
        }}
      >
        Этот материал предназначен для самонаблюдения и не
        является медицинским заключением или диагнозом.
      </p>

      <p
        style={{
          ...sans,
          margin: '7px 0 0',
          fontSize: '10px',
          color: C.inkSoft,
        }}
      >
        psyshashkova.ru/tools/thought-diary
      </p>
    </div>
  );
});

PdfReport.displayName = 'PdfReport';

function PdfField({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      style={{
        paddingBottom: last
          ? 0
          : '18px',
        marginBottom: last
          ? 0
          : '18px',
        borderBottom: last
          ? 'none'
          : `1px solid ${C.line}`,
      }}
    >
      <p
        style={{
          ...sans,
          margin: 0,
          fontSize: '9px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: C.terracotta,
        }}
      >
        {label}
      </p>

      <p
        style={{
          margin: '6px 0 0',
          fontSize: '15px',
          lineHeight: 1.5,
          whiteSpace: 'pre-wrap',
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
      <h2 className="text-[16px] leading-[1.25]">
        {title}
      </h2>

      <p
        className="mt-2 text-[11.5px] leading-[1.58]"
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