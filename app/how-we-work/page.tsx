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
    title: 'Как проходит работа',
    description:
      'Как устроена психологическая работа: первая встреча, дальнейший процесс, частота консультаций, оплата, отмены и ответы на частые вопросы.',
    path: '/how-we-work',
  });

const steps = [
  {
    number: '01',
    title: 'Первая встреча',
    meta: 'Знакомимся и разбираемся, что происходит',
    text:
      'Вы рассказываете о том, что привело вас сейчас. Я задаю вопросы, помогаю отделить главное от второстепенного и начинаю собирать картину происходящего. Не обязательно заранее уметь сформулировать точный запрос. Иногда он становится понятнее уже в разговоре. «Мне плохо и я пока не очень понимаю почему» тоже может быть достаточной точкой начала.',
  },
  {
    number: '02',
    title: 'Собираем общую картину',
    meta: 'Понимаем, что поддерживает трудность',
    text:
      'В первые встречи мы постепенно замечаем повторяющиеся ситуации, реакции, мысли, эмоции, способы справляться и важный жизненный контекст. Задача не в том, чтобы навесить объяснение, а в том, чтобы у нас появилось достаточно точное общее понимание: что происходит именно с вами и где на это можно влиять.',
  },
  {
    number: '03',
    title: 'Пробуем менять',
    meta: 'Работаем с тем, что можно изменить',
    text:
      'В зависимости от ситуации мы можем разбирать конкретные эпизоды, проверять привычные выводы, тренировать новые способы действовать, работать с эмоциями и устойчивыми жизненными сценариями. Иногда между встречами появляются наблюдения, упражнения или небольшие эксперименты. Они подбираются под задачу, а не выдаются автоматически после каждой сессии.',
  },
  {
    number: '04',
    title: 'Проверяем, что меняется',
    meta: 'Корректируем направление и завершаем работу',
    text:
      'Мы периодически возвращаемся к вопросу, стало ли в жизни что-то реально меняться. Если нет, пересматриваем наше понимание или способ работы. Когда основные задачи решены или дальнейшая регулярная работа уже не нужна, заранее обсуждаем завершение и то, как сохранить полученные изменения.',
  },
] as const;

const therapistSide = [
  'объяснять, что мы делаем и зачем, когда это имеет значение',
  'задавать прямые вопросы, но не требовать рассказывать больше, чем вы готовы',
  'говорить, если вижу, что выбранный способ работы не помогает или нужен другой специалист',
  'возвращаться к целям и проверять, происходят ли изменения не только на встречах, но и в жизни',
  'соблюдать профессиональные границы и конфиденциальность',
  'регулярно проходить супервизию',
] as const;

const clientSide = [
  'говорить, если что-то непонятно, не подходит или вызывает сомнения',
  'по возможности приносить на встречи реальные ситуации, а не пытаться отвечать правильно',
  'пробовать новые способы действий между встречами, когда мы договорились о таком эксперименте',
  'сообщать, если изменились цели, состояние или обстоятельства жизни',
  'предупреждать, если встречу нужно отменить или перенести',
  'не соглашаться со мной автоматически: рабочие гипотезы можно и нужно проверять',
] as const;

const faq = [
  {
    q: 'Сколько встреч понадобится?',
    a:
      'Заранее назвать точное число нельзя. Продолжительность зависит от того, с чем вы приходите, насколько давно это происходит, сколько задач мы берем в работу и как меняется ситуация по ходу процесса. После первых встреч обычно уже можно содержательнее обсудить предполагаемый объем работы, но это все равно не контракт на определенное количество сессий.',
  },
  {
    q: 'Как часто мы встречаемся?',
    a:
      `Обычно раз в ${site.practice.session.frequency.usualMinDays}–${site.practice.session.frequency.usualMaxDays} дней. Такой ритм помогает сохранять связность процесса и одновременно оставляет время что-то заметить и попробовать между встречами. В некоторых случаях интервал может быть увеличен примерно до ${site.practice.session.frequency.possibleMaxDays} дней, если это подходит текущему этапу работы.`,
  },
  {
    q: 'Как проходит оплата?',
    a:
      `После того как мы согласовали время встречи, я отправляю ссылку на оплату через ${site.payment.provider}. Стоимость одной встречи — ${siteDisplay.sessionPrice}. После оплаты формируется кассовый чек.`,
  },
  {
    q: 'Что если нужно отменить или перенести встречу?',
    a:
      `Лучше предупредить минимум за ${site.practice.cancellation.standardNoticeHours} часов. К экстренным и действительно непредвиденным ситуациям я отношусь спокойно. Если поздние отмены или пропуски начинают повторяться, мы отдельно обсуждаем, как организовать дальнейшие встречи так, чтобы формат оставался рабочим для обеих сторон.`,
  },
  {
    q: 'Что нужно подготовить к первой встрече?',
    a:
      'Ничего специального. Нужны стабильный интернет и место, где вы сможете спокойно говорить и вас не будут слышать посторонние. Можно заранее подумать, что хотелось бы обсудить, но готовить историю жизни, список симптомов или правильно сформулированный запрос не требуется.',
  },
  {
    q: 'Обязательно ли делать домашние задания?',
    a:
      'Нет. Между встречами я могу предлагать наблюдения, упражнения или небольшие эксперименты, если они действительно нужны для нашей задачи. Мы обсуждаем их смысл и подбираем реалистичный объем. Сам факт выполненной домашки не является мерой хорошего клиента.',
  },
  {
    q: 'А если я передумаю продолжать?',
    a:
      'Вы можете закончить работу в любой момент. Если получится, я бы предложила не исчезать молча, а хотя бы немного обсудить это: что повлияло на решение, что в работе было полезно, что не подошло и с чем вы уходите.',
  },
  {
    q: 'Что вы записываете во время встречи?',
    a:
      'Иногда я делаю короткие рабочие заметки: основные темы, важные наблюдения, гипотезы или договоренности к следующей встрече. Я не веду аудио- или видеозапись консультаций.',
  },
  {
    q: 'Сохраняется ли конфиденциальность?',
    a:
      'Да. То, что вы рассказываете на встречах, остается внутри нашей работы. На супервизию я могу выносить отдельные моменты из случая, но без имени и лишних деталей, по которым вас можно было бы узнать. Исключения возможны только в ситуациях, где у меня появляются предусмотренные законом обязанности.',
  },
  {
    q: 'А если мне нужен психиатр?',
    a:
      'Это не значит, что психологическая работа прекращается. Можно одновременно работать со мной и наблюдаться у психиатра. Если я вижу, что без врача здесь лучше не обходиться, я скажу об этом прямо. Лекарства и медицинские решения остаются зоной ответственности врача, а мы продолжаем работать со своей частью.',
  },
] as const;

const facts = [
  {
    value: siteDisplay.sessionPrice,
    label: 'одна встреча',
  },
  {
    value: siteDisplay.sessionDuration,
    label: 'продолжительность',
  },
  {
    value: site.practice.session.format,
    label: site.practice.session.platform,
  },
  {
    value: `Раз в ${site.practice.session.frequency.usualMinDays}–${site.practice.session.frequency.usualMaxDays} дней`,
    label: 'обычный ритм',
  },
  {
    value: 'Индивидуально',
    label: 'один клиент',
  },
  {
    value: site.practice.session.age,
    label: 'работаю со взрослыми',
  },
] as const;

export default function HowWeWorkPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        ...serif,
        backgroundColor: C.bg,
        color: C.ink,
      }}
    >
      <Nav active="/how-we-work" />

      <main>
        {/* HERO */}

        <section className="mx-auto max-w-6xl px-6 pb-7 pt-10 md:px-8 md:pb-9 md:pt-14">
          <Reveal>
            <div className="max-w-4xl">
              <Eyebrow>Работа со мной</Eyebrow>

              <h1 className="mt-4 max-w-[820px] text-[37px] font-normal leading-[1.03] tracking-[-0.025em] md:text-[46px] lg:text-[50px]">
                Как устроена психологическая работа
              </h1>

              <p
                className="mt-4 max-w-[730px] text-[15px] leading-[1.65] md:text-[16px]"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                До первой встречи полезно понимать не только
                цену и длительность, но и сам процесс: что мы
                будем делать, чего можно ожидать от меня, что
                будет зависеть от вас и как понять, что работа
                действительно куда-то движется.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div
              className="mt-7 grid grid-cols-2 overflow-hidden md:grid-cols-3 lg:grid-cols-6"
              style={{
                backgroundColor: C.surface,
                border: `1px solid ${C.line}`,
                borderRadius: radius.lg,
              }}
            >
              {facts.map((fact, index) => (
                <Fact
                  key={fact.label}
                  value={fact.value}
                  label={fact.label}
                  index={index}
                />
              ))}
            </div>
          </Reveal>
        </section>

        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <AnimatedRule />
        </div>

        {/* PROCESS */}

        <section className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-10">
          <Reveal>
            <div className="mb-5">
  <div className="grid gap-4 md:grid-cols-2">
    <div>
      <Eyebrow>Процесс</Eyebrow>

      <h2 className="mt-3 text-[30px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[38px]">
        Общая логика работы
      </h2>
    </div>

    <div className="md:pl-0">
      <p
        className="max-w-xl text-[14px] leading-[1.65]"
        style={{
          ...sans,
          color: C.inkSoft,
        }}
      >
        Эти шаги могут идти не строго один за другим.
        Иногда мы возвращаемся к пониманию ситуации,
        меняем гипотезу или переключаемся на более
        актуальную задачу. Структура нужна не ради
        структуры, а чтобы работа не превращалась в
        бесконечный разговор без направления.
      </p>
    </div>
  </div>
</div>
          </Reveal>

          <div className="grid gap-3 md:grid-cols-2">
            {steps.map((step, index) => (
              <Reveal
                key={step.number}
                delay={index * 35}
              >
                <article
                  className="group h-full border px-5 py-5 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    borderColor: C.line,
                    backgroundColor:
                      'rgba(255,255,255,0.12)',
                    borderRadius: radius.md,
                  }}
                >
                  <div className="mb-3 flex items-start gap-3">
                    <span
                      className="min-w-[26px] pt-1 text-[10px]"
                      style={{
                        ...sans,
                        color: C.terracotta,
                      }}
                    >
                      {step.number}
                    </span>

                    <div>
                      <h3 className="text-[19px] leading-[1.2]">
                        {step.title}
                      </h3>

                      <p
                        className="mt-1 text-[11.5px] leading-[1.45]"
                        style={{
                          ...sans,
                          color: C.inkSoft,
                        }}
                      >
                        {step.meta}
                      </p>
                    </div>
                  </div>

                  <p
                    className="pl-[39px] text-[13px] leading-[1.62] md:text-[13.5px]"
                    style={{
                      ...sans,
                      color: C.inkSoft,
                    }}
                  >
                    {step.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <div
              className="mt-4 px-5 py-4"
              style={{
                backgroundColor:
                  'rgba(150, 59, 89, 0.06)',
                border: `1px solid ${C.berry}18`,
                borderRadius: radius.md,
              }}
            >
              <p
                className="text-[13px] leading-[1.6]"
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
                  На встрече не нужно быть удобным или собранным. Можно приходить растерянным, злым, уставшим, молчаливым, плакать, смеяться, ругаться матом или не знать, с чего начать. Моя задача не оценивать, насколько правильно вы проходите терапию, а помогать разбираться с тем, что происходит.
                </strong>{' '}
              </p>
            </div>
          </Reveal>
        </section>

        {/* RESPONSIBILITY */}

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
              <div className="grid gap-7 p-6 md:grid-cols-2 md:gap-10 md:p-8 lg:p-10">
                <div>
                  <Eyebrow>С моей стороны</Eyebrow>

                  <h2 className="mt-3 max-w-md text-[28px] font-normal leading-[1.1] tracking-[-0.02em] md:text-[35px]">
                    За что отвечаю я
                  </h2>

                  <div className="mt-5">
                    <CheckList items={therapistSide} />
                  </div>
                </div>

                <div>
                  <Eyebrow>С вашей стороны</Eyebrow>

                  <h2 className="mt-3 max-w-md text-[28px] font-normal leading-[1.1] tracking-[-0.02em] md:text-[35px]">
                    Что помогает работе быть полезной
                  </h2>

                  <div className="mt-5">
                    <CheckList items={clientSide} />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* PROGRESS */}

        <section className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-10">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
              <div>
                <Eyebrow>Результат</Eyebrow>

                <h2 className="mt-3 text-[30px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[38px]">
                  Как понять, что работа движется
                </h2>
              </div>

              <div
                className="grid gap-3 sm:grid-cols-2"
                style={sans}
              >
                <ProgressCard>
                  Сложная ситуация возникает реже или уже не выбивает так сильно.
                </ProgressCard>

                <ProgressCard>
                  После сложного момента вы быстрее
                  возвращаетесь в свое обычное состояние.
                </ProgressCard>

                <ProgressCard>
                  Между автоматической реакцией и действием
                  появляется больше выбора.
                </ProgressCard>

                <ProgressCard>
                  То, что раньше приходилось только понимать,
                  постепенно получается делать иначе в реальной
                  жизни.
                </ProgressCard>
              </div>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <p
              className="mt-5 max-w-3xl text-[13px] leading-[1.65]"
              style={{
                ...sans,
                color: C.inkSoft,
              }}
            >
              Улучшение не всегда выглядит как полное
              исчезновение неприятных эмоций. Иногда более
              важный результат в том, что тревога, стыд,
              раздражение или неопределенность перестают
              полностью управлять тем, что вы делаете.
            </p>
          </Reveal>
        </section>

        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <AnimatedRule />
        </div>

        {/* FAQ */}

        <section className="mx-auto max-w-4xl px-6 py-8 md:px-8 md:py-10">
          <Reveal>
            <Eyebrow>Частые вопросы</Eyebrow>

            <h2 className="mt-3 text-[30px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[38px]">
              Практические детали
            </h2>

            <p
              className="mt-3 max-w-2xl text-[14px] leading-[1.65]"
              style={{
                ...sans,
                color: C.inkSoft,
              }}
            >
              То, что обычно хочется уточнить до первой
              встречи или в самом начале работы.
            </p>
          </Reveal>

          <div className="mt-6">
            {faq.map((item, index) => (
              <Reveal
                key={item.q}
                delay={index * 20}
              >
                <details
                  className="group border-t py-4"
                  style={{
                    borderColor: C.line,
                  }}
                >
                  <summary className="flex cursor-pointer list-none items-start gap-3">
                    <span
                      className="w-7 shrink-0 pt-0.5 text-[10px]"
                      style={{
                        ...sans,
                        color: C.terracotta,
                      }}
                    >
                      {String(index + 1).padStart(
                        2,
                        '0',
                      )}
                    </span>

                    <span className="flex-1 text-[16px] leading-[1.35] md:text-[17px]">
                      {item.q}
                    </span>

                    <span
                      aria-hidden="true"
                      className="shrink-0 text-[18px] leading-none transition-transform duration-300 group-open:rotate-45"
                      style={{
                        color: C.terracotta,
                      }}
                    >
                      +
                    </span>
                  </summary>

                  <p
                    className="mt-3 pl-10 pr-8 text-[13px] leading-[1.65] md:text-[13.5px]"
                    style={{
                      ...sans,
                      color: C.inkSoft,
                    }}
                  >
                    {item.a}
                  </p>
                </details>
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
                <Eyebrow>Первая встреча</Eyebrow>

                <h2 className="mt-3 text-[28px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[34px]">
                  Если формат вам подходит, можно оставить
                  заявку
                </h2>

                <p
                  className="mt-3 max-w-2xl text-[13px] leading-[1.6] md:text-[14px]"
                  style={{
                    ...sans,
                    color: '#C9C2B5',
                  }}
                >
                  В заявке достаточно оставить контакт,
                  выбрать общую тему и при желании добавить
                  короткий комментарий. Подробно рассказывать
                  всю историю заранее не нужно.
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
    index % 2 === 1 ? 'border-l' : '';

  const mobileTop =
    index >= 2 ? 'border-t' : '';

  const desktopLeft =
    index > 0
      ? 'lg:border-l'
      : 'lg:border-l-0';

  return (
    <div
      className={[
        'min-h-[84px] px-4 py-4',
        'lg:border-t-0',
        mobileLeft,
        mobileTop,
        desktopLeft,
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

function CheckList({
  items,
}: {
  items: readonly string[];
}) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3"
        >
          <span
            aria-hidden="true"
            className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
            style={{
              backgroundColor: C.terracotta,
            }}
          />

          <span
            className="text-[13px] leading-[1.6] md:text-[13.5px]"
            style={{
              ...sans,
              color: C.ink,
            }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ProgressCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="h-full px-4 py-4 text-[12.5px] leading-[1.6] md:text-[13px]"
      style={{
        backgroundColor: C.surface,
        color: C.inkSoft,
        borderRadius: radius.md,
      }}
    >
      {children}
    </div>
  );
}