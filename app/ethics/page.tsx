import type { ReactNode } from 'react';

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
    title: 'Этика и границы работы',
    description:
      'Конфиденциальность, профессиональные границы, кризисные ситуации, общение между встречами и организационные условия психологической работы.',
    path: '/ethics',
  });

const quickPoints = [
  {
    number: '01',
    title: 'Конфиденциальность',
    text:
      'То, что происходит на встречах, не становится темой для посторонних разговоров или публичного контента.',
  },
  {
    number: '02',
    title: 'Границы компетенции',
    text:
      'Если вашей ситуации нужен другой специалист или другой формат помощи, я скажу об этом прямо.',
  },
  {
    number: '03',
    title: 'Без круглосуточной связи',
    text:
      'Мессенджер подходит для организационных вопросов, но не заменяет сессию или экстренную помощь.',
  },
  {
    number: '04',
    title: 'Можно отказаться',
    text:
      'От вопроса, упражнения, темы разговора или от продолжения терапии в целом.',
  },
] as const;

const notMyFormat = [
  'дети и подростки младше 18 лет',
  'парная и семейная терапия',
  'расстройства пищевого поведения',
  'активные зависимости',
  'состояния с непосредственной угрозой жизни',
  'ситуации, в которых прямо сейчас требуется экстренная психиатрическая помощь',
] as const;

const roleCards = [
  {
    number: '01',
    title: 'Могу предложить обратиться к психиатру',
    text:
      'Если я вижу признаки того, что состояние стоит дополнительно обсудить с врачом, я скажу об этом и объясню, что именно меня насторожило. Но лекарства, дозировки и другие медицинские решения назначает психиатр.',
  },
  {
    number: '02',
    title: 'Решения остаются за вами',
    text:
      'Мы можем подробно разбирать варианты, последствия, ваши желания и сомнения. Я могу поделиться своим взглядом, если это уместно, но не буду решать за вас, увольняться ли, заканчивать отношения, переезжать или давать кому-то еще один шанс.',
  },
  {
    number: '03',
    title: 'Не обещаю результат по расписанию',
    text:
      'Мы можем довольно конкретно смотреть, что меняется от встречи к встрече и становится ли вам легче справляться с тем, с чем вы пришли. Но обещать, что тревога исчезнет за пять сессий или самооценка вырастет к определенной дате, я не могу.',
  },
  {
    number: '04',
    title: 'Если нужен другой специалист, я скажу',
    text:
      'Иногда это понятно уже по заявке, иногда выясняется в процессе. Если я вижу, что другой специалист или другой формат помощи подойдет лучше, я скажу об этом, а не буду продолжать работу просто потому, что мы уже начали.',
  },
] as const;

export default function EthicsPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        ...serif,
        backgroundColor: C.bg,
        color: C.ink,
      }}
    >
      <Nav />

      <main>
        {/* HERO */}

        <section className="mx-auto max-w-6xl px-6 pb-7 pt-10 md:px-8 md:pb-9 md:pt-14">
          <Reveal>
            <div className="max-w-4xl">
              <Eyebrow>Этика и границы</Eyebrow>

              <h1 className="mt-4 max-w-[850px] text-[37px] font-normal leading-[1.03] tracking-[-0.025em] md:text-[46px] lg:text-[50px]">
                О чем лучше договориться заранее
              </h1>

              <p
                className="mt-4 w-full text-[15px] leading-[1.65] md:text-[16px]"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                В психологической работе довольно много
                личного, поэтому мне важно, чтобы правила
                не приходилось угадывать по ходу дела.
                Здесь собрала то, что касается
                конфиденциальности, границ моей роли,
                связи между встречами и ситуаций, в которых
                нужен другой формат помощи.
              </p>
            </div>
          </Reveal>

          <div className="mt-7 grid gap-3 md:grid-cols-4">
            {quickPoints.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 30}
              >
                <SmallCard
                  number={item.number}
                  title={item.title}
                >
                  {item.text}
                </SmallCard>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <AnimatedRule />
        </div>

        {/* CONFIDENTIALITY */}

        <section className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-10">
          <Reveal>
            <div className="grid gap-y-3 md:grid-cols-[0.9fr_1.1fr] md:gap-x-10">
              <div>
                <Eyebrow>
                  Конфиденциальность
                </Eyebrow>
              </div>

              <div className="hidden md:block" />

              <h2 className="text-[30px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[38px]">
                То, что вы рассказываете мне, не становится
                публичной историей
              </h2>

              <div
                className="space-y-3 text-[14px] leading-[1.65] md:text-[15px]"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                <p>
                  Все, что вы рассказываете на встречах, я рассматриваю как конфиденциальную информацию. Я не пересказываю истории клиентов друзьям, близким или знакомым и не использую узнаваемые случаи в соцсетях, статьях или других публичных материалах.
                </p>

                <p>
                  При этом у конфиденциальности есть несколько важных нюансов: супервизия, случайные встречи вне терапии, мои рабочие записи и ситуации, когда обычных правил уже недостаточно. Ниже — как это устроено. 
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <Reveal>
              <InfoCard
                title="Если мы случайно встретимся"
              >
                Я не буду первой здороваться с вами в кафе,
                магазине или другом публичном месте. Я не
                знаю, кто рядом с вами и хотите ли вы
                объяснять, откуда мы знакомы. Если вы сами
                поздороваетесь, я, конечно, отвечу.
              </InfoCard>
            </Reveal>

            <Reveal delay={35}>
              <InfoCard
                title="Что происходит на супервизии"
              >
                Я еженедельно обсуждаю отдельные моменты своей работы с супервизором. Для разбора оставляю только то, что действительно важно для случая, и по возможности убираю детали, по которым вас можно узнать: имя, контакты, место работы и другие лишние сведения.
              </InfoCard>
            </Reveal>

            <Reveal delay={70}>
              <InfoCard
                title="Записи встреч"
              >
                Я не записываю консультации на аудио или видео. Иногда делаю короткие записи от руки: фиксирую важные моменты, рабочие гипотезы или то, к чему хочу вернуться позже.
              </InfoCard>
            </Reveal>

            <Reveal delay={105}>
              <InfoCard
                title="Где у конфиденциальности есть предел"
              >
                Я не могу обещать абсолютную конфиденциальность в ситуации, где закон прямо требует раскрыть информацию. Если возникает непосредственная угроза жизни, приоритетом становится безопасность и организация необходимой помощи. Если такая ситуация возникнет, я по возможности сначала обсужу с вами, что происходит и какие действия нужны.
              </InfoCard>
            </Reveal>
          </div>
        </section>

        {/* BOUNDARIES */}

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
        <div className="grid gap-y-3 md:grid-cols-[0.82fr_1.18fr] md:gap-x-10">
          <div>
            <Eyebrow>Границы работы</Eyebrow>
          </div>

          <div className="hidden md:block" />

          <h2 className="text-[30px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[38px]">
            Когда нужен другой формат помощи
          </h2>

          <p
            className="self-start text-[14px] leading-[1.65] md:text-[15px]"
            style={{
              ...sans,
              color: C.ink,
            }}
          >
            Я работаю индивидуально со взрослыми. Некоторые ситуации требуют
            другой специализации или участия нескольких специалистов,
            поэтому я не беру их в работу в своем обычном формате.
          </p>
        </div>

        <div className="mt-6 grid gap-2.5 sm:grid-cols-2 md:grid-cols-3">
          {[
            'дети и подростки младше 18 лет',
            'парная и семейная терапия',
            'расстройства пищевого поведения',
            'активные зависимости',
            'состояния с непосредственной угрозой жизни',
            'ситуации, в которых прямо сейчас нужна экстренная психиатрическая или медицинская помощь',
          ].map((item, index) => (
            <Reveal
              key={item}
              delay={index * 25}
            >
              <div
                className="flex h-full items-start gap-3 px-4 py-4"
                style={{
                  backgroundColor:
                    'rgba(247, 243, 236, 0.62)',
                  borderRadius: radius.md,
                }}
              >
                <span
                  className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: C.terracotta,
                  }}
                />

                <p
                  className="text-[12.5px] leading-[1.55] md:text-[13px]"
                  style={{
                    ...sans,
                    color: C.ink,
                  }}
                >
                  {item}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={90}>
          <div
            className="mt-4 px-5 py-4"
            style={{
              backgroundColor:
                'rgba(247, 243, 236, 0.62)',
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
                Наблюдение у психиатра само по себе не мешает
                работе со мной.
              </strong>{' '}
              Если состояние требует наблюдения врача, мы можем
              работать параллельно, если вы уже наблюдаетесь у
              психиатра или готовы организовать такое наблюдение
              самостоятельно.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  </Reveal>
</section>

        {/* CRISIS */}

        <section className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-10">
          <Reveal>
            <div className="grid gap-y-3 md:grid-cols-[0.72fr_1.28fr] md:gap-x-10">
              <div>
                <Eyebrow>
                  Кризисные ситуации
                </Eyebrow>
              </div>

              <div className="hidden md:block" />

              <h2 className="text-[30px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[38px]">
                Когда нужна срочная помощь
              </h2>

              <div
                className="space-y-3 text-[14px] leading-[1.65] md:text-[15px]"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                <p>
                  Самоповреждения, мысли о смерти или очень тяжелое состояние не всегда означают, что психологическая работа невозможна. Здесь важнее не сама тема, а то, насколько человек сейчас находится в безопасности.
                </p>

                <p>
                  Если нет непосредственной угрозы жизни, с этим можно работать в терапии. Но если человек планирует причинить себе вред, не уверен, что сможет оставаться в безопасности, или состояние требует помощи прямо сейчас, одной онлайн-встречи со мной уже недостаточно.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div
              className="mt-6 grid gap-5 px-5 py-5 md:grid-cols-[0.8fr_1.2fr] md:px-6"
              style={{
                backgroundColor:
                  'rgba(150, 59, 89, 0.07)',
                borderRadius: radius.md,
              }}
            >
              <h3 className="text-[20px] leading-[1.25]">
                Если помощь нужна прямо сейчас
              </h3>

              <div
                className="space-y-2 text-[13px] leading-[1.62]"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                <p>
                  Я не работаю как круглосуточная кризисная
                  служба и могу не увидеть сообщение сразу.
                </p>

                <p>
                  Если есть непосредственная опасность для жизни или вы не уверены, что сможете оставаться в безопасности, лучше не ждать ответа от меня и обратиться за экстренной помощью: по номеру 112 или в ближайшую доступную медицинскую или психиатрическую службу.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <AnimatedRule />
        </div>

        {/* PROFESSIONAL ROLE */}

        <section className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-10">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>
                Моя профессиональная роль
              </Eyebrow>

              <h2 className="mt-3 text-[30px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[38px]">
                Что можно ожидать от меня как от психолога
              </h2>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {roleCards.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 30}
              >
                <NumberCard
                  number={item.number}
                  title={item.title}
                >
                  {item.text}
                </NumberCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <p
              className="mt-4 w-full text-[13px] leading-[1.65]"
              style={{
                ...sans,
                color: C.inkSoft,
              }}
            >
              Терапия может быть очень личным и близким разговором, но это все равно профессиональные отношения. Мы не становимся друзьями и не переносим наше общение в обычную жизнь. Так у вас остается пространство, где не нужно заботиться обо мне, поддерживать взаимность или думать, что я от вас чего-то жду.
            </p>
          </Reveal>
        </section>

        {/* BETWEEN SESSIONS */}

        <section className="mx-auto max-w-6xl px-6 py-7 md:px-8 md:py-9">
          <Reveal>
            <div
              className="grid gap-6 px-6 py-6 md:grid-cols-[0.72fr_1.28fr] md:gap-10 md:px-8 md:py-8"
              style={{
                backgroundColor: C.surface,
                borderRadius: radius.lg,
              }}
            >
              <div>
                <Eyebrow>
                  Между встречами
                </Eyebrow>

                <h2 className="mt-3 text-[28px] font-normal leading-[1.1] tracking-[-0.02em] md:text-[35px]">
                  Мессенджер — для связи между встречами
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
                  Между встречами можно написать про время, перенос, ссылку, оплату или другую организационную деталь. Если хочется не потерять важную мысль или ситуацию для следующей сессии, ее тоже можно прислать.
                </p>

                <p>
                  Я отвечаю не всегда сразу и не переношу терапию в переписку. То, что требует полноценного разбора, мы оставляем на встречу.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* MONEY */}

        <section className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-10">
          <Reveal>
            <div className="grid gap-y-3 md:grid-cols-[0.72fr_1.28fr] md:gap-x-10">
              <div>
                <Eyebrow>
                  Организационные условия
                </Eyebrow>
              </div>

              <div className="hidden md:block" />

              <h2 className="text-[30px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[38px]">
                Оплата, отмены и переносы
              </h2>

              <p
                className="text-[14px] leading-[1.65] md:text-[15px]"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                Мне важно, чтобы организационные правила были понятны заранее. Тогда их не приходится выяснять уже в момент, когда встречу нужно отменить, перенести или оплатить.
              </p>
            </div>
          </Reveal>

          <Reveal delay={50}>
            <div
              className="mt-6 grid grid-cols-2 overflow-hidden md:grid-cols-4"
              style={{
                border: `1px solid ${C.line}`,
                borderRadius: radius.lg,
              }}
            >
              <Fact
                value={siteDisplay.sessionPrice}
                label="одна встреча"
                index={0}
              />

              <Fact
                value={siteDisplay.sessionDuration}
                label="продолжительность"
                index={1}
              />

              <Fact
                value={site.practice.session.format}
                label={site.practice.session.platform}
                index={2}
              />

              <Fact
                value={site.payment.provider}
                label="оплата и кассовый чек"
                index={3}
              />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div
              className="mt-4 grid gap-3 md:grid-cols-2"
            >
              <InfoCard title="Если встречу нужно отменить или перенести">
                Лучше написать минимум за{' '}
                {
                  site.practice.cancellation
                    .standardNoticeHours
                }{' '}
                часов. Экстренные и действительно непредвиденные ситуации разбираем отдельно.
              </InfoCard>

              <InfoCard title="Если поздние отмены начинают повторяться">
                Мы отдельно обсуждаем, как дальше планировать встречи. Иногда имеет смысл изменить способ бронирования или порядок оплаты. Подробные условия есть в публичной оферте.
              </InfoCard>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <Link
              href="/legal/offer"
              className="mt-4 inline-flex text-[12.5px] underline underline-offset-4"
              style={{
                ...sans,
                color: C.terracotta,
              }}
            >
              Посмотреть публичную оферту
            </Link>
          </Reveal>
        </section>

        {/* CLIENT RIGHTS */}

        <section className="mx-auto max-w-6xl px-6 py-7 md:px-8 md:py-9">
          <Reveal>
            <div
              className="overflow-hidden px-6 py-6 md:px-8 md:py-8"
              style={{
                backgroundColor: C.surfaceWarm,
                borderRadius: radius.lg,
              }}
            >
              <div className="grid gap-5 md:grid-cols-[0.72fr_1.28fr] md:gap-10">
                <div>
                  <Eyebrow>
                    На встрече
                  </Eyebrow>

                  <h2 className="mt-3 text-[28px] font-normal leading-[1.1] tracking-[-0.02em] md:text-[35px]">
                    Со мной можно говорить прямо
                  </h2>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  {[
                    'Я не хочу сейчас об этом говорить',
                    'Я не понимаю, зачем мы это делаем',
                    'Мне не подходит это упражнение',
                    'Я думаю иначе',
                    'Меня задело то, что произошло на прошлой встрече',
                    'Я хочу закончить терапию',
                  ].map((item) => (
                    <div
                      key={item}
                      className="px-4 py-3"
                      style={{
                        backgroundColor:
                          'rgba(247, 243, 236, 0.62)',
                        borderRadius: radius.sm,
                      }}
                    >
                      <p
                        className="text-[12.5px] leading-[1.5]"
                        style={{
                          ...sans,
                          color: C.ink,
                        }}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <p
                className="mt-5 w-full text-[13px] leading-[1.62]"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                Мне важно знать, если что-то не подходит, задевает, кажется бессмысленным или вызывает желание остановиться. Об этом можно говорить прямо. Иногда после такого разговора мы что-то меняем в работе, а иногда лучше понимаем, что именно произошло между нами и почему это оказалось важным
              </p>
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
                  Если условия вам подходят, то заполните форму
                </h2>
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

function SmallCard({
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
      className="h-full px-4 py-4"
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

      <h2 className="mt-2 text-[16px] leading-[1.25]">
        {title}
      </h2>

      <p
        className="mt-2 text-[11.5px] leading-[1.55]"
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

function InfoCard({
  title,
  children,
}: {
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
      <h3 className="text-[17px] leading-[1.25]">
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

function NumberCard({
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
          <h3 className="text-[17px] leading-[1.25]">
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
        </div>
      </div>
    </article>
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
        'min-h-[82px] px-5 py-4',
        mobileLeft,
        mobileTop,
        desktopLeft,
        'md:border-t-0',
      ].join(' ')}
      style={{
        borderColor: C.line,
      }}
    >
      <p className="text-[17px] leading-[1.2]">
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