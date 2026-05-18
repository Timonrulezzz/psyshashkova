'use client';

import Link from 'next/link';
import { C, serif, sans } from '@/app/lib/theme';
import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import Eyebrow from '@/app/components/Eyebrow';
import Reveal from '@/app/components/Reveal';
import CountUp from '@/app/components/CountUp';

const education = [
  { year: '2022 — 2023', org: 'АНО ДПО «Институт прикладной психологии в социальной сфере»', program: 'Клиническая психология. Диагностика, коррекция и восстановление психической деятельности', hours: '1560 часов', result: 'Квалификация: клинический психолог' },
  { year: '2023 — 2025', org: 'РАНХиГС', program: 'Специалист по развитию личной и профессиональной эффективности', hours: '496 часов', result: 'Квалификация: психолог в социальной сфере' },
  { year: '2023 — 2024', org: 'ООО «Психодемия»', program: 'Когнитивно-поведенческая терапия', hours: '269 часов', result: 'Повышение квалификации' },
  { year: '2024 — 2025', org: 'ООО «Психодемия»', program: 'Схема-терапия', hours: '—', result: 'Повышение квалификации' },
  { year: '2022 — 2024', org: 'ООО «Психодемия»', program: 'Консультант в сфере сексуальных отношений', hours: '—', result: 'Профессиональная переподготовка' },
  { year: '2024 — 2026', org: 'РАНХиГС, магистратура', program: 'Психология личности', hours: '—', result: 'В процессе, завершение в 2026' },
];

const principles = [
  { title: 'Без оценки', text: 'У меня нет в голове шкалы, по которой клиент бывает правильным или неправильным, а причина прийти — достаточной или недостаточной. Если вы пришли, значит, это важно.' },
  { title: 'Без советов', text: 'Моя работа — помочь вам найти свои ответы. Если у меня есть мысль про вашу ситуацию, я её скажу, но как версию, которую можно обсудить, а не как инструкцию.' },
  { title: 'Честно', text: 'Если я с чем-то не согласна, я скажу. Если в нашей работе что-то застряло, я скажу. Если я не подхожу вам как специалист — порекомендую коллегу.' },
  { title: 'Конфиденциально', text: 'Всё, что вы говорите на сессии, остаётся между нами. Исключения только стандартные: угроза вашей жизни или жизни других людей. Это мы обсудим на первой встрече.' },
  { title: 'С опорой на доказательную базу', text: 'Я работаю в КПТ и схема-терапии — подходах с подтверждённой эффективностью. Не использую техники, у которых нет научного основания.' },
];

export default function About() {
  return (
    <div style={{ ...serif, backgroundColor: C.bg, color: C.ink }} className="min-h-screen">
      <Nav active="/about" />

      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow>Обо мне</Eyebrow>
              <h1 className="text-4xl md:text-6xl leading-[1.1] tracking-tight font-normal mb-8">
                Юлия Шашкова. Клинический психолог
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="text-lg leading-relaxed mb-6" style={{ color: C.inkSoft }}>
                До психологии я почти десять лет работала в IT на руководящих должностях. В какой-то момент стало ясно, что мне это не нравится. Я ушла и спросила себя, что мне на самом деле интересно изучать и читать. Ответом оказалась психология.
              </p>
            </Reveal>
            <Reveal delay={250}>
              <p className="text-lg leading-relaxed mb-6" style={{ color: C.inkSoft }}>
                Я не пришла в эту профессию с идеей «помогать людям». Я пришла с интересом — к тому, как устроены люди, как устроена я, как из набора привычек, реакций и сценариев складывается то, что мы называем характером. И как с этим можно что-то делать, если хочется.
              </p>
            </Reveal>
            <Reveal delay={350}>
              <p className="text-lg leading-relaxed" style={{ color: C.inkSoft }}>
                За время в IT я научилась внимательно слушать, видеть структуру там, где её на первый взгляд нет, и задавать вопросы, после которых разговор сдвигается. Эти навыки оказались полезными и в новой профессии.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={200}>
              <div className="aspect-[4/5] rounded-sm flex items-center justify-center transition-transform duration-700 hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg, #2a2a2a 0%, #4a4a4a 50%, #1a1a1a 100%)', color: '#888' }}>
                <p className="text-xs tracking-widest uppercase" style={sans}>Главный портрет</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <Reveal>
          <div className="border-t border-b py-12 grid grid-cols-2 md:grid-cols-4 gap-8" style={{ borderColor: C.line }}>
            <div>
              <p className="text-4xl mb-2" style={{ color: C.terracotta }}>
                <CountUp end={2} suffix=",5 года" />
              </p>
              <p className="text-sm" style={{ ...sans, color: C.inkSoft }}>в практике</p>
            </div>
            <div>
              <p className="text-4xl mb-2" style={{ color: C.terracotta }}>
                <CountUp end={250} suffix="+" />
              </p>
              <p className="text-sm" style={{ ...sans, color: C.inkSoft }}>клиентов</p>
            </div>
            <div>
              <p className="text-4xl mb-2" style={{ color: C.terracotta }}>
                <CountUp end={2500} suffix="+" formatThousands />
              </p>
              <p className="text-sm" style={{ ...sans, color: C.inkSoft }}>часов работы</p>
            </div>
            <div>
              <p className="text-4xl mb-2" style={{ color: C.terracotta }}>
                <CountUp end={5} suffix="+ лет" />
              </p>
              <p className="text-sm" style={{ ...sans, color: C.inkSoft }}>в личной терапии</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <Reveal>
              <Eyebrow>Образование</Eyebrow>
              <h2 className="text-3xl md:text-4xl leading-tight font-normal mb-6">Учусь и продолжаю учиться</h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: C.inkSoft }}>Все документы подтверждены и проверяемы. Я перечисляю не «прошла курс», а конкретные программы с часами и квалификациями.</p>
              <p className="text-base leading-relaxed" style={{ color: C.inkSoft }}>В психологии много специалистов с двухмесячным курсом «коуч», и клиент имеет право знать, чему именно учился его терапевт.</p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <div className="space-y-px">
              {education.map((e, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="p-6 transition-all duration-300 hover:translate-x-2 cursor-default" style={{ backgroundColor: i % 2 === 0 ? C.surface : C.bg, borderLeft: `2px solid ${C.line}` }}>
                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                      <p className="text-sm shrink-0 md:w-32 pt-1" style={{ ...sans, color: C.terracotta }}>{e.year}</p>
                      <div className="flex-1">
                        <p className="text-[15px] mb-2" style={{ ...sans, color: C.inkSoft }}>{e.org}</p>
                        <h3 className="text-lg mb-2">{e.program}</h3>
                        <p className="text-sm" style={{ ...sans, color: C.inkSoft }}>
                          {e.hours !== '—' && <span>{e.hours} · </span>}{e.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: C.ink, color: C.bg }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <Reveal>
            <div className="max-w-2xl mb-16">
              <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ ...sans, color: C.ochre }}>Принципы работы</p>
              <h2 className="text-3xl md:text-4xl leading-tight font-normal mb-6">Чего вы можете от меня ожидать. И чего точно не дождётесь</h2>
              <p className="text-base leading-relaxed" style={{ color: '#C9C2B5' }}>Это принципы, по которым я работаю.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {principles.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="border-t pt-6" style={{ borderColor: '#3a3530' }}>
                  <p className="text-sm mb-3" style={{ ...sans, color: C.ochre }}>0{i + 1}</p>
                  <h3 className="text-xl mb-3">{p.title}</h3>
                  <p className="text-[15px] leading-relaxed" style={{ color: '#C9C2B5' }}>{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-24 md:py-32">
        <Reveal>
          <div className="border-l-2 pl-8" style={{ borderColor: C.terracotta }}>
            <Eyebrow>Личная работа</Eyebrow>
            <h2 className="text-2xl md:text-3xl leading-tight font-normal mb-6">Я делаю то же, что прошу делать клиентов</h2>
            <div className="space-y-5 text-[16px] leading-relaxed" style={{ color: C.inkSoft }}>
              <p>Я в личной терапии больше пяти лет, с некоторыми паузами. Это продолжающаяся практика — для меня это часть работы.</p>
              <p>Минимум раз в две недели хожу на супервизию: разбираю свою работу с более опытным коллегой. Так я проверяю, что не действую из своих слепых пятен и не упускаю важное.</p>
              <p>Читаю исследования и хожу на профильные конференции. В моей области многое меняется, и я слежу за тем, что появляется нового.</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section style={{ backgroundColor: C.surface }}>
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5">
              <Reveal>
                <div className="aspect-[3/4] rounded-sm flex items-center justify-center transition-transform duration-700 hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg, #2a2a2a 0%, #4a4a4a 50%, #1a1a1a 100%)', color: '#888' }}>
                  <p className="text-xs tracking-widest uppercase" style={sans}>Вне работы</p>
                </div>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={150}>
                <Eyebrow>Когда не работаю</Eyebrow>
                <h2 className="text-3xl md:text-4xl leading-tight font-normal mb-8">Я не «вся в работе»</h2>
                <div className="space-y-5 text-[16px] leading-relaxed" style={{ color: C.inkSoft }}>
                  <p>Пишу и читаю фэнтези. Учусь играть на барабанах. Хожу на концерты — много, разной музыки. Смотрю сериалы и аниме, играю в плейстейшн.</p>
                  <p>Когда вы на сессии ссылаетесь на сериал, который вас зацепил, или на сюжет, в котором узнаёте себя, скорее всего, я пойму, о чём речь.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-24">
        <Reveal>
          <div className="text-center">
            <Eyebrow>Telegram-канал</Eyebrow>
            <h2 className="text-3xl md:text-4xl leading-tight font-normal mb-6">«Зашла однажды в БАР»</h2>
            <p className="text-base leading-relaxed max-w-xl mx-auto mb-8" style={{ color: C.inkSoft }}>Мой личный канал. Заметки о психологии, наблюдения, иногда личное. Если хотите познакомиться со мной как с человеком — заходите.</p>
            <a href="https://t.me/wentintoabar" className="inline-block px-7 py-3 rounded-full text-sm border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg" style={{ ...sans, borderColor: C.ink, color: C.ink }}>
              t.me/wentintoabar →
            </a>
          </div>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24 md:pb-32">
        <Reveal>
          <div className="rounded-sm p-12 md:p-20 text-center" style={{ backgroundColor: C.ink, color: C.bg }}>
            <h2 className="text-3xl md:text-5xl leading-tight font-normal mb-8 max-w-3xl mx-auto">Решили, что хотите попробовать?</h2>
            <p className="text-lg leading-relaxed max-w-xl mx-auto mb-10" style={{ color: '#C9C2B5' }}>Первая сессия — диагностическая. По её итогам сами решите, продолжать ли работу со мной.</p>
            <Link href="/book" className="inline-block px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl" style={{ ...sans, backgroundColor: C.ochre, color: C.ink }}>
              Записаться на консультацию
            </Link>
            <p className="text-sm mt-6" style={{ ...sans, color: '#C9C2B5' }}>Онлайн · 50 минут · 3 500 ₽</p>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}