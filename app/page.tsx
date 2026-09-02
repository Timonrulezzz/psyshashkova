import Image from 'next/image';
import Link from 'next/link';

import { C, radius, shadow, sans } from '@/app/lib/theme';
import { site, siteDisplay } from '@/app/data/site';
import { createPageMetadata } from '@/app/lib/metadata';

import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import Eyebrow from '@/app/components/Eyebrow';
import Reveal from '@/app/components/Reveal';
import CountUp from '@/app/components/CountUp';
import RotatingWords from '@/app/components/RotatingWords';
import MechanismExplorer from '@/app/components/MechanismExplorer';
import HeroGlow from '@/app/components/HeroGlow';
import AnimatedRule from '@/app/components/AnimatedRule';

export const metadata = createPageMetadata({
  title: 'Психолог онлайн: КПТ и схема-терапия',
  description:
    'Онлайн-консультации психолога для взрослых. Тревога, самокритика, отношения, границы и повторяющиеся жизненные сценарии. КПТ и схема-терапия.',
  path: '/',
});

const heroWords = [
  'понятнее',
  'спокойнее',
  'устойчивее',
  'свободнее',
] as const;

const heroTopics = [
  'Тревога и паника',
  'Самооценка и самокритика',
  'Отношения и привязанность',
  'Навязчивые мысли',
  'Границы и чужое мнение',
  'Выгорание и работа',
] as const;

const patterns = [
  {
    number: '01',
    title: 'Тревога, паника и навязчивые мысли',
    text:
      'Постоянное беспокойство, панические состояния, социальная тревога, страх оценки, навязчивые мысли и постоянное прокручивание ситуаций.',
  },
  {
    number: '02',
    title: 'Самооценка, самокритика и перфекционизм',
    text:
      'Низкая или нестабильная самооценка, самокритика, стыд, вина, страх ошибок, зависимость от чужого мнения и ощущение «со мной что-то не так».',
  },
  {
    number: '03',
    title: 'Отношения, привязанность и границы',
    text:
      'Страх отвержения и одиночества, эмоциональная зависимость, созависимые или травматичные отношения, конфликты, расставания и трудности с границами.',
  },
  {
    number: '04',
    title: 'Эмоции, идентичность и принятие себя',
    text:
      'Трудности с пониманием и регулированием эмоций, поиск себя и своих желаний, вопросы идентичности, принятия себя, отношений и давления окружающих, а также особенности жизни с нейроотличиями.',
  },
  {
    number: '05',
    title: 'Прокрастинация, решения и избегание',
    text:
      'Прокрастинация, избегание сложных ситуаций, трудности с отказом, принятием решений и отстаиванием своих потребностей.',
  },
  {
    number: '06',
    title: 'Работа, стресс и выгорание',
    text:
      'Хронический стресс, выгорание, смена работы или профессии, синдром самозванца, а также ответственность, делегирование и конфликты у руководителей.',
  },
] as const;

const progressSigns = [
  'сложные ситуации возникают реже или переживаются менее остро',
  'после трудного момента вы быстрее возвращаетесь в привычное состояние',

  'вместо автоматической реакции появляется несколько вариантов действий',
  'становится легче выдерживать неопределенность или чужое недовольство',

  'вы лучше замечаете свои желания, потребности и личные границы',
  'становится проще делать то, чего раньше хотелось избегать',
] as const;

export default function Home() {
  return (
    <div
  className="min-h-screen"
  style={{
    backgroundColor: C.bg,
    color: C.ink,
  }}
>
      <Nav active="/" />

      <main>
        {/* HERO */}
<HeroGlow>
  <div className="mx-auto max-w-6xl px-6 pb-9 pt-6 md:pb-10 md:pt-8">
    <div className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-8">
        <Reveal>
          <Eyebrow>Психолог · КПТ и схема-терапия</Eyebrow>
        </Reveal>

        <Reveal delay={50}>
          <div className="mb-4 flex max-w-[820px] flex-wrap gap-1.5">
            {heroTopics.map((topic) => (
              <span
                key={topic}
                className="rounded-full px-3 py-1 text-[11px] md:text-[12px]"
                style={{
                  ...sans,
                  backgroundColor: C.surface,
                  color: C.inkSoft,
                  border: `1px solid ${C.line}`,
                }}
              >
                {topic}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={90}>
          <h1 className="mb-4 max-w-[820px] text-[37px] font-normal leading-[1.03] tracking-[-0.025em] md:text-[46px] lg:text-[50px]">
            Понять, что происходит, и найти способ это изменить
          </h1>
        </Reveal>

        <Reveal delay={130}>
          <p
            className="mb-4 max-w-[730px] text-[15px] leading-[1.65] md:text-[16px]"
            style={{ color: C.inkSoft }}
          >
            Разбираемся, как именно трудность проявляется у вас: в каких
ситуациях возникает, что ее усиливает, как вы обычно
реагируете и что можно постепенно менять.
          </p>
        </Reveal>

        <Reveal delay={170}>
          <div className="mb-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span
              className="text-[13px]"
              style={{
                ...sans,
                color: C.inkSoft,
              }}
            >
              В работе мне важно, чтобы со временем становилось
            </span>

            <span
              className="text-[25px] leading-none md:text-[28px]"
              style={{ color: C.berry }}
            >
              <RotatingWords words={heroWords} />
            </span>
          </div>
        </Reveal>

        <Reveal delay={210}>
          <div
            className="mb-4 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full px-4 py-2.5 text-[12px] md:text-[13px]"
            style={{
              ...sans,
              backgroundColor: C.surface,
              color: C.inkSoft,
            }}
          >
            <span>{site.practice.session.format}</span>
            <span aria-hidden="true">·</span>

            <span>{siteDisplay.sessionDuration}</span>
            <span aria-hidden="true">·</span>

            <span>{siteDisplay.sessionPrice}</span>
            <span aria-hidden="true">·</span>

            <span>
              обычно встречаемся раз в{' '}
              {site.practice.session.frequency.usualMinDays}–
              {site.practice.session.frequency.usualMaxDays} дней
            </span>
          </div>
        </Reveal>

        <Reveal delay={250}>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/book"
              className="inline-flex justify-center px-7 py-3 text-[13px] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                ...sans,
                backgroundColor: C.ink,
                color: C.bg,
                borderRadius: radius.pill,
                boxShadow: shadow.soft,
              }}
            >
              Записаться
            </Link>

            <Link
              href="/how-we-work"
              className="inline-flex justify-center border px-7 py-3 text-[13px] transition-all duration-300 hover:-translate-y-0.5"
              style={{
                ...sans,
                borderColor: C.line,
                color: C.ink,
                borderRadius: radius.pill,
              }}
            >
              Как проходит работа
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="md:col-span-4">
        <Reveal delay={120}>
          <div className="relative mx-auto max-w-[345px] md:ml-auto md:mr-0">
            <div
              aria-hidden="true"
              className="absolute inset-[10%] rounded-full"
              style={{
                background: `
                  radial-gradient(
                    circle,
                    ${C.berrySoft}70 0%,
                    ${C.terracotta}2b 45%,
                    transparent 72%
                  )
                `,
                filter: 'blur(34px)',
                transform: 'scale(1.18)',
              }}
            />

            <div
              className="relative aspect-[4/5] overflow-hidden"
              style={{
                borderRadius: radius.lg,
                boxShadow: shadow.portrait,
              }}
            >
              <Image
                src="/images/portrait-hero.png"
                alt="Юлия Шашкова, психолог"
                fill
                priority
                quality={90}
                sizes="(max-width: 768px) 82vw, 345px"
                className="object-cover transition-transform duration-700 hover:scale-[1.015]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </div>
</HeroGlow>

        <div className="mx-auto max-w-6xl px-6">
  <AnimatedRule />
</div>

        {/* ПАТТЕРНЫ */}
<section className="mx-auto max-w-6xl px-6 py-8 md:py-10">
  <Reveal>
    <div className="mb-5 grid gap-4 md:grid-cols-[0.75fr_1.25fr] md:items-end">
      <div>
        <Eyebrow>Запросы</Eyebrow>

        <h2 className="text-3xl font-normal leading-[1.06] md:text-[38px]">
          С чем можно прийти
        </h2>
      </div>

      <p
        className="max-w-xl justify-self-end text-[14px] leading-[1.6]"
        style={{ color: C.inkSoft }}
      >
        Один запрос может затрагивать сразу несколько тем. Например,
  сложности в отношениях могут быть связаны и с тревогой, и с
  самооценкой, и с трудностями в отстаивании своих границ.
      </p>
    </div>
  </Reveal>

  <AnimatedRule />

  <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
    {patterns.map((pattern, index) => (
      <Reveal
        key={pattern.number}
        delay={index * 25}
      >
        <article
          className="group h-full border px-5 py-4 transition-all duration-300 hover:-translate-y-1"
          style={{
            borderColor: C.line,
            backgroundColor: 'rgba(255,255,255,0.12)',
            borderRadius: radius.md,
          }}
        >
          <div className="mb-2.5 flex items-start gap-3">
            <span
              className="min-w-[26px] pt-1 text-[10px]"
              style={{
                ...sans,
                color: C.terracotta,
              }}
            >
              {pattern.number}
            </span>

            <h3 className="text-[17px] leading-[1.2] transition-transform duration-300 group-hover:translate-x-1">
              {pattern.title}
            </h3>
          </div>

          <p
            className="pl-[39px] text-[12.5px] leading-[1.55]"
            style={{ color: C.inkSoft }}
          >
            {pattern.text}
          </p>
        </article>
      </Reveal>
    ))}
  </div>

  <div className="mt-4 grid gap-3 md:grid-cols-2">
    <Reveal>
      <div
        className="flex h-full items-center gap-4 px-5 py-3.5"
        style={{
          backgroundColor: `${C.berry}0D`,
          border: `1px solid ${C.berry}20`,
          borderRadius: radius.md,
        }}
      >
        <span
          aria-hidden="true"
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: C.berry }}
        />

        <p
          className="text-[12.5px] leading-relaxed"
          style={{ color: C.berry }}
        >
          Не обязательно заранее понимать, к какому пункту относится
          ваша ситуация. Это можно выяснить вместе.
        </p>
      </div>
    </Reveal>

    <Reveal delay={30}>
      <div
        className="h-full px-5 py-3.5"
        style={{
          backgroundColor: C.surface,
          borderRadius: radius.md,
        }}
      >
        <p
          className="text-[12.5px] leading-[1.55]"
          style={{ color: C.inkSoft }}
        >
          Также работаю с депрессивными состояниями, БАР, ПРЛ,
  последствиями длительной или повторяющейся травматизации, в том числе КПТСР, а также самоповреждающим поведением. Если состояние требует наблюдения психиатра,
  я работаю при условии, что клиент уже наблюдается у врача
  или организует такое наблюдение самостоятельно.
        </p>
      </div>
    </Reveal>
  </div>
</section>

        {/* МЕХАНИЗМЫ */}
<section className="mx-auto max-w-[1240px] px-4 py-5 md:px-6 md:py-6">
  <div
    className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-10"
    style={{
      backgroundColor: C.surface,
      borderRadius: radius.lg,
      boxShadow: shadow.soft,
    }}
  >
    <Reveal>
      <div className="mb-7 grid gap-5 md:grid-cols-[1.15fr_0.85fr] md:items-end">
        <div>
          <Eyebrow>Один пример</Eyebrow>

          <h2 className="max-w-[720px] text-3xl font-normal leading-[1.04] tracking-[-0.02em] md:text-[42px]">
            Одна ситуация — разные причины реакции
          </h2>
        </div>

        <div>
  <p
    className="text-[15px] leading-[1.6]"
    style={{ color: C.inkSoft }}
  >
    Посмотрите, как одна и та же пауза в переписке может
    вызывать совсем разные мысли и реакции.
  </p>
</div>
      </div>
    </Reveal>

    <Reveal delay={80}>
      <MechanismExplorer />
    </Reveal>
  </div>
</section>

        {/* КАК РАБОТАЮ */}
<section className="mx-auto max-w-6xl px-6 py-9 md:py-11">
  <Reveal>
    <div className="mb-5 grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-end">
      <div>
        <Eyebrow>Как проходит работа</Eyebrow>

        <h2 className="max-w-xl text-3xl font-normal leading-[1.06] md:text-[38px]">
          От конкретной ситуации к изменениям в жизни
        </h2>
      </div>

      <p
        className="max-w-xl justify-self-end text-[14px] leading-[1.6]"
        style={{ color: C.inkSoft }}
      >
        Мы не пытаемся охватить всю вашу жизнь за одну встречу.
        Обычно выбираем то, что сейчас важнее, и разбираем несколько
        конкретных ситуаций достаточно подробно.
      </p>
    </div>
  </Reveal>

  <AnimatedRule />

  <div className="mt-5 grid gap-3 md:grid-cols-2">
    {[
      {
        number: '01',
        title: 'Разбираем конкретную ситуацию',
        text:
          'Что произошло, что вы в этот момент подумали и почувствовали, как отреагировали и к чему это привело.',
      },
      {
        number: '02',
        title: 'Ищем, что повторяется',
        text:
          'Замечаем похожие реакции, ожидания и привычные способы действовать, которые снова приводят к знакомому результату.',
      },
      {
        number: '03',
        title: 'Пробуем действовать иначе',
        text:
          'Выбираем, что можно попробовать изменить в обычной жизни, и смотрим, как это влияет на ситуацию.',
      },
      {
        number: '04',
        title: 'Смотрим, что получилось',
        text:
          'Обсуждаем, что сработало, что оказалось сложным и что имеет смысл попробовать дальше.',
      },
    ].map((step, index) => (
      <Reveal
        key={step.number}
        delay={index * 30}
      >
        <article
          className="group h-full border px-5 py-4 transition-all duration-300 hover:-translate-y-1"
          style={{
            borderColor: C.line,
            borderRadius: radius.md,
            backgroundColor:
              index === 3
                ? C.surface
                : 'rgba(255,255,255,0.12)',
          }}
        >
          <div className="mb-2.5 flex items-start gap-3">
            <span
              className="min-w-[26px] pt-1 text-[10px]"
              style={{
                ...sans,
                color: C.terracotta,
              }}
            >
              {step.number}
            </span>

            <h3 className="text-[18px] leading-[1.25] transition-transform duration-300 group-hover:translate-x-1">
              {step.title}
            </h3>
          </div>

          <p
            className="pl-[39px] text-[13px] leading-[1.6]"
            style={{ color: C.inkSoft }}
          >
            {step.text}
          </p>
        </article>
      </Reveal>
    ))}
  </div>

  <Reveal>
    <div
      className="mt-4 flex items-center gap-3 px-5 py-3.5"
      style={{
        backgroundColor: `${C.berry}0D`,
        border: `1px solid ${C.berry}20`,
        borderRadius: radius.md,
      }}
    >
      <span
        aria-hidden="true"
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: C.berry }}
      />

      <p
        className="text-[13px] leading-relaxed"
        style={{ color: C.berry }}
      >
        На встрече не нужно рассказывать всю историю жизни по порядку
        или заранее понимать, откуда все началось. Можно начать с того,
        что беспокоит вас сейчас.
      </p>
    </div>
  </Reveal>
</section>

        {/* ПОДХОДЫ */}
<section className="mx-auto max-w-[1240px] px-4 py-5 md:px-6 md:py-6">
  <div
    className="mx-auto max-w-6xl overflow-hidden px-6 py-8 md:px-8 md:py-9"
    style={{
      backgroundColor: C.ink,
      color: C.bg,
      borderRadius: radius.lg,
      boxShadow: shadow.card,
    }}
  >
    <Reveal>
      <div className="mb-5">
        <p
          className="mb-2 text-[10px] uppercase tracking-[0.18em]"
          style={{
            ...sans,
            color: C.ochre,
          }}
        >
          Подходы, с которыми я работаю
        </p>

        <h2 className="text-3xl font-normal leading-[1.05] md:text-[38px]">
          КПТ и схема-терапия
        </h2>
      </div>
    </Reveal>

    <div className="grid gap-3 md:grid-cols-2">
      <Reveal>
        <article
          className="h-full border px-5 py-5 transition-transform duration-300 hover:-translate-y-1"
          style={{
            borderColor: '#3C3731',
            borderRadius: radius.md,
            backgroundColor: 'rgba(255,255,255,0.025)',
          }}
        >
          <p
            className="mb-3 text-[10px] uppercase tracking-[0.15em]"
            style={{
              ...sans,
              color: C.ochre,
            }}
          >
            КПТ
          </p>

          <h3 className="mb-3 text-[19px] leading-tight">
            Разбираем, что происходит в конкретных ситуациях
          </h3>

          <p
            className="text-[13px] leading-[1.65]"
            style={{ color: '#C9C2B5' }}
          >
            Смотрим, как связаны ситуация, мысли, эмоции и действия.
Проверяем привычные ожидания и предположения, замечаем
избегание и пробуем новые способы реагировать.
          </p>
        </article>
      </Reveal>

      <Reveal delay={40}>
        <article
          className="h-full border px-5 py-5 transition-transform duration-300 hover:-translate-y-1"
          style={{
            borderColor: '#3C3731',
            borderRadius: radius.md,
            backgroundColor: 'rgba(255,255,255,0.025)',
          }}
        >
          <p
            className="mb-3 text-[10px] uppercase tracking-[0.15em]"
            style={{
              ...sans,
              color: C.ochre,
            }}
          >
            Схема-терапия
          </p>

          <h3 className="mb-3 text-[19px] leading-tight">
            Разбираем привычные сценарии в отношениях с собой и другими
          </h3>

          <p
            className="text-[13px] leading-[1.65]"
            style={{ color: '#C9C2B5' }}
          >
            Смотрим на привычные представления о себе и других,
эмоциональные потребности и способы защищаться, которые
когда-то помогали, а сейчас могут создавать сложности.
          </p>
        </article>
      </Reveal>
    </div>

    <Reveal delay={70}>
      <div
        className="mt-4 grid gap-4 border-t pt-4 md:grid-cols-[1fr_auto] md:items-center"
        style={{ borderColor: '#3C3731' }}
      >
        <p
          className="max-w-3xl text-[12.5px] leading-[1.6]"
          style={{ color: '#C9C2B5' }}
        >
          Выбирать подход заранее не нужно. Сначала разбираемся с
          вашей задачей, потом я объясняю, какие инструменты предлагаю
          и зачем.
        </p>

        <Link
          href="/approaches"
          className="text-[12.5px] underline underline-offset-4 transition-opacity hover:opacity-60"
          style={{
            ...sans,
            color: C.bg,
          }}
        >
          Подробнее о подходах →
        </Link>
      </div>
    </Reveal>
  </div>
</section>

        {/* FIT */}
<section className="mx-auto max-w-6xl px-6 py-9 md:py-11">
  <Reveal>
    <div className="mb-5">
      <Eyebrow>До записи</Eyebrow>

      <h2 className="max-w-2xl text-3xl font-normal leading-[1.06] md:text-[38px]">
        Подойдет ли вам работа со мной
      </h2>
    </div>
  </Reveal>

  <AnimatedRule />

  <div className="mt-5 grid gap-3 md:grid-cols-2">
    <Reveal>
      <div
        className="h-full px-5 py-5"
        style={{
          backgroundColor: C.surface,
          borderRadius: radius.md,
        }}
      >
        <h3 className="mb-4 text-[19px]">
          В работе будет
        </h3>

        <ul className="space-y-3">
          {[
            'не только поддержка, но и разбор того, почему проблема возникает или повторяется',
            'понятные объяснения, зачем мы обсуждаем конкретную тему или используем упражнение',
            'возможность не соглашаться со мной и говорить, если что-то не помогает',
            'иногда наблюдения, упражнения или новые действия между встречами',
            'разбор не только поведения других людей, но и ваших собственных реакций',
            'периодическая проверка, меняется ли что-то за пределами сессий',
          ].map((item) => (
            <li
              key={item}
              className="flex gap-3 text-[13px] leading-[1.5]"
            >
              <span
                aria-hidden="true"
                className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: C.moss }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>

    <Reveal delay={40}>
      <div
        className="h-full border px-5 py-5"
        style={{
          borderColor: C.line,
          borderRadius: radius.md,
        }}
      >
        <h3 className="mb-4 text-[19px]">
          В работе не будет
        </h3>

        <ul className="space-y-3">
          {[
            'готовых решений о том, как вам правильно поступить',
            'постоянной психологической поддержки в переписке между встречами',
            'только свободного разговора без попытки разобраться с проблемой',
            'экстренной или кризисной помощи в режиме 24/7',
          ].map((item) => (
            <li
              key={item}
              className="flex gap-3 text-[13px] leading-[1.5]"
            >
              <span
                aria-hidden="true"
                className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: C.terracotta }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div
          className="mt-4 border-t pt-4"
          style={{ borderColor: C.line }}
        >
          <p
            className="mb-2 text-[11px] uppercase tracking-[0.12em]"
            style={{
              ...sans,
              color: C.terracotta,
            }}
          >
            Я не беру в работу
          </p>

          <p
            className="text-[12px] leading-[1.55]"
            style={{ color: C.inkSoft }}
          >
            Детей и подростков до 18 лет, пары, активные зависимости
и расстройства пищевого поведения. Также я не работаю с
состояниями, в которых есть непосредственная угроза жизни
или требуется экстренная психиатрическая помощь.
          </p>
        </div>
      </div>
    </Reveal>
  </div>
</section>

        {/* ПРОЦЕСС */}
<section
  style={{
    backgroundColor: C.surface,
  }}
>
  <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
    <Reveal>
      <div className="mb-5 grid gap-4 md:grid-cols-[1fr_0.9fr] md:items-end">
        <div>
          <Eyebrow>Что важно знать о процессе</Eyebrow>

          <h2 className="max-w-3xl text-3xl font-normal leading-[1.06] md:text-[38px]">
            Сколько длится работа и как выглядит результат
          </h2>
        </div>

        <p
          className="max-w-lg text-[14px] leading-[1.6]"
          style={{ color: C.inkSoft }}
        >
          Универсального срока нет. Некоторые изменения становятся
заметны довольно быстро, для других нужно больше времени и
повторения. Поэтому заранее определить точное количество
встреч обычно невозможно.
        </p>
      </div>
    </Reveal>

    <AnimatedRule />

    <div className="mt-5 grid gap-3 md:grid-cols-2">
      <Reveal>
        <div
          className="h-full px-5 py-5"
          style={{
            backgroundColor: C.bg,
            borderRadius: radius.md,
          }}
        >
          <h3 className="mb-3 text-[19px]">
            Сколько это может занять
          </h3>

          <div
            className="space-y-3 text-[13px] leading-[1.6]"
            style={{ color: C.inkSoft }}
          >
            <p>
              Если задача связана с конкретной ситуацией или
              относительно новым затруднением, работа может быть
              короче.
            </p>

            <p>
              Если похожая проблема годами возникает в разных
              отношениях, работах или обстоятельствах, обычно нужно
              больше времени, чтобы менять не только отдельный эпизод,
              но и привычный способ реагировать.
            </p>

            <p>
              Имеет значение и ваше участие: возможность замечать свои
  реакции, обсуждать сложные моменты и по возможности пробовать
  что-то между встречами. Но это не про необходимость
  «стараться сильнее» — в тяжелом состоянии на изменения
  закономерно может требоваться больше времени.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={40}>
        <div
          className="h-full border px-5 py-5"
          style={{
            borderColor: C.line,
            borderRadius: radius.md,
          }}
        >
          <h3 className="mb-3 text-[19px]">
            Как выглядит прогресс
          </h3>

          <ul className="grid gap-x-8 gap-y-4 md:grid-cols-2">
            {progressSigns.map((item) => (
              <li
                key={item}
                className="flex min-h-[44px] gap-3 text-[12.5px] leading-[1.5]"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: C.moss }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>

    <Reveal>
      <div
        className="mt-4 flex items-center gap-4 px-5 py-3.5"
        style={{
          backgroundColor: `${C.berry}0D`,
          border: `1px solid ${C.berry}20`,
          borderRadius: radius.md,
        }}
      >
        <span
          aria-hidden="true"
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: C.berry }}
        />

        <p
          className="text-[13px] leading-relaxed"
          style={{ color: C.berry }}
        >
          Прогресс не всегда начинается с ощущения «мне стало легко».
Иногда первое изменение — раньше заметить привычную реакцию
и успеть выбрать, как поступить дальше.
        </p>
      </div>
    </Reveal>
  </div>
</section>

        {/* ОБО МНЕ */}
<section className="mx-auto max-w-6xl px-6 py-10 md:py-12">
  <div className="grid items-center gap-9 md:grid-cols-12">
    <div className="md:col-span-4">
      <Reveal>
        <div
          className="relative mx-auto aspect-[4/5] max-w-[340px] overflow-hidden"
          style={{
            borderRadius: radius.lg,
            boxShadow: shadow.soft,
          }}
        >
          <Image
            src="/images/portrait-about.jpg"
            alt="Юлия Шашкова"
            fill
            sizes="(max-width: 768px) 86vw, 340px"
            className="object-cover"
          />
        </div>
      </Reveal>
    </div>

    <div className="md:col-span-8">
      <Reveal delay={50}>
        <Eyebrow>Обо мне</Eyebrow>

        <h2 className="mb-4 text-3xl font-normal leading-tight md:text-[38px]">
          Юлия Шашкова
        </h2>

        <p
          className="mb-5 max-w-2xl text-[15px] leading-[1.65]"
          style={{ color: C.inkSoft }}
        >
          Магистр психологии, клинический психолог. Дополнительно обучалась КПТ и
          схема-терапии.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <div
          className="mb-5 grid grid-cols-3 gap-5 border-y py-5"
          style={{ borderColor: C.line }}
        >
          <div>
            <p
              className="mb-1 text-[28px]"
              style={{ color: C.terracotta }}
            >
              <CountUp
                end={site.practice.clients.count}
                suffix="+"
              />
            </p>

            <p
              className="text-[10px]"
              style={{
                ...sans,
                color: C.inkSoft,
              }}
            >
              клиентов
            </p>
          </div>

          <div>
            <p
              className="mb-1 text-[28px]"
              style={{ color: C.terracotta }}
            >
              <CountUp
                end={site.practice.hours.count}
                suffix="+"
                formatThousands
              />
            </p>

            <p
              className="text-[10px]"
              style={{
                ...sans,
                color: C.inkSoft,
              }}
            >
              часов консультаций
            </p>
          </div>

          <div>
  <p
    className="mb-1 text-[24px] md:text-[26px]"
    style={{ color: C.terracotta }}
  >
    Еженедельно
  </p>

  <p
    className="text-[10px]"
    style={{
      ...sans,
      color: C.inkSoft,
    }}
  >
    прохожу супервизию
  </p>
</div>
        </div>
      </Reveal>

      <Reveal delay={110}>
        <div
  className="max-w-2xl space-y-3 text-[13.5px] leading-[1.65]"
  style={{ color: C.inkSoft }}
>
  <p>
    Мне важно, чтобы на встречах можно было говорить прямо:
    не соглашаться со мной, задавать вопросы, говорить, что
    что-то не подходит, непонятно или пока слишком сложно.
  </p>

  <p>
    Я за живой человеческий разговор без необходимости
    выглядеть «правильным клиентом». Можно путаться, менять
    мнение, злиться, ругаться матом, шутить и не иметь готового ответа на
    каждый вопрос.
  </p>
</div>
      </Reveal>

      <Reveal delay={140}>
        <Link
          href="/about"
          className="mt-5 inline-block text-[13px] underline underline-offset-4 transition-opacity hover:opacity-60"
          style={{
            ...sans,
            color: C.ink,
          }}
        >
          Подробнее обо мне и образовании →
        </Link>
      </Reveal>
    </div>
  </div>
</section>

        {/* МОЖНО НЕ ЗАПИСЫВАТЬСЯ */}
        <section className="mx-auto max-w-6xl px-6 py-9 md:py-11">
  <Reveal>
    <div className="mb-5 grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-end">
      <div>
        <Eyebrow>Не обязательно сразу записываться</Eyebrow>

<h2 className="max-w-xl text-3xl font-normal leading-[1.06] md:text-[38px]">
  Можно сначала присмотреться
</h2>
      </div>

      <p
        className="max-w-xl justify-self-end text-[14px] leading-[1.6]"
        style={{ color: C.inkSoft }}
      >
        Можно попробовать инструмент, почитать о близкой вам теме
или подробнее посмотреть, как устроены подходы, с которыми
я работаю.
      </p>
    </div>
  </Reveal>

  <AnimatedRule />

  <div className="mt-5 grid gap-3 md:grid-cols-3">
    <Reveal>
      <Link
        href="/tools"
        className="group block h-full border px-5 py-5 transition-all duration-300 hover:-translate-y-1"
        style={{
          borderColor: C.line,
          borderRadius: radius.md,
          backgroundColor: C.surface,
        }}
      >
        <div className="mb-5 flex items-center justify-between">
          <span
            className="text-[10px] uppercase tracking-[0.16em]"
            style={{
              ...sans,
              color: C.terracotta,
            }}
          >
            Инструменты
          </span>

          <span
            aria-hidden="true"
            className="text-[18px] transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </div>

        <h3 className="mb-3 text-[19px] leading-[1.25]">
          Небольшие упражнения и самопроверки
        </h3>

        <p
          className="text-[13px] leading-[1.6]"
          style={{ color: C.inkSoft }}
        >
          Чтобы остановиться, присмотреться к своему состоянию
          и собрать немного больше информации о том, что происходит.
        </p>

        <p
          className="mt-4 text-[11px] leading-[1.5]"
          style={{
            ...sans,
            color: C.inkSoft,
          }}
        >
          Не ставят диагноз и не заменяют консультацию.
        </p>
      </Link>
    </Reveal>

    <Reveal delay={30}>
      <Link
        href="/articles"
        className="group block h-full border px-5 py-5 transition-all duration-300 hover:-translate-y-1"
        style={{
          borderColor: C.line,
          borderRadius: radius.md,
        }}
      >
        <div className="mb-5 flex items-center justify-between">
          <span
            className="text-[10px] uppercase tracking-[0.16em]"
            style={{
              ...sans,
              color: C.terracotta,
            }}
          >
            Статьи
          </span>

          <span
            aria-hidden="true"
            className="text-[18px] transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </div>

        <h3 className="mb-3 text-[19px] leading-[1.25]">
          Понятно о психологии без упрощений
        </h3>

        <p
          className="text-[13px] leading-[1.6]"
          style={{ color: C.inkSoft }}
        >
          О тревоге, отношениях, самокритике, эмоциях и других
          темах, с которыми люди сталкиваются в обычной жизни.
        </p>
      </Link>
    </Reveal>

    <Reveal delay={60}>
      <Link
        href="/approaches"
        className="group block h-full border px-5 py-5 transition-all duration-300 hover:-translate-y-1"
        style={{
          borderColor: C.line,
          borderRadius: radius.md,
        }}
      >
        <div className="mb-5 flex items-center justify-between">
          <span
            className="text-[10px] uppercase tracking-[0.16em]"
            style={{
              ...sans,
              color: C.terracotta,
            }}
          >
            КПТ и схема-терапия
          </span>

          <span
            aria-hidden="true"
            className="text-[18px] transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </div>

        <h3 className="mb-3 text-[19px] leading-[1.25]">
          Посмотреть, как устроены подходы
        </h3>

        <p
          className="text-[13px] leading-[1.6]"
          style={{ color: C.inkSoft }}
        >
          Что происходит в КПТ и схема-терапии, чем они отличаются
          и почему в работе могут использоваться инструменты обоих
          подходов.
        </p>
      </Link>
    </Reveal>
  </div>
</section>

        {/* ПЕРВАЯ ВСТРЕЧА */}
        <section
  className="mx-auto max-w-[1240px] px-4 py-5 md:px-6 md:py-6"
>
  <div
    className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-9"
    style={{
      backgroundColor: C.surfaceWarm,
      borderRadius: radius.lg,
      boxShadow: shadow.soft,
    }}
  >
    <Reveal>
      <div className="mb-5 grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-end">
        <div>
          <Eyebrow>Как начинается работа</Eyebrow>

          <h2 className="max-w-xl text-3xl font-normal leading-[1.06] md:text-[38px]">
            Что будет на первой встрече
          </h2>
        </div>

        <p
          className="max-w-xl justify-self-end text-[14px] leading-[1.6]"
          style={{ color: C.inkSoft }}
        >
          Ее задача не решить все за 50 минут, а понять, с чем вы
          пришли, что сейчас важнее всего и как можно двигаться дальше.
        </p>
      </div>
    </Reveal>

    <div
      className="grid border-y md:grid-cols-4"
      style={{
        borderColor: 'rgba(31,27,22,0.14)',
      }}
    >
      {[
        {
          number: '01',
          title: 'Начнем с того, что сейчас беспокоит',
          text:
            'Можно рассказать о ситуации так, как получается. Специально готовить рассказ не нужно.',
        },
        {
          number: '02',
          title: 'Уточним, чего хочется изменить',
          text:
            'Не обязательно сразу иметь четкую цель. Попробуем вместе сделать ее понятнее.',
        },
        {
          number: '03',
          title: 'Я задам дополнительные вопросы',
          text:
            'Только о том контексте, который сейчас помогает лучше понять вашу ситуацию.',
        },
        {
          number: '04',
          title: 'Обсудим, что делать дальше',
          text:
            'В конце поговорим о том, как может выглядеть дальнейшая работа и имеет ли смысл ее продолжать.',
        },
      ].map((item, index) => (
        <Reveal
          key={item.number}
          delay={index * 30}
        >
          <div
            className="h-full px-4 py-5 md:px-5"
            style={{
              borderLeft:
                index === 0
                  ? 'none'
                  : '1px solid rgba(31,27,22,0.14)',
            }}
          >
            <p
              className="mb-3 text-[10px]"
              style={{
                ...sans,
                color: C.terracotta,
              }}
            >
              {item.number}
            </p>

            <h3 className="mb-2 text-[16px] leading-[1.3]">
              {item.title}
            </h3>

            <p
              className="text-[12px] leading-[1.55]"
              style={{ color: C.inkSoft }}
            >
              {item.text}
            </p>
          </div>
        </Reveal>
      ))}
    </div>

    <Reveal>
      <div className="mt-4 flex items-center justify-between gap-5">
        <p
          className="max-w-3xl text-[13px] leading-[1.6]"
          style={{ color: C.inkSoft }}
        >
          После первой встречи не нужно принимать решение сразу.
          Можно взять время и понять, хотите ли вы продолжать работу.
        </p>

        <Link
          href="/how-we-work"
          className="hidden shrink-0 text-[12.5px] underline underline-offset-4 transition-opacity hover:opacity-60 md:block"
          style={{
            ...sans,
            color: C.ink,
          }}
        >
          Подробнее о работе →
        </Link>
      </div>
    </Reveal>
  </div>
</section>

        {/* ФИНАЛЬНАЯ ЗАПИСЬ */}
        <section className="mx-auto max-w-[1240px] px-4 pb-8 pt-5 md:px-6 md:pb-10 md:pt-6">
  <Reveal>
    <div
      className="mx-auto max-w-6xl overflow-hidden px-6 py-8 md:px-9 md:py-10"
      style={{
        backgroundColor: C.ink,
        color: C.bg,
        borderRadius: radius.lg,
        boxShadow: shadow.card,
      }}
    >
      <div className="grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-end">
        <div>
          <p
            className="mb-3 text-[10px] uppercase tracking-[0.18em]"
            style={{
              ...sans,
              color: C.ochre,
            }}
          >
            Запись
          </p>

          <h2 className="mb-4 max-w-2xl text-3xl font-normal leading-[1.05] md:text-[40px]">
            Записаться на встречу
          </h2>

          <p
            className="max-w-xl text-[14px] leading-[1.65]"
            style={{ color: '#C9C2B5' }}
          >
            Если такой способ работы вам подходит, можно записаться
на встречу.
          </p>
        </div>

        <div className="md:text-right">
          <Link
            href="/book"
            className="inline-flex justify-center px-8 py-3.5 text-[14px] transition-all duration-300 hover:-translate-y-0.5"
            style={{
              ...sans,
              backgroundColor: C.ochre,
              color: C.ink,
              borderRadius: radius.pill,
            }}
          >
            Записаться
          </Link>
        </div>
      </div>

      <div
        className="mt-7 grid gap-y-5 border-t pt-6 sm:grid-cols-2 md:grid-cols-4"
        style={{
          borderColor: '#3C3731',
        }}
      >
        <div>
          <p
            className="mb-1 text-[11px] uppercase tracking-[0.12em]"
            style={{
              ...sans,
              color: '#8F887D',
            }}
          >
            Стоимость
          </p>

          <p className="text-[19px]">
            {siteDisplay.sessionPrice}
          </p>
        </div>

        <div>
          <p
            className="mb-1 text-[11px] uppercase tracking-[0.12em]"
            style={{
              ...sans,
              color: '#8F887D',
            }}
          >
            Длительность
          </p>

          <p className="text-[19px]">
            {siteDisplay.sessionDuration}
          </p>
        </div>

        <div>
          <p
            className="mb-1 text-[11px] uppercase tracking-[0.12em]"
            style={{
              ...sans,
              color: '#8F887D',
            }}
          >
            Где
          </p>

          <p className="text-[19px]">
            {site.practice.session.platform}
          </p>
        </div>

        <div>
          <p
            className="mb-1 text-[11px] uppercase tracking-[0.12em]"
            style={{
              ...sans,
              color: '#8F887D',
            }}
          >
            Обычно
          </p>

          <p className="text-[19px]">
            раз в 7–10 дней
          </p>
        </div>
      </div>

      <div
        className="mt-6 flex flex-wrap gap-x-5 gap-y-1 border-t pt-4 text-[11px]"
        style={{
          ...sans,
          borderColor: '#3C3731',
          color: '#8F887D',
        }}
      >
        <span>Только индивидуальные встречи</span>
        <span>18+</span>
        <span>Онлайн</span>
      </div>
    </div>
  </Reveal>
</section>
      </main>

      <Footer />
    </div>
  );
}