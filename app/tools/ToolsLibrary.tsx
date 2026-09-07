'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import Eyebrow from '@/app/components/Eyebrow';
import Reveal from '@/app/components/Reveal';

import {
  C,
  radius,
  sans,
  shadow,
} from '@/app/lib/theme';

type CategoryId =
  | 'all'
  | 'state'
  | 'situations'
  | 'emotions'
  | 'schemas'
  | 'changes';

type ToolCategory = Exclude<CategoryId, 'all'>;

type ToolItem = {
  id: string;
  href?: string;
  status: 'available' | 'soon';
  categories: readonly ToolCategory[];
  type: string;
  time: string;
  title: string;
  text: string;
  accent: string;
};

const categories: {
  id: CategoryId;
  label: string;
}[] = [
  {
    id: 'all',
    label: 'Все',
  },
  {
    id: 'state',
    label: 'Состояние',
  },
  {
    id: 'situations',
    label: 'Ситуации',
  },
  {
    id: 'emotions',
    label: 'Эмоции',
  },
  {
    id: 'schemas',
    label: 'Схемы',
  },
  {
    id: 'changes',
    label: 'Изменения',
  },
];

const categoryLabels: Record<ToolCategory, string> = {
  state: 'Состояние',
  situations: 'Ситуации',
  emotions: 'Эмоции',
  schemas: 'Схемы',
  changes: 'Изменения',
};

const tools: ToolItem[] = [
  /*
   * ДОСТУПНО СЕЙЧАС
   */

  {
    id: 'gad-7',
    href: '/tools/anxiety-scale',
    status: 'available',
    categories: ['state'],
    type: 'опросник',
    time: 'около 3 минут',
    title: 'Тревожные симптомы: GAD-7',
    text:
      'Короткая шкала для оценки выраженности тревожных симптомов за последние две недели. Результат можно использовать как ориентир, а не как диагноз.',
    accent: C.moss,
  },

  {
    id: 'phq-9',
    href: '/tools/depression-scale',
    status: 'available',
    categories: ['state'],
    type: 'опросник',
    time: 'около 3 минут',
    title: 'Депрессивные симптомы: PHQ-9',
    text:
      'Короткая шкала для оценки выраженности депрессивных симптомов за последние две недели. Отдельно учитывает влияние состояния на повседневную жизнь.',
    accent: C.terracotta,
  },

  {
    id: 'thought-diary',
    href: '/tools/thought-diary',
    status: 'available',
    categories: ['situations'],
    type: 'дневник',
    time: 'по ситуации',
    title: 'Дневник мыслей',
    text:
      'Помогает разобрать конкретный эпизод: что произошло, какие мысли и чувства появились и что вы сделали дальше.',
    accent: C.ochre,
  },

  {
    id: 'emotion-wheel',
    href: '/tools/emotion-wheel',
    status: 'available',
    categories: ['emotions'],
    type: 'карта',
    time: 'можно возвращаться',
    title: 'Интерактивная карта эмоций',
    text:
      'Круговая интерактивная карта, где эмоциональные состояния расположены по приятности переживания и уровню активации. Можно нажимать на слова и сравнивать, что подходит лучше.',
    accent: C.berry,
  },

  {
    id: 'schema-test',
    href: '/tools/schema-test',
    status: 'available',
    categories: ['schemas'],
    type: 'опросник',
    time: '10–15 минут',
    title: 'Ранние дезадаптивные схемы',
    text:
      'Помогает посмотреть, какие устойчивые представления о себе, других людях и отношениях могут чаще включаться в вашей жизни.',
    accent: C.terracotta,
  },

  {
    id: 'schema-modes-test',
    href: '/tools/schema-modes-test',
    status: 'available',
    categories: ['schemas'],
    type: 'опросник',
    time: '20–25 минут',
    title: 'Режимы схема-терапии',
    text:
      'Помогает заметить разные состояния и способы реагирования: уязвимость, самокритику, избегание, защиту и другие режимы.',
    accent: C.berry,
  },

  {
    id: 'schema-modes',
    href: '/tools/schema-modes',
    status: 'available',
    categories: ['schemas'],
    type: 'справочник',
    time: 'можно возвращаться',
    title: 'Карта режимов схема-терапии',
    text:
      'Можно посмотреть, как разные режимы ощущаются изнутри, что обычно их запускает и как человек действует, когда оказывается в таком состоянии.',
    accent: C.moss,
  },

  {
    id: 'schemas-needs',
    href: '/tools/schemas-needs',
    status: 'available',
    categories: ['schemas', 'emotions'],
    type: 'карта',
    time: 'можно возвращаться',
    title: 'Схемы и потребности',
    text:
      'Помогает увидеть связь между эмоциональными потребностями, устойчивыми схемами и привычными способами справляться.',
    accent: C.ochre,
  },

  /*
   * В РАЗРАБОТКЕ
   */

  {
    id: 'situation-analysis',
    status: 'soon',
    categories: ['situations'],
    type: 'интерактивная карта',
    time: '10–15 минут',
    title: 'Разбор ситуации',
    text:
      'Разложить конкретный эпизод по шагам: что произошло, что вы подумали, почувствовали и сделали, что стало легче сразу и к чему это привело потом.',
    accent: C.terracotta,
  },

  {
    id: 'avoidance-cycle',
    status: 'soon',
    categories: ['situations', 'changes'],
    type: 'карта',
    time: '5–10 минут',
    title: 'Цикл избегания',
    text:
      'Посмотреть, как страх приводит к избеганию, почему оно помогает в моменте и как одновременно может поддерживать трудность дальше.',
    accent: C.ochre,
  },

  {
    id: 'approach-ladder',
    status: 'soon',
    categories: ['changes'],
    type: 'упражнение',
    time: '10 минут',
    title: 'Лестница приближения',
    text:
      'Разбить сложное или страшное действие на небольшие шаги разной трудности и собрать реалистичную последовательность.',
    accent: C.moss,
  },

  {
    id: 'anxious-prediction',
    status: 'soon',
    categories: ['situations', 'changes'],
    type: 'эксперимент',
    time: 'в два этапа',
    title: 'Проверка тревожного прогноза',
    text:
      'Записать, чего вы ожидаете от ситуации, а после события вернуться и сравнить прогноз с тем, что произошло на самом деле.',
    accent: C.berry,
  },

  {
    id: 'emotion-thought-body',
    status: 'soon',
    categories: ['emotions'],
    type: 'тренажер',
    time: '5 минут',
    title: 'Эмоция, мысль или ощущение?',
    text:
      'Научиться различать эмоции, мысли, телесные ощущения и импульсы к действию, а затем разобрать собственный пример.',
    accent: C.ochre,
  },

  {
    id: 'needs',
    status: 'soon',
    categories: ['emotions', 'schemas'],
    type: 'карта',
    time: '5–10 минут',
    title: 'Что мне сейчас нужно?',
    text:
      'Посмотреть не только на переживание, но и на потребность за ним: в безопасности, поддержке, ясности, близости, границах или чем-то другом.',
    accent: C.moss,
  },

  {
    id: 'self-criticism',
    status: 'soon',
    categories: ['situations', 'changes'],
    type: 'упражнение',
    time: '10 минут',
    title: 'Разобрать самокритику',
    text:
      'Посмотреть, что именно вы говорите себе после ошибки, от чего пытается защитить эта критика и действительно ли она помогает.',
    accent: C.berry,
  },

  {
    id: 'repeating-pattern',
    status: 'soon',
    categories: ['schemas', 'situations'],
    type: 'карта',
    time: '15–20 минут',
    title: 'Повторяющийся сценарий',
    text:
      'Сравнить несколько похожих ситуаций и поискать, что в них повторяется: ожидания, чувства, способы защиты и итог.',
    accent: C.terracotta,
  },

  {
    id: 'difficult-conversation',
    status: 'soon',
    categories: ['changes', 'situations'],
    type: 'подготовка',
    time: '10–15 минут',
    title: 'Подготовиться к сложному разговору',
    text:
      'Сформулировать, что произошло, чего вы хотите от разговора, о чем просите и где проходит ваша граница.',
    accent: C.ochre,
  },

  {
    id: 'weekly-check-in',
    status: 'soon',
    categories: ['state'],
    type: 'наблюдение',
    time: '5 минут в неделю',
    title: 'Еженедельный check-in',
    text:
      'Коротко отмечать настроение, тревогу, энергию, сон и нагрузку, чтобы видеть динамику не по памяти, а за несколько недель.',
    accent: C.moss,
  },
];

export default function ToolsLibrary() {
  const [activeCategory, setActiveCategory] =
    useState<CategoryId>('all');

  const filteredTools = useMemo(() => {
    if (activeCategory === 'all') {
      return tools;
    }

    return tools.filter((tool) =>
      tool.categories.includes(activeCategory)
    );
  }, [activeCategory]);

  const availableTools = filteredTools.filter(
    (tool) => tool.status === 'available'
  );

  const upcomingTools = filteredTools.filter(
    (tool) => tool.status === 'soon'
  );

  return (
    <main>
      {/* HERO */}

      <section className="mx-auto max-w-6xl px-6 pb-8 pt-10 md:px-8 md:pb-10 md:pt-14">
        <Reveal>
          <div className="max-w-[900px]">
            <Eyebrow>Инструменты</Eyebrow>

            <h1 className="mt-4 text-[37px] font-normal leading-[1.03] tracking-[-0.025em] md:text-[46px] lg:text-[50px]">
              Разобраться в том, что происходит
            </h1>

            <p
              className="mt-5 max-w-[850px] text-[15px] leading-[1.65] md:text-[16px]"
              style={{
                ...sans,
                color: C.inkSoft,
              }}
            >
              Здесь собраны опросники, карты, дневники и упражнения, которыми можно пользоваться самостоятельно. С их помощью можно оценить текущее состояние, разобрать конкретную ситуацию, лучше понять свои эмоции и потребности, заметить повторяющийся сценарий или подготовиться к изменениям.
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div
            className="mt-6 grid gap-4 px-5 py-5 md:grid-cols-3 md:px-6"
            style={{
              backgroundColor: C.surface,
              borderRadius: radius.lg,
            }}
          >
            <HeroNote title="Не только тесты">
              Здесь есть инструменты, в которых нет
              итогового балла.
            </HeroNote>

            <HeroNote title="Можно возвращаться">
              Некоторые вещи полезнее заполнять несколько раз и
              смотреть, что меняется со временем.
            </HeroNote>

            <HeroNote title="Можно принести на встречу">
              Если инструмент помог заметить что-то важное, результат или свои наблюдения можно использовать как начало разговора на сессии.
            </HeroNote>
          </div>
        </Reveal>
      </section>

      {/* FILTERS */}

      <section className="mx-auto max-w-6xl px-6 pb-5 md:px-8">
        <Reveal delay={90}>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Фильтр инструментов"
          >
            {categories.map((category) => {
              const isActive =
                activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() =>
                    setActiveCategory(category.id)
                  }
                  className="rounded-full px-4 py-2 text-[12px] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    ...sans,
                    backgroundColor: isActive
                      ? C.ink
                      : C.surface,
                    color: isActive
                      ? C.bg
                      : C.inkSoft,
                    outlineColor: C.terracotta,
                  }}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* AVAILABLE */}

      {availableTools.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-7 md:px-8 md:py-9">
          <Reveal>
            <div className="grid gap-y-3 md:grid-cols-[0.72fr_1.28fr] md:gap-x-10">
  <div>
    <Eyebrow>Доступно сейчас</Eyebrow>
  </div>

  <div className="hidden md:block" />

  <h2 className="text-[30px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[38px]">
    Что уже можно использовать
  </h2>

  <p
    className="text-[14px] leading-[1.65] md:pt-[5px] md:text-[15px]"
    style={{
      ...sans,
      color: C.inkSoft,
    }}
  >
    Выберите инструмент под ту задачу, которая сейчас для вас актуальна.
    Необязательно проходить все подряд: иногда одного подходящего разбора
    достаточно, чтобы заметить что-то важное.
  </p>
</div>
          </Reveal>

          <div
            className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
            aria-live="polite"
          >
            {availableTools.map((tool, index) => (
              <Reveal
                key={tool.id}
                delay={index * 25}
              >
                <ToolCard tool={tool} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* UPCOMING */}

      {upcomingTools.length > 0 && (
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
                <div className="grid gap-y-3 md:grid-cols-[0.72fr_1.28fr] md:gap-x-10">
                  <div>
                    <Eyebrow>Библиотека будет расти</Eyebrow>
                  </div>

                  <div className="hidden md:block" />

                  <h2 className="text-[30px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[38px]">
                    Следующие инструменты
                  </h2>

                  <p
                    className="text-[14px] leading-[1.65] md:text-[15px]"
                    style={{
                      ...sans,
                      color: C.ink,
                    }}
                  >
                    Я постепенно добавляю не только опросники, но
                    и способы разбирать реальные ситуации,
                    отслеживать повторяющиеся реакции и
                    пробовать изменения на практике.
                  </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  {upcomingTools.map(
                    (tool, index) => (
                      <Reveal
                        key={tool.id}
                        delay={index * 20}
                      >
                        <ToolCard tool={tool} />
                      </Reveal>
                    )
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* IMPORTANT */}

      <section className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-10">
        <Reveal>
          <div className="grid gap-y-3 md:grid-cols-[0.72fr_1.28fr] md:gap-x-10">
            <div>
              <Eyebrow>Важно</Eyebrow>
            </div>

            <div className="hidden md:block" />

            <h2 className="text-[30px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[38px]">
              Результат — это не заключение о вас
            </h2>

            <div
              className="space-y-3 text-[14px] leading-[1.65] md:text-[15px]"
              style={{
                ...sans,
                color: C.inkSoft,
              }}
            >
              <p>
                Высокий балл по шкале или узнавание себя в описании еще не означает, что у вас есть определенное расстройство или что найденное описание полностью вас характеризует.
              </p>

              <p>
                Если что-то неожиданно сильно задело или
                напугало, полезнее рассматривать это как повод
                присмотреться к теме внимательнее, а не как
                готовый ответ на вопрос, что с вами.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}

      <section className="mx-auto max-w-6xl px-6 pb-12 pt-3 md:px-8 md:pb-14">
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
              <Eyebrow>
                Если хочется разобраться глубже
              </Eyebrow>

              <h2 className="mt-3 max-w-3xl text-[28px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[34px]">
                Иногда инструмент помогает найти вопрос, но не
                дает на него готового ответа
              </h2>

              <p
                className="mt-3 max-w-3xl text-[13px] leading-[1.6] md:text-[14px]"
                style={{
                  ...sans,
                  color: '#C9C2B5',
                }}
              >
                Если хочется разобраться в том, как все это
                устроено именно в вашей жизни, оставьте заявку на встречу.
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
  );
}

function ToolCard({
  tool,
}: {
  tool: ToolItem;
}) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <p
          className="text-[9.5px] uppercase tracking-[0.1em]"
          style={{
            ...sans,
            color: tool.accent,
          }}
        >
          {tool.type}
        </p>

        {tool.status === 'soon' && (
          <span
            className="shrink-0 rounded-full px-2.5 py-1 text-[9px]"
            style={{
              ...sans,
              backgroundColor:
                'rgba(247, 243, 236, 0.72)',
              color: C.inkSoft,
            }}
          >
            скоро
          </span>
        )}
      </div>

      <h3 className="mt-3 text-[17px] leading-[1.23]">
        {tool.title}
      </h3>

      <p
        className="mt-2 flex-1 text-[11.5px] leading-[1.56] md:text-[12px]"
        style={{
          ...sans,
          color: C.inkSoft,
        }}
      >
        {tool.text}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {tool.categories.map((category) => (
          <span
            key={category}
            className="rounded-full px-2.5 py-1 text-[9.5px]"
            style={{
              ...sans,
              backgroundColor:
                'rgba(107, 99, 88, 0.07)',
              color: C.inkSoft,
            }}
          >
            {categoryLabels[category]}
          </span>
        ))}
      </div>

      <div
        className="mt-3 flex items-center justify-between gap-3 text-[10.5px]"
        style={{
          ...sans,
          color: C.inkSoft,
        }}
      >
        <span>{tool.time}</span>

        {tool.status === 'available' && (
          <span
            className="transition-transform duration-300 group-hover:translate-x-1"
            style={{
              color: C.ink,
            }}
          >
            Открыть →
          </span>
        )}
      </div>
    </>
  );

  const sharedClassName =
    'group flex h-full min-h-[235px] flex-col px-4 py-4 md:px-5';

  if (
    tool.status === 'available' &&
    tool.href
  ) {
    return (
      <Link
        href={tool.href}
        className={`${sharedClassName} transition-all duration-300 hover:-translate-y-1`}
        style={{
          backgroundColor: C.surface,
          borderRadius: radius.md,
          boxShadow: shadow.soft,
        }}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={sharedClassName}
      style={{
        backgroundColor:
          'rgba(247, 243, 236, 0.66)',
        borderRadius: radius.md,
      }}
    >
      {content}
    </div>
  );
}

function HeroNote({
  title,
  children,
}: {
  title: string;
  children: string;
}) {
  return (
    <div>
      <h2 className="text-[15px] leading-[1.3]">
        {title}
      </h2>

      <p
        className="mt-1.5 text-[11.5px] leading-[1.55]"
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