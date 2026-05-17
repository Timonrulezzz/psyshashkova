'use client';

import { useState } from 'react';
import Link from 'next/link';
import { C, serif, sans } from '@/app/lib/theme';
import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import Eyebrow from '@/app/components/Eyebrow';

export default function Home() {
  const [activeQuery, setActiveQuery] = useState<number | null>(null);

  const queries = [
    { tag: 'самооценка', text: 'Я постоянно сравниваю себя с другими, и каждый раз — не в свою пользу' },
    { tag: 'тревога', text: 'Внутри как будто всегда фоном что-то гудит. Уснуть бывает сложно, расслабиться — почти никогда' },
    { tag: 'отношения', text: 'Снова влюбилась в человека, который не может или не хочет быть рядом так, как мне нужно' },
    { tag: 'зависимость от других', text: 'Мне важно, чтобы меня одобрили. Если кто-то недоволен — я не могу спокойно жить' },
    { tag: 'самокритика', text: 'Я говорю с собой так, как никогда бы не говорила с близким человеком' },
    { tag: 'выгорание', text: 'Я делаю всё то же, что раньше, но это перестало приносить хоть что-то' },
    { tag: 'непонимание', text: 'Внешне у меня всё нормально. Но внутри я не понимаю, чего хочу и куда иду' },
    { tag: 'границы', text: 'Я соглашаюсь на то, что мне не подходит, и злюсь на себя за это' },
  ];

  const allTags = ['тревога', 'самооценка', 'самокритика', 'отношения', 'эмоциональная зависимость', 'границы', 'выгорание', 'прокрастинация', 'социальная тревога', 'стыд', 'вина', 'идентичность', 'эмоциональная регуляция', 'хронический стресс', 'управление людьми'];

  return (
    <div style={{ ...serif, backgroundColor: C.bg, color: C.ink }} className="min-h-screen">

      <Nav active="/" />

      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-8">
            <Eyebrow>Клинический психолог · КПТ и схема-терапия</Eyebrow>
            <h1 className="text-4xl md:text-6xl leading-[1.1] tracking-tight font-normal mb-8">
              Психотерапия, в которой <span style={{ color: C.terracotta }}>понятно</span>, что происходит
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl mb-10" style={{ color: C.inkSoft }}>
              Если вы здесь, скорее всего, что-то в жизни ощущается не так, как хотелось бы — отношения, самооценка, тревога, ощущение «всё нормально, но что-то не то». На сессиях разбираемся, что именно и почему, и подбираем способы, которые работают конкретно для вас.
            </p>
            <p className="text-base leading-relaxed max-w-2xl mb-10" style={{ color: C.inkSoft }}>
              Без интерпретаций, без советов, без «давайте подышим». Доказательные методы, домашние задания, понятный план.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/book" className="px-7 py-3.5 rounded-full text-[15px] transition hover:opacity-90" style={{ ...sans, backgroundColor: C.ink, color: C.bg }}>
                Записаться на консультацию
              </Link>
              <div className="text-sm" style={{ ...sans, color: C.inkSoft }}>
                Онлайн · 50 минут · 3 500 ₽
              </div>
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="aspect-[4/5] rounded-sm flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2a2a2a 0%, #4a4a4a 50%, #1a1a1a 100%)', color: '#888' }}>
              <p className="text-xs tracking-widest uppercase" style={sans}>Портрет</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px" style={{ backgroundColor: C.line }} />
      </div>

      <section className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <Eyebrow>С какими запросами приходят</Eyebrow>
            <h2 className="text-3xl md:text-4xl leading-tight mb-6 font-normal">
              Узнаёте себя хотя бы в одной фразе?
            </h2>
            <p className="text-base leading-relaxed" style={{ color: C.inkSoft }}>
              Это не диагнозы и не ярлыки. Это то, с чем чаще всего приходят и о чём проще всего начать разговор.
            </p>
          </div>
          <div className="md:col-span-8">
            <div className="space-y-3">
              {queries.map((q, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setActiveQuery(i)}
                  onMouseLeave={() => setActiveQuery(null)}
                  className="w-full text-left p-6 rounded-sm transition-all duration-200 group"
                  style={{ backgroundColor: activeQuery === i ? C.surfaceWarm : C.surface }}
                >
                  <div className="flex items-start gap-6">
                    <p className="text-xs tracking-widest uppercase pt-1 shrink-0 w-32" style={{ ...sans, color: C.terracotta }}>
                      {q.tag}
                    </p>
                    <p className="text-lg leading-snug flex-1" style={{ color: C.ink }}>
                      «{q.text}»
                    </p>
                    <span className="text-xl shrink-0 transition-transform group-hover:translate-x-1" style={{ color: C.terracotta }}>→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: C.surface }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-2xl mb-16">
            <Eyebrow>Подходы</Eyebrow>
            <h2 className="text-3xl md:text-4xl leading-tight font-normal mb-6">
              Два метода с доказанной эффективностью
            </h2>
            <p className="text-base leading-relaxed" style={{ color: C.inkSoft }}>
              Я не «эклектичный психолог, работающий со всем». Я работаю в двух подходах, выбор между которыми мы делаем вместе после первой сессии.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-10 rounded-sm" style={{ backgroundColor: C.bg }}>
              <p className="text-xs tracking-widest uppercase mb-6" style={{ ...sans, color: C.terracotta }}>Подход 1</p>
              <h3 className="text-2xl mb-4">Когнитивно-поведенческая терапия</h3>
              <p className="text-[15px] leading-relaxed mb-6" style={{ color: C.inkSoft }}>
                Работа с тем, как мысли влияют на чувства и поведение. Структурно, с домашними заданиями, с понятным планом. Подходит для тревоги, прокрастинации, проблем с самокритикой, для запросов «здесь и сейчас».
              </p>
              <Link href="/approaches" className="text-sm underline underline-offset-4" style={{ ...sans, color: C.ink }}>Подробнее о КПТ →</Link>
            </div>

            <div className="p-10 rounded-sm" style={{ backgroundColor: C.surfaceWarm }}>
              <p className="text-xs tracking-widest uppercase mb-6" style={{ ...sans, color: C.moss }}>Подход 2</p>
              <h3 className="text-2xl mb-4">Схема-терапия</h3>
              <p className="text-[15px] leading-relaxed mb-6" style={{ color: C.ink }}>
                Для тех, кто замечает повторяющиеся сценарии — снова те же отношения, снова та же стена, снова «я как будто проживаю чужую жизнь». Глубже, чем классическая КПТ, и медленнее. Работает с тем, что сложилось ещё в детстве.
              </p>
              <Link href="/approaches" className="text-sm underline underline-offset-4" style={{ ...sans, color: C.ink }}>Подробнее о схема-терапии →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5">
            <div className="aspect-[4/5] rounded-sm" style={{ background: 'linear-gradient(135deg, #2a2a2a 0%, #4a4a4a 50%, #1a1a1a 100%)' }} />
          </div>
          <div className="md:col-span-7 md:pt-8">
            <Eyebrow>Обо мне</Eyebrow>
            <h2 className="text-3xl md:text-4xl leading-tight font-normal mb-8">
              Меня зовут Юлия. Я клинический психолог, и моя работа — внимательно слушать и задавать вопросы, которые двигают вперёд
            </h2>
            <div className="space-y-5 text-[16px] leading-relaxed" style={{ color: C.inkSoft }}>
              <p>В практике с 2023 года, провела более 250 клиентов и несколько тысяч часов сессий. Получила клиническое образование, прошла переподготовки в КПТ и схема-терапии, скоро заканчиваю магистратуру по психологии личности в РАНХиГС.</p>
              <p>Стараюсь работать так, чтобы на сессии было одновременно безопасно и продуктивно. Клиенты часто говорят, что у них получается легко открыться — и при этом из каждой встречи есть, что унести.</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
              <div>
                <p className="text-3xl" style={{ color: C.terracotta }}>250+</p>
                <p className="text-sm mt-1" style={{ ...sans, color: C.inkSoft }}>клиентов</p>
              </div>
              <div>
                <p className="text-3xl" style={{ color: C.terracotta }}>2 500+</p>
                <p className="text-sm mt-1" style={{ ...sans, color: C.inkSoft }}>часов практики</p>
              </div>
              <div>
                <p className="text-3xl" style={{ color: C.terracotta }}>3</p>
                <p className="text-sm mt-1" style={{ ...sans, color: C.inkSoft }}>профильных образования</p>
              </div>
            </div>
            <div className="mt-10">
              <Link href="/about" className="text-[15px] underline underline-offset-4" style={{ ...sans, color: C.ink }}>Подробнее обо мне и образовании →</Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: C.ink, color: C.bg }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-2xl mb-16">
            <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ ...sans, color: C.ochre }}>Как мы работаем</p>
            <h2 className="text-3xl md:text-4xl leading-tight font-normal mb-6">
              Никакого «расскажите о вашем детстве» на первой сессии
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#C9C2B5' }}>
              Терапия — это не магия. Это последовательность шагов, и я открыто рассказываю, какой шаг мы делаем и зачем.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { n: '01', title: 'Первая сессия', text: 'Знакомимся. Вы рассказываете, что привело. Я задаю уточняющие вопросы, мы определяем запрос и решаем, подходим ли мы друг другу.' },
              { n: '02', title: 'Концептуализация', text: 'За 2–3 сессии собираем картину: как устроена ваша ситуация, что её поддерживает, где точки опоры. Это даёт ясность вместо тумана.' },
              { n: '03', title: 'Работа', text: 'Подбираем техники и шаги под ваш запрос. Между сессиями — короткие домашние задания. Не «прочитайте книгу», а конкретные практики на неделю.' },
              { n: '04', title: 'Завершение', text: 'В какой-то момент вы понимаете, что справляетесь сами. Это и есть цель. Мы заранее обсуждаем, как завершимся — терапия не должна длиться вечно.' },
            ].map((step) => (
              <div key={step.n}>
                <p className="text-xs tracking-widest mb-4" style={{ ...sans, color: C.ochre }}>{step.n}</p>
                <h3 className="text-xl mb-3">{step.title}</h3>
                <p className="text-[14px] leading-relaxed" style={{ color: '#C9C2B5' }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: C.surface }}>
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
          <Eyebrow>Полный список тем</Eyebrow>
          <h2 className="text-3xl md:text-4xl leading-tight font-normal mb-12">С чем я работаю</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {allTags.map((tag) => (
              <span key={tag} className="px-5 py-2.5 rounded-full text-[15px] border" style={{ borderColor: C.line, backgroundColor: C.bg, color: C.ink }}>
                {tag}
              </span>
            ))}
          </div>
          <p className="text-base max-w-xl mx-auto" style={{ color: C.inkSoft }}>
            Не нашли свой запрос? Это нормально. На первой сессии мы сформулируем его вместе.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-24 md:py-28">
        <div className="border-l-2 pl-8" style={{ borderColor: C.terracotta }}>
          <Eyebrow>Важно</Eyebrow>
          <h2 className="text-2xl md:text-3xl leading-tight font-normal mb-6">С чем я не работаю</h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: C.inkSoft }}>
            Это не про границы моих знаний, а про этику: в некоторых ситуациях нужен другой специалист или формат, чтобы помощь была действительно безопасной.
          </p>
          <ul className="space-y-2 text-[15px] leading-relaxed" style={{ color: C.inkSoft }}>
            <li>· Дети и подростки до 18 лет</li>
            <li>· Парные сессии</li>
            <li>· Активные суицидальные намерения и кризисные состояния</li>
            <li>· Зависимости (алкоголь, наркотики, азартные игры)</li>
            <li>· Расстройства пищевого поведения</li>
            <li>· Острые психиатрические состояния без сопровождения психиатра</li>
          </ul>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24 md:pb-32">
        <div className="rounded-sm p-12 md:p-20 text-center" style={{ backgroundColor: C.ink, color: C.bg }}>
          <h2 className="text-3xl md:text-5xl leading-tight font-normal mb-8 max-w-3xl mx-auto">
            Если вы дочитали до этого места — возможно, стоит просто записаться
          </h2>
          <p className="text-lg leading-relaxed max-w-xl mx-auto mb-10" style={{ color: '#C9C2B5' }}>
            Первая сессия ни к чему не обязывает. Если поймём, что не подходим друг другу, я порекомендую коллегу.
          </p>
          <Link href="/book" className="inline-block px-8 py-4 rounded-full text-base" style={{ ...sans, backgroundColor: C.ochre, color: C.ink }}>
            Записаться на консультацию
          </Link>
          <p className="text-sm mt-6" style={{ ...sans, color: '#C9C2B5' }}>Онлайн · 50 минут · 3 500 ₽</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}