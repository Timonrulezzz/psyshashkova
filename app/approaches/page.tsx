import type { ReactNode } from 'react';

import Link from 'next/link';

import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import Eyebrow from '@/app/components/Eyebrow';
import Reveal from '@/app/components/Reveal';
import AnimatedRule from '@/app/components/AnimatedRule';

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
    title: 'Подходы в работе',
    description:
      'Как я использую когнитивно-поведенческую терапию и схема-терапию: чем они отличаются, где пересекаются и как выбирается способ работы.',
    path: '/approaches',
  });

const cbtPoints = [
  {
    title: 'Замечать цикл',
    text:
      'Смотрим, что запускает реакцию, какие мысли и ожидания появляются, что происходит с эмоциями и телом и что вы делаете дальше.',
  },
  {
    title: 'Проверять предположения',
    text:
      'Не убеждаем себя, что все хорошо. Разбираемся, где вывод достаточно точный, а где тревога, прошлый опыт или привычка дорисовывают то, чего мы пока не знаем.',
  },
  {
    title: 'Менять поведение',
    text:
      'Пробуем иначе действовать там, где привычные способы вроде избегания, бесконечных проверок или попыток все проконтролировать дают облегчение на минуту, но поддерживают трудность дальше.',
  },
  {
    title: 'Переносить изменения в жизнь',
    text:
      'То, что мы поняли на встрече, проверяем в реальных ситуациях. Иногда для этого нужны наблюдения, упражнения или небольшие эксперименты между сессиями.',
  },
] as const;

const schemaPoints = [
  {
    title: 'Повторяющиеся сценарии',
    text:
      'Похожие отношения, конфликты или переживания возникают снова и снова, хотя люди и обстоятельства меняются.',
  },
  {
    title: 'Сильные реакции',
    text:
      'Ситуация вроде бы небольшая, а внутри она переживается как катастрофа, отвержение, провал, унижение или угроза потерять отношения.',
  },
  {
    title: 'Отношение к себе',
    text:
      'Самокритика, стыд, ощущение собственной неправильности или привычка требовать от себя больше, чем возможно выдержать.',
  },
  {
    title: 'Потребности и границы',
    text:
      'Трудно замечать собственные желания, говорить нет, просить, занимать место, выдерживать чужое недовольство или не ставить отношения выше себя.',
  },
] as const;

const principles = [
  {
    title: 'Не спорю с каждой мыслью',
    text:
      'Если вы думаете что-то неприятное, моя задача не доказать, что вы ошибаетесь. Сначала нужно понять, откуда этот вывод взялся и что он делает с вашей жизнью.',
  },
  {
    title: 'Не объясняю все родителями',
    text:
      'Прошлый опыт бывает важен, но не потому, что нам обязательно нужно найти виноватого. Мы обращаемся к прошлому тогда, когда оно помогает лучше понять то, что происходит сейчас.',
  },
  {
    title: 'Не подгоняю человека под технику',
    text:
      'Если упражнение выглядит хорошим по учебнику, но не помогает именно вам, это повод менять упражнение или нашу гипотезу, а не считать, что вы неправильно проходите терапию.',
  },
  {
    title: 'Не держусь за один метод',
    text:
      'Подход нужен для того, чтобы лучше понимать ситуацию и выбирать рабочие инструменты. Если другая перспектива помогает точнее, мы можем ей воспользоваться.',
  },
] as const;

export default function ApproachesPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        ...serif,
        backgroundColor: C.bg,
        color: C.ink,
      }}
    >
      <Nav active="/approaches" />

      <main>
        {/* HERO */}

        <section className="mx-auto max-w-6xl px-6 pb-7 pt-10 md:px-8 md:pb-9 md:pt-14">
          <Reveal>
            <div className="max-w-4xl">
              <Eyebrow>Подходы</Eyebrow>

              <h1 className="mt-4 max-w-[850px] text-[37px] font-normal leading-[1.03] tracking-[-0.025em] md:text-[46px] lg:text-[50px]">
                КПТ и схема-терапия: два способа смотреть на одну ситуацию
              </h1>

              <p
                className="mt-4 max-w-[760px] text-[15px] leading-[1.65] md:text-[16px]"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                Я работаю в когнитивно-поведенческом подходе
                и схема-терапии. Обычно нам не нужно на первой
                встрече выбрать один метод и дальше держаться
                только за него. Важнее понять, что именно происходит и какой взгляд на ситуацию сейчас поможет нам лучше в ней разобраться.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div
              className="mt-7 grid gap-3 md:grid-cols-3"
            >
              <IntroCard
                number="01"
                title="Здесь и сейчас"
              >
                Что запускает трудность и что поддерживает ее
                сегодня.
              </IntroCard>

              <IntroCard
                number="02"
                title="Повторяющийся сценарий"
              >
                Почему похожие реакции возвращаются в разных
                ситуациях и отношениях.
              </IntroCard>

              <IntroCard
                number="03"
                title="Изменение"
              >
                Что можно попробовать делать, переживать или
                понимать иначе.
              </IntroCard>
            </div>
          </Reveal>
        </section>

        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <AnimatedRule />
        </div>

        {/* CBT */}

        <section className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-10">
          <Reveal>
            <div className="grid gap-5 md:grid-cols-2 md:gap-10">
              <div>
                <Eyebrow>КПТ</Eyebrow>

                <h2 className="mt-3 max-w-lg text-[30px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[38px]">
                  Что происходит сейчас и почему это продолжается
                </h2>
              </div>

              <div
                className="space-y-3 text-[14px] leading-[1.65] md:text-[15px]"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                <p>
                  В КПТ мы смотрим не только на мысли.
                  Мы смотрим на весь цикл: что произошло, на что вы обратили внимание, что подумали, что почувствовали и что сделали дальше.
                </p>

                <p>
                  Часто какой-то способ действительно помогает
                  в моменте, но одновременно поддерживает
                  трудность дальше. Например, избегание быстро
                  снижает тревогу, поэтому хочется избегать
                  снова. А мозг так и не получает возможности
                  узнать, что ситуацию можно было бы выдержать.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {cbtPoints.map((point, index) => (
              <Reveal
                key={point.title}
                delay={index * 30}
              >
                <ApproachCard
                  number={String(index + 1).padStart(2, '0')}
                  title={point.title}
                >
                  {point.text}
                </ApproachCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <div
              className="mt-4 px-5 py-4"
              style={{
                backgroundColor:
                  'rgba(184, 92, 60, 0.07)',
                borderRadius: radius.md,
              }}
            >
              <p
                className="text-[13px] leading-[1.62]"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                <strong
                  style={{
                    color: C.ink,
                    fontWeight: 600,
                  }}
                >
                  КПТ не про позитивное мышление.
                </strong>{' '}
                Мы не заменяем неприятную мысль на красивую.
                Иногда вывод действительно оказывается
                слишком категоричным. Иногда он вполне
                реалистичен. Нам важнее научиться замечать,
                проверять и выбирать, что делать дальше.
              </p>
            </div>
          </Reveal>
        </section>

        {/* SCHEMA */}

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
              <div className="p-6 md:p-8 lg:p-10">
                <div className="grid gap-5 md:grid-cols-2 md:gap-10">
                  <div>
                    <Eyebrow>Схема-терапия</Eyebrow>

                    <h2 className="mt-3 max-w-lg text-[30px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[38px]">
                      Когда одна и та же история повторяется в разных декорациях
                    </h2>
                  </div>

                  <div
                    className="space-y-3 text-[14px] leading-[1.65] md:text-[15px]"
                    style={{
                      ...sans,
                      color: C.ink,
                    }}
                  >
                    <p>
                      Иногда недостаточно разобраться только
                      с одной конкретной ситуацией. Можно
                      менять работу, партнеров или
                      обстоятельства, а внутри снова
                      оказываться примерно в том же месте.
                    </p>

                    <p>
                      Схема-терапия помогает замечать привычные представления о себе, других людях и о том, чего ждать от отношений. Они
                      складываются под влиянием темперамента
                      и жизненного опыта и могут продолжать
                      работать даже тогда, когда давно
                      перестали быть полезными.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {schemaPoints.map((point, index) => (
                    <Reveal
                      key={point.title}
                      delay={index * 30}
                    >
                      <div
                        className="h-full px-5 py-5"
                        style={{
                          backgroundColor:
                            'rgba(247, 243, 236, 0.62)',
                          borderRadius: radius.md,
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className="min-w-[26px] pt-0.5 text-[10px]"
                            style={{
                              ...sans,
                              color: C.moss,
                            }}
                          >
                            {String(index + 1).padStart(
                              2,
                              '0',
                            )}
                          </span>

                          <div>
                            <h3 className="text-[18px] leading-[1.25]">
                              {point.title}
                            </h3>

                            <p
                              className="mt-2 text-[13px] leading-[1.6]"
                              style={{
                                ...sans,
                                color: C.inkSoft,
                              }}
                            >
                              {point.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <Reveal delay={80}>
                  <div
                    className="mt-4 grid gap-3 md:grid-cols-2"
                  >
                    <div
                      className="px-5 py-4"
                      style={{
                        backgroundColor:
                          'rgba(247, 243, 236, 0.45)',
                        borderRadius: radius.md,
                      }}
                    >
                      <p
                        className="text-[13px] leading-[1.62]"
                        style={{
                          ...sans,
                          color: C.inkSoft,
                        }}
                      >
                        <strong
                          style={{
                            color: C.ink,
                            fontWeight: 600,
                          }}
                        >
                          Прошлое не является самоцелью.
                        </strong>{' '}
                        Мы возвращаемся к нему тогда, когда
                        это помогает понять, почему
                        сегодняшняя ситуация переживается
                        именно так.
                      </p>
                    </div>

                    <div
                      className="px-5 py-4"
                      style={{
                        backgroundColor:
                          'rgba(247, 243, 236, 0.45)',
                        borderRadius: radius.md,
                      }}
                    >
                      <p
                        className="text-[13px] leading-[1.62]"
                        style={{
                          ...sans,
                          color: C.inkSoft,
                        }}
                      >
                        В схема-терапии есть не только
                        разговор: могут использоваться
                        воображение, работа с эмоционально
                        заряженными воспоминаниями и диалоги
                        между разными внутренними позициями.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </section>

        {/* TWO LENSES */}

<section className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-10">
  <Reveal>
    <div className="grid gap-y-2 md:grid-cols-[0.72fr_1.28fr] md:gap-x-10">
      <div>
        <Eyebrow>Вместе</Eyebrow>
      </div>

      <div className="hidden md:block" />

      <h2 className="text-[30px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[38px]">
        Одна ситуация, две перспективы
      </h2>

      <p
        className="text-[14px] leading-[1.65] md:text-[15px]"
        style={{
          ...sans,
          color: C.inkSoft,
        }}
      >
        В реальной работе КПТ и схема-терапия не разделены
        четкой чертой. Одну и ту же ситуацию бывает полезно
        посмотреть с двух сторон.
      </p>
    </div>
  </Reveal>

  <Reveal delay={50}>
    <div
      className="mt-6 overflow-hidden"
      style={{
        border: `1px solid ${C.line}`,
        borderRadius: radius.lg,
      }}
    >
      <div
        className="px-5 py-5 md:px-7"
        style={{
          backgroundColor: C.surface,
        }}
      >
        <Eyebrow>Например</Eyebrow>

        <p className="mt-2 text-[20px] leading-[1.25] md:text-[23px]">
          Начальник указывает на ошибку в работе, а внутри
          ощущение, будто вы полностью провалились
        </p>
      </div>

      <div className="grid md:grid-cols-2">
        <Perspective
          eyebrow="Если смотреть через КПТ"
          title="Что происходит в этом эпизоде"
        >
          Можно заметить автоматический вывод вроде «я не
          справляюсь», тревогу или стыд, желание несколько
          раз перепроверить всю работу, оправдаться или
          вообще избегать похожих задач. Потом посмотреть,
          какой из этих элементов поддерживает цикл и что
          можно попробовать иначе.
        </Perspective>

        <Perspective
          eyebrow="Если смотреть через схема-терапию"
          title="Почему это так сильно задевает"
          border
        >
          Может оказаться, что любая ошибка быстро
          превращается в доказательство собственной
          несостоятельности, а критика человека с более
          высоким статусом переживается особенно болезненно.
          Тогда имеет смысл работать уже не только с этим
          письмом начальника, но и с самим повторяющимся
          способом переживать такие ситуации.
        </Perspective>
      </div>
    </div>
  </Reveal>

  <Reveal delay={80}>
    <p
      className="mt-4 w-full text-[13px] leading-[1.65]"
      style={{
        ...sans,
        color: C.inkSoft,
      }}
    >
      Мы можем начать с одного конкретного эпизода, заметить
      за ним знакомый сценарий, поработать уже с ним, а потом
      проверить изменения снова в обычной жизни. Поэтому вам
      не нужно самим выбирать подход перед записью.
    </p>
  </Reveal>
</section>

        {/* EVIDENCE */}

        <section className="mx-auto max-w-6xl px-6 py-7 md:px-8 md:py-9">
          <Reveal>
            <div
              className="grid gap-6 px-6 py-6 md:grid-cols-[0.78fr_1.22fr] md:gap-10 md:px-8 md:py-8"
              style={{
                backgroundColor: C.surface,
                borderRadius: radius.lg,
              }}
            >
              <div>
                <Eyebrow>Доказательность</Eyebrow>

                <h2 className="mt-3 text-[28px] font-normal leading-[1.1] tracking-[-0.02em] md:text-[35px]">
                  Исследования важны. Но это не инструкция по сборке человека
                </h2>
              </div>

              <div
                className="space-y-3 text-[13.5px] leading-[1.65] md:text-[14px]"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                <p>
                  КПТ хорошо изучена: ее методы входят в клинические рекомендации по работе со многими распространенными состояниями, например тревожными и депрессивными.
                </p>

                <p>
                  Схема-терапия изучена меньше и появилась
                  позже. Наиболее сильная ее
                  исследовательская база связана с
                  длительными трудностями и расстройствами
                  личности, хотя сейчас подход исследуется и
                  для других состояний.
                </p>

                <p>
                  Для меня «опираться на исследования» не
                  значит автоматически применять технику,
                  потому что она хорошо сработала в среднем
                  по группе. Исследования помогают выбирать
                  разумное направление, а дальше мы все
                  равно проверяем, что происходит именно с
                  вами.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* PRINCIPLES */}

        <section className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-10">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>На практике</Eyebrow>

              <h2 className="mt-3 text-[30px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[38px]">
                Что все это значит на обычной встрече
              </h2>

              <p
                className="mt-3 max-w-2xl text-[14px] leading-[1.65]"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                Название подхода само по себе мало говорит о
                том, как человек будет чувствовать себя на встрече. Поэтому для меня важнее несколько
                рабочих принципов.
              </p>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {principles.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 30}
              >
                <ApproachCard
                  number={String(index + 1).padStart(
                    2,
                    '0',
                  )}
                  title={item.title}
                >
                  {item.text}
                </ApproachCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}

        <section className="mx-auto max-w-6xl px-6 pb-12 pt-4 md:px-8 md:pb-14">
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
                  Выбирать между КПТ и схема-терапией заранее
                  не нужно
                </h2>

                <p
                  className="mt-3 max-w-2xl text-[13px] leading-[1.6] md:text-[14px]"
                  style={{
                    ...sans,
                    color: '#C9C2B5',
                  }}
                >
                  Можно прийти со своей ситуацией, даже если
                  вы пока не знаете, как ее правильно
                  назвать. Разбираться, какой способ работы
                  здесь полезнее, уже моя часть работы.
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
      </main>

      <Footer />
    </div>
  );
}

function IntroCard({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div
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

      <h2 className="mt-2 text-[18px] leading-[1.2]">
        {title}
      </h2>

      <p
        className="mt-2 text-[12.5px] leading-[1.58]"
        style={{
          ...sans,
          color: C.inkSoft,
        }}
      >
        {children}
      </p>
    </div>
  );
}

function ApproachCard({
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
            className="mt-2 text-[13px] leading-[1.6]"
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

function Perspective({
  eyebrow,
  title,
  border = false,
  children,
}: {
  eyebrow: string;
  title: string;
  border?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={[
        'px-5 py-5 md:px-7 md:py-6',
        border
          ? 'border-t md:border-l md:border-t-0'
          : '',
      ].join(' ')}
      style={{
        borderColor: C.line,
      }}
    >
      <p
        className="text-[10px] uppercase tracking-[0.14em]"
        style={{
          ...sans,
          color: C.terracotta,
        }}
      >
        {eyebrow}
      </p>

      <h3 className="mt-2 text-[18px] leading-[1.25]">
        {title}
      </h3>

      <p
        className="mt-3 text-[13px] leading-[1.65]"
        style={{
          ...sans,
          color: C.inkSoft,
        }}
      >
        {children}
      </p>
    </div>
  );
}