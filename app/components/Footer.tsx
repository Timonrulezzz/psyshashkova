import Link from 'next/link';
import { C, serif, sans } from '@/app/lib/theme';

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: C.line }}>
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-sm" style={sans}>
        <div>
          <p className="mb-2" style={{ ...serif, fontSize: '16px', color: C.ink }}>Юлия Шашкова</p>
          <p style={{ color: C.inkSoft }}>Клинический психолог</p>
          <p style={{ color: C.inkSoft }}>КПТ · схема-терапия</p>
        </div>
        <div>
          <p className="mb-3 uppercase tracking-widest text-xs" style={{ color: C.inkSoft }}>Сайт</p>
          <div className="space-y-2">
            <Link href="/" className="block" style={{ color: C.ink }}>Главная</Link>
            <Link href="/about" className="block" style={{ color: C.ink }}>Обо мне</Link>
            <Link href="/approaches" className="block" style={{ color: C.ink }}>Подходы</Link>
            <Link href="/articles" className="block" style={{ color: C.ink }}>Статьи</Link>
            <Link href="/tools" className="block" style={{ color: C.ink }}>Инструменты</Link>
          </div>
        </div>
        <div>
          <p className="mb-3 uppercase tracking-widest text-xs" style={{ color: C.inkSoft }}>Документы</p>
          <div className="space-y-2">
            <Link href="/legal/offer" className="block" style={{ color: C.ink }}>Оферта</Link>
            <Link href="/legal/privacy" className="block" style={{ color: C.ink }}>Политика конфиденциальности</Link>
            <Link href="/ethics" className="block" style={{ color: C.ink }}>Этика работы</Link>
          </div>
        </div>
        <div>
          <p className="mb-3 uppercase tracking-widest text-xs" style={{ color: C.inkSoft }}>Связь</p>
          <div className="space-y-2">
            <a href="https://t.me/wentintoabar" className="block" style={{ color: C.ink }}>Telegram-канал</a>
            <Link href="/book" className="block" style={{ color: C.ink }}>Записаться</Link>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-8 text-xs" style={{ ...sans, color: C.inkSoft }}>
        © 2026 Шашкова Юлия Алексеевна · самозанятая
      </div>
    </footer>
  );
}