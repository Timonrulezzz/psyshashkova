import React from 'react';
import { C, sans } from '../lib/theme';

export default function Eyebrow({ children, color = C.terracotta }: { children: React.ReactNode; color?: string }) {
  return (
    <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ ...sans, color }}>
      {children}
    </p>
  );
}