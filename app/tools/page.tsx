import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import ToolsLibrary from './ToolsLibrary';

import { C, serif } from '@/app/lib/theme';
import { createPageMetadata } from '@/app/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Психологические инструменты',
  description:
    'Опросники, карты, дневники и упражнения для наблюдения за своим состоянием, мыслями, эмоциями и повторяющимися сценариями.',
  path: '/tools',
});

export default function ToolsPage() {
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

      <ToolsLibrary />

      <Footer />
    </div>
  );
}