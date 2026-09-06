import { createPageMetadata } from '@/app/lib/metadata';
import SchemaModesTestClient from './SchemaModesTestClient';

export const metadata = createPageMetadata({
  title: 'Опросник режимов схема-терапии SMI',
  description:
    '124 утверждения и профиль по 14 режимам схема-терапии: детским, копинговым, родительским и здоровым.',
  path: '/tools/schema-modes-test',
});

export default function SchemaModesTestPage() {
  return <SchemaModesTestClient />;
}