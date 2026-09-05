import type { ReactNode } from 'react';

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

type LegalDocumentProps = {
  title: string;
  subtitle?: string;
  updated: string;
  children: ReactNode;
};

export function LegalDocument({
  title,
  subtitle,
  updated,
  children,
}: LegalDocumentProps) {
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
        <section className="mx-auto max-w-4xl px-6 pb-7 pt-10 md:px-8 md:pb-9 md:pt-14">
          <Reveal>
            <Eyebrow>
              Юридическая информация
            </Eyebrow>

            <h1 className="mt-4 max-w-[900px] text-[37px] font-normal leading-[1.03] tracking-[-0.025em] md:text-[46px] lg:text-[50px]">
              {title}
            </h1>

            {subtitle && (
              <p
                className="mt-4 max-w-2xl text-[14px] leading-[1.65] md:text-[15px]"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                {subtitle}
              </p>
            )}

            <p
              className="mt-3 text-[12px]"
              style={{
                ...sans,
                color: C.inkSoft,
              }}
            >
              Редакция от {updated}
            </p>
          </Reveal>
        </section>

        <article className="mx-auto max-w-4xl px-6 pb-14 md:px-8 md:pb-18">
          <div
            className="px-5 py-6 md:px-8 md:py-8"
            style={{
              backgroundColor:
                'rgba(255,255,255,0.12)',
              border: `1px solid ${C.line}`,
              borderRadius: radius.lg,
              boxShadow: shadow.soft,
            }}
          >
            {children}
          </div>

          <RelatedDocuments />
        </article>
      </main>

      <Footer />
    </div>
  );
}

export function LegalSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-8 last:mb-0 md:mb-10">
      <Reveal>
        <div className="mb-4 flex items-start gap-3">
          <span
            className="min-w-[24px] pt-1 text-[10px]"
            style={{
              ...sans,
              color: C.terracotta,
            }}
          >
            {number}
          </span>

          <h2 className="text-[23px] font-normal leading-[1.15] tracking-[-0.015em] md:text-[28px]">
            {title}
          </h2>
        </div>
      </Reveal>

      <div className="space-y-3 pl-0 md:pl-[36px]">
        {children}
      </div>
    </section>
  );
}

export function LegalP({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <p
      className="text-[13.5px] leading-[1.68] md:text-[14px]"
      style={{
        ...sans,
        color: C.ink,
      }}
    >
      {children}
    </p>
  );
}

export function LegalList({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ul
      className="list-disc space-y-2 pl-5 text-[13.5px] leading-[1.65] md:text-[14px]"
      style={{
        ...sans,
        color: C.ink,
      }}
    >
      {children}
    </ul>
  );
}

export function LegalNote({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="my-4 px-4 py-4 md:px-5"
      style={{
        backgroundColor:
          'rgba(228, 201, 168, 0.38)',
        borderRadius: radius.md,
      }}
    >
      {title && (
        <p
          className="mb-1.5 text-[13px] font-semibold"
          style={{
            ...sans,
            color: C.ink,
          }}
        >
          {title}
        </p>
      )}

      <div
        className="text-[12.5px] leading-[1.65] md:text-[13px]"
        style={{
          ...sans,
          color: C.inkSoft,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function LegalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        color: C.terracotta,
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
      }}
    >
      {children}
    </Link>
  );
}

function RelatedDocuments() {
  return (
    <div
      className="mt-6 flex flex-wrap gap-x-3 gap-y-2 border-t pt-5 text-[12px]"
      style={{
        ...sans,
        borderColor: C.line,
        color: C.inkSoft,
      }}
    >
      <span>Связанные страницы:</span>

      <Link
        href="/legal/offer"
        style={{
          color: C.terracotta,
        }}
      >
        Оферта
      </Link>

      <span aria-hidden="true">·</span>

      <Link
        href="/legal/privacy"
        style={{
          color: C.terracotta,
        }}
      >
        Политика конфиденциальности
      </Link>

      <span aria-hidden="true">·</span>

      <Link
        href="/legal/consent"
        style={{
          color: C.terracotta,
        }}
      >
        Согласие на обработку данных
      </Link>

      <span aria-hidden="true">·</span>

      <Link
        href="/ethics"
        style={{
          color: C.terracotta,
        }}
      >
        Этика работы
      </Link>
    </div>
  );
}