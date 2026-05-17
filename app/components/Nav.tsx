import Link from 'next/link';
import { C, sans } from '@/app/lib/theme';

export default function Nav({ active }: { active?: string }) {
  const items = [
    { href: '/about', label: 'Обо мне' },
    { href: '/how-we-work', label: 'Как работаем' },
    { href: '/approaches', label: 'Подходы' },
    { href: '/articles', label: 'Статьи' },
    { href: '/tools', label: 'Инструменты' },
  ];

  return (
    <nav className="border-b" style={{ borderColor: C.line, backgroundColor: C.bg }}>
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="text-lg tracking-tight">Юлия Шашкова</Link>
        <div className="hidden md:flex items-center gap-8 text-sm" style={sans}>
          {items.map(i => (
            <Link
              key={i.href}
              href={i.href}
              className={active === i.href ? 'underline underline-offset-4' : 'hover:opacity-60'}
            >
              {i.label}
            </Link>
          ))}
        </div>
        <Link
          href="/book"
          className="px-5 py-2 rounded-full text-sm transition hover:opacity-90"
          style={{ ...sans, backgroundColor: C.ink, color: C.bg }}
        >
          Записаться
        </Link>
      </div>
    </nav>
  );
}