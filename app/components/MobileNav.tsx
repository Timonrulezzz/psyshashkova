'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { C, sans } from '@/app/lib/theme';

type NavigationItem = {
  href: string;
  label: string;
};

type MobileNavProps = {
  items: readonly NavigationItem[];
  active?: string;
  booking: {
    href: string;
    label: string;
  };
};

export default function MobileNav({
  items,
  active,
  booking,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
        onClick={() => setIsOpen((current) => !current)}
        className="relative flex h-11 w-11 items-center justify-center rounded-full"
        style={{
          border: `1px solid ${C.line}`,
          color: C.ink,
        }}
      >
        <span className="sr-only">
          {isOpen ? 'Закрыть меню' : 'Открыть меню'}
        </span>

        <span
          aria-hidden="true"
          className="relative block h-4 w-5"
        >
          <span
            className="absolute left-0 top-0 block h-px w-5 transition-all duration-300"
            style={{
              backgroundColor: C.ink,
              transform: isOpen
                ? 'translateY(7px) rotate(45deg)'
                : 'translateY(2px)',
            }}
          />

          <span
            className="absolute left-0 top-1/2 block h-px w-5 transition-all duration-300"
            style={{
              backgroundColor: C.ink,
              opacity: isOpen ? 0 : 1,
              transform: 'translateY(-50%)',
            }}
          />

          <span
            className="absolute bottom-0 left-0 block h-px w-5 transition-all duration-300"
            style={{
              backgroundColor: C.ink,
              transform: isOpen
                ? 'translateY(-7px) rotate(-45deg)'
                : 'translateY(-2px)',
            }}
          />
        </span>
      </button>

      {isOpen && (
  <div
    id="mobile-navigation"
    role="dialog"
    aria-modal="true"
    aria-label="Меню сайта"
    className="fixed inset-0 z-[60]"
    style={{
      backgroundColor: C.bg,
    }}
  >
    <div className="flex h-full flex-col px-6 pb-8">
      <div
        className="flex h-[76px] shrink-0 items-center justify-between border-b"
        style={{
          borderColor: C.line,
        }}
      >
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="text-lg tracking-tight"
          style={{
            color: C.ink,
          }}
        >
          Юлия Шашкова
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Закрыть меню"
          className="flex min-h-11 items-center gap-2 rounded-full px-3 text-sm"
          style={{
            ...sans,
            color: C.ink,
          }}
        >
          <span>Закрыть</span>
          <span
            aria-hidden="true"
            className="text-xl leading-none"
          >
            ×
          </span>
        </button>
      </div>
            <nav
  aria-label="Мобильная навигация"
  className="pt-8"
              style={{
                borderColor: C.line,
              }}
            >
              <div className="flex flex-col">
                {items.map((item, index) => {
                  const isActive = active === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between border-b py-5 text-2xl"
                      style={{
                        borderColor: C.line,
                        color: C.ink,
                      }}
                    >
                      <span>{item.label}</span>

                      <span
                        className="text-xs"
                        style={{
                          ...sans,
                          color: isActive ? C.terracotta : C.inkSoft,
                        }}
                      >
                        {isActive
                          ? 'Сейчас'
                          : String(index + 1).padStart(2, '0')}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </nav>

            <div className="mt-auto pt-8">
              <Link
                href={booking.href}
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-between rounded-full px-6 py-4 text-base"
                style={{
                  ...sans,
                  backgroundColor: C.ink,
                  color: C.bg,
                }}
              >
                <span>{booking.label}</span>
                <span aria-hidden="true">→</span>
              </Link>

              <p
                className="mt-5 text-sm leading-relaxed"
                style={{
                  ...sans,
                  color: C.inkSoft,
                }}
              >
                Онлайн · 50 минут · 7 000 ₽
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}