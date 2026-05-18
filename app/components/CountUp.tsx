'use client';

import { useEffect, useRef, useState } from 'react';

export default function CountUp({
  end,
  duration = 1800,
  suffix = '',
  prefix = '',
  formatThousands = false,
}: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  formatThousands?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, started]);

  const formatted = formatThousands
    ? value.toLocaleString('ru-RU').replace(/,/g, ' ')
    : value.toString();

  return (
    <span ref={ref}>
      {prefix}{formatted}{suffix}
    </span>
  );
}