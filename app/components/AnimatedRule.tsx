'use client';

import { useEffect, useRef } from 'react';
import { C } from '@/app/lib/theme';

type AnimatedRuleProps = {
  color?: string;
  delay?: number;
};

export default function AnimatedRule({
  color = C.line,
  delay = 0,
}: AnimatedRuleProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      element.style.transform = 'scaleX(1)';
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        element.animate(
          [
            { transform: 'scaleX(0)' },
            { transform: 'scaleX(1)' },
          ],
          {
            duration: 850,
            delay,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'forwards',
          }
        );

        observer.unobserve(element);
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="h-px w-full origin-left"
      style={{
        backgroundColor: color,
        transform: 'scaleX(0)',
      }}
    />
  );
}