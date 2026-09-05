import type { ReactNode } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import Eyebrow from '@/app/components/Eyebrow';
import Reveal from '@/app/components/Reveal';
import AnimatedRule from '@/app/components/AnimatedRule';

import {
  site,
  siteDisplay,
} from '@/app/data/site';

import {
  C,
  radius,
  sans,
  serif,
  shadow,
} from '@/app/lib/theme';

import { createPageMetadata } from '@/app/lib/metadata';

export const metadata =
  createPageMetadata({
    title: 'Обо мне',
    description:
      'Юлия Шашкова — клинический психолог. Образование, профессиональный опыт, супервизия и немного о том, какой я человек за пределами работы.',
    path: '/about',
  });

export default function AboutPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        ...serif,
        backgroundColor: C.bg,
        color: C.ink,
      }}
    >
      <Nav active="/about" />

      <main>
        {/* HERO */}

        <section className="mx-auto max-w-6xl px-6 pb-7 pt-10 md:px-8 md:pb-9 md:pt-14">
          <Reveal>
            <div className="grid gap-7 md:grid-cols-[1.12fr_0.88fr] md:items-stretch md:gap-10">
              <div>
                <Eyebrow>Обо мне</Eyebrow>

                <h1 className="mt-4 max-w-[720px] text-[37px] font-normal leading-[1.03] tracking-[-0.025em] md:text-[46px] lg:text-[50px]">
                  Юлия Шашкова.
                  <br />
                  Клинический психолог
                </h1>

                <div
                  className="mt-5 max-w-[700px] space-y-4 text-[14px] leading-[1.68] md:text-[15px]"
                  style={{
                    ...sans,
                    color: C.inkSoft,
                  }}
                >
                  <p>
                    Я практикую с 2023 года и работаю со
                    взрослыми в КПТ и схема-терапии.
                  </p>

                  <p>
                    В психологию я пришла не из идеи спасать
                    людей. Меня гораздо сильнее зацепил
                    другой вопрос: почему человек может
                    прекрасно понимать, что ему мешает, и
                    все равно снова делать тоже самое?
                    Почему одни ситуации проходят мимо, а
                    другие задевают так, будто попадают
                    точно в старое больное место? И главное,
                    что действительно помогает это менять,
                    кроме самого понимания.
                  </p>

                  <p>
                    До психологии я почти десять лет
                    работала в корпоративной среде, в том
                    числе руководила людьми и процессами.
                    Думаю, оттуда в мою работу пришли любовь
                    к структуре, прямые вопросы и привычка
                    периодически проверять: то, что мы
                    сейчас делаем, правда помогает или
                    просто звучит убедительно.
                  </p>

                  <p>
                    Мне интересна не только практика, но и
                    психология как наука. Я постоянно читаю
                    новые исследования, веду собственную
                    исследовательскую работу и готовлюсь к
                    будущей диссертации. Общаюсь с коллегами
                    и исследователями из других стран —
                    мне важно видеть, что происходит в
                    профессиональном поле шире
                    русскоязычной среды.
                  </p>
                </div>
              </div>

              <div
                className="relative min-h-[360px] overflow-hidden md:min-h-0"
                style={{
                  borderRadius: radius.lg,
                  boxShadow: shadow.portrait,
                }}
              >
                <Image
                  src="/images/portrait-about.jpg"
                  alt="Юлия Шашкова, клинический психолог"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div
              className="mt-7 grid grid-cols-2 overflow-hidden md:grid-cols-4"
              style={{
                backgroundColor: C.surface,
                border: `1px solid ${C.line}`,
                borderRadius: radius.lg,
              }}
            >
              <Fact
                value="С 2023 года"
                label="в частной практике"
                index={0}
              />

              <Fact
                value={`${site.practice.clients.count}+`}
                label="клиентов"
                index={1}
              />

              <Fact
                value={`${site.practice.hours.count.toLocaleString(
                  'ru-RU',
                )}+`}
                label="часов консультаций"
                index={2}
              />

              <Fact
                value="Раз в неделю"
                label="супервизия"
                index={3}
              />
            </div>
          </Reveal>
        </section>

        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <AnimatedRule />
        </div>

        {/* WORK STYLE */}

        <section className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-10">
          <Reveal>
            <div className="grid gap-y-3 md:grid-cols-[0.72fr_1.28fr] md:gap-x-10">
              <div>
                <Eyebrow>В работе</Eyebrow>
              </div>

              <div className="hidden md:block" />

              <h2 className="text-[30px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[38px]">
                Как я веду встречи
              </h2>

              <p
                className="text-[14px] leading-[1.65] md:text-[15px]"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                У меня нет специального терапевтического
                голоса и роли мудрого человека напротив.
                Я разговариваю примерно так же, как в
                обычной жизни: прямо, спокойно, иногда
                с юмором. При этом это не просто разговор
                обо всем подряд, у нашей встречи всегда
                есть рабочая задача.
              </p>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <Reveal delay={0}>
              <InfoCard
                number="01"
                title="Люблю разбирать конкретные ситуации"
              >
                Если звучит «я всегда боюсь отказать» или
                «я постоянно все порчу», скорее всего, я
                попрошу вспомнить последний реальный эпизод.
                Кто что сказал, что вы подумали, что
                почувствовали и что сделали дальше. В
                деталях обычно гораздо лучше видно, что
                именно происходит.
              </InfoCard>
            </Reveal>

            <Reveal delay={30}>
              <InfoCard
                number="02"
                title="Говорю о том, что замечаю"
              >
                Если мне кажется важной какая-то связь,
                реакция или противоречие, я не буду молча
                ждать, пока вы сами к нему придете. Скажу,
                что вижу, и предложу проверить. Иногда
                окажется, что я попала точно, иногда нет.
              </InfoCard>
            </Reveal>

            <Reveal delay={60}>
              <InfoCard
                number="03"
                title="Не обязательно быть серьезными весь час"
              >
                Сложная тема не требует торжественного
                выражения лица. На встречах мы можем
                смеяться, шутить, вспоминать мемы,
                обсуждать персонажей или ругаться матом.
                Юмор вполне может соседствовать с
                разговором о чем-то тяжелом.
              </InfoCard>
            </Reveal>

            <Reveal delay={90}>
              <InfoCard
                number="04"
                title="Можно сказать: «Я не хочу сейчас об этом»"
              >
                Вы не обязаны отвечать на каждый вопрос,
                делать любое предложенное упражнение или
                обсуждать тему, к которой сейчас не готовы.
                Если что-то вызывает сопротивление, мы
                можем отдельно посмотреть почему, но
                продавливание через границы точно не
                является методом терапии.
              </InfoCard>
            </Reveal>
          </div>
        </section>

        {/* EDUCATION */}

<section className="mx-auto max-w-6xl px-6 py-7 md:px-8 md:py-9">
  <Reveal>
    <div
      className="overflow-hidden"
      style={{
        backgroundColor: C.surfaceWarm,
        borderRadius: radius.lg,
        boxShadow: shadow.soft,
      }}
    >
      <div className="p-6 md:p-8 lg:p-9">
        {/* HEADER */}

        <div className="grid gap-y-3 md:grid-cols-[0.72fr_1.28fr] md:gap-x-10">
          <div>
            <Eyebrow>Образование</Eyebrow>
          </div>

          <div className="hidden md:block" />

          <h2 className="text-[30px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[38px]">
            Профессиональная подготовка
          </h2>

          <p
            className="max-w-2xl text-[13.5px] leading-[1.65] md:text-[14px]"
            style={{
              ...sans,
              color: C.inkSoft,
            }}
          >
            Моя подготовка складывалась постепенно:
            клиническая психология, консультирование, КПТ,
            схема-терапия и магистратура. Ниже — основные
            программы, часы обучения и квалификации.
          </p>
        </div>

        {/* CARDS */}

        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          {[
            {
              year: '2026',
              hours: '1 414 ч',
              title: 'Магистратура по психологии',
              meta: 'РАНХиГС · Магистратура',
              result: 'Квалификация: магистр психологии',
            },
            {
              year: '2026',
              hours: '2 412 ч',
              title: 'Психология личности',
              meta:
                'ООО «Психодемия» · Профессиональная переподготовка',
              result:
                'Квалификация: психолог-консультант',
            },
            {
              year: '2025',
              hours: '496 ч',
              title:
                'Личная и профессиональная эффективность',
              meta:
                'РАНХиГС · Профессиональная переподготовка',
              result:
                'Квалификация: психолог в социальной сфере',
            },
            {
              year: '2025',
              hours: '254 ч',
              title: 'Схема-терапия',
              meta:
                'ООО «Психодемия» · Дополнительное обучение',
              result: null,
            },
            {
              year: '2024',
              hours: '269 ч',
              title:
                'Когнитивно-поведенческая терапия',
              meta:
                'ООО «Психодемия» · Дополнительное обучение',
              result: null,
            },
            {
              year: '2024',
              hours: '1 194 ч',
              title:
                'Консультирование в сфере сексуальных отношений',
              meta:
                'ООО «Психодемия» · Профессиональная переподготовка',
              result:
                'Квалификация: психолог-консультант в сексуальной сфере',
            },
            {
              year: '2023',
              hours: '1 560 ч',
              title: 'Клиническая психология',
              meta:
                'АНО ДПО «Институт прикладной психологии в социальной сфере» · Профессиональная переподготовка',
              result:
                'Диагностика, коррекция и восстановление психической деятельности · Квалификация: клинический психолог',
            },
          ].map((education, index) => (
            <div
              key={`${education.year}-${education.title}`}
              className="w-full sm:w-[calc(50%-5px)] lg:w-[calc(25%-8px)]"
            >
              <Reveal delay={index * 20}>
                <article
                  className="h-auto min-h-[175px] px-4 py-4 sm:h-[190px] md:px-5"
                  style={{
                    backgroundColor:
                      'rgba(247, 243, 236, 0.72)',
                    borderRadius: radius.md,
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p
                      className="text-[10px] uppercase tracking-[0.08em]"
                      style={{
                        ...sans,
                        color: C.terracotta,
                      }}
                    >
                      {education.year}
                    </p>

                    <p
                      className="shrink-0 text-[10px]"
                      style={{
                        ...sans,
                        color: C.inkSoft,
                      }}
                    >
                      {education.hours}
                    </p>
                  </div>

                  <h3 className="mt-3 text-[15px] leading-[1.28] md:text-[15.5px]">
                    {education.title}
                  </h3>

                  <p
                    className="mt-2 text-[10px] leading-[1.45]"
                    style={{
                      ...sans,
                      color: C.inkSoft,
                    }}
                  >
                    {education.meta}
                  </p>

                  {education.result && (
                    <p
                      className="mt-1.5 text-[10px] leading-[1.45]"
                      style={{
                        ...sans,
                        color: C.inkSoft,
                      }}
                    >
                      {education.result}
                    </p>
                  )}
                </article>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Reveal>
</section>

        {/* PROFESSIONAL CARE */}

        <section className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-10">
          <Reveal>
            <div className="grid gap-y-3 md:grid-cols-[0.72fr_1.28fr] md:gap-x-10">
              <div>
                <Eyebrow>
                  За пределами сессий
                </Eyebrow>
              </div>

              <div className="hidden md:block" />

              <h2 className="text-[30px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[38px]">
                Что еще входит в мою работу
              </h2>

              <p
                className="text-[14px] leading-[1.65] md:text-[15px]"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                Пятьдесят минут с клиентом — только видимая
                часть работы. Между встречами я читаю,
                думаю над сложными случаями, обсуждаю их
                на супервизии и продолжаю учиться. Мне
                важно не превращать несколько знакомых
                техник в универсальный ответ на все.
              </p>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <Reveal delay={0}>
              <CareCard
                number="01"
                title="Раз в неделю хожу на супервизию"
              >
                Приношу туда места, где я сомневаюсь, где
                работа застопорилась или где хочется
                проверить свою версию происходящего.
                Иногда после супервизии я возвращаюсь к
                клиенту уже с другим взглядом на ситуацию.
              </CareCard>
            </Reveal>

            <Reveal delay={35}>
              <CareCard
                number="02"
                title="Сама знаю терапию с другой стороны"
              >
                Я много лет была в личной терапии, с
                перерывами. Поэтому знаю не только то, как
                выглядит процесс из кресла психолога, но и
                каково сидеть напротив: не знать, что
                сказать, злиться, сомневаться или
                постепенно замечать изменения.
              </CareCard>
            </Reveal>

            <Reveal delay={70}>
              <CareCard
                number="03"
                title="Не полагаюсь только на то, чему меня когда-то учили"
              >
                В психологии постоянно появляются новые
                данные, а часть привычных идей со временем
                пересматривается. Поэтому я читаю
                исследования, обзоры и рекомендации,
                смотрю на методологию и ограничения, а не
                только на выводы. Это помогает не тащить
                в практику красивую концепцию только
                потому, что она звучит убедительно.
              </CareCard>
            </Reveal>
          </div>
        </section>

        {/* OUTSIDE WORK */}

        <section className="mx-auto max-w-6xl px-6 py-7 md:px-8 md:py-9">
          <Reveal>
            <div
              className="grid gap-6 overflow-hidden md:grid-cols-[0.78fr_1.22fr] md:items-center"
              style={{
                backgroundColor: C.surface,
                borderRadius: radius.lg,
              }}
            >
              <div className="relative min-h-[330px] md:h-full md:min-h-[430px]">
                <Image
                  src="/images/portrait-outwork.jpg"
                  alt="Юлия Шашкова вне работы"
                  fill
                  sizes="(max-width: 768px) 100vw, 38vw"
                  className="object-cover"
                />
              </div>

              <div className="px-6 pb-7 pt-2 md:px-8 md:py-8 lg:px-10">
                <Eyebrow>
                  За пределами работы
                </Eyebrow>

                <h2 className="mt-3 text-[30px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[38px]">
                  Психология занимает много места в моей
                  жизни. Но не все
                </h2>

                <div
                  className="mt-4 max-w-xl space-y-3 text-[14px] leading-[1.68]"
                  style={{
                    ...sans,
                    color: C.inkSoft,
                  }}
                >
                  <p>
                    Я пишу и читаю фэнтези, учусь играть
                    на барабанах, хожу на концерты,
                    смотрю сериалы и аниме и играю в
                    PlayStation.
                  </p>

                  <p>
                    Мне нравится, когда на сессии можно
                    сослаться на сцену из фильма,
                    персонажа или песню и не переводить
                    это предварительно на психологический
                    язык. Иногда художественная история
                    описывает переживание точнее, чем
                    десять терминов.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* CTA */}

        <section className="mx-auto max-w-6xl px-6 pb-12 pt-5 md:px-8 md:pb-14">
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
                <Eyebrow>Запись</Eyebrow>

                <h2 className="mt-3 text-[28px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[34px]">
                  Если хочется попробовать поработать
                  вместе
                </h2>

                <p
                  className="mt-3 max-w-2xl text-[13px] leading-[1.6] md:text-[14px]"
                  style={{
                    ...sans,
                    color: '#C9C2B5',
                  }}
                >
                  Можно оставить короткую заявку. Там
                  не нужно подробно рассказывать всю
                  историю — достаточно контакта,
                  общей темы и комментария, если
                  хочется что-то добавить.
                </p>
              </div>

              <div className="md:text-right">
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

                <p
                  className="mt-2 text-[11px]"
                  style={{
                    ...sans,
                    color: '#C9C2B5',
                  }}
                >
                  {siteDisplay.sessionDuration} ·{' '}
                  {siteDisplay.sessionPrice}
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Fact({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  const mobileLeft =
    index % 2 === 1
      ? 'border-l'
      : '';

  const mobileTop =
    index >= 2
      ? 'border-t'
      : '';

  const desktopLeft =
    index > 0
      ? 'md:border-l'
      : 'md:border-l-0';

  return (
    <div
      className={[
        'min-h-[86px] px-5 py-4 md:min-h-[92px] md:px-6',
        mobileLeft,
        mobileTop,
        desktopLeft,
        'md:border-t-0',
      ].join(' ')}
      style={{
        borderColor: C.line,
      }}
    >
      <p className="text-[17px] leading-[1.2] md:text-[18px]">
        {value}
      </p>

      <p
        className="mt-1.5 text-[11px] leading-[1.4]"
        style={{
          ...sans,
          color: C.inkSoft,
        }}
      >
        {label}
      </p>
    </div>
  );
}

function InfoCard({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article
      className="h-full border px-5 py-5"
      style={{
        borderColor: C.line,
        backgroundColor:
          'rgba(255,255,255,0.12)',
        borderRadius: radius.md,
      }}
    >
      <div className="flex items-start gap-3">
        <span
          className="min-w-[26px] pt-0.5 text-[10px]"
          style={{
            ...sans,
            color: C.terracotta,
          }}
        >
          {number}
        </span>

        <div>
          <h3 className="text-[18px] leading-[1.25]">
            {title}
          </h3>

          <p
            className="mt-2 text-[13px] leading-[1.62]"
            style={{
              ...sans,
              color: C.inkSoft,
            }}
          >
            {children}
          </p>
        </div>
      </div>
    </article>
  );
}

function CareCard({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article
      className="h-full px-5 py-5"
      style={{
        backgroundColor: C.surface,
        borderRadius: radius.md,
      }}
    >
      <span
        className="text-[10px]"
        style={{
          ...sans,
          color: C.terracotta,
        }}
      >
        {number}
      </span>

      <h3 className="mt-2 text-[18px] leading-[1.25]">
        {title}
      </h3>

      <p
        className="mt-2 text-[12.5px] leading-[1.62] md:text-[13px]"
        style={{
          ...sans,
          color: C.inkSoft,
        }}
      >
        {children}
      </p>
    </article>
  );
}