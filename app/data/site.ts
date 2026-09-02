export const site = {
  url: 'https://psyshashkova.ru',

  brand: {
    name: 'Юлия Шашкова',
    shortName: 'Юлия Шашкова',
    professionalTitle: 'Клинический психолог',
    methods: ['КПТ', 'схема-терапия'],
    language: 'Русский',
  },

    navigation: {
  main: [
    {
      href: '/how-we-work',
      label: 'Работа со мной',
    },
    {
      href: '/approaches',
      label: 'Подходы',
    },
    {
      href: '/about',
      label: 'Обо мне',
    },
    {
      href: '/articles',
      label: 'Статьи',
    },
    {
      href: '/tools',
      label: 'Инструменты',
    },
  ],

    booking: {
      href: '/book',
      label: 'Записаться',
    },
  },

  practice: {
    startedYear: 2023,

    clients: {
      count: 260,
      suffix: '+',
    },

    hours: {
      count: 2700,
      suffix: '+',
    },

    session: {
      priceRub: 7000,
      durationMinutes: 50,
      format: 'Онлайн',
      platform: 'Яндекс Телемост',
      age: '18+',

      frequency: {
        usualMinDays: 7,
        usualMaxDays: 10,
        possibleMaxDays: 14,
        label: 'Обычно каждые 7–10 дней',
      },
    },

    supervision: {
      frequency: 'Раз в неделю',
      label: 'Еженедельная супервизия',
    },

    cancellation: {
      standardNoticeHours: 12,

      short:
        'Если планы изменились, лучше предупредить минимум за 12 часов.',

      full:
        'Стандартно я прошу предупреждать об отмене минимум за 12 часов. К экстренным и действительно непредвиденным ситуациям отношусь спокойно, даже если сообщить получилось позже. Если поздние отмены или пропуски начинают повторяться, мы отдельно обсуждаем это на встрече и договариваемся о правилах. После такой договоренности повторная поздняя отмена или неявка может оплачиваться в размере 50% стоимости сессии.',

      repeatedLateCancellationPaymentPercent: 50,
    },
  },

  contacts: {
    telegram: {
      username: 'timonrulez',
      label: '@timonrulez',
      url: 'https://t.me/timonrulez',
      public: true,
    },

    email: {
      address: 'timonrulez@yandex.ru',
      public: false,
    },
  },

  payment: {
    provider: 'Robokassa',
    receipt: true,
  },

  legal: {
    entityType: 'ИП',
    fullName: 'Шашкова Юлия Алексеевна',
    inn: '222390957450',
    ogrnip: '326220200085619',
  },

  education: [
    {
      period: '2022–2023',
      institution:
        'АНО ДПО «Институт прикладной психологии в социальной сфере»',
      type: 'Профессиональная переподготовка',
      program:
        'Клиническая психология. Диагностика, коррекция и восстановление психической деятельности',
      hours: 1560,
      result: 'Квалификация: клинический психолог',
      completed: true,
    },

    {
      period: '2023–2025',
      institution: 'РАНХиГС',
      type: 'Профессиональная переподготовка',
      program:
        'Специалист по развитию личной и профессиональной эффективности',
      hours: 496,
      result: 'Квалификация: психолог в социальной сфере',
      completed: true,
    },

    {
      period: '2023–2024',
      institution: 'Психодемия',
      type: 'Повышение квалификации',
      program: 'Когнитивно-поведенческая терапия',
      hours: 269,
      result: null,
      completed: true,
    },

    {
      period: '2024–2025',
      institution: 'Психодемия',
      type: 'Обучение методу',
      program: 'Схема-терапия',
      hours: null,
      result: null,
      completed: true,
    },

    {
      period: '2022–2024',
      institution: 'Психодемия',
      type: 'Профессиональная переподготовка',
      program: 'Консультант в сфере сексуальных отношений',
      hours: null,
      result: null,
      completed: true,
    },

    {
      period: '2024–2026',
      institution: 'РАНХиГС',
      type: 'Магистратура',
      program: 'Психология личности',
      hours: null,
      result: 'Обучение завершено',
      completed: true,
    },
  ],
} as const;


/**
 * Готовые строки для интерфейса.
 *
 * Фактические данные хранятся выше, а форматирование — здесь.
 * Поэтому страницы не должны самостоятельно собирать цену,
 * длительность или условия из отдельных чисел.
 */
export const siteDisplay = {
  sessionPrice: `${site.practice.session.priceRub.toLocaleString('ru-RU')} ₽`,

  sessionDuration: `${site.practice.session.durationMinutes} минут`,

  sessionConditions:
    `${site.practice.session.format} · ` +
    `${site.practice.session.durationMinutes} минут · ` +
    `${site.practice.session.priceRub.toLocaleString('ru-RU')} ₽`,

  sessionConditionsFull:
    `${site.practice.session.format} · ` +
    `${site.practice.session.durationMinutes} минут · ` +
    `${site.practice.session.priceRub.toLocaleString('ru-RU')} ₽ · ` +
    `${site.practice.session.frequency.label}`,

  clients: `${site.practice.clients.count}+`,

  practiceHours: `${site.practice.hours.count.toLocaleString('ru-RU')}+`,

  cancellationPayment:
    `${site.practice.cancellation.repeatedLateCancellationPaymentPercent}% стоимости сессии`,
} as const;