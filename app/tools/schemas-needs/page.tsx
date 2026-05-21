'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { C, serif, sans } from '@/app/lib/theme';
import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import Eyebrow from '@/app/components/Eyebrow';
import Reveal from '@/app/components/Reveal';
import {
  needs,
  domains,
  schemas,
  additionalSchemas,
  getSchemasByDomain,
  getNeedByKey,
  type SchemaKey,
  type DomainKey,
  type Schema,
} from './data';

export default function SchemasAndNeedsMap() {
  const [openSchema, setOpenSchema] = useState<SchemaKey | null>(null);
  const [hoveredDomain, setHoveredDomain] = useState<DomainKey | null>(null);

  // Открыть карточку при переходе по якорю
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as SchemaKey;
    if (hash && schemas.some((s) => s.key === hash)) {
      setOpenSchema(hash);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  const toggleSchema = (key: SchemaKey) => {
    setOpenSchema(openSchema === key ? null : key);
  };

  const scrollToDomain = (domainKey: DomainKey) => {
    setTimeout(() => {
      const el = document.getElementById(`domain-${domainKey}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const classicNeeds = needs.filter((n) => n.isClassic);
  const extendedNeeds = needs.filter((n) => !n.isClassic);

  return (
    <div style={{ ...serif, backgroundColor: C.bg, color: C.ink }} className="min-h-screen">
      <Nav active="/tools" />

      {/* HERO */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 md:pt-28">
        <Reveal>
          <Eyebrow>Инструмент · постоянно</Eyebrow>
          <h1 className="text-4xl md:text-5xl leading-[1.1] tracking-tight font-normal mb-8">
            Карта схем и потребностей
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="text-lg leading-relaxed mb-6" style={{ color: C.inkSoft }}>
            У каждого человека есть пять базовых эмоциональных потребностей. Когда они удовлетворены в детстве — формируется здоровое функционирование. Когда какая-то из них фрустрируется — в этой области может развиться ранняя дезадаптивная схема: устойчивый паттерн мышления, чувствования и поведения, который продолжает работать во взрослой жизни.
          </p>
          <p className="text-base leading-relaxed mb-6" style={{ color: C.inkSoft }}>
            На этой карте — пять областей жизни (доменов), 18 схем, связи с потребностями и три способа, которыми каждая схема может проживаться: капитуляция, избегание, гиперкомпенсация.
          </p>
          <p className="text-base leading-relaxed" style={{ color: C.inkSoft }}>
            Кликните на любую схему — раскроется подробное описание: какая потребность не была удовлетворена, какой ранний опыт её сформировал, как она проживается через разные копинговые стратегии, и что делает в ответ Здоровый Взрослый.
          </p>
        </Reveal>
      </section>

      {/* SVG-КАРТА */}
      <section className="max-w-4xl mx-auto px-6 py-8 md:py-12">
        <Reveal>
          <NeedsAndDomainsMap
            hoveredDomain={hoveredDomain}
            onHoverDomain={setHoveredDomain}
            onClickDomain={scrollToDomain}
          />
        </Reveal>
      </section>

      {/* БАЗОВЫЕ ПОТРЕБНОСТИ */}
      <section className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <Reveal>
          <div className="mb-10">
            <Eyebrow>Базовые потребности</Eyebrow>
            <h2 className="text-2xl md:text-3xl leading-tight font-normal mb-5">
              Пять опор здорового развития
            </h2>
            <p className="text-base leading-relaxed max-w-2xl" style={{ color: C.inkSoft }}>
              Когда эти потребности удовлетворены в детстве — у человека есть фундамент. Когда какая-то из них хронически фрустрируется — в соответствующей области могут развиться дезадаптивные схемы.
            </p>
          </div>
        </Reveal>

        <div className="space-y-5">
          {classicNeeds.map((need, i) => (
            <Reveal key={need.key} delay={i * 60}>
              <div className="p-7 rounded-sm" style={{ backgroundColor: C.surface }}>
                <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                  <h3 className="text-xl">{need.name}</h3>
                  <span className="text-xs" style={{ ...sans, color: C.inkSoft }}>
                    {need.nameEn}
                  </span>
                </div>
                <p className="text-base leading-relaxed mb-5" style={{ color: C.ink }}>
                  {need.description}
                </p>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="p-4 rounded-sm" style={{ backgroundColor: C.bg, borderLeft: `2px solid ${C.moss}` }}>
                    <p className="text-xs tracking-widest uppercase mb-2" style={{ ...sans, color: C.moss }}>
                      Когда удовлетворена
                    </p>
                    <p className="text-[14px] leading-relaxed" style={{ color: C.ink }}>
                      {need.metMeans}
                    </p>
                  </div>
                  <div className="p-4 rounded-sm" style={{ backgroundColor: C.bg, borderLeft: `2px solid ${C.terracotta}` }}>
                    <p className="text-xs tracking-widest uppercase mb-2" style={{ ...sans, color: C.terracotta }}>
                      Когда фрустрирована
                    </p>
                    <p className="text-[14px] leading-relaxed" style={{ color: C.ink }}>
                      {need.unmetMeans}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* КАРТОЧКИ СХЕМ ПО ДОМЕНАМ */}
      {domains.map((domain, idx) => {
        const domainSchemas = getSchemasByDomain(domain.key);
        const need = getNeedByKey(domain.needKey);
        return (
          <section
            key={domain.key}
            id={`domain-${domain.key}`}
            className="max-w-4xl mx-auto px-6 py-12 md:py-16 scroll-mt-20"
          >
            <Reveal>
              <div className="mb-10">
                <p
                  className="text-xs tracking-widest uppercase mb-3"
                  style={{ ...sans, color: domain.color }}
                >
                  Домен {idx + 1} из 5
                </p>
                <h2 className="text-2xl md:text-3xl leading-tight font-normal mb-3">
                  {domain.name}
                </h2>
                <p className="text-sm mb-5" style={{ ...sans, color: C.inkSoft }}>
                  {domain.nameEn}
                </p>
                <p className="text-base leading-relaxed mb-5 max-w-2xl" style={{ color: C.inkSoft }}>
                  {domain.shortDescription}
                </p>
                {need && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: C.surface }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: domain.color }} />
                    <span className="text-sm" style={{ ...sans, color: C.ink }}>
                      Фрустрированная потребность: {need.name}
                    </span>
                  </div>
                )}
              </div>
            </Reveal>

            <div className="space-y-4">
              {domainSchemas.map((schema, i) => (
                <Reveal key={schema.key} delay={i * 50}>
                  <SchemaCard
                    schema={schema}
                    domainColor={domain.color}
                    isOpen={openSchema === schema.key}
                    onToggle={() => toggleSchema(schema.key)}
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
              Две новые потребности и три новых схемы
            </h2>
            <p className="text-base leading-relaxed mb-3 max-w-2xl" style={{ color: C.inkSoft }}>
              В классической модели Янга — пять потребностей и 18 схем. В работе Arntz, Rijkeboer и коллег (Cognitive Therapy and Research, 2021) предложено расширение теории: две дополнительные потребности и три новые схемы.
            </p>
            <p className="text-base leading-relaxed max-w-2xl" style={{ color: C.inkSoft }}>
              Эти концепции пока не входят в YSQ-S3, но используются в современной клинической работе — особенно при работе с тяжёлой травмой, диссоциацией, экзистенциальными темами.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <p className="text-xs tracking-widest uppercase mb-5" style={{ ...sans, color: C.inkSoft }}>
            Дополнительные потребности
          </p>
        </Reveal>
        <div className="space-y-4 mb-10">
          {extendedNeeds.map((need, i) => (
            <Reveal key={need.key} delay={i * 60}>
              <div className="p-6 rounded-sm" style={{ backgroundColor: C.surface }}>
                <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                  <h3 className="text-lg">{need.name}</h3>
                  <span className="text-xs" style={{ ...sans, color: C.inkSoft }}>
                    {need.nameEn}
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed" style={{ color: C.ink }}>
                  {need.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="text-xs tracking-widest uppercase mb-5" style={{ ...sans, color: C.inkSoft }}>
            Дополнительные схемы
          </p>
        </Reveal>
        <div className="space-y-4">
          {additionalSchemas.map((schema, i) => {
            const need = getNeedByKey(schema.needKey);
            return (
              <Reveal key={schema.key} delay={i * 50}>
                <div className="p-6 rounded-sm" style={{ backgroundColor: C.surface }}>
                  <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                    <h3 className="text-lg">{schema.name}</h3>
                    <span className="text-xs" style={{ ...sans, color: C.inkSoft }}>
                      {schema.nameEn}
                    </span>
                  </div>
                  <p className="text-[15px] leading-relaxed mb-4" style={{ color: C.ink }}>
                    {schema.description}
                  </p>
                  {need && (
                    <p className="text-xs" style={{ ...sans, color: C.inkSoft }}>
                      Связь с потребностью: {need.name}
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <Reveal>
          <div className="rounded-sm p-12 md:p-20 text-center" style={{ backgroundColor: C.ink, color: C.bg }}>
            <h2 className="text-3xl md:text-4xl leading-tight font-normal mb-8 max-w-3xl mx-auto">
              Знание схем не отменяет их работы
            </h2>
            <p className="text-lg leading-relaxed max-w-xl mx-auto mb-10" style={{ color: '#C9C2B5' }}>
              Понять схему — первый шаг. Изменить её — работа годами, в которой важен живой контакт, опыт коррекции, новые отношения. Это то, что мы делаем в схема-терапии.
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
              href="/tools/schema-test"
              className="px-6 py-3 rounded-full text-sm transition-all hover:-translate-y-0.5"
              style={{ ...sans, backgroundColor: C.surface, color: C.ink, border: `1px solid ${C.line}` }}
            >
              Тест на схемы YSQ-S3 →
            </Link>
            <Link
              href="/tools/schema-modes"
              className="px-6 py-3 rounded-full text-sm transition-all hover:-translate-y-0.5"
              style={{ ...sans, backgroundColor: C.surface, color: C.ink, border: `1px solid ${C.line}` }}
            >
              Карта режимов →
            </Link>
            <Link
              href="/tools/schema-modes-test"
              className="px-6 py-3 rounded-full text-sm transition-all hover:-translate-y-0.5"
              style={{ ...sans, backgroundColor: C.surface, color: C.ink, border: `1px solid ${C.line}` }}
            >
              Опросник режимов SMI →
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}

// ============================================================
// SVG-карта
// ============================================================

function NeedsAndDomainsMap({
  hoveredDomain,
  onHoverDomain,
  onClickDomain,
}: {
  hoveredDomain: DomainKey | null;
  onHoverDomain: (key: DomainKey | null) => void;
  onClickDomain: (key: DomainKey) => void;
}) {
  const cx = 350;
  const cy = 350;
  const centerR = 70;
  const islandR = 95;
  const orbitR = 220;

  const positions = domains.map((d, i) => {
    const angle = (i * (2 * Math.PI)) / 5 - Math.PI / 2;
    return {
      x: cx + orbitR * Math.cos(angle),
      y: cy + orbitR * Math.sin(angle),
      domain: d,
    };
  });

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <p className="text-xs tracking-widest uppercase" style={{ ...sans, color: C.inkSoft }}>
          Пять доменов жизни
        </p>
      </div>

      <svg viewBox="0 0 700 700" className="w-full h-auto" style={{ maxHeight: '700px' }}>
        <defs>
          <filter id="soft-shadow-needs" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.18" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {positions.map((p) => {
          const dx = p.x - cx;
          const dy = p.y - cy;
          const len = Math.sqrt(dx * dx + dy * dy);
          const ux = dx / len;
          const uy = dy / len;
          const x1 = cx + ux * centerR;
          const y1 = cy + uy * centerR;
          const x2 = p.x - ux * islandR;
          const y2 = p.y - uy * islandR;
          const isHovered = hoveredDomain === p.domain.key;
          return (
            <line
              key={`line-${p.domain.key}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isHovered ? p.domain.color : C.line}
              strokeWidth={isHovered ? 2 : 1}
              opacity={isHovered ? 0.8 : 0.5}
              style={{ transition: 'all 0.2s' }}
            />
          );
        })}

        <g>
          <circle
            cx={cx}
            cy={cy}
            r={centerR}
            fill={C.moss}
            opacity={0.9}
            stroke={C.bg}
            strokeWidth="3"
            filter="url(#soft-shadow-needs)"
          />
          <text x={cx} y={cy - 10} textAnchor="middle" fontSize="14" fill={C.bg} style={{ ...serif }}>
            5 базовых
          </text>
          <text x={cx} y={cy + 10} textAnchor="middle" fontSize="14" fill={C.bg} style={{ ...serif }}>
            потребностей
          </text>
        </g>

        {positions.map((p) => {
          const isHovered = hoveredDomain === p.domain.key;
          const schemasCount = getSchemasByDomain(p.domain.key).length;
          return (
            <g
              key={p.domain.key}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => onHoverDomain(p.domain.key)}
              onMouseLeave={() => onHoverDomain(null)}
              onClick={() => onClickDomain(p.domain.key)}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={islandR}
                fill={p.domain.color}
                opacity={isHovered ? 0.95 : 0.85}
                stroke={C.bg}
                strokeWidth="3"
                filter="url(#soft-shadow-needs)"
                style={{ transition: 'opacity 0.2s' }}
              />
              <DomainLabel x={p.x} y={p.y} name={p.domain.name} schemasCount={schemasCount} />
            </g>
          );
        })}

        <text
          x={cx}
          y={680}
          textAnchor="middle"
          fontSize="11"
          fill={C.inkSoft}
          style={{ ...sans, letterSpacing: '0.05em' }}
        >
          Кликните на домен, чтобы перейти к его схемам
        </text>
      </svg>
    </div>
  );
}

function DomainLabel({ x, y, name, schemasCount }: { x: number; y: number; name: string; schemasCount: number }) {
  const words = name.split(' ');
  const lines: string[] = [];
  if (words.length <= 2) {
    lines.push(...words);
  } else {
    if (words[0].length + words[1].length < 18) {
      lines.push(words[0] + ' ' + words[1]);
      lines.push(words.slice(2).join(' '));
    } else {
      lines.push(words[0]);
      lines.push(words.slice(1).join(' '));
    }
  }

  const lineHeight = 18;
  const totalHeight = lines.length * lineHeight;
  const startY = y - totalHeight / 2 + lineHeight / 2 - 6;

  return (
    <>
      {lines.map((line, i) => (
        <text
          key={i}
          x={x}
          y={startY + i * lineHeight}
          textAnchor="middle"
          fontSize="13"
          fill={C.bg}
          style={{ ...serif, pointerEvents: 'none' }}
        >
          {line}
        </text>
      ))}
      <text
        x={x}
        y={y + totalHeight / 2 + 14}
        textAnchor="middle"
        fontSize="10"
        fill={C.bg}
        opacity={0.85}
        style={{ ...sans, letterSpacing: '0.1em', pointerEvents: 'none' }}
      >
        {schemasCount} {schemasCount === 1 ? 'схема' : schemasCount < 5 ? 'схемы' : 'схем'}
      </text>
    </>
  );
}

// ============================================================
// Раскрывающаяся карточка схемы
// ============================================================

function SchemaCard({
  schema,
  domainColor,
  isOpen,
  onToggle,
}: {
  schema: Schema;
  domainColor: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      id={schema.key}
      className="rounded-sm overflow-hidden scroll-mt-24"
      style={{ backgroundColor: C.surface }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-7 flex items-start gap-5 transition-colors"
        style={{ backgroundColor: 'transparent' }}
      >
        <div
          className="shrink-0 w-2 h-2 rounded-full mt-3"
          style={{ backgroundColor: domainColor }}
        />
        <div className="flex-1">
          <div className="flex items-baseline gap-3 mb-2 flex-wrap">
            <h3 className="text-xl md:text-2xl">{schema.name}</h3>
            <span className="text-xs" style={{ ...sans, color: C.inkSoft }}>
              {schema.nameEn}
            </span>
          </div>
          <p className="text-[15px] italic leading-relaxed" style={{ color: C.inkSoft }}>
            {schema.motto}
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

      {isOpen && (
        <div className="px-7 pb-8 pt-2" style={{ borderTop: `1px solid ${C.line}` }}>
          {/* Короткое описание из теста — как первый абзац-вход */}
          <div className="pt-6 mb-6 pl-6 border-l-2" style={{ borderColor: domainColor }}>
            <p className="text-[17px] leading-relaxed" style={{ color: C.ink }}>
              {schema.shortDescription}
            </p>
          </div>

          {/* Подробное описание */}
          <div className="mb-8">
            {schema.description.split('\n\n').map((para, i) => (
              <p key={i} className="text-base leading-relaxed mb-4 last:mb-0" style={{ color: C.ink }}>
                {para}
              </p>
            ))}
          </div>

          {/* Ранний опыт */}
          <div className="mb-8">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ ...sans, color: C.inkSoft }}>
              Типичный ранний опыт
            </p>
            <p className="text-base leading-relaxed" style={{ color: C.ink }}>
              {schema.earlyExperience}
            </p>
          </div>

          {/* Три копинговые стратегии */}
          <div className="mb-8">
            <p className="text-xs tracking-widest uppercase mb-5" style={{ ...sans, color: C.inkSoft }}>
              Три способа проживания схемы
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <CopingBox title="Капитуляция" titleEn="Surrender" description={schema.copingSurrender} color={domainColor} />
              <CopingBox title="Избегание" titleEn="Avoidance" description={schema.copingAvoidance} color={domainColor} />
              <CopingBox title="Гиперкомпенсация" titleEn="Overcompensation" description={schema.copingOvercompensation} color={domainColor} />
            </div>
          </div>

          {/* Здоровый Взрослый */}
          <div className="p-6 rounded-sm" style={{ backgroundColor: C.bg, borderLeft: `3px solid ${C.moss}` }}>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ ...sans, color: C.moss }}>
              Что делает Здоровый Взрослый
            </p>
            <p className="text-base leading-relaxed" style={{ color: C.ink }}>
              {schema.healthyAdultResponse}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function CopingBox({
  title,
  titleEn,
  description,
  color,
}: {
  title: string;
  titleEn: string;
  description: string;
  color: string;
}) {
  return (
    <div className="p-5 rounded-sm" style={{ backgroundColor: C.bg }}>
      <div className="mb-3 pb-3" style={{ borderBottom: `1px solid ${C.line}` }}>
        <p className="text-sm mb-1" style={{ color, fontWeight: 500 }}>
          {title}
        </p>
        <p className="text-[11px] tracking-wider uppercase" style={{ ...sans, color: C.inkSoft }}>
          {titleEn}
        </p>
      </div>
      <p className="text-[14px] leading-relaxed" style={{ color: C.ink }}>
        {description}
      </p>
    </div>
  );
}