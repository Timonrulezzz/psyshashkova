import { createPageMetadata } from '@/app/lib/metadata';
import SchemaTestClient from './SchemaTestClient';

export const metadata = createPageMetadata({
  title: 'Опросник ранних схем MSS-YSQ',
  description:
    '76 утверждений и профиль по 19 схемам. Русскоязычный перевод MSS-YSQ для самостоятельного ориентирования и обсуждения.',
  path: '/tools/schema-test',
});

export default function SchemaTestPage() {
  return <SchemaTestClient />;
}