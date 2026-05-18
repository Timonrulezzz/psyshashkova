'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { C, serif, sans } from '@/app/lib/theme';
import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import Eyebrow from '@/app/components/Eyebrow';
import Reveal from '@/app/components/Reveal';

type Entry = {
  id: string;
  date: string;
  situation: string;
  thought: string;
  emotion: string;
  intensity: number;
  behavior: string;
  alternative: string;
  newIntensity: number;
};

const fields: { key: keyof Entry; label: string; hint: string; placeholder: string; type: 'text' | 'number' }[] = [
  {
    key: 'situation',
    label: 'Ситуация',
    hint: 'Что произошло? Где, когда, с кем. Только факты, без интерпретаций.',
    placeholder: 'Например: написала коллеге в чате, она не ответила несколько часов',
    type: 'text',
  },
  {
    key: 'thought',
    label: 'Автоматическая мысль',
    hint: 'Что первое пришло в голову? Какая мысль вызвала самую сильную реакцию?',
    placeholder: 'Например: она на меня обиделась, я что-то не то написала',
    type: 'text',
  },
  {
    key: 'emotion',
    label: 'Эмоция',
    hint: 'Что почувствовали? Одним словом. Тревога, грусть, злость, стыд, вина.',
    placeholder: 'Например: тревога, обида',
    type: 'text',
  },
  {
    key: 'intensity',
    label: 'Интенсивность (1–10)',
    hint: 'Насколько сильно вы это почувствовали? 1 — едва заметно, 10 — захлестнуло.',
    placeholder: '7',
    type: 'number',
  },
  {
    key: 'behavior',
    label: 'Что сделали',
    hint: 'Как вы поступили в этой ситуации? Что захотелось сделать?',
    placeholder: 'Например: перестала писать, начала прокручивать переписку',
    type: 'text',
  },
  {
    key: 'alternative',
    label: 'Альтернативная мысль',
    hint: 'Если посмотреть на ситуацию шире — какие ещё есть объяснения? Что бы вы сказали другу в такой же ситуации?',
    placeholder: 'Например: она может быть занята или у неё нет связи. Я делаю вывод без данных.',
    type: 'text',
  },
  {
    key: 'newIntensity',
    label: 'Новая интенсивность (1–10)',
    hint: 'Если посмотреть с альтернативной мысли — насколько сильно теперь чувствуется эмоция?',
    placeholder: '4',
    type: 'number',
  },
];

const emptyEntry: Omit<Entry, 'id' | 'date'> = {
  situation: '',
  thought: '',
  emotion: '',
  intensity: 5,
  behavior: '',
  alternative: '',
  newIntensity: 5,
};

const STORAGE_KEY = 'thought-diary-entries';

export default function ThoughtDiary() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [current, setCurrent] = useState<typeof emptyEntry>(emptyEntry);
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<'intro' | 'fill' | 'history'>('intro');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setEntries(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      } catch {}
    }
  }, [entries, loaded]);

  const totalSteps = fields.length;
  const progress = ((step + 1) / totalSteps) * 100;
  const field = fields[step];
  const currentValue = current[field.key as keyof typeof current];

  const canNext = () => {
    if (field.type === 'number') return Number(currentValue) >= 1 && Number(currentValue) <= 10;
    return String(currentValue).trim().length > 0;
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      const entry: Entry = {
        ...current,
        id: Date.now().toString(),
        date: new Date().toLocaleString('ru-RU', { day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit' }),
      };
      setEntries([entry, ...entries]);
      setCurrent(emptyEntry);
      setStep(0);
      setMode('history');
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleDelete = (id: string) => {
    if (confirm('Удалить эту запись?')) {
      setEntries(entries.filter((e) => e.id !== id));
    }
  };

  const handleClearAll = () => {
    if (confirm('Удалить все записи? Это действие нельзя отменить.')) {
      setEntries([]);
    }
  };

  return (
    <div style={{ ...serif, backgroundColor: C.bg, color: C.ink }} className="min-h-screen">
      <Nav active="/tools" />

      {mode === 'intro' && (
        <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 md:pt-28">
          <Reveal>
            <Eyebrow>Инструмент · постоянно</Eyebrow>
            <h1 className="text-4xl md:text-5xl leading-[1.1] tracking-tight font-normal mb-8">
              Дневник мыслей
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-lg leading-relaxed mb-6" style={{ color: C.inkSoft }}>
              Это классическая ABC-таблица из КПТ. Она учит замечать связку: ситуация → автоматическая мысль → чувство → поведение. А потом — пробовать альтернативную мысль и видеть, как меняется состояние.
            </p>
            <p className="text-lg leading-relaxed mb-6" style={{ color: C.inkSoft }}>
              Регулярная практика тренирует навык замечать свои мысли. Через несколько недель вы начнёте ловить их «на лету», а не задним числом.
            </p>
            <p className="text-base leading-relaxed mb-10" style={{ color: C.inkSoft }}>
              Записи сохраняются у вас в браузере и никуда не отправляются. Если очистите кеш браузера или зайдёте с другого устройства — записи не появятся. Можно сохранить вручную, скопировав текст.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setMode('fill')}
                className="px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
                style={{ ...sans, backgroundColor: C.ink, color: C.bg }}
              >
                Заполнить новую запись →
              </button>
              {entries.length > 0 && (
                <button
                  onClick={() => setMode('history')}
                  className="px-8 py-4 rounded-full text-base border transition-all duration-300 hover:opacity-70"
                  style={{ ...sans, borderColor: C.ink, color: C.ink }}
                >
                  Мои записи ({entries.length})
                </button>
              )}
            </div>
          </Reveal>
        </section>
      )}

      {mode === 'fill' && (
        <section className="max-w-3xl mx-auto px-6 pt-20 pb-32 md:pt-28">
          <div className="mb-12">
            <div className="flex justify-between items-baseline mb-3">
              <p className="text-sm" style={{ ...sans, color: C.inkSoft }}>
                Шаг {step + 1} из {totalSteps}
              </p>
              <button
                onClick={() => { setMode('intro'); setStep(0); setCurrent(emptyEntry); }}
                className="text-sm underline underline-offset-4" style={{ ...sans, color: C.inkSoft }}
              >
                Отменить
              </button>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: C.surface }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, backgroundColor: C.terracotta }}
              />
            </div>
          </div>

          <p className="text-xs tracking-widest uppercase mb-4" style={{ ...sans, color: C.terracotta }}>
            {field.label}
          </p>
          <h2 className="text-2xl md:text-3xl leading-snug mb-3">{field.hint}</h2>
          <p className="text-sm leading-relaxed mb-8" style={{ ...sans, color: C.inkSoft }}>
            {field.placeholder}
          </p>

          {field.type === 'text' ? (
            <textarea
              value={String(currentValue)}
              onChange={(e) => setCurrent({ ...current, [field.key]: e.target.value })}
              className="w-full p-5 rounded-sm text-base leading-relaxed mb-6 border-0 outline-none resize-none"
              style={{
                ...serif,
                backgroundColor: C.surface,
                color: C.ink,
                minHeight: 140,
                fontFamily: 'Georgia, "Times New Roman", serif',
              }}
              placeholder="Напишите здесь..."
              autoFocus
            />
          ) : (
            <div className="mb-6">
              <input
                type="range"
                min={1}
                max={10}
                value={Number(currentValue)}
                onChange={(e) => setCurrent({ ...current, [field.key]: Number(e.target.value) })}
                className="w-full"
                style={{ accentColor: C.terracotta }}
              />
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs" style={{ ...sans, color: C.inkSoft }}>1 — едва</span>
                <span className="text-5xl" style={{ color: C.terracotta }}>{currentValue}</span>
                <span className="text-xs" style={{ ...sans, color: C.inkSoft }}>10 — захлестнуло</span>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            {step > 0 ? (
              <button
                onClick={handleBack}
                className="text-sm underline underline-offset-4 transition-opacity hover:opacity-60"
                style={{ ...sans, color: C.inkSoft }}
              >
                ← Назад
              </button>
            ) : <div />}
            <button
              onClick={handleNext}
              disabled={!canNext()}
              className="px-7 py-3 rounded-full text-[15px] transition-all duration-300 hover:scale-[1.03] disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ ...sans, backgroundColor: C.ink, color: C.bg }}
            >
              {step < totalSteps - 1 ? 'Дальше →' : 'Сохранить запись'}
            </button>
          </div>
        </section>
      )}

      {mode === 'history' && (
        <>
          <section className="max-w-4xl mx-auto px-6 pt-20 pb-8 md:pt-28">
            <div className="flex flex-wrap justify-between items-start gap-6 mb-12">
              <div>
                <Eyebrow>Мои записи</Eyebrow>
                <h1 className="text-3xl md:text-4xl leading-tight tracking-tight font-normal">
                  {entries.length === 0 ? 'Пока нет записей' : `Всего записей: ${entries.length}`}
                </h1>
              </div>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setMode('fill')}
                  className="px-6 py-3 rounded-full text-sm transition-all duration-300 hover:scale-[1.03]"
                  style={{ ...sans, backgroundColor: C.ink, color: C.bg }}
                >
                  + Новая запись
                </button>
                {entries.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="px-6 py-3 rounded-full text-sm border transition-opacity hover:opacity-70"
                    style={{ ...sans, borderColor: C.line, color: C.inkSoft }}
                  >
                    Очистить всё
                  </button>
                )}
              </div>
            </div>
          </section>

          {entries.length === 0 ? (
            <section className="max-w-4xl mx-auto px-6 pb-24">
              <div className="text-center py-16">
                <p className="text-lg mb-6" style={{ color: C.inkSoft }}>
                  Заполните первую запись, чтобы начать практику
                </p>
                <button
                  onClick={() => setMode('fill')}
                  className="px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
                  style={{ ...sans, backgroundColor: C.ink, color: C.bg }}
                >
                  Начать →
                </button>
              </div>
            </section>
          ) : (
            <section className="max-w-4xl mx-auto px-6 pb-24">
              <div className="space-y-4">
                {entries.map((e, i) => (
                  <Reveal key={e.id} delay={i * 40}>
                    <div className="p-6 rounded-sm" style={{ backgroundColor: C.surface }}>
                      <div className="flex justify-between items-start gap-4 mb-5">
                        <p className="text-sm" style={{ ...sans, color: C.inkSoft }}>{e.date}</p>
                        <button
                          onClick={() => handleDelete(e.id)}
                          className="text-xs underline underline-offset-4 transition-opacity hover:opacity-70"
                          style={{ ...sans, color: C.inkSoft }}
                        >
                          удалить
                        </button>
                      </div>

                      <div className="space-y-4 text-[15px] leading-relaxed">
                        <div>
                          <p className="text-xs tracking-widest uppercase mb-1" style={{ ...sans, color: C.terracotta }}>Ситуация</p>
                          <p style={{ color: C.ink }}>{e.situation}</p>
                        </div>
                        <div>
                          <p className="text-xs tracking-widest uppercase mb-1" style={{ ...sans, color: C.terracotta }}>Мысль</p>
                          <p style={{ color: C.ink }}>{e.thought}</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs tracking-widest uppercase mb-1" style={{ ...sans, color: C.terracotta }}>Эмоция</p>
                            <p style={{ color: C.ink }}>{e.emotion}</p>
                          </div>
                          <div>
                            <p className="text-xs tracking-widest uppercase mb-1" style={{ ...sans, color: C.terracotta }}>Интенсивность</p>
                            <p style={{ color: C.ink }}>{e.intensity} / 10</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs tracking-widest uppercase mb-1" style={{ ...sans, color: C.terracotta }}>Поведение</p>
                          <p style={{ color: C.ink }}>{e.behavior}</p>
                        </div>
                        <div className="pt-4 border-t" style={{ borderColor: C.line }}>
                          <p className="text-xs tracking-widest uppercase mb-1" style={{ ...sans, color: C.moss }}>Альтернативная мысль</p>
                          <p style={{ color: C.ink }}>{e.alternative}</p>
                        </div>
                        <div>
                          <p className="text-xs tracking-widest uppercase mb-1" style={{ ...sans, color: C.moss }}>Новая интенсивность</p>
                          <p style={{ color: C.ink }}>{e.newIntensity} / 10 <span className="text-sm" style={{ color: C.inkSoft }}>(было {e.intensity})</span></p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          <section className="max-w-6xl mx-auto px-6 pb-24 md:pb-32">
            <Reveal>
              <div className="rounded-sm p-12 md:p-20 text-center" style={{ backgroundColor: C.ink, color: C.bg }}>
                <h2 className="text-3xl md:text-4xl leading-tight font-normal mb-8 max-w-3xl mx-auto">
                  Сложно делать одной?
                </h2>
                <p className="text-lg leading-relaxed max-w-xl mx-auto mb-10" style={{ color: '#C9C2B5' }}>
                  Дневник мыслей — основной рабочий инструмент в КПТ. На сессиях мы разбираем такие записи и тренируемся видеть автоматические мысли точнее.
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
        </>
      )}

      <Footer />
    </div>
  );
}