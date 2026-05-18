'use client';

import Link from 'next/link';
import { C, serif, sans } from '@/app/lib/theme';
import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import Eyebrow from '@/app/components/Eyebrow';

const cbtFor = [
  'Тревога — генерализованная, социальная, панические атаки',
  'Прокрастинация и сложности с самодисциплиной',
  'Самокритика и низкая самооценка',
  'Подавленное настроение и апатия',
  'Сложности с принятием решений',
  'Стресс и выгорание',
  'Конкретные поведенческие изменения',
];

const cbtHow = [
  { title: 'Структурно', text: 'У нас есть план: что разбираем сейчас, к чему движемся, как поймём, что цель достигнута. Я открыто говорю, какой шаг мы делаем и зачем.' },
  { title: 'С домашними заданиями', text: 'Между сессиями вы наблюдаете за собой, ведёте дневники, пробуете новые способы. Терапия — это не только разговор раз в неделю.' },
  { title: 'С опорой на исследования', text: 'Я использую техники, эффективность которых проверена в исследованиях. Если технику не поддерживает доказательная база — я её не применяю.' },
  { title: 'Краткосрочно или средне', text: 'Для конкретных запросов хватает 10–20 сессий, но зависит от ситуации. Это не «терапия на годы» — мы движемся к понятной цели.' },
];

const schemaFor = [
  'Повторяющиеся сценарии в отношениях, на работе, с собой',
  'Эмоциональная зависимость, страх покинутости, страх близости',
  'Глубокая самокритика и ощущение «я недостаточно хорош/а»',
  'Сложности с границами и собственными желаниями',
  'Тревога или подавленность, которые не уходят от КПТ',
  'Ощущение «как будто живу не свою жизнь»',
  'Пограничные черты, нарциссические сценарии',
];

const schemaHow = [
  { title: 'Глубже', text: 'Работаем не только с актуальными мыслями и реакциями, но и с тем, как сложились ваши базовые представления о себе и других — в основном в детстве.' },
  { title: 'С эмоциями, не только с мыслями', text: 'В схема-терапии много техник, которые работают с эмоциональной памятью: воображение, работа с детскими сценами, диалоги с частями себя.' },
  { title: 'Дольше и медленнее', text: 'Глубокие сценарии не меняются за месяц. Реалистично — от полугода до 2 лет работы. Это не значит «сессии каждую неделю всё это время», но процесс длинный.' },
  { title: 'С 18 схемами и 10 режимами', text: 'Схема-терапия даёт чёткий язык, на котором можно описать, что с вами происходит. Это помогает не «винить себя за реакции», а понимать, откуда они растут.' },
];

const myth = [
  { q: 'Это как коучинг или мотивационные практики?', a: 'Нет. КПТ — это клиническая психотерапия с доказанной эффективностью при тревожных, депрессивных, обсессивно-компульсивных и других расстройствах. Коучинг работает с целями и результативностью у в целом здоровых людей. Это разные области.' },
  { q: 'КПТ — это просто «думайте позитивно»?', a: 'Нет. Это распространённый миф. КПТ не учит «менять плохие мысли на хорошие». Она помогает заметить, что мысли — это не факты, и проверять их связь с реальностью. Часто вывод оказывается не «я был неправ», а «моя реакция логична, и теперь понятно, что с этим делать».' },
  { q: 'Схема-терапия — это про детство и копание в прошлом?', a: 'Прошлое там есть, но не как самоцель. Мы смотрим, как сложились ваши «схемы» (устойчивые убеждения о себе и мире), но работаем в основном с тем, как они проявляются сейчас. Цель — не понять, кто виноват, а перестать жить по сценариям, которые больше не работают.' },
  { q: 'Это «холодные» подходы — там нет места эмоциям?', a: 'Это устаревший миф. Современная КПТ много работает с эмоциями. Схема-терапия — вообще один из самых эмоционально насыщенных подходов: там есть техники воображения, диалогов с разными частями себя, работа с травматическими воспоминаниями.' },
];

export default function Approaches() {
  return (
    <div style={{ ...serif, backgroundColor: C.bg, color: C.ink }} className="min-h-screen">

      <Nav active="/approaches" />

      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28">
        <div className="max-w-3xl">
          <Eyebrow>Подходы в работе</Eyebrow>
          <h1 className="text-4xl md:text-6xl leading-[1.1] tracking-tight font-normal mb-8">
            Два метода, между которыми мы выбираем под ваш запрос
          </h1>
          <p className="text-lg leading-relaxed mb-6" style={{ color: C.inkSoft }}>
            Я не работаю «во всех подходах сразу». В психотерапии это часто признак того, что специалист ни в одном не разобрался достаточно глубоко.
          </p>
          <p className="text-lg leading-relaxed" style={{ color: C.inkSoft }}>
            Я работаю в двух — когнитивно-поведенческой терапии (КПТ) и схема-терапии. Это разные методы с разной глубиной, и выбор между ними мы делаем вместе после первой сессии, исходя из вашего запроса.
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: C.surface }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-12 items-start mb-16">
            <div className="md:col-span-4">
              <p className="text-xs tracking-widest uppercase mb-3" style={{ ...sans, color: C.terracotta }}>Подход 1</p>
              <h2 className="text-4xl md:text-5xl leading-tight font-normal">
                Когнитивно-поведенческая терапия
              </h2>
            </div>
            <div className="md:col-span-8 md:pt-4">
              <p className="text-lg leading-relaxed mb-6" style={{ color: C.inkSoft }}>
                КПТ — это метод, в основе которого простая, но рабочая идея: наши чувства и поведение во многом зависят от того, как мы интерпретируем происходящее. Не от самих событий, а от мыслей о них.
              </p>
              <p className="text-base leading-relaxed" style={{ color: C.inkSoft }}>
                Если бесконечно крутить в голове «я не справлюсь», тревога будет расти, даже если объективно справиться можно. Если автоматически думать «он молчит — значит, злится», вы будете действовать так, как будто это правда, и часто получать в ответ как раз то, чего боялись. КПТ помогает заметить эти автоматические мысли, проверить их на реальность и постепенно менять не только мышление, но и поведение.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-12 mb-12">
            <div className="md:col-span-5">
              <h3 className="text-xl mb-6">Как мы работаем</h3>
              <div className="space-y-6">
                {cbtHow.map((item, i) => (
                  <div key={i}>
                    <p className="text-base mb-2" style={{ color: C.ink }}>· {item.title}</p>
                    <p className="text-[15px] leading-relaxed pl-4" style={{ color: C.inkSoft }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-7">
              <h3 className="text-xl mb-6">Кому подходит</h3>
              <ul className="space-y-3">
                {cbtFor.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="shrink-0 mt-1" style={{ color: C.terracotta }}>—</span>
                    <span className="text-[16px] leading-relaxed" style={{ color: C.ink }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-12 items-start mb-16">
          <div className="md:col-span-4">
            <p className="text-xs tracking-widest uppercase mb-3" style={{ ...sans, color: C.moss }}>Подход 2</p>
            <h2 className="text-4xl md:text-5xl leading-tight font-normal">
              Схема-терапия
            </h2>
          </div>
          <div className="md:col-span-8 md:pt-4">
            <p className="text-lg leading-relaxed mb-6" style={{ color: C.inkSoft }}>
              Иногда человек приходит в терапию с конкретным запросом — например, «хочу справиться с тревогой» — и КПТ помогает. А иногда видно: запрос есть, но за ним стоит что-то более глубокое, что повторяется снова и снова, в разных ролях, разных отношениях, в разные годы. В таких случаях работает схема-терапия.
            </p>
            <p className="text-base leading-relaxed" style={{ color: C.inkSoft }}>
              Схема-терапия — это «третья волна» КПТ, разработанная Джеффри Янгом. Она исходит из того, что у каждого из нас в детстве формируются устойчивые представления о себе, других людях и мире — «схемы». Если базовые потребности ребёнка не были удовлетворены (например, в безопасности, принятии, автономии), схемы получаются болезненными. Во взрослой жизни они продолжают работать, и человек оказывается в одних и тех же ситуациях, реагирует одними и теми же способами, страдает по одним и тем же причинам.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-12 mb-12">
          <div className="md:col-span-5">
            <h3 className="text-xl mb-6">Как мы работаем</h3>
            <div className="space-y-6">
              {schemaHow.map((item, i) => (
                <div key={i}>
                  <p className="text-base mb-2" style={{ color: C.ink }}>· {item.title}</p>
                  <p className="text-[15px] leading-relaxed pl-4" style={{ color: C.inkSoft }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-7">
            <h3 className="text-xl mb-6">Кому подходит</h3>
            <ul className="space-y-3">
              {schemaFor.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 mt-1" style={{ color: C.moss }}>—</span>
                  <span className="text-[16px] leading-relaxed" style={{ color: C.ink }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: C.ink, color: C.bg }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-2xl mb-16">
            <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ ...sans, color: C.ochre }}>Сравнение</p>
            <h2 className="text-3xl md:text-4xl leading-tight font-normal mb-6">
              Как понять, что вам ближе
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#C9C2B5' }}>
              Окончательно мы это решим на первой сессии. Но если хочется сориентироваться заранее — вот таблица.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b" style={{ borderColor: '#3a3530' }}>
                  <th className="py-4 pr-4 text-sm font-normal" style={{ ...sans, color: '#C9C2B5' }}></th>
                  <th className="py-4 px-4 text-base font-normal" style={{ color: C.ochre }}>КПТ</th>
                  <th className="py-4 px-4 text-base font-normal" style={{ color: C.ochre }}>Схема-терапия</th>
                </tr>
              </thead>
              <tbody className="text-[15px]">
                {[
                  ['Длительность', '10–20 сессий', 'От полугода до 2 лет'],
                  ['Глубина', 'Поверхностные слои: мысли, реакции, поведение', 'Глубокие слои: устойчивые паттерны с детства'],
                  ['С чем работает', 'Конкретные симптомы и ситуации', 'Повторяющиеся жизненные сценарии'],
                  ['Эмоции', 'Анализируем и регулируем', 'Работаем с эмоциональной памятью напрямую'],
                  ['Прошлое', 'Минимально, в основном «здесь и сейчас»', 'Важная часть работы'],
                  ['Запрос', '«Хочу справиться с тревогой»', '«Я снова в тех же отношениях / снова чувствую то же»'],
                ].map((row, i) => (
                  <tr key={i} className="border-b" style={{ borderColor: '#3a3530' }}>
                    <td className="py-4 pr-4 text-sm" style={{ ...sans, color: '#C9C2B5' }}>{row[0]}</td>
                    <td className="py-4 px-4 leading-relaxed" style={{ color: C.bg }}>{row[1]}</td>
                    <td className="py-4 px-4 leading-relaxed" style={{ color: C.bg }}>{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-24 md:py-32">
        <Eyebrow>Развенчиваем мифы</Eyebrow>
        <h2 className="text-3xl md:text-4xl leading-tight font-normal mb-16">
          Что часто понимают неправильно
        </h2>
        <div className="space-y-px">
          {myth.map((item, i) => (
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
            Не уверены, какой подход подойдёт?
          </h2>
          <p className="text-lg leading-relaxed max-w-xl mx-auto mb-10" style={{ color: '#C9C2B5' }}>
            Это нормально. Первая сессия как раз для того, чтобы вместе понять, с чем вы пришли и что будет работать.
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