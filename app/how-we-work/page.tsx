'use client';

import Link from 'next/link';
import { C, serif, sans } from '@/app/lib/theme';
import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import Eyebrow from '@/app/components/Eyebrow';

const steps = [
  {
    n: '01',
    title: 'Первая сессия',
    duration: '50 минут, 3 500 ₽',
    text: 'Это диагностическая встреча. Вы рассказываете подробнее, я задаю уточняющие вопросы. К концу мы вместе формулируем запрос — то, с чем будем работать. Если за эту сессию я пойму, что вам нужен другой специалист или формат, скажу честно и порекомендую коллегу.',
  },
  {
    n: '02',
    title: 'Концептуализация',
    duration: '2–3 сессии',
    text: 'Собираем картину: как устроена ваша ситуация, какие мысли, чувства и поведение её поддерживают, какие у вас есть точки опоры. К концу этого этапа у нас появляется общая карта — и план, по которому идём дальше.',
  },
  {
    n: '03',
    title: 'Работа',
    duration: 'столько, сколько нужно',
    text: 'Подбираем техники под ваш запрос. Между сессиями — короткие домашние задания: не «прочитайте книгу за неделю», а конкретные практики, наблюдения, эксперименты. Терапия — это в основном то, что происходит между сессиями.',
  },
  {
    n: '04',
    title: 'Завершение',
    duration: 'обсуждается заранее',
    text: 'В какой-то момент вы замечаете, что справляетесь сами. Это и есть цель — не зависимость от терапевта, а возвращение к собственной устойчивости. Мы обсудим, как завершимся: иногда плавно, через сокращение частоты, иногда — назначаем последнюю сессию и подводим итоги.',
  },
];

const faq = [
  {
    q: 'Сколько всего нужно сессий?',
    a: 'Заранее не знаю. С короткими запросами иногда хватает 5–10 встреч, с более сложными работа может идти год и дольше. После концептуализации (2–3 сессии) я смогу дать более точное предположение.',
  },
  {
    q: 'Как часто встречаемся?',
    a: 'По умолчанию — раз в неделю. Это рабочий ритм, который позволяет удерживать процесс. Реже — теряется связность. Чаще (2 раза в неделю) бывает нужно в острые периоды.',
  },
  {
    q: 'Как оплачивается?',
    a: 'После сессии я отправляю чек самозанятой. Оплата заранее или сразу после встречи — переводом на карту. По запросу могу выдать справку об оплате.',
  },
  {
    q: 'Что если нужно отменить или перенести?',
    a: 'Отменить или перенести можно бесплатно, если предупредить не позднее чем за 24 часа. Если меньше — сессия оплачивается полностью. Я придерживаюсь этого правила, потому что это рабочее время, которое я выделила для вас.',
  },
  {
    q: 'На какой платформе встречаемся?',
    a: 'Я использую Яндекс Телемост. За день до сессии присылаю ссылку. Никаких приложений ставить не нужно, всё открывается в браузере.',
  },
  {
    q: 'Что мне нужно подготовить?',
    a: 'Только тихое место, где вас не прервут, и наушники. Иногда полезно перед сессией коротко записать, о чём хочется поговорить — но это необязательно.',
  },
  {
    q: 'А если я передумаю продолжать?',
    a: 'Это нормально. Прийти один раз и решить, что мы не подходим друг другу — это право клиента, не нужно объясняться или оправдываться. Можно просто написать «не хочу продолжать», и всё.',
  },
  {
    q: 'Что вы записываете во время сессии?',
    a: 'Иногда короткие пометки — какие темы поднимались, какие техники мы пробовали, что договорились сделать к следующей встрече. Это нужно мне, чтобы не терять нить между сессиями. Никаких аудио- или видеозаписей я не делаю.',
  },
  {
    q: 'Сохраняется ли конфиденциальность?',
    a: 'Да. Всё, что вы говорите, остаётся между нами. Исключения только стандартные: угроза вашей жизни или жизни других людей — в этих случаях я обязана выйти за рамки конфиденциальности. На первой сессии мы это проговорим.',
  },
];

export default function HowWeWork() {
  return (
    <div style={{ ...serif, backgroundColor: C.bg, color: C.ink }} className="min-h-screen">

      <Nav active="/how-we-work" />

      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28">
        <div className="max-w-3xl">
          <Eyebrow>Как мы работаем</Eyebrow>
          <h1 className="text-4xl md:text-6xl leading-[1.1] tracking-tight font-normal mb-8">
            Терапия — это не магия. Это последовательность шагов
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: C.inkSoft }}>
            На этой странице — то, как устроен процесс. Что происходит на сессиях, сколько это стоит, как оплачивается, что делать, если нужно отменить. Чем меньше у вас остаётся неясных моментов, тем спокойнее начинать.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="space-y-6">
          {steps.map((s) => (
            <div key={s.n} className="grid md:grid-cols-12 gap-6 md:gap-12 py-10 border-t" style={{ borderColor: C.line }}>
              <div className="md:col-span-3">
                <p className="text-sm mb-2" style={{ ...sans, color: C.terracotta }}>{s.n}</p>
                <h2 className="text-2xl mb-2">{s.title}</h2>
                <p className="text-sm" style={{ ...sans, color: C.inkSoft }}>{s.duration}</p>
              </div>
              <div className="md:col-span-9">
                <p className="text-[16px] leading-relaxed" style={{ color: C.inkSoft }}>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: C.surface }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <Eyebrow>Формат</Eyebrow>
              <h2 className="text-3xl md:text-4xl leading-tight font-normal mb-6">
                Кратко о главном
              </h2>
              <p className="text-base leading-relaxed" style={{ color: C.inkSoft }}>
                Эти параметры — стандартные. Если есть что-то, что в ваш ритм или ситуацию не вписывается, обсудим индивидуально.
              </p>
            </div>
            <div className="md:col-span-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-sm" style={{ backgroundColor: C.bg }}>
                  <p className="text-xs tracking-widest uppercase mb-3" style={{ ...sans, color: C.terracotta }}>длительность</p>
                  <p className="text-2xl">50 минут</p>
                </div>
                <div className="p-6 rounded-sm" style={{ backgroundColor: C.bg }}>
                  <p className="text-xs tracking-widest uppercase mb-3" style={{ ...sans, color: C.terracotta }}>стоимость</p>
                  <p className="text-2xl">3 500 ₽</p>
                </div>
                <div className="p-6 rounded-sm" style={{ backgroundColor: C.bg }}>
                  <p className="text-xs tracking-widest uppercase mb-3" style={{ ...sans, color: C.terracotta }}>формат</p>
                  <p className="text-2xl">Онлайн</p>
                </div>
                <div className="p-6 rounded-sm" style={{ backgroundColor: C.bg }}>
                  <p className="text-xs tracking-widest uppercase mb-3" style={{ ...sans, color: C.terracotta }}>частота</p>
                  <p className="text-2xl">Раз в неделю</p>
                </div>
                <div className="p-6 rounded-sm" style={{ backgroundColor: C.bg }}>
                  <p className="text-xs tracking-widest uppercase mb-3" style={{ ...sans, color: C.terracotta }}>платформа</p>
                  <p className="text-2xl">Телемост</p>
                </div>
                <div className="p-6 rounded-sm" style={{ backgroundColor: C.bg }}>
                  <p className="text-xs tracking-widest uppercase mb-3" style={{ ...sans, color: C.terracotta }}>язык</p>
                  <p className="text-2xl">Русский</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-24 md:py-32">
        <Eyebrow>Частые вопросы</Eyebrow>
        <h2 className="text-3xl md:text-4xl leading-tight font-normal mb-16">
          Если что-то ещё непонятно
        </h2>
        <div className="space-y-px">
          {faq.map((item, i) => (
            <details key={i} className="group border-t py-6" style={{ borderColor: C.line }}>
              <summary className="flex items-start gap-6 cursor-pointer list-none">
                <span className="text-sm pt-1 shrink-0 w-8" style={{ ...sans, color: C.terracotta }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-xl leading-snug flex-1">{item.q}</span>
                <span className="text-xl shrink-0 transition-transform group-open:rotate-45" style={{ color: C.terracotta }}>+</span>
              </summary>
              <p className="text-[16px] leading-relaxed mt-4 pl-14 pr-10" style={{ color: C.inkSoft }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24 md:pb-32">
        <div className="rounded-sm p-12 md:p-20 text-center" style={{ backgroundColor: C.ink, color: C.bg }}>
          <h2 className="text-3xl md:text-5xl leading-tight font-normal mb-8 max-w-3xl mx-auto">
            Готовы записаться?
          </h2>
          <p className="text-lg leading-relaxed max-w-xl mx-auto mb-10" style={{ color: '#C9C2B5' }}>
            Если остались вопросы, на которые не нашли ответа — пишите в форме записи, я отвечу до того, как назначим встречу.
          </p>
          <Link href="/book" className="inline-block px-8 py-4 rounded-full text-base" style={{ ...sans, backgroundColor: C.ochre, color: C.ink }}>
            Записаться на консультацию
          </Link>
          <p className="text-sm mt-6" style={{ ...sans, color: '#C9C2B5' }}>
            Онлайн · 50 минут · 3 500 ₽
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}