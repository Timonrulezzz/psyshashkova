'use client';

import { useState } from 'react';
import Link from 'next/link';
import { C, serif, sans } from '@/app/lib/theme';
import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import Eyebrow from '@/app/components/Eyebrow';
import Reveal from '@/app/components/Reveal';

type Emotion = {
  key: string;
  name: string;
  baseLabel: string;
  mildLabel: string;
  strongLabel: string;
  color: string;
  description: string;
  bodyHint: string;
  message: string;
  reflectionQuestions: string[];
};

const emotions: Emotion[] = [
  {
    key: 'joy',
    name: 'Радость',
    mildLabel: 'Спокойствие',
    baseLabel: 'Радость',
    strongLabel: 'Восторг',
    color: '#D9A85C',
    description: 'Чувство, которое появляется, когда происходит что-то желанное или ценное — встреча, достижение, ощущение «всё хорошо». Радость энергична: хочется делиться, действовать, продолжать.',
    bodyHint: 'Лёгкость в теле, расширенное дыхание, тёплое чувство в груди, желание двигаться, улыбаться, говорить.',
    message: 'Что-то важное сейчас в моей жизни происходит правильно. Это стоит заметить и запомнить.',
    reflectionQuestions: [
      'Что именно вызвало это чувство? Конкретное событие, человек, момент?',
      'Что в этом для меня ценно — что именно я заметила и чему обрадовалась?',
      'Как часто я даю себе разрешение чувствовать радость, не обесценивая её?',
    ],
  },
  {
    key: 'trust',
    name: 'Доверие',
    mildLabel: 'Принятие',
    baseLabel: 'Доверие',
    strongLabel: 'Восхищение',
    color: '#B89968',
    description: 'Ощущение, что рядом — безопасно. Что человеку, ситуации, себе можно положиться. Доверие открывает: позволяет рассказать, попросить, опереться.',
    bodyHint: 'Мышцы расслабляются, дыхание становится ровным, тело как будто оттаивает. Можно сидеть рядом и молчать без напряжения.',
    message: 'В моей жизни сейчас есть опора. Я не одна, и это можно использовать.',
    reflectionQuestions: [
      'Кому или чему я сейчас доверяю?',
      'Что в этом человеке или ситуации помогает мне почувствовать безопасность?',
      'Что я могу попросить или позволить себе, опираясь на это доверие?',
    ],
  },
  {
    key: 'fear',
    name: 'Страх',
    mildLabel: 'Беспокойство',
    baseLabel: 'Страх',
    strongLabel: 'Ужас',
    color: '#7B8B6F',
    description: 'Реакция на угрозу — реальную или воображаемую. Страх — это не слабость, а древний механизм, который оберегает. Проблема не в самом страхе, а в том, когда он включается без повода.',
    bodyHint: 'Учащённое сердцебиение, поверхностное дыхание, холодные ладони, напряжение в плечах, желание спрятаться или замереть.',
    message: 'Что-то для меня сейчас выглядит как опасность. Стоит разобраться — реальная она или предполагаемая.',
    reflectionQuestions: [
      'Чего конкретно я боюсь? Можно ли назвать страх одним предложением?',
      'Это страх перед чем-то реальным сейчас — или предчувствие, основанное на прошлом опыте?',
      'Что произойдёт в худшем случае, и смогу ли я с этим справиться?',
    ],
  },
  {
    key: 'surprise',
    name: 'Удивление',
    mildLabel: 'Замешательство',
    baseLabel: 'Удивление',
    strongLabel: 'Изумление',
    color: '#9F8870',
    description: 'Краткое чувство, которое возникает при чём-то неожиданном. Удивление — это пауза: мозг ещё не знает, что это — хорошее, плохое или нейтральное. Часто оно «передаёт эстафету» другой эмоции.',
    bodyHint: 'Замирание, расширенные глаза, лёгкий вдох, секунда, в которой ничего не происходит.',
    message: 'В моей привычной картине мира что-то не сошлось. Это повод присмотреться.',
    reflectionQuestions: [
      'Что именно меня удивило?',
      'Что я ожидала, и чем реальность от этого отличается?',
      'Что эта неожиданность говорит о моих предположениях о людях или ситуациях?',
    ],
  },
  {
    key: 'sadness',
    name: 'Грусть',
    mildLabel: 'Задумчивость',
    baseLabel: 'Грусть',
    strongLabel: 'Горе',
    color: '#7A8090',
    description: 'Чувство, которое появляется, когда что-то ценное теряется или его не хватает. Грусть тяжелее радости, но она не «плохая» — она помогает прожить утрату и развернуться к тому, что важно.',
    bodyHint: 'Тяжесть в груди, замедленность, слёзы или ком в горле, желание быть в одиночестве или, наоборот, рядом с близким.',
    message: 'Что-то ценное для меня сейчас потеряно или недоступно. Это нужно признать, прежде чем двигаться дальше.',
    reflectionQuestions: [
      'Чего мне сейчас не хватает или что я потеряла?',
      'Что эта потеря говорит о том, что для меня было важно?',
      'Что мне нужно сейчас — побыть с этим в одиночестве или с кем-то рядом?',
    ],
  },
  {
    key: 'disgust',
    name: 'Отвращение',
    mildLabel: 'Скука',
    baseLabel: 'Отвращение',
    strongLabel: 'Ненависть',
    color: '#8A7558',
    description: 'Реакция отторжения: «это не для меня», «не хочу иметь с этим дело». Отвращение помогает отстраниться от того, что не подходит — пищи, людей, ситуаций, идей.',
    bodyHint: 'Сжатие в груди, желание отвернуться, отодвинуться, выйти. Иногда — лёгкая тошнота или гримаса.',
    message: 'Что-то нарушает мои границы или ценности. Стоит понять — что именно, и насколько важно от этого отстраниться.',
    reflectionQuestions: [
      'Что именно вызывает у меня это чувство?',
      'Это про действие или ситуацию, которые правда мне чужды, или про что-то более глубокое?',
      'Какие мои ценности здесь нарушаются?',
    ],
  },
  {
    key: 'anger',
    name: 'Злость',
    mildLabel: 'Раздражение',
    baseLabel: 'Злость',
    strongLabel: 'Ярость',
    color: '#B85C3C',
    description: 'Реакция на нарушение — границ, ожиданий, справедливости. Злость — это энергия, которая помогает защитить важное или изменить ситуацию. Подавленная злость часто превращается в депрессию или соматику.',
    bodyHint: 'Напряжение в челюсти, плечах, кулаках. Жар, ускоренное дыхание, желание сказать резко или сделать что-то прямо сейчас.',
    message: 'Что-то для меня важное сейчас нарушается. Злость говорит — обрати внимание, защити, скажи об этом.',
    reflectionQuestions: [
      'Что конкретно меня разозлило — действие, слово, ситуация?',
      'Какая моя потребность или граница здесь была нарушена?',
      'Как я могу выразить это так, чтобы меня услышали — а не просто выплеснуть?',
    ],
  },
  {
    key: 'anticipation',
    name: 'Предвкушение',
    mildLabel: 'Интерес',
    baseLabel: 'Предвкушение',
    strongLabel: 'Настороженность',
    color: '#C89B5A',
    description: 'Чувство, направленное в будущее. Это смесь интереса, ожидания и лёгкого напряжения. Предвкушение бывает приятным («скоро встреча, к которой готовилась») и тревожным («что-то сейчас произойдёт, и непонятно что»).',
    bodyHint: 'Слегка повышенный тонус, активное внимание, иногда лёгкое волнение в животе. Тело готовится к действию.',
    message: 'Я смотрю вперёд. Полезно понять — на что именно я надеюсь, и чего опасаюсь.',
    reflectionQuestions: [
      'Чего я сейчас жду или предвкушаю?',
      'Это ожидание скорее радостное или тревожное — и от чего это зависит?',
      'Что я могу сделать сейчас, чтобы быть готовой к тому, что предстоит?',
    ],
  },
];

export default function EmotionWheel() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<Emotion | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const centerText = hovered
    ? emotions.find((e) => e.key === hovered)?.name
    : selectedLabel;

  // Геометрия колеса
  const cx = 250;
  const cy = 250;
  const innerR = 60;
  const midR = 130;
  const outerR = 220;
  const segments = emotions.length; // 8
  const angleStep = (2 * Math.PI) / segments;

  // Функция: путь сегмента кольца
  const arcPath = (rIn: number, rOut: number, i: number) => {
    const a1 = i * angleStep - Math.PI / 2;
    const a2 = (i + 1) * angleStep - Math.PI / 2;
    const x1 = cx + rIn * Math.cos(a1);
    const y1 = cy + rIn * Math.sin(a1);
    const x2 = cx + rOut * Math.cos(a1);
    const y2 = cy + rOut * Math.sin(a1);
    const x3 = cx + rOut * Math.cos(a2);
    const y3 = cy + rOut * Math.sin(a2);
    const x4 = cx + rIn * Math.cos(a2);
    const y4 = cy + rIn * Math.sin(a2);
    return `M ${x1} ${y1} L ${x2} ${y2} A ${rOut} ${rOut} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${rIn} ${rIn} 0 0 0 ${x1} ${y1} Z`;
  };

  // Позиция текста в сегменте
  const labelPos = (r: number, i: number) => {
    const a = i * angleStep + angleStep / 2 - Math.PI / 2;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };

  // Прозрачность для уровня интенсивности
  const layerOpacity = (level: 'mild' | 'base' | 'strong') => {
    if (level === 'mild') return 0.4;
    if (level === 'base') return 0.7;
    return 1;
  };

  return (
    <div style={{ ...serif, backgroundColor: C.bg, color: C.ink }} className="min-h-screen">
      <Nav active="/tools" />

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 md:pt-28">
        <Reveal>
          <Eyebrow>Инструмент · постоянно</Eyebrow>
          <h1 className="text-4xl md:text-5xl leading-[1.1] tracking-tight font-normal mb-8">
            Колесо эмоций
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="text-lg leading-relaxed mb-6" style={{ color: C.inkSoft }}>
            Это адаптация классического колеса Плутчика — карта основных эмоций и их интенсивности. Зачем оно нужно: чем точнее вы умеете назвать своё состояние, тем легче с ним работать. «Плохо» — это туман. «Я злюсь, потому что эта граница для меня важна» — это уже инструмент.
          </p>
          <p className="text-base leading-relaxed mb-2" style={{ color: C.inkSoft }}>
            Восемь основных эмоций — по кругу. Три кольца — три уровня интенсивности: слабая в центре, базовая в середине, сильная по краю.
          </p>
          <p className="text-base leading-relaxed" style={{ color: C.inkSoft }}>
            Нажмите на сегмент, чтобы увидеть описание эмоции и перейти к вопросам для рефлексии.
          </p>
        </Reveal>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-10">
          {/* КОЛЕСО */}
          <div className="w-full" style={{ maxWidth: 480 }}>
            <Reveal>
              <svg
                viewBox="0 0 500 500"
                className="w-full h-auto block"
              >
                {emotions.map((e, i) => (
                  <g key={e.key}>
                    {/* Внешнее кольцо — strong */}
                    <path
                      d={arcPath(midR, outerR, i)}
                      fill={e.color}
                      opacity={
                        selected?.key === e.key ? 1
                        : hovered === e.key ? 0.92
                        : layerOpacity('strong') * 0.85
                      }
                      style={{ cursor: 'pointer', transition: 'opacity 0.25s' }}
                      onMouseEnter={() => setHovered(e.key)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => {
                        if (selected?.key === e.key && selectedLabel === e.strongLabel) {
                          setSelected(null); setSelectedLabel(null);
                        } else {
                          setSelected(e); setSelectedLabel(e.strongLabel);
                        }
                      }}
                    />
                    {/* Среднее кольцо — base */}
                    <path
                      d={arcPath(innerR, midR, i)}
                      fill={e.color}
                      opacity={
                        selected?.key === e.key ? 0.8
                        : hovered === e.key ? 0.72
                        : layerOpacity('base') * 0.7
                      }
                      style={{ cursor: 'pointer', transition: 'opacity 0.25s' }}
                      onMouseEnter={() => setHovered(e.key)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => {
                        if (selected?.key === e.key && selectedLabel === e.baseLabel) {
                          setSelected(null); setSelectedLabel(null);
                        } else {
                          setSelected(e); setSelectedLabel(e.baseLabel);
                        }
                      }}
                    />

                    {/* Подписи */}
                    <text
                      x={labelPos(outerR - 32, i).x}
                      y={labelPos(outerR - 32, i).y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="11"
                      fill={C.bg}
                      style={{ ...sans, pointerEvents: 'none', fontWeight: 500 }}
                    >
                      {e.strongLabel}
                    </text>
                    <text
                      x={labelPos((innerR + midR) / 2, i).x}
                      y={labelPos((innerR + midR) / 2, i).y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="11"
                      fill={C.bg}
                      style={{ ...sans, pointerEvents: 'none', fontWeight: 500 }}
                    >
                      {e.baseLabel}
                    </text>
                  </g>
                ))}

                {/* Центральный круг */}
                <circle cx={cx} cy={cy} r={innerR} fill={C.bg} stroke={C.line} strokeWidth={1} />
                <text
                  x={cx}
                  y={cy - 6}
                  textAnchor="middle"
                  fontSize="12"
                  fill={C.inkSoft}
                  style={{ ...sans, pointerEvents: 'none' }}
                >
                  {centerText ? '' : 'Нажмите'}
                </text>
                <text
                  x={cx}
                  y={cy + 10}
                  textAnchor="middle"
                  fontSize="12"
                  fill={C.inkSoft}
                  style={{ ...sans, pointerEvents: 'none' }}
                >
                  {centerText ? '' : 'на сегмент'}
                </text>
                {centerText && (
                  <text
                    x={cx}
                    y={cy + 4}
                    textAnchor="middle"
                    fontSize="14"
                    fill={C.ink}
                    style={{ ...serif, pointerEvents: 'none', fontWeight: 400 }}
                  >
                    {centerText}
                  </text>
                )}
              </svg>
            </Reveal>
          </div>

          {/* ОПИСАНИЕ */}
          <div className="w-full">
            <div
              className="rounded-sm p-8 transition-all duration-500"
              style={{
                backgroundColor: C.surface,
                opacity: selected ? 1 : 0.5,
                transform: selected ? 'translateY(0)' : 'translateY(8px)',
                minHeight: 200,
              }}
            >
              {selected ? (
                <div key={selected.key}>
                  <p className="text-xs tracking-widest uppercase mb-4" style={{ ...sans, color: selected.color }}>
                    Эмоция
                  </p>
                  <h2 className="text-3xl mb-4">{selectedLabel ?? selected.name}</h2>
                  <p className="text-[15px] leading-relaxed mb-6" style={{ color: C.inkSoft }}>
                    {selected.description}
                  </p>
                  <div className="mb-6">
                    <p className="text-xs tracking-widest uppercase mb-2" style={{ ...sans, color: C.inkSoft }}>
                      Как чувствуется в теле
                    </p>
                    <p className="text-[14px] leading-relaxed" style={{ color: C.ink }}>
                      {selected.bodyHint}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase mb-2" style={{ ...sans, color: C.inkSoft }}>
                      О чём говорит
                    </p>
                    <p className="text-[14px] leading-relaxed italic" style={{ color: C.ink }}>
                      «{selected.message}»
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-xs tracking-widest uppercase mb-4" style={{ ...sans, color: C.inkSoft }}>
                    Описание появится здесь
                  </p>
                  <p className="text-base leading-relaxed" style={{ color: C.inkSoft }}>
                    Наведите курсор на сегмент, чтобы увидеть его название в центре. Нажмите, чтобы открыть описание эмоции.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* РЕФЛЕКСИВНЫЙ БЛОК */}
      {selected && (
        <section className="max-w-3xl mx-auto px-6 py-16">
          <Reveal>
            <div className="border-l-2 pl-8" style={{ borderColor: selected.color }}>
              <p className="text-xs tracking-widest uppercase mb-4" style={{ ...sans, color: selected.color }}>
                Вопросы для размышления — {selected.name.toLowerCase()}
              </p>
              <h2 className="text-2xl md:text-3xl leading-tight font-normal mb-8">
                Если эта эмоция сейчас с вами — попробуйте ответить себе
              </h2>
              <div className="space-y-6">
                {selected.reflectionQuestions.map((q, i) => (
                  <div key={i}>
                    <p className="text-sm mb-2" style={{ ...sans, color: selected.color }}>
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <p className="text-[17px] leading-relaxed" style={{ color: C.ink }}>
                      {q}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-sm leading-relaxed mt-10" style={{ ...sans, color: C.inkSoft }}>
                Это не нужно «правильно» отвечать. Цель не в ответе, а в том, чтобы дать эмоции место — назвать её, заметить, услышать. Дальше с ней становится проще обходиться.
              </p>
            </div>
          </Reveal>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="rounded-sm p-12 md:p-20 text-center" style={{ backgroundColor: C.ink, color: C.bg }}>
            <h2 className="text-3xl md:text-4xl leading-tight font-normal mb-8 max-w-3xl mx-auto">
              Если внутри слишком много, чтобы разобрать в одиночку
            </h2>
            <p className="text-lg leading-relaxed max-w-xl mx-auto mb-10" style={{ color: '#C9C2B5' }}>
              Распознавание эмоций — базовый навык, который мы тренируем в терапии. На сессии мы можем разобрать, что происходит, и как с этим обходиться.
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

      <Footer />
    </div>
  );
}