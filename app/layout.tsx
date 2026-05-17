import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Юлия Шашкова — клинический психолог, КПТ и схема-терапия',
  description: 'Психотерапия онлайн. Работа с тревогой, самооценкой, отношениями, эмоциональной регуляцией. Доказательные методы, понятный план.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}