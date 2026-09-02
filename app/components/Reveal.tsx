'use client';

import { useEffect, useRef } from 'react';

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
};

export default function Reveal({
  children,
  delay = 0,
  y = 24,
}: RevealProps) {
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
      return;
    }

    let hasRevealed = false;

    const reveal = () => {
      if (hasRevealed) {
        return;
      }

      hasRevealed = true;

      element.animate(
        [
          {
            opacity: 0,
            transform: `translateY(${y}px)`,
          },
          {
            opacity: 1,
            transform: 'translateY(0)',
          },
        ],
        {
          duration: 700,
          delay,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'both',
        }
      );
    };

    const rect = element.getBoundingClientRect();
    const isInitiallyVisible =
      rect.top < window.innerHeight && rect.bottom > 0;

    if (isInitiallyVisible) {
      reveal();
      return;
    }

    /*
     * HTML изначально остается полноценным и видимым.
     * Скрываем только элементы вне viewport после запуска JS,
     * чтобы подготовить их к reveal-анимации.
     */
    element.style.opacity = '0';
    element.style.transform = `translateY(${y}px)`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        element.style.opacity = '';
        element.style.transform = '';

        reveal();
        observer.unobserve(element);
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay, y]);

  return <div ref={ref}>{children}</div>;
}