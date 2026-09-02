'use client';

import { useEffect, useRef } from 'react';
import { C } from '@/app/lib/theme';

export default function HeroGlow({
  children,
}: {
  children: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;

    if (!section || !glow) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        return;
      }

      const rect = section.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      glow.style.transform = `translate3d(${x - 270}px, ${y - 270}px, 0)`;
      glow.style.opacity = '1';
    };

    const handlePointerLeave = () => {
      glow.style.opacity = '0';
    };

    section.addEventListener('pointermove', handlePointerMove);
    section.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      section.removeEventListener('pointermove', handlePointerMove);
      section.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 hidden h-[540px] w-[540px] rounded-full md:block"
        style={{
          background: `
            radial-gradient(
              circle,
              ${C.berry}24 0%,
              ${C.terracotta}1c 32%,
              transparent 70%
            )
          `,
          filter: 'blur(16px)',
          opacity: 0,
          transform: 'translate3d(-1000px, -1000px, 0)',
          transition: 'opacity 500ms ease',
          willChange: 'transform, opacity',
          zIndex: 0,
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}