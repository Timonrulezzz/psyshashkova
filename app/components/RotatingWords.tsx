'use client';

import { useEffect, useRef, useState } from 'react';

type RotatingWordsProps = {
  words: readonly string[];
  interval?: number;
};

export default function RotatingWords({
  words,
  interval = 2600,
}: RotatingWordsProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || words.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setVisible(false);

      timeoutRef.current = setTimeout(() => {
        setIndex((current) => (current + 1) % words.length);
        setVisible(true);
      }, 300);
    }, interval);

    return () => {
      window.clearInterval(timer);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [interval, words.length]);

  const longestWord = words.reduce(
    (longest, word) =>
      word.length > longest.length ? word : longest,
    words[0] ?? ''
  );

  return (
    <span className="relative inline-grid align-baseline">
      <span
        aria-hidden="true"
        className="invisible col-start-1 row-start-1"
      >
        {longestWord}
      </span>

      <span
        aria-hidden="true"
        className="col-start-1 row-start-1 inline-block transition-all duration-300"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? 'translateY(0)'
            : 'translateY(-0.2em)',
        }}
      >
        {words[index]}
      </span>

      <span className="sr-only">
        {words[0]}
      </span>
    </span>
  );
}