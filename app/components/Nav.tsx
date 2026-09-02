import Link from 'next/link';
import { C, sans } from '@/app/lib/theme';
import { site } from '@/app/data/site';
import MobileNav from '@/app/components/MobileNav';

export default function Nav({ active }: { active?: string }) {
  const items = site.navigation.main;
  const booking = site.navigation.booking;

  return (
    <header
      className="relative z-50 border-b"
      style={{
        borderColor: C.line,
        backgroundColor: C.bg,
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 md:py-5">
        <Link
          href="/"
          className="shrink-0 text-lg tracking-tight"
          style={{
            color: C.ink,
          }}
        >
          {site.brand.shortName}
        </Link>

        <nav
          aria-label="Основная навигация"
          className="hidden items-center gap-7 text-sm md:flex"
          style={sans}
        >
          {items.map((item) => {
            const isActive = active === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className="relative py-2 transition-opacity hover:opacity-60"
                style={{
                  color: C.ink,
                }}
              >
                {item.label}

                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px"
                    style={{
                      backgroundColor: C.ink,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={booking.href}
            className="hidden rounded-full px-5 py-2 text-sm transition hover:opacity-90 sm:block"
            style={{
              ...sans,
              backgroundColor: C.ink,
              color: C.bg,
            }}
          >
            {booking.label}
          </Link>

          <MobileNav
            items={items}
            active={active}
            booking={booking}
          />
        </div>
      </div>
    </header>
  );
}