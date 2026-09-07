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
  domains,
  extraSchemas,
  getNeedByKey,
  getSchemasByDomain,
  needs,
  schemas,
  type DomainKey,
  type Schema,
  type SchemaKey,
} from './data';

export default function SchemasAndNeedsMap() {
  const [openSchema, setOpenSchema] = useState<SchemaKey | null>(null);
  const [hoveredDomain, setHoveredDomain] = useState<DomainKey | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as SchemaKey;

    if (hash && schemas.some((schema) => schema.key === hash)) {
      setOpenSchema(hash);

      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  }, []);

  function toggleSchema(key: SchemaKey) {
    setOpenSchema((current) => (current === key ? null : key));
  }

  function scrollToDomain(key: DomainKey) {
    window.setTimeout(() => {
      document.getElementById(`domain-${key}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 40);
  }

  const classicNeeds = needs.filter((need) => need.isClassic);
  const extendedNeeds = needs.filter((need) => !need.isClassic);

  const classicNotMss = extraSchemas.filter(
    (schema) => schema.type === 'classic_not_mss'
  );

  const reformulated = extraSchemas.filter(
    (schema) => schema.type === 'reformulated'
  );

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
              Карта схем и потребностей
            </h1>

            <p
  className="mt-5 w-full text-[15px] leading-[1.7] md:text-[16px]"
  style={{ ...sans, color: C.inkSoft }}
>
  Схема — это устойчивый способ воспринимать и объяснять происходящее,
  ожидать определенного развития событий и реагировать на него. В знакомой
  ситуации быстро появляется привычный вывод: меня бросят, я не справлюсь,
  мои желания менее важны или ошибка недопустима.
</p>
          </Reveal>

          <Reveal delay={40}>
            <div className="mt-7 grid gap-3 md:grid-cols-3">
              <InfoCard
  title="19 тем MSS-YSQ"
  text="Названия 19 схем в карте совпадают с названиями шкал опросника MSS-YSQ на этом сайте."
/>

<InfoCard
  title="Схема — не тип личности"
  text="У одного человека могут проявляться разные схемы, а их выраженность и влияние меняются в зависимости от ситуации."
/>

<InfoCard
  title="Три способа совладания"
  text="В карточках показано, как одна и та же схема может поддерживаться через капитуляцию, избегание или гиперкомпенсацию."
/>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-7 md:px-8">
          <Reveal delay={60}>
            <div
  className="grid gap-y-3 px-5 py-5 md:grid-cols-[0.78fr_1.22fr] md:gap-x-9 md:px-6"
  style={{
    backgroundColor: C.surfaceWarm,
    borderRadius: radius.lg,
  }}
>
  <div>
    <Eyebrow>Важный нюанс</Eyebrow>
  </div>

  <div className="hidden md:block" />

  <h2 className="text-[26px] leading-[1.1] md:text-[31px]">
    Схемы не сводятся к одному событию из детства
  </h2>

  <div
    className="space-y-3 text-[12.5px] leading-[1.68] md:pt-[4px] md:text-[13.5px]"
    style={{ ...sans, color: C.ink }}
  >
    <p>
      В схема-терапии предполагается, что на формирование устойчивых схем
      могут влиять ранний опыт, темперамент и повторяющиеся отношения.
      Но по одному результату нельзя достоверно определить, почему
      конкретная схема возникла именно у этого человека.
    </p>

    <p>
      Поэтому раздел «Что могло повлиять» в карточках — это гипотезы
      для размышления, а не готовое объяснение вашей биографии.
    </p>
  </div>
</div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-7 md:px-8 md:py-9">
          <Reveal>
            <div className="mb-5 text-center">
              <Eyebrow>Пять областей</Eyebrow>
              <h2 className="mt-3 text-[29px] leading-[1.08] md:text-[36px]">
                Как схемы связаны с потребностями
              </h2>
              <p
                className="mx-auto mt-3 max-w-[760px] text-[12.5px] leading-[1.65]"
                style={{ ...sans, color: C.inkSoft }}
              >
                Нажмите на область, чтобы перейти к связанным с ней схемам.
                Это карта теоретических связей модели, а не причинная диаграмма
                конкретного человека.
              </p>
            </div>

            <NeedsMap
              hoveredDomain={hoveredDomain}
              onHover={setHoveredDomain}
              onClick={scrollToDomain}
            />
          </Reveal>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-7 md:px-8 md:py-9">
          <Reveal>
            <div className="grid gap-y-3 md:grid-cols-[0.72fr_1.28fr] md:gap-x-10">
  <div>
    <Eyebrow>Эмоциональные потребности</Eyebrow>
  </div>

  <div className="hidden md:block" />

  <h2 className="text-[29px] leading-[1.08] md:text-[35px]">
    Пять классических областей
  </h2>

  <p
    className="text-[13px] leading-[1.65] md:pt-[4px]"
    style={{ ...sans, color: C.inkSoft }}
  >
    В классической теории схема-терапии выделяют пять широких
    областей эмоциональных потребностей. Речь не о списке, где
    каждый пункт должен быть закрыт на сто процентов, а о достаточно
    устойчивом опыте безопасности, автономии, возможности выражать
    себя, спонтанности и понятных границ.
  </p>
</div>
          </Reveal>

          <div className="mt-6 space-y-3">
            {classicNeeds.map((need, index) => (
              <Reveal key={need.key} delay={index * 35}>
                <NeedCard need={need} />
              </Reveal>
            ))}
          </div>
        </section>

        {domains.map((domain, index) => {
          const domainSchemas = getSchemasByDomain(domain.key);
          const need = getNeedByKey(domain.needKey);

          return (
            <section
              key={domain.key}
              id={`domain-${domain.key}`}
              className="mx-auto max-w-5xl scroll-mt-20 px-6 py-7 md:px-8 md:py-9"
            >
              <Reveal>
                <div className="grid gap-y-3 md:grid-cols-[0.72fr_1.28fr] md:gap-x-10">
                  <div>
                    <p
                      className="text-[10px] uppercase tracking-[0.11em]"
                      style={{ ...sans, color: domain.color }}
                    >
                      Область {index + 1} из 5
                    </p>
                  </div>
                  <div className="hidden md:block" />

                  <div>
                    <h2 className="text-[29px] leading-[1.08] md:text-[35px]">
                      {domain.name}
                    </h2>
                    <p
                      className="mt-1 text-[10.5px]"
                      style={{ ...sans, color: C.inkSoft }}
                    >
                      {domain.nameEn}
                    </p>
                  </div>

                  <div className="md:pt-[4px]">
  <p
    className="text-[13px] leading-[1.65]"
    style={{ ...sans, color: C.inkSoft }}
  >
    {domain.shortDescription}
  </p>

  {need && (
    <div
      className="mt-3 inline-flex items-center gap-2 px-3 py-2"
      style={{
        backgroundColor: C.surface,
        borderRadius: radius.pill,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: domain.color }}
      />

      <span
        className="text-[10.5px]"
        style={{ ...sans, color: C.ink }}
      >
        Связано с потребностью: {need.name}
      </span>
    </div>
  )}
</div>
                </div>
              </Reveal>

              <div className="mt-5 space-y-3">
                {domainSchemas.map((schema, schemaIndex) => (
                  <Reveal key={schema.key} delay={schemaIndex * 30}>
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
        <section className="mx-auto max-w-5xl px-6 py-7 md:px-8 md:py-9">
          <Reveal>
            <div
  className="grid gap-y-3 px-5 py-5 md:grid-cols-[0.78fr_1.22fr] md:gap-x-9 md:px-6"
  style={{
    backgroundColor: C.surface,
    borderRadius: radius.lg,
  }}
>
  <div>
    <Eyebrow>Почему не ровно 18 схем</Eyebrow>
  </div>

  <div className="hidden md:block" />

  <h2 className="text-[25px] leading-[1.1] md:text-[30px]">
    Карта синхронизирована с MSS-YSQ
  </h2>

  <div
    className="space-y-3 text-[12.5px] leading-[1.65] md:pt-[4px]"
    style={{ ...sans, color: C.inkSoft }}
  >
                <p>
                  В классической модели Янга обычно говорят о 18 схемах.
                  MSS-YSQ устроен немного иначе: отдельно оценивает
                  пунитивность к себе и к другим, добавляет тему низкой
                  самоэффективности и не использует Недостаточный самоконтроль
                  как отдельную шкалу.
                </p>

                {classicNotMss.map((schema) => (
                  <div
                    key={schema.key}
                    className="mt-3 px-4 py-4"
                    style={{
                      backgroundColor: C.bg,
                      borderRadius: radius.md,
                    }}
                  >
                    <h3 className="text-[15px] leading-[1.3]">
                      {schema.name}
                    </h3>
                    <p
                      className="mt-2 text-[11.5px] leading-[1.58]"
                      style={{ ...sans, color: C.inkSoft }}
                    >
                      {schema.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-7 md:px-8 md:py-9">
          <Reveal>
            <div className="grid gap-y-3 md:grid-cols-[0.72fr_1.28fr] md:gap-x-10">
  <div>
    <Eyebrow>Развитие модели</Eyebrow>
  </div>

  <div className="hidden md:block" />

  <h2 className="text-[29px] leading-[1.08] md:text-[35px]">
    Что предложили добавить позже
  </h2>

  <p
    className="text-[13px] leading-[1.65] md:pt-[4px]"
    style={{ ...sans, color: C.inkSoft }}
  >
    В 2021 году международная рабочая группа предложила
    расширить теорию двумя потребностями и тремя схемами.
    Я отделяю это развитие модели от основной карты и результатов
    MSS-YSQ, чтобы не смешивать разные версии классификации.
  </p>
</div>
          </Reveal>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {extendedNeeds.map((need) => (
              <div
                key={need.key}
                className="px-5 py-5"
                style={{
                  backgroundColor: C.surfaceWarm,
                  borderRadius: radius.md,
                }}
              >
                <p
                  className="text-[9.5px] uppercase tracking-[0.1em]"
                  style={{ ...sans, color: C.terracotta }}
                >
                  Дополнительная потребность
                </p>
                <h3 className="mt-2 text-[17px] leading-[1.25]">
                  {need.name}
                </h3>
                <p
                  className="mt-2 text-[11.5px] leading-[1.58]"
                  style={{ ...sans, color: C.inkSoft }}
                >
                  {need.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {reformulated.map((schema) => (
              <div
                key={schema.key}
                className="px-5 py-5"
                style={{
                  backgroundColor: C.surface,
                  borderRadius: radius.md,
                }}
              >
                <p
                  className="text-[9.5px] uppercase tracking-[0.1em]"
                  style={{ ...sans, color: C.inkSoft }}
                >
                  Предложенная схема
                </p>
                <h3 className="mt-2 text-[16px] leading-[1.3]">
                  {schema.name}
                </h3>
                <p
                  className="mt-2 text-[11.5px] leading-[1.58]"
                  style={{ ...sans, color: C.inkSoft }}
                >
                  {schema.description}
                </p>
              </div>
            ))}
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
                <Eyebrow>Если узнаете знакомый паттерн</Eyebrow>
                <h2 className="mt-3 max-w-3xl text-[28px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[34px]">
                  Знакомый паттерн стоит проверять на конкретных ситуациях
                </h2>
                <p
                  className="mt-3 max-w-2xl text-[13px] leading-[1.6]"
                  style={{ ...sans, color: '#C9C2B5' }}
                >
                  На встрече разберем, когда этот паттерн включается, какие выводы
появляются автоматически, как вы обычно реагируете и что помогает
ему повторяться.
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
                  Хотите сначала посмотреть на свой профиль?
                </p>
                <p
                  className="mt-1 text-[11.5px] leading-[1.5]"
                  style={{ ...sans, color: C.inkSoft }}
                >
                  Можно пройти MSS-YSQ или открыть карту режимов, которые
                  описывают уже не устойчивую тему, а состояние в конкретный
                  момент.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/tools/schema-test"
                  className="text-[12px] underline underline-offset-4"
                  style={{ ...sans, color: C.ink }}
                >
                  Опросник схем MSS-YSQ →
                </Link>
                <Link
                  href="/tools/schema-modes"
                  className="text-[12px] underline underline-offset-4"
                  style={{ ...sans, color: C.ink }}
                >
                  Карта режимов →
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

function NeedsMap({
  hoveredDomain,
  onHover,
  onClick,
}: {
  hoveredDomain: DomainKey | null;
  onHover: (key: DomainKey | null) => void;
  onClick: (key: DomainKey) => void;
}) {
  const positions: Record<DomainKey, { x: number; y: number; w: number; h: number }> = {
    disconnection: { x: 35, y: 55, w: 215, h: 125 },
    impairedAutonomy: { x: 275, y: 30, w: 210, h: 125 },
    otherDirectedness: { x: 510, y: 70, w: 215, h: 125 },
    overvigilance: { x: 110, y: 290, w: 230, h: 125 },
    impairedLimits: { x: 420, y: 300, w: 230, h: 125 },
  };

  return (
    <div
      className="overflow-hidden px-3 py-4 sm:px-5"
      style={{ backgroundColor: C.surface, borderRadius: radius.lg }}
    >
      <svg
        viewBox="0 0 760 500"
        className="h-auto w-full"
        role="img"
        aria-label="Карта пяти областей схем и связанных эмоциональных потребностей"
      >
        {domains.map((domain) => {
          const position = positions[domain.key];
          const active = hoveredDomain === domain.key;
          const need = getNeedByKey(domain.needKey);
          const words = domain.name.split(' ');
          const line1 = domain.name.length > 24 ? words.slice(0, 2).join(' ') : domain.name;
          const line2 = domain.name.length > 24 ? words.slice(2).join(' ') : '';

          return (
            <g
              key={domain.key}
              role="button"
              tabIndex={0}
              aria-label={domain.name}
              style={{ cursor: 'pointer', outline: 'none' }}
              onMouseEnter={() => onHover(domain.key)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onClick(domain.key)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onClick(domain.key);
                }
              }}
            >
              <rect
                x={position.x}
                y={position.y}
                width={position.w}
                height={position.h}
                rx="26"
                fill={active ? domain.color : C.bg}
                stroke={domain.color}
                strokeWidth={active ? 2 : 1.2}
              />

              <foreignObject
  x={position.x + 14}
  y={position.y + 14}
  width={position.w - 28}
  height={position.h - 28}
  style={{ pointerEvents: 'none' }}
>
  <div
  style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}
  >
    <div
      style={{
        ...serif,
        color: active ? C.bg : C.ink,
        fontSize: '15px',
        lineHeight: 1.18,
      }}
    >
      {domain.name}
    </div>

    <div
      style={{
        ...sans,
        marginTop: '14px',
        maxWidth: '180px',
        color: active ? C.bg : C.inkSoft,
        fontSize: '10.5px',
        lineHeight: 1.35,
      }}
    >
      {need?.name ?? ''}
    </div>
  </div>
</foreignObject>
            </g>
          );
        })}

        <circle cx="380" cy="245" r="58" fill={C.surfaceWarm} stroke={C.line} strokeWidth="1" />
        <text x="380" y="239" textAnchor="middle" fontSize="13" fill={C.ink} style={{ ...serif }}>
          Потребности
        </text>
        <text x="380" y="258" textAnchor="middle" fontSize="11" fill={C.inkSoft} style={{ ...sans }}>
          и устойчивые схемы
        </text>
      </svg>
    </div>
  );
}

function NeedCard({ need }: { need: (typeof needs)[number] }) {
  return (
    <div
      className="px-5 py-5 md:px-6"
      style={{ backgroundColor: C.surface, borderRadius: radius.lg }}
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-[18px] leading-[1.3]">{need.name}</h3>
        <span className="text-[10.5px]" style={{ ...sans, color: C.inkSoft }}>
          {need.nameEn}
        </span>
      </div>

      <p className="mt-3 text-[12.5px] leading-[1.62]" style={{ ...sans, color: C.inkSoft }}>
        {need.description}
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div
          className="px-4 py-4"
          style={{ backgroundColor: C.bg, borderRadius: radius.md, borderLeft: `3px solid ${C.moss}` }}
        >
          <p className="text-[9.5px] uppercase tracking-[0.1em]" style={{ ...sans, color: C.moss }}>
            Когда этого достаточно
          </p>
          <p className="mt-2 text-[11.5px] leading-[1.58]" style={{ ...sans, color: C.inkSoft }}>
            {need.whenSupported}
          </p>
        </div>

        <div
          className="px-4 py-4"
          style={{ backgroundColor: C.bg, borderRadius: radius.md, borderLeft: `3px solid ${C.terracotta}` }}
        >
          <p className="text-[9.5px] uppercase tracking-[0.1em]" style={{ ...sans, color: C.terracotta }}>
            Когда этого долго не хватает
          </p>
          <p className="mt-2 text-[11.5px] leading-[1.58]" style={{ ...sans, color: C.inkSoft }}>
            {need.whenMissing}
          </p>
        </div>
      </div>
    </div>
  );
}
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
          style={{ backgroundColor: domainColor }}
        />

        <div className="flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-[19px] leading-[1.25] md:text-[21px]">
              {schema.name}
            </h3>
            <span className="text-[10.5px]" style={{ ...sans, color: C.inkSoft }}>
              {schema.nameEn}
            </span>
          </div>

          <p className="mt-2 text-[12.5px] leading-[1.6]" style={{ ...sans, color: C.inkSoft }}>
            {schema.shortDescription}
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
            {schema.description.split('\n\n').map((paragraph) => (
              <p
                key={paragraph}
                className="mb-3 text-[13.5px] leading-[1.68] last:mb-0"
                style={{ ...sans, color: C.ink }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div
            className="mt-6 px-4 py-4"
            style={{ backgroundColor: C.surfaceWarm, borderRadius: radius.md }}
          >
            <p className="text-[9.5px] uppercase tracking-[0.11em]" style={{ ...sans, color: C.terracotta }}>
              Как это может звучать
            </p>
            <p className="mt-2 text-[15px] leading-[1.5]">
              {schema.howItMaySound}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-[9.5px] uppercase tracking-[0.11em]" style={{ ...sans, color: C.inkSoft }}>
              Что могло повлиять
            </p>
            <p className="mt-2 text-[12.5px] leading-[1.64]" style={{ ...sans, color: C.inkSoft }}>
              {schema.possibleOrigins}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-[9.5px] uppercase tracking-[0.11em]" style={{ ...sans, color: C.inkSoft }}>
              Как с этой темой иногда справляются
            </p>

            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <CopingCard title="Капитуляция" text={schema.copingSurrender} />
              <CopingCard title="Избегание" text={schema.copingAvoidance} />
              <CopingCard title="Гиперкомпенсация" text={schema.copingOvercompensation} />
            </div>
          </div>

          <div
            className="mt-6 px-5 py-5"
            style={{
              backgroundColor: C.bg,
              borderRadius: radius.md,
              borderLeft: `3px solid ${C.moss}`,
            }}
          >
            <p className="text-[9.5px] uppercase tracking-[0.11em]" style={{ ...sans, color: C.moss }}>
              Что можно проверять вместо автоматического сценария
            </p>
            <p className="mt-2 text-[13px] leading-[1.65]" style={{ ...sans, color: C.ink }}>
              {schema.healthyAdultResponse}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function CopingCard({ title, text }: { title: string; text: string }) {
  return (
    <div
      className="px-4 py-4"
      style={{ backgroundColor: C.bg, borderRadius: radius.md }}
    >
      <h4 className="text-[13.5px] leading-[1.3]">{title}</h4>
      <p className="mt-2 text-[11.5px] leading-[1.58]" style={{ ...sans, color: C.inkSoft }}>
        {text}
      </p>
    </div>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div
      className="px-5 py-5"
      style={{ backgroundColor: C.surface, borderRadius: radius.md }}
    >
      <h2 className="text-[15px] leading-[1.3]">{title}</h2>
      <p className="mt-2 text-[11.5px] leading-[1.55]" style={{ ...sans, color: C.inkSoft }}>
        {text}
      </p>
    </div>
  );
}