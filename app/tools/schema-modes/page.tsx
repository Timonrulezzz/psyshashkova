'use client';

import { useEffect, useState } from 'react';
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
  categoryDescriptions,
  categoryLabels,
  getAdditionalByGroup,
  getModesByCategory,
  modes,
  type ExtendedMode,
  type ModeCategory,
  type ModeKey,
} from './data';

const CATEGORY_ORDER: ModeCategory[] = [
  'child',
  'coping',
  'parent',
  'healthy',
];

const ADDITIONAL_GROUPS = [
  'capitulation',
  'avoidance',
  'overcompensation',
  'parent',
  'healthy',
] as const;

export default function SchemaModesMap() {
  const [openMode, setOpenMode] = useState<ModeKey | null>(null);
  const [hoveredMode, setHoveredMode] = useState<ModeKey | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as ModeKey;

    if (hash && modes.some((mode) => mode.key === hash)) {
      setOpenMode(hash);

      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  }, []);

  function toggleMode(key: ModeKey) {
    setOpenMode((current) => (current === key ? null : key));
  }

  function scrollToMode(key: ModeKey) {
    setOpenMode(key);

    window.setTimeout(() => {
      document.getElementById(key)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 50);
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
        <section className="mx-auto max-w-6xl px-6 pb-7 pt-10 md:px-8 md:pb-9 md:pt-14">
          <Reveal>
            <Link
              href="/tools"
              className="mb-5 inline-block text-[12px] underline underline-offset-4"
              style={{ ...sans, color: C.inkSoft }}
            >
              ← Все инструменты
            </Link>

            <Eyebrow>Интерактивная карта · схема-терапия</Eyebrow>

            <h1 className="mt-4 w-full text-[38px] font-normal leading-[1.04] tracking-[-0.025em] md:text-[48px]">
              Карта режимов схема-терапии
            </h1>

            <p
              className="mt-5 max-w-[930px] text-[15px] leading-[1.7] md:text-[16px]"
              style={{ ...sans, color: C.inkSoft }}
            >
              Иногда в похожих ситуациях мы очень быстро переходим в
              узнаваемое состояние: начинаем нападать, замолкаем,
              отстраняемся, требуем от себя невозможного или, наоборот,
              хорошо удерживаем и эмоции, и реальность. В схема-терапии
              такие повторяющиеся состояния описывают через модель режимов.
            </p>
          </Reveal>

          <Reveal delay={40}>
            <div className="mt-7 grid gap-3 md:grid-cols-3">
              <InfoCard
                title="14 режимов SMI"
                text="Основная карта согласована с режимами, которые оценивает опросник SMI."
              />

              <InfoCard
                title="Это рабочая модель"
                text="Режим — не диагноз и не отдельная личность внутри человека, а способ описать временно активный набор чувств, мыслей и реакций."
              />

              <InfoCard
                title="Карта интерактивная"
                text="Нажмите на любой сектор: страница откроет карточку режима с описанием, триггерами и более гибкой реакцией."
              />
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-7 md:px-8">
          <Reveal delay={60}>
            <div
              className="grid gap-5 px-5 py-5 md:grid-cols-[0.78fr_1.22fr] md:gap-9 md:px-6"
              style={{
                backgroundColor: C.surfaceWarm,
                borderRadius: radius.lg,
              }}
            >
              <div>
                <Eyebrow>Как читать карту</Eyebrow>

                <h2 className="mt-3 text-[26px] leading-[1.1] md:text-[31px]">
                  Не искать «какой я режим», а замечать переключения
                </h2>
              </div>

              <div
                className="space-y-3 text-[12.5px] leading-[1.68] md:text-[13.5px]"
                style={{ ...sans, color: C.ink }}
              >
                <p>
                  Один и тот же человек может переходить между разными
                  режимами в течение дня. Важнее не приклеить к себе
                  название, а заметить последовательность: что произошло,
                  какое состояние включилось и к каким действиям оно
                  подтолкнуло.
                </p>

                <p>
                  В терапии задача не в том, чтобы навсегда убрать
                  «неправильные» режимы. Полезнее расширять способность
                  раньше замечать переключение и возвращать себе выбор в
                  том, как реагировать дальше.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-7 md:px-8 md:py-9">
          <Reveal>
            <div className="mb-5 text-center">
              <Eyebrow>Нажмите на режим</Eyebrow>
              <h2 className="mt-3 text-[29px] leading-[1.08] md:text-[36px]">
                Как устроена система
              </h2>
            </div>

            <SystemMap
              hoveredMode={hoveredMode}
              onHover={setHoveredMode}
              onClick={scrollToMode}
            />
          </Reveal>
        </section>

        {CATEGORY_ORDER.map((category) => {
          const categoryModes = getModesByCategory(category);

          return (
            <section
              key={category}
              className="mx-auto max-w-5xl px-6 py-7 md:px-8 md:py-9"
            >
              <Reveal>
                <div className="grid gap-y-3 md:grid-cols-[0.72fr_1.28fr] md:gap-x-10">
                  <div>
                    <Eyebrow>{categoryLabels[category]}</Eyebrow>
                  </div>

                  <div className="hidden md:block" />

                  <h2 className="text-[29px] leading-[1.08] md:text-[35px]">
                    {categoryLabels[category]}
                  </h2>

                  <p
                    className="text-[13px] leading-[1.65]"
                    style={{ ...sans, color: C.inkSoft }}
                  >
                    {categoryDescriptions[category]}
                  </p>
                </div>
              </Reveal>

              <div className="mt-5 space-y-3">
                {categoryModes.map((mode, index) => (
                  <Reveal key={mode.key} delay={index * 35}>
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

        <section className="mx-auto max-w-5xl px-6 py-7 md:px-8 md:py-9">
          <Reveal>
            <div className="grid gap-y-3 md:grid-cols-[0.72fr_1.28fr] md:gap-x-10">
              <div>
                <Eyebrow>Расширенная карта</Eyebrow>
              </div>

              <div className="hidden md:block" />

              <h2 className="text-[29px] leading-[1.08] md:text-[35px]">
                Режимы за пределами 14 шкал SMI
              </h2>

              <p
                className="text-[13px] leading-[1.65]"
                style={{ ...sans, color: C.inkSoft }}
              >
                В клинической литературе и практике схема-терапии
                встречаются и более подробные названия режимов. Ниже они
                вынесены отдельно, чтобы не создавать впечатление, будто
                все эти категории измеряются опросником SMI.
              </p>
            </div>
          </Reveal>

          <div className="mt-6 space-y-7">
            {ADDITIONAL_GROUPS.map((group) => {
              const items = getAdditionalByGroup(group);
              if (items.length === 0) return null;

              return (
                <div key={group}>
                  <p
                    className="mb-3 text-[10px] uppercase tracking-[0.11em]"
                    style={{ ...sans, color: C.inkSoft }}
                  >
                    {items[0].groupLabel}
                  </p>

                  <div className="grid gap-3 md:grid-cols-2">
                    {items.map((mode) => (
                      <div
                        key={mode.key}
                        className="px-5 py-5"
                        style={{
                          backgroundColor: C.surface,
                          borderRadius: radius.md,
                        }}
                      >
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h3 className="text-[17px] leading-[1.25]">
                            {mode.name}
                          </h3>

                          <span
                            className="text-[10.5px]"
                            style={{ ...sans, color: C.inkSoft }}
                          >
                            {mode.nameEn}
                          </span>
                        </div>

                        <p
                          className="mt-3 text-[12.5px] leading-[1.62]"
                          style={{ ...sans, color: C.inkSoft }}
                        >
                          {mode.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-3 pt-4 md:px-8">
          <Reveal>
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
                <Eyebrow>Если узнаете повторяющийся сценарий</Eyebrow>

                <h2 className="mt-3 max-w-3xl text-[28px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[34px]">
                  Можно разбирать не название режима, а реальные ситуации
                </h2>

                <p
                  className="mt-3 max-w-2xl text-[13px] leading-[1.6]"
                  style={{ ...sans, color: '#C9C2B5' }}
                >
                  На встрече мы можем посмотреть, что обычно запускает
                  переключение, какие мысли и эмоции появляются, что вы
                  делаете в ответ и где можно вернуть больше выбора.
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
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-12 pt-4 md:px-8 md:pb-14">
          <Reveal>
            <div
              className="flex flex-wrap items-center justify-between gap-4 px-5 py-4"
              style={{
                backgroundColor: C.surface,
                borderRadius: radius.md,
              }}
            >
              <div>
                <p className="text-[14px]">
                  Хотите посмотреть на свой профиль?
                </p>

                <p
                  className="mt-1 text-[11.5px] leading-[1.5]"
                  style={{ ...sans, color: C.inkSoft }}
                >
                  Можно пройти SMI или вернуться к опроснику ранних схем
                  MSS-YSQ.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/tools/schema-modes-test"
                  className="text-[12px] underline underline-offset-4"
                  style={{ ...sans, color: C.ink }}
                >
                  Опросник режимов SMI →
                </Link>

                <Link
                  href="/tools/schema-test"
                  className="text-[12px] underline underline-offset-4"
                  style={{ ...sans, color: C.ink }}
                >
                  Опросник схем MSS-YSQ →
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function SystemMap({
  hoveredMode,
  onHover,
  onClick,
}: {
  hoveredMode: ModeKey | null;
  onHover: (key: ModeKey | null) => void;
  onClick: (key: ModeKey) => void;
}) {
  const cx = 350;
  const cy = 360;
  const centerR = 75;
  const innerR1 = 95;
  const innerR2 = 175;
  const outerR1 = 185;
  const outerR2 = 265;

  const childModes = getModesByCategory('child');
  const copingModes = getModesByCategory('coping');
  const parentModes = getModesByCategory('parent');

  function sectorPath(
    rIn: number,
    rOut: number,
    startAngle: number,
    endAngle: number
  ) {
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
  }

  function labelPosition(
    rIn: number,
    rOut: number,
    startAngle: number,
    endAngle: number
  ) {
    const r = (rIn + rOut) / 2;
    const a = (startAngle + endAngle) / 2 - Math.PI / 2;

    return {
      x: cx + r * Math.cos(a),
      y: cy + r * Math.sin(a),
    };
  }

  const childAngleStep = (2 * Math.PI) / childModes.length;
  const copingAngleStep = (2 * Math.PI) / copingModes.length;

  return (
    <div
      className="overflow-hidden px-3 py-4 sm:px-5"
      style={{
        backgroundColor: C.surface,
        borderRadius: radius.lg,
      }}
    >
      <svg
        viewBox="0 0 700 720"
        className="h-auto w-full"
        role="img"
        aria-label="Интерактивная карта режимов схема-терапии"
      >
        <defs>
          <filter
            id="soft-shadow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
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

        <text
          x={cx}
          y={44}
          textAnchor="middle"
          fontSize="11"
          fill={C.inkSoft}
          style={{
            ...sans,
            letterSpacing: '0.11em',
            textTransform: 'uppercase',
          }}
        >
          внутренние требования и критика
        </text>

        {parentModes.map((mode, index) => {
          const xPos = index === 0 ? cx - 130 : cx + 130;
          const active = hoveredMode === mode.key;

          return (
            <g
              key={mode.key}
              role="button"
              tabIndex={0}
              aria-label={mode.name}
              style={{ cursor: 'pointer', outline: 'none' }}
              onMouseEnter={() => onHover(mode.key)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onClick(mode.key)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onClick(mode.key);
                }
              }}
            >
              <rect
                x={xPos - 102}
                y={62}
                width={204}
                height={58}
                rx={18}
                fill={active ? C.berry : '#3A3530'}
                opacity={active ? 0.98 : 0.88}
                filter="url(#soft-shadow)"
              />

              <ModeLabel
                x={xPos}
                y={91}
                name={mode.name}
                fill={C.bg}
              />
            </g>
          );
        })}

        <line
          x1={cx - 130}
          y1={128}
          x2={cx - 30}
          y2={cy - centerR - 15}
          stroke={C.line}
          strokeWidth="1"
          strokeDasharray="3 4"
        />

        <line
          x1={cx + 130}
          y1={128}
          x2={cx + 30}
          y2={cy - centerR - 15}
          stroke={C.line}
          strokeWidth="1"
          strokeDasharray="3 4"
        />

        {copingModes.map((mode, index) => {
          const startAngle = index * copingAngleStep;
          const endAngle = (index + 1) * copingAngleStep;
          const position = labelPosition(
            outerR1,
            outerR2,
            startAngle,
            endAngle
          );
          const active = hoveredMode === mode.key;

          return (
            <g
              key={mode.key}
              role="button"
              tabIndex={0}
              aria-label={mode.name}
              style={{ cursor: 'pointer', outline: 'none' }}
              onMouseEnter={() => onHover(mode.key)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onClick(mode.key)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onClick(mode.key);
                }
              }}
            >
              <path
                d={sectorPath(
                  outerR1,
                  outerR2,
                  startAngle,
                  endAngle
                )}
                fill={mode.color}
                opacity={active ? 0.96 : 0.63}
                stroke={C.bg}
                strokeWidth="2"
              />

              <ModeLabel
                x={position.x}
                y={position.y}
                name={mode.name}
                fill={C.bg}
                small
              />
            </g>
          );
        })}

        {childModes.map((mode, index) => {
          const startAngle = index * childAngleStep;
          const endAngle = (index + 1) * childAngleStep;
          const position = labelPosition(
            innerR1,
            innerR2,
            startAngle,
            endAngle
          );
          const active = hoveredMode === mode.key;

          return (
            <g
              key={mode.key}
              role="button"
              tabIndex={0}
              aria-label={mode.name}
              style={{ cursor: 'pointer', outline: 'none' }}
              onMouseEnter={() => onHover(mode.key)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onClick(mode.key)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onClick(mode.key);
                }
              }}
            >
              <path
                d={sectorPath(
                  innerR1,
                  innerR2,
                  startAngle,
                  endAngle
                )}
                fill={mode.color}
                opacity={active ? 0.98 : 0.76}
                stroke={C.bg}
                strokeWidth="2"
              />

              <ModeLabel
                x={position.x}
                y={position.y}
                name={mode.name}
                fill={C.bg}
                small
              />
            </g>
          );
        })}

        <g
          role="button"
          tabIndex={0}
          aria-label="Здоровый Взрослый"
          style={{ cursor: 'pointer', outline: 'none' }}
          onMouseEnter={() => onHover('healthyAdult')}
          onMouseLeave={() => onHover(null)}
          onClick={() => onClick('healthyAdult')}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              onClick('healthyAdult');
            }
          }}
        >
          <circle
            cx={cx}
            cy={cy}
            r={centerR}
            fill={C.moss}
            opacity={hoveredMode === 'healthyAdult' ? 1 : 0.92}
            stroke={C.bg}
            strokeWidth="3"
            filter="url(#soft-shadow)"
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

        <text
          x={cx}
          y={686}
          textAnchor="middle"
          fontSize="11"
          fill={C.inkSoft}
          style={{ ...sans }}
        >
          Нажмите на сектор, чтобы открыть карточку режима
        </text>
      </svg>
    </div>
  );
}

function ModeLabel({
  x,
  y,
  name,
  fill,
  small = false,
}: {
  x: number;
  y: number;
  name: string;
  fill: string;
  small?: boolean;
}) {
  const words = name.split(' ');

  if (words.length === 1) {
    return (
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fontSize={small ? 10.5 : 12.5}
        fill={fill}
        style={{ ...serif, pointerEvents: 'none' }}
      >
        {name}
      </text>
    );
  }

  const lines =
    words.length <= 2
      ? words
      : [words.slice(0, 2).join(' '), words.slice(2).join(' ')];

  return (
    <>
      {lines.map((line, index) => (
        <text
          key={`${line}-${index}`}
          x={x}
          y={y + (index - (lines.length - 1) / 2) * 13 + 4}
          textAnchor="middle"
          fontSize={small ? 9.8 : 11.5}
          fill={fill}
          style={{ ...serif, pointerEvents: 'none' }}
        >
          {line}
        </text>
      ))}
    </>
  );
}

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
      className="scroll-mt-24 overflow-hidden"
      style={{
        backgroundColor: C.surface,
        borderRadius: radius.lg,
        boxShadow: isOpen ? shadow.soft : 'none',
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start gap-4 px-5 py-5 text-left md:px-6"
      >
        <span
          className="mt-2.5 h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: mode.color }}
        />

        <div className="flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-[19px] leading-[1.25] md:text-[21px]">
              {mode.name}
            </h3>

            <span
              className="text-[10.5px]"
              style={{ ...sans, color: C.inkSoft }}
            >
              {mode.nameEn}
            </span>
          </div>

          <p
            className="mt-2 text-[12.5px] leading-[1.6]"
            style={{ ...sans, color: C.inkSoft }}
          >
            {mode.shortDescription}
          </p>
        </div>

        <span
          className="mt-1 shrink-0 text-[22px] leading-none transition-transform duration-200"
          style={{
            color: C.inkSoft,
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          +
        </span>
      </button>

      {isOpen && (
        <div
          className="px-5 pb-6 pt-1 md:px-6 md:pb-7"
          style={{ borderTop: `1px solid ${C.line}` }}
        >
          <div className="pt-5">
            {mode.fullDescription.split('\n\n').map((paragraph) => (
              <p
                key={paragraph}
                className="mb-3 text-[13.5px] leading-[1.68] last:mb-0"
                style={{ ...sans, color: C.ink }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {mode.subtypes && mode.subtypes.length > 0 && (
            <div className="mt-6">
              <p
                className="text-[9.5px] uppercase tracking-[0.11em]"
                style={{ ...sans, color: C.inkSoft }}
              >
                Внутри этого режима иногда выделяют
              </p>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {mode.subtypes.map((subtype) => (
                  <div
                    key={subtype.name}
                    className="px-4 py-4"
                    style={{
                      backgroundColor: C.bg,
                      borderRadius: radius.md,
                    }}
                  >
                    <h4 className="text-[14.5px] leading-[1.3]">
                      {subtype.name}
                    </h4>

                    <p
                      className="mt-2 text-[11.5px] leading-[1.58]"
                      style={{ ...sans, color: C.inkSoft }}
                    >
                      {subtype.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div
            className="mt-6 px-4 py-4"
            style={{
              backgroundColor: C.surfaceWarm,
              borderRadius: radius.md,
            }}
          >
            <p
              className="text-[9.5px] uppercase tracking-[0.11em]"
              style={{ ...sans, color: C.terracotta }}
            >
              Как это может звучать изнутри
            </p>

            <p className="mt-2 text-[15px] leading-[1.5]">
              {mode.innerExperience}
            </p>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <ListBlock
              title="Что может запускать"
              items={mode.triggers}
              color={mode.color}
            />

            {mode.relatedSchemas.length > 0 ? (
              <ListBlock
                title="С какими схемами может быть связано"
                items={mode.relatedSchemas}
                color={mode.color}
              />
            ) : (
              <div>
                <p
                  className="text-[9.5px] uppercase tracking-[0.11em]"
                  style={{ ...sans, color: C.inkSoft }}
                >
                  Важный нюанс
                </p>

                <p
                  className="mt-3 text-[12.5px] leading-[1.62]"
                  style={{ ...sans, color: C.inkSoft }}
                >
                  Этот режим не нужно объяснять через одну конкретную
                  схему. Полезнее смотреть на условия, в которых он
                  становится доступнее или, наоборот, исчезает.
                </p>
              </div>
            )}
          </div>

          <div
            className="mt-6 px-5 py-5"
            style={{
              backgroundColor: C.bg,
              borderRadius: radius.md,
              borderLeft: `3px solid ${C.moss}`,
            }}
          >
            <p
              className="text-[9.5px] uppercase tracking-[0.11em]"
              style={{ ...sans, color: C.moss }}
            >
              Как может реагировать Здоровый Взрослый
            </p>

            <p
              className="mt-2 text-[13px] leading-[1.65]"
              style={{ ...sans, color: C.ink }}
            >
              {mode.healthyAdultResponse}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ListBlock({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: string;
}) {
  return (
    <div>
      <p
        className="text-[9.5px] uppercase tracking-[0.11em]"
        style={{ ...sans, color: C.inkSoft }}
      >
        {title}
      </p>

      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2.5 text-[12.5px] leading-[1.58]"
            style={{ ...sans, color: C.ink }}
          >
            <span style={{ color }}>·</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
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