import Link from 'next/link';

import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import Eyebrow from '@/app/components/Eyebrow';
import Reveal from '@/app/components/Reveal';

import { C, radius, sans, serif, shadow } from '@/app/lib/theme';
import { createPageMetadata } from '@/app/lib/metadata';

import { articles } from './articlesData';

export const metadata = createPageMetadata({
  title: 'Статьи о психологии',
  description:
    'Понятные статьи о тревоге, самокритике, отношениях, терапии и повторяющихся сценариях — без упрощений и психологических ярлыков.',
  path: '/articles',
});

export default function ArticlesPage() {
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const rest = articles.filter((article) => article.slug !== featured.slug);

  return (
    <div
      className="min-h-screen"
      style={{
        ...serif,
        backgroundColor: C.bg,
        color: C.ink,
      }}
    >
      <Nav active="/articles" />

      <main>
        <section className="mx-auto max-w-6xl px-6 pb-7 pt-10 md:px-8 md:pb-9 md:pt-14">
          <Reveal>
            <Eyebrow>Статьи</Eyebrow>

            <h1 className="mt-4 max-w-[980px] text-[38px] font-normal leading-[1.04] tracking-[-0.025em] md:text-[50px]">
              Понятно о психологии без упрощений
            </h1>

            <p
  className="mt-5 max-w-[980px] text-[15px] leading-[1.7] md:text-[16px]"
  style={{ ...sans, color: C.inkSoft }}
>
              Здесь я разбираю темы, которые часто появляются в работе:
              тревогу, самокритику, отношения, повторяющиеся сценарии и сам
              процесс терапии. Не в формате «пять признаков того, что с вами
              что-то не так», а через механизмы, контекст и то, что с этим
              можно делать.
            </p>
          </Reveal>

          <Reveal delay={40}>
            <div className="mt-7 grid gap-3 md:grid-cols-3">
              <InfoCard
                title="Без ярлыков"
                text="Один симптом, результат теста или знакомая фраза не объясняют человека целиком."
              />
              <InfoCard
                title="С опорой на исследования"
                text="В конце статей оставляю основные источники, на которые опиралась при разборе темы."
              />
              <InfoCard
                title="Через реальные ситуации"
                text="Мне важнее показать механизм на понятном примере, чем дать еще один абстрактный совет."
              />
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-7 md:px-8 md:py-9">
          <Reveal>
            <div className="mb-4">
              <Eyebrow>С чего начать</Eyebrow>
            </div>

            <Link
  href={`/articles/${featured.slug}`}
  className="group grid gap-y-3 px-6 py-7 transition-transform duration-300 hover:-translate-y-1 md:grid-cols-2 md:gap-x-10 md:px-8 md:py-8"
  style={{
    backgroundColor: C.surfaceWarm,
    borderRadius: radius.lg,
    boxShadow: shadow.soft,
  }}
>
  <div>
    <p
      className="text-[10px] uppercase tracking-[0.11em]"
      style={{ ...sans, color: C.terracotta }}
    >
      {featured.category} · {featured.readTime}
    </p>
  </div>

  <div className="hidden md:block" />

  <h2 className="max-w-[470px] text-[29px] leading-[1.08] tracking-[-0.02em] md:text-[35px]">
    {featured.title}
  </h2>

  <div className="self-start md:pt-[5px]">
    <p
      className="max-w-[500px] text-[13px] leading-[1.65]"
      style={{ ...sans, color: C.inkSoft }}
    >
      {featured.description}
    </p>

    <span
      className="mt-5 inline-flex items-center gap-2 text-[12px] underline underline-offset-4"
      style={{ ...sans, color: C.ink }}
    >
      Читать статью
      <span className="transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
    </span>
  </div>
</Link>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-7 md:px-8 md:py-9">
          <Reveal>
            <div className="grid gap-y-3 md:grid-cols-2 md:gap-x-3">
  <div>
    <Eyebrow>Все статьи</Eyebrow>
  </div>

  <div className="hidden md:block" />

  <h2 className="text-[29px] leading-[1.08] md:text-[36px]">
    Читать по ситуации
  </h2>

  <p
    className="text-[13px] leading-[1.65] md:pt-[5px]"
    style={{ ...sans, color: C.inkSoft }}
  >
    Можно идти не по порядку. Выберите тему, которая сейчас
    ближе к тому, что происходит у вас.
  </p>
</div>
          </Reveal>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {rest.map((article, index) => (
              <Reveal key={article.slug} delay={index * 35}>
                <ArticleCard article={article} />
              </Reveal>
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
                <Eyebrow>Если в тексте узнаете свою ситуацию</Eyebrow>

                <h2 className="mt-3 max-w-3xl text-[28px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[34px]">
                  Статья может помочь понять механизм, но не заменяет разбор вашей конкретной истории
                </h2>

                <p
                  className="mt-3 max-w-2xl text-[13px] leading-[1.6]"
                  style={{ ...sans, color: '#C9C2B5' }}
                >
                  На встрече можно посмотреть, как именно эта трудность
                  устроена у вас: что ее запускает, что поддерживает и где
                  появляется пространство для изменений.
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
                  Хочется не читать, а попробовать что-то на практике?
                </p>
                <p
                  className="mt-1 text-[11.5px] leading-[1.5]"
                  style={{ ...sans, color: C.inkSoft }}
                >
                  В библиотеке есть опросники, карты, дневники и упражнения
                  для самостоятельного наблюдения.
                </p>
              </div>

              <Link
                href="/tools"
                className="text-[12px] underline underline-offset-4"
                style={{ ...sans, color: C.ink }}
              >
                Открыть инструменты →
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ArticleCard({
  article,
}: {
  article: (typeof articles)[number];
}) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex h-full flex-col px-5 py-5 transition-transform duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: C.surface,
        borderRadius: radius.lg,
      }}
    >
      <p
        className="text-[9.5px] uppercase tracking-[0.1em]"
        style={{ ...sans, color: C.terracotta }}
      >
        {article.category} · {article.readTime}
      </p>

      <h3 className="mt-3 text-[22px] leading-[1.15]">
        {article.title}
      </h3>

      <p
        className="mt-3 flex-1 text-[12.5px] leading-[1.62]"
        style={{ ...sans, color: C.inkSoft }}
      >
        {article.description}
      </p>

      <span
        className="mt-5 inline-flex items-center gap-2 text-[11.5px] underline underline-offset-4"
        style={{ ...sans, color: C.ink }}
      >
        Читать
        <span className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
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