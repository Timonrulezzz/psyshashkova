export const C = {
  bg: '#F7F3EC',
  surface: '#EDE5D6',
  surfaceWarm: '#E4C9A8',

  ink: '#1F1B16',
  inkSoft: '#6B6358',

  terracotta: '#B85C3C',
  berry: '#963B59',
  berrySoft: '#D8A5B5',

  ochre: '#C89B5A',
  moss: '#6B7355',

  line: '#D9D2C2',
} as const;

export const serif = {
  fontFamily:
    'var(--font-literata), Georgia, "Times New Roman", serif',
};

export const sans = {
  fontFamily:
    'var(--font-manrope), system-ui, -apple-system, sans-serif',
};

export const radius = {
  sm: '14px',
  md: '22px',
  lg: '30px',
  pill: '999px',
} as const;

export const shadow = {
  soft: '0 12px 36px rgba(31, 27, 22, 0.08)',
  card: '0 18px 50px rgba(31, 27, 22, 0.11)',
  portrait: '0 24px 70px rgba(31, 27, 22, 0.16)',
} as const;