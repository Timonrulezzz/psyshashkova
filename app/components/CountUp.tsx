'use client';

import { useEffect, useRef, useState } from 'react';

type CountUpProps = {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  formatThousands?: boolean;
};

function formatValue(value: number, formatThousands: boolean) {
  return formatThousands
    ? value.toLocaleString('ru-RU')
    : value.toString();
}

export default function CountUp({
  end,
  duration = 1800,
  suffix = '',
  prefix = '',
  formatThousands = false,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);

  const [animatedValue, setAnimatedValue] = useState<number | null>(null);

  const finalText =
    `${prefix}${formatValue(end, formatThousands)}${suffix}`;

  useEffect(() => {
    const element = ref.current;

    if (!element || hasAnimatedRef.current) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimatedRef.current) {
          return;
        }

        hasAnimatedRef.current = true;
        observer.unobserve(element);

        const startTime = performance.now();

        setAnimatedValue(0);

        const animate = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);

          setAnimatedValue(Math.floor(eased * end));

          if (progress < 1) {
            animationFrameRef.current = requestAnimationFrame(animate);
          } else {
            setAnimatedValue(null);
          }
        };

        animationFrameRef.current = requestAnimationFrame(animate);
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [end, duration]);

  const isAnimating = animatedValue !== null;

  return (
    <span ref={ref} className="relative inline-grid">
      <span style={{ visibility: isAnimating ? 'hidden' : 'visible' }}>
        {finalText}
      </span>

      {isAnimating && (
        <span
          aria-hidden="true"
          className="absolute inset-0"
        >
          {prefix}
          {formatValue(animatedValue, formatThousands)}
          {suffix}
        </span>
      )}
    </span>
  );
}