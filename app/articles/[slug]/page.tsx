import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import Eyebrow from '@/app/components/Eyebrow';

import { C, radius, sans, serif, shadow } from '@/app/lib/theme';
import { createPageMetadata } from '@/app/lib/metadata';

import { articles, getArticle } from '../articlesData';

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {};
  }

  return createPageMetadata({
    title: article.title,
    description: article.description,
    path: `/articles/${article.slug}`,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const related = articles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 2);

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
        <article>
          <header className="mx-auto max-w-4xl px-6 pb-7 pt-10 md:px-8 md:pb-9 md:pt-14">
            <Link
              href="/articles"
              className="mb-5 inline-block text-[12px] underline underline-offset-4"
              style={{ ...sans, color: C.inkSoft }}
            >
              ← Все статьи
            </Link>

            <Eyebrow>
              {article.category} · {article.readTime}
            </Eyebrow>

            <h1 className="mt-4 text-[38px] font-normal leading-[1.04] tracking-[-0.025em] md:text-[49px]">
              {article.title}
            </h1>

            <p
              className="mt-5 text-[15px] leading-[1.72] md:text-[16px]"
              style={{ ...sans, color: C.inkSoft }}
            >
              {article.lead}
            </p>

            <p
              className="mt-4 text-[10.5px]"
              style={{ ...sans, color: C.inkSoft }}
            >
              Опубликовано {article.published}
            </p>
          </header>

          <section className="mx-auto max-w-4xl px-6 pb-6 md:px-8">
            <div
              className="px-5 py-5 md:px-6"
              style={{
                backgroundColor: C.surfaceWarm,
                borderRadius: radius.lg,
              }}
            >
              <Eyebrow>Коротко</Eyebrow>

              <ul className="mt-4 space-y-3">
                {article.keyPoints.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-[13px] leading-[1.62]"
                    style={{ ...sans, color: C.ink }}
                  >
                    <span style={{ color: C.terracotta }}>·</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <div className="mx-auto max-w-4xl px-6 py-4 md:px-8">
            {article.sections.map((section) => (
              <section key={section.heading} className="py-5 md:py-6">
                <h2 className="text-[27px] leading-[1.1] md:text-[31px]">
                  {section.heading}
                </h2>

                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[14px] leading-[1.78] md:text-[14.5px]"
                      style={{ ...sans, color: C.ink }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.bullets && (
                  <ul
                    className="mt-4 space-y-2.5 pl-1"
                    style={{ ...sans, color: C.ink }}
                  >
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-[13.5px] leading-[1.68]"
                      >
                        <span style={{ color: C.terracotta }}>·</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <section className="mx-auto max-w-4xl px-6 py-6 md:px-8">
            <div
              className="px-5 py-5 md:px-6"
              style={{
                backgroundColor: C.surface,
                borderRadius: radius.lg,
              }}
            >
              <Eyebrow>На что я опиралась</Eyebrow>

              <p
                className="mt-3 text-[11.5px] leading-[1.6]"
                style={{ ...sans, color: C.inkSoft }}
              >
                Это не полный обзор литературы по теме, а несколько
                источников, на которых основаны основные идеи статьи.
              </p>

              <ol className="mt-4 space-y-2">
                {article.references.map((reference, index) => (
                  <li
                    key={reference}
                    className="grid grid-cols-[22px_1fr] gap-2 text-[11.5px] leading-[1.6]"
                    style={{ ...sans, color: C.inkSoft }}
                  >
                    <span>{index + 1}.</span>
                    <span>{reference}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </article>

        <section className="mx-auto max-w-6xl px-6 pb-3 pt-6 md:px-8">
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
              <Eyebrow>Если тема касается вас лично</Eyebrow>

              <h2 className="mt-3 max-w-3xl text-[28px] font-normal leading-[1.08] tracking-[-0.02em] md:text-[34px]">
                Можно разобрать не общую модель, а вашу конкретную ситуацию
              </h2>

              <p
                className="mt-3 max-w-2xl text-[13px] leading-[1.6]"
                style={{ ...sans, color: '#C9C2B5' }}
              >
                На встрече мы посмотрим, как именно трудность проявляется
                у вас, что ее поддерживает и какие изменения имеют смысл
                именно в вашем контексте.
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
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-12 pt-8 md:px-8 md:pb-14">
          <Eyebrow>Еще по теме</Eyebrow>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/articles/${item.slug}`}
                className="group px-5 py-5 transition-transform duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: C.surface,
                  borderRadius: radius.lg,
                }}
              >
                <p
                  className="text-[9.5px] uppercase tracking-[0.1em]"
                  style={{ ...sans, color: C.terracotta }}
                >
                  {item.category} · {item.readTime}
                </p>

                <h3 className="mt-3 text-[20px] leading-[1.18]">
                  {item.title}
                </h3>

                <span
                  className="mt-4 inline-flex gap-2 text-[11.5px] underline underline-offset-4"
                  style={{ ...sans, color: C.ink }}
                >
                  Читать
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
