import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';

import ThoughtDiaryClient from './ThoughtDiaryClient';

import { C, serif } from '@/app/lib/theme';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Дневник мыслей',
  description:
    'Интерактивный дневник для разбора автоматических мыслей: ситуация, эмоция, реакция, проверка мысли и более точный взгляд на происходящее.',
  path: '/tools/thought-diary',
});

export default function ThoughtDiaryPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        ...serif,
        backgroundColor: C.bg,
        color: C.ink,
      }}
    >
      <Nav active="/tools" />

      <ThoughtDiaryClient />

      <Footer />
    </div>
  );
}