'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { C, serif, sans } from '@/app/lib/theme';
import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import Eyebrow from '@/app/components/Eyebrow';
import Reveal from '@/app/components/Reveal';
import {
  modes,
  additionalModes,
  categoryLabels,
  categoryDescriptions,
  getModesByCategory,
  getAdditionalByGroup,
  type ExtendedMode,
  type ModeKey,
} from './data';

export default function SchemaModesMap() {
  const [openMode, setOpenMode] = useState<ModeKey | null>(null);
  const [hoveredMode, setHoveredMode] = useState<ModeKey | null>(null);

  // Открыть карточку при переходе по якорю
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as ModeKey;
    if (hash && modes.some((m) => m.key === hash)) {
      setOpenMode(hash);
      // Скролл к элементу после раскрытия
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  const toggleMode = (key: ModeKey) => {
    setOpenMode(openMode === key ? null : key);
  };

  const scrollToMode = (key: ModeKey) => {
    setOpenMode(key);
    setTimeout(() => {
      const el = document.getElementById(key);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <div style={{ ...serif, backgroundColor: C.bg, color: C.ink }} className="min-h-screen">
      <Nav active="/tools" />

      {/* HERO */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 md:pt-28">
        <Reveal>
          <Eyebrow>Инструмент · постоянно</Eyebrow>
          <h1 className="text-4xl md:text-5xl leading-[1.1] tracking-tight font-normal mb-8">
            Карта режимов схема-терапии
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="text-lg leading-relaxed mb-6" style={{ color: C.inkSoft }}>
            «Режим» — это сиюминутное состояние личности: набор чувств, мыслей и реакций, который активируется в ответ на триггеры. У одного человека за день включается несколько разных режимов, иногда переходя один в другой за минуты.
          </p>
          <p className="text-base leading-relaxed mb-6" style={{ color: C.inkSoft }}>
            На этой карте — четыре группы режимов и связи между ними. Цель работы в схема-терапии — не «убрать» дисфункциональные режимы, а укрепить Здорового Взрослого, чтобы он мог быть ведущим в системе.
          </p>
          <p className="text-base leading-relaxed" style={{ color: C.inkSoft }}>
            Кликните на любой режим — раскроется подробное описание: как он ощущается изнутри, что его запускает, какие схемы под ним лежат, что в ответ делает Здоровый Взрослый.
          </p>
        </Reveal>
      </section>

      {/* SVG КАРТА */}
      <section className="max-w-4xl mx-auto px-6 py-8 md:py-12">
        <Reveal>
          <SystemMap
            hoveredMode={hoveredMode}
            onHover={setHoveredMode}
            onClick={scrollToMode}
          />
        </Reveal>
      </section>

      {/* КАТЕГОРИИ С КАРТОЧКАМИ */}
      {(['child', 'coping', 'parent', 'healthy'] as const).map((category, catIdx) => {
        const categoryModes = getModesByCategory(category);
        return (
          <section key={category} className="max-w-4xl mx-auto px-6 py-12 md:py-16">
            <Reveal>
              <div className="mb-10">
                <p
                  className="text-xs tracking-widest uppercase mb-3"
                  style={{ ...sans, color: catIdx === 3 ? C.moss : catIdx === 2 ? '#3a3530' : catIdx === 1 ? C.ochre : C.terracotta }}
                >
                  {categoryLabels[category]}
                </p>
                <h2 className="text-2xl md:text-3xl leading-tight font-normal mb-5">
                  {categoryLabels[category]}
                </h2>
                <p className="text-base leading-relaxed max-w-2xl" style={{ color: C.inkSoft }}>
                  {categoryDescriptions[category]}
                </p>
              </div>
            </Reveal>

            <div className="space-y-4">
              {categoryModes.map((mode, i) => (
                <Reveal key={mode.key} delay={i * 60}>
                  <ModeCard
                    mode={mode}
                    isOpen={openMode === mode.key}
                    onToggle={() => toggleMode(mode.key)}
                  />
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}

      {/* РАСШИРЕННАЯ КЛАССИФИКАЦИЯ */}
      <section className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <Reveal>
          <div className="mb-10">
            <Eyebrow>Расширенная классификация</Eyebrow>
            <h2 className="text-2xl md:text-3xl leading-tight font-normal mb-5">
              Режимы, которые не входят в опросник
            </h2>
            <p className="text-base leading-relaxed max-w-2xl" style={{ color: C.inkSoft }}>
              SMI измеряет 14 режимов, но в современной клинической работе используется расширенная классификация. Эти режимы тоже важны — они помогают точнее описать внутреннюю систему и не входят в опросник только потому, что для них пока нет валидной шкалы.
            </p>
          </div>
        </Reveal>

        {(['capitulation', 'avoidance', 'overcompensation', 'parent', 'healthy'] as const).map((group) => {
          const items = getAdditionalByGroup(group);
          if (items.length === 0) return null;
          return (
            <div key={group} className="mb-10">
              <Reveal>
                <p className="text-xs tracking-widest uppercase mb-5" style={{ ...sans, color: C.inkSoft }}>
                  {items[0].groupLabel}
                </p>
              </Reveal>
              <div className="space-y-4">
                {items.map((mode, i) => (
                  <Reveal key={mode.key} delay={i * 50}>
                    <div className="p-6 rounded-sm" style={{ backgroundColor: C.surface }}>
                      <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                        <h3 className="text-lg">{mode.name}</h3>
                        <span className="text-xs" style={{ ...sans, color: C.inkSoft }}>
                          {mode.nameEn}
                        </span>
                      </div>
                      <p className="text-[15px] leading-relaxed" style={{ color: C.ink }}>
                        {mode.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="rounded-sm p-12 md:p-20 text-center" style={{ backgroundColor: C.ink, color: C.bg }}>
            <h2 className="text-3xl md:text-4xl leading-tight font-normal mb-8 max-w-3xl mx-auto">
              Карта — это начало. Работа — в живых отношениях
            </h2>
            <p className="text-lg leading-relaxed max-w-xl mx-auto mb-10" style={{ color: '#C9C2B5' }}>
              Знание о режимах не отменяет их активацию. В терапии мы учимся замечать режимы в реальном времени, понимать их функцию и постепенно укреплять Здорового Взрослого — через диалог, осознанность, эксперимент.
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

      {/* Связанные инструменты */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <Reveal>
          <p className="text-sm mb-4" style={{ ...sans, color: C.inkSoft }}>
            Связанные инструменты
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/tools/schema-modes-test"
              className="px-6 py-3 rounded-full text-sm transition-all hover:-translate-y-0.5"
              style={{ ...sans, backgroundColor: C.surface, color: C.ink, border: `1px solid ${C.line}` }}
            >
              Опросник режимов SMI →
            </Link>
            <Link
              href="/tools/schema-test"
              className="px-6 py-3 rounded-full text-sm transition-all hover:-translate-y-0.5"
              style={{ ...sans, backgroundColor: C.surface, color: C.ink, border: `1px solid ${C.line}` }}
            >
              Тест на схемы YSQ-S3 →
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}

// ============================================================
// SVG-карта системы режимов: концентрические круги
// ============================================================

function SystemMap({
  hoveredMode,
  onHover,
  onClick,
}: {
  hoveredMode: ModeKey | null;
  onHover: (key: ModeKey | null) => void;
  onClick: (key: ModeKey) => void;
}) {
  // Геометрия
  const cx = 350;
  const cy = 360;
  const centerR = 75;        // радиус Здорового Взрослого
  const innerR1 = 95;         // начало детского кольца
  const innerR2 = 175;        // конец детского кольца
  const outerR1 = 185;        // начало копингового кольца
  const outerR2 = 265;        // конец копингового кольца

  const childModes = getModesByCategory('child');
  const copingModes = getModesByCategory('coping');
  const parentModes = getModesByCategory('parent');

  // Сектор кольца
  const sectorPath = (rIn: number, rOut: number, startAngle: number, endAngle: number) => {
    const a1 = startAngle - Math.PI / 2;
    const a2 = endAngle - Math.PI / 2;
    const x1 = cx + rIn * Math.cos(a1);
    const y1 = cy + rIn * Math.sin(a1);
    const x2 = cx + rOut * Math.cos(a1);
    const y2 = cy + rOut * Math.sin(a1);
    const x3 = cx + rOut * Math.cos(a2);
    const y3 = cy + rOut * Math.sin(a2);
    const x4 = cx + rIn * Math.cos(a2);
    const y4 = cy + rIn * Math.sin(a2);
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} L ${x2} ${y2} A ${rOut} ${rOut} 0 ${largeArc} 1 ${x3} ${y3} L ${x4} ${y4} A ${rIn} ${rIn} 0 ${largeArc} 0 ${x1} ${y1} Z`;
  };

  // Точка для текста в секторе (на середине радиуса и угла)
  const labelPosition = (rIn: number, rOut: number, startAngle: number, endAngle: number) => {
    const r = (rIn + rOut) / 2;
    const a = (startAngle + endAngle) / 2 - Math.PI / 2;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };

  // Разбиваем кольца на сектора
  const childSegments = childModes.length;
  const childAngleStep = (2 * Math.PI) / childSegments;
  const copingSegments = copingModes.length;
  const copingAngleStep = (2 * Math.PI) / copingSegments;

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <p className="text-xs tracking-widest uppercase" style={{ ...sans, color: C.inkSoft }}>
          Система режимов
        </p>
      </div>

      <svg viewBox="0 0 700 720" className="w-full h-auto" style={{ maxHeight: '720px' }}>
        <defs>
          <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="0" dy="1" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.15" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Родительские режимы — отдельным блоком сверху */}
        <g>
          <text
            x={cx}
            y={50}
            textAnchor="middle"
            fontSize="11"
            fill={C.inkSoft}
            style={{ ...sans, letterSpacing: '0.15em', textTransform: 'uppercase' }}
          >
            Голос со стороны
          </text>
          {parentModes.map((mode, i) => {
            const xPos = i === 0 ? cx - 130 : cx + 130;
            const isHovered = hoveredMode === mode.key;
            return (
              <g
                key={mode.key}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => onHover(mode.key)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onClick(mode.key)}
              >
                <rect
                  x={xPos - 100}
                  y={68}
                  width={200}
                  height={56}
                  rx={6}
                  fill={isHovered ? mode.color : '#3a3530'}
                  opacity={isHovered ? 0.95 : 0.85}
                  filter="url(#soft-shadow)"
                  style={{ transition: 'all 0.2s' }}
                />
                <text
                  x={xPos}
                  y={92}
                  textAnchor="middle"
                  fontSize="13"
                  fill={C.bg}
                  style={{ ...serif, fontWeight: 400 }}
                >
                  {mode.name.split(' ')[0]}
                </text>
                <text
                  x={xPos}
                  y={110}
                  textAnchor="middle"
                  fontSize="13"
                  fill={C.bg}
                  style={{ ...serif, fontWeight: 400 }}
                >
                  {mode.name.split(' ').slice(1).join(' ')}
                </text>
              </g>
            );
          })}
        </g>

        {/* Стрелки от родительских к центру */}
        <line
          x1={cx - 130}
          y1={130}
          x2={cx - 30}
          y2={cy - centerR - 15}
          stroke={C.line}
          strokeWidth="1"
          strokeDasharray="3 4"
          opacity={0.7}
        />
        <line
          x1={cx + 130}
          y1={130}
          x2={cx + 30}
          y2={cy - centerR - 15}
          stroke={C.line}
          strokeWidth="1"
          strokeDasharray="3 4"
          opacity={0.7}
        />

        {/* Внешнее кольцо — копинговые режимы */}
        {copingModes.map((mode, i) => {
          const startAngle = i * copingAngleStep;
          const endAngle = (i + 1) * copingAngleStep;
          const pos = labelPosition(outerR1, outerR2, startAngle, endAngle);
          const isHovered = hoveredMode === mode.key;
          // Делим название на два слова для размещения
          const words = mode.name.split(' ');
          return (
            <g
              key={mode.key}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => onHover(mode.key)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onClick(mode.key)}
            >
              <path
                d={sectorPath(outerR1, outerR2, startAngle, endAngle)}
                fill={mode.color}
                opacity={isHovered ? 0.95 : 0.6}
                stroke={C.bg}
                strokeWidth="2"
                style={{ transition: 'opacity 0.2s' }}
              />
              {words.length === 1 ? (
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.bg}
                  style={{ ...serif, pointerEvents: 'none' }}
                >
                  {words[0]}
                </text>
              ) : words.length === 2 ? (
                <>
                  <text x={pos.x} y={pos.y - 6} textAnchor="middle" fontSize="11" fill={C.bg} style={{ ...serif, pointerEvents: 'none' }}>
                    {words[0]}
                  </text>
                  <text x={pos.x} y={pos.y + 8} textAnchor="middle" fontSize="11" fill={C.bg} style={{ ...serif, pointerEvents: 'none' }}>
                    {words[1]}
                  </text>
                </>
              ) : (
                <>
                  <text x={pos.x} y={pos.y - 12} textAnchor="middle" fontSize="10" fill={C.bg} style={{ ...serif, pointerEvents: 'none' }}>
                    {words[0]}
                  </text>
                  <text x={pos.x} y={pos.y} textAnchor="middle" fontSize="10" fill={C.bg} style={{ ...serif, pointerEvents: 'none' }}>
                    {words[1]}
                  </text>
                  <text x={pos.x} y={pos.y + 12} textAnchor="middle" fontSize="10" fill={C.bg} style={{ ...serif, pointerEvents: 'none' }}>
                    {words.slice(2).join(' ')}
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* Внутреннее кольцо — детские режимы */}
        {childModes.map((mode, i) => {
          const startAngle = i * childAngleStep;
          const endAngle = (i + 1) * childAngleStep;
          const pos = labelPosition(innerR1, innerR2, startAngle, endAngle);
          const isHovered = hoveredMode === mode.key;
          const words = mode.name.split(' ');
          return (
            <g
              key={mode.key}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => onHover(mode.key)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onClick(mode.key)}
            >
              <path
                d={sectorPath(innerR1, innerR2, startAngle, endAngle)}
                fill={mode.color}
                opacity={isHovered ? 0.95 : 0.75}
                stroke={C.bg}
                strokeWidth="2"
                style={{ transition: 'opacity 0.2s' }}
              />
              {words.length === 2 ? (
                <>
                  <text x={pos.x} y={pos.y - 6} textAnchor="middle" fontSize="11" fill={C.bg} style={{ ...serif, pointerEvents: 'none' }}>
                    {words[0]}
                  </text>
                  <text x={pos.x} y={pos.y + 8} textAnchor="middle" fontSize="11" fill={C.bg} style={{ ...serif, pointerEvents: 'none' }}>
                    {words[1]}
                  </text>
                </>
              ) : (
                <text x={pos.x} y={pos.y + 4} textAnchor="middle" fontSize="11" fill={C.bg} style={{ ...serif, pointerEvents: 'none' }}>
                  {mode.name}
                </text>
              )}
            </g>
          );
        })}

        {/* Центр — Здоровый Взрослый */}
        <g
          style={{ cursor: 'pointer' }}
          onMouseEnter={() => onHover('healthyAdult')}
          onMouseLeave={() => onHover(null)}
          onClick={() => onClick('healthyAdult')}
        >
          <circle
            cx={cx}
            cy={cy}
            r={centerR}
            fill={C.moss}
            opacity={hoveredMode === 'healthyAdult' ? 1 : 0.9}
            stroke={C.bg}
            strokeWidth="3"
            filter="url(#soft-shadow)"
            style={{ transition: 'opacity 0.2s' }}
          />
          <text
            x={cx}
            y={cy - 8}
            textAnchor="middle"
            fontSize="14"
            fill={C.bg}
            style={{ ...serif, pointerEvents: 'none' }}
          >
            Здоровый
          </text>
          <text
            x={cx}
            y={cy + 10}
            textAnchor="middle"
            fontSize="14"
            fill={C.bg}
            style={{ ...serif, pointerEvents: 'none' }}
          >
            Взрослый
          </text>
        </g>

        {/* Подсказка снизу */}
        <text
          x={cx}
          y={680}
          textAnchor="middle"
          fontSize="11"
          fill={C.inkSoft}
          style={{ ...sans, letterSpacing: '0.05em' }}
        >
          Кликните на любой режим, чтобы узнать о нём подробнее
        </text>
      </svg>
    </div>
  );
}

// ============================================================
// Раскрывающаяся карточка режима
// ============================================================

function ModeCard({
  mode,
  isOpen,
  onToggle,
}: {
  mode: ExtendedMode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      id={mode.key}
      className="rounded-sm overflow-hidden scroll-mt-24"
      style={{ backgroundColor: C.surface }}
    >
      {/* Заголовок-кнопка */}
      <button
        onClick={onToggle}
        className="w-full text-left p-7 flex items-start gap-5 transition-colors hover:bg-opacity-90"
        style={{ backgroundColor: 'transparent' }}
      >
        <div
          className="shrink-0 w-2 h-2 rounded-full mt-3"
          style={{ backgroundColor: mode.color }}
        />
        <div className="flex-1">
          <div className="flex items-baseline gap-3 mb-2 flex-wrap">
            <h3 className="text-xl md:text-2xl">{mode.name}</h3>
            <span className="text-xs" style={{ ...sans, color: C.inkSoft }}>
              {mode.nameEn}
            </span>
          </div>
          <p className="text-[15px] leading-relaxed" style={{ color: C.inkSoft }}>
            {mode.shortDescription}
          </p>
        </div>
        <div
          className="shrink-0 text-2xl leading-none mt-2 transition-transform duration-300"
          style={{
            color: C.inkSoft,
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          +
        </div>
      </button>

      {/* Раскрывающееся содержимое */}
      {isOpen && (
        <div className="px-7 pb-8 pt-2" style={{ borderTop: `1px solid ${C.line}` }}>
          {/* Основное описание */}
          <div className="pt-6 mb-8">
            {mode.fullDescription.split('\n\n').map((para, i) => (
              <p key={i} className="text-base leading-relaxed mb-4 last:mb-0" style={{ color: C.ink }}>
                {para}
              </p>
            ))}
          </div>

          {/* Подвиды (если есть) */}
          {mode.subtypes && mode.subtypes.length > 0 && (
            <div className="mb-8">
              <p className="text-xs tracking-widest uppercase mb-4" style={{ ...sans, color: C.inkSoft }}>
                Подвиды режима
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {mode.subtypes.map((sub) => (
                  <div key={sub.name} className="p-4 rounded-sm" style={{ backgroundColor: C.bg }}>
                    <h4 className="text-base mb-2">{sub.name}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>
                      {sub.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Внутренний опыт */}
          <div className="mb-8 pl-6 border-l-2" style={{ borderColor: mode.color }}>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ ...sans, color: C.inkSoft }}>
              Как ощущается изнутри
            </p>
            <p className="text-base italic leading-relaxed" style={{ color: C.ink }}>
              {mode.innerExperience}
            </p>
          </div>

          {/* Триггеры и схемы — в две колонки */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-xs tracking-widest uppercase mb-4" style={{ ...sans, color: C.inkSoft }}>
                Типичные триггеры
              </p>
              <ul className="space-y-2">
                {mode.triggers.map((t, i) => (
                  <li key={i} className="text-[15px] leading-relaxed flex gap-3" style={{ color: C.ink }}>
                    <span style={{ color: mode.color }}>·</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase mb-4" style={{ ...sans, color: C.inkSoft }}>
                Связанные схемы
              </p>
              <ul className="space-y-2">
                {mode.relatedSchemas.map((s, i) => (
                  <li key={i} className="text-[15px] leading-relaxed flex gap-3" style={{ color: C.ink }}>
                    <span style={{ color: mode.color }}>·</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Здоровый Взрослый */}
          <div className="p-6 rounded-sm" style={{ backgroundColor: C.bg, borderLeft: `3px solid ${C.moss}` }}>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ ...sans, color: C.moss }}>
              Что делает Здоровый Взрослый
            </p>
            <p className="text-base leading-relaxed" style={{ color: C.ink }}>
              {mode.healthyAdultResponse}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}