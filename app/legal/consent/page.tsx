'use client';

import Link from 'next/link';
import { C, serif, sans } from '@/app/lib/theme';
import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import Eyebrow from '@/app/components/Eyebrow';
import Reveal from '@/app/components/Reveal';

export default function Consent() {
  return (
    <div style={{ ...serif, backgroundColor: C.bg, color: C.ink }} className="min-h-screen">
      <Nav />

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 md:pt-28">
        <Reveal>
          <Eyebrow>Юридическая информация</Eyebrow>
          <h1 className="text-4xl md:text-5xl leading-[1.1] tracking-tight font-normal mb-4">
            Согласие на обработку персональных данных
          </h1>
          <p className="text-sm" style={{ ...sans, color: C.inkSoft }}>
            Редакция от 21 мая 2026 г.
          </p>
        </Reveal>
      </section>

      <article className="max-w-3xl mx-auto px-6 pb-24">
        <Reveal>
          <div className="p-7 rounded-sm mb-10" style={{ backgroundColor: C.surface, borderLeft: `3px solid ${C.terracotta}` }}>
            <p className="text-base leading-relaxed" style={{ color: C.ink }}>
              Отправляя форму записи на консультацию на сайте{' '}
              <a href="https://psyshashkova.ru" style={{ color: C.terracotta }}>
                psyshashkova.ru
              </a>{' '}
              либо обращаясь к Шашковой Юлии Алексеевне через мессенджер или электронную почту с целью записи на консультацию, я (далее — «Субъект персональных данных») даю своё свободное, информированное, конкретное и сознательное согласие на обработку моих персональных данных на условиях, изложенных ниже.
            </p>
          </div>
        </Reveal>

        <Section number="1" title="Оператор персональных данных">
          <P>
            Шашкова Юлия Алексеевна, плательщик налога на профессиональный доход (самозанятая), ИНН 222390957450, контактный email: timonrulez@yandex.ru (далее — «Оператор»).
          </P>
        </Section>

        <Section number="2" title="Перечень обрабатываемых данных">
          <P>
            Согласие распространяется на обработку следующих категорий персональных данных:
          </P>
          <List>
            <li>имя (как обращаться);</li>
            <li>контактные данные: номер телефона и/или имя пользователя в мессенджере Telegram;</li>
            <li>содержание сообщений, направляемых Оператору в ходе оформления заявки и сопровождения работы;</li>
            <li>сведения, сообщаемые Субъектом в процессе психологических консультаций (защищаются принципом профессиональной конфиденциальности).</li>
          </List>
        </Section>

        <Section number="3" title="Цели обработки">
          <P>
            Персональные данные обрабатываются исключительно для следующих целей:
          </P>
          <List>
            <li>идентификация Субъекта при оформлении заявки;</li>
            <li>связь с Субъектом для согласования условий, времени и формата консультации;</li>
            <li>оказание услуги психологического консультирования в соответствии с{' '}
              <Link href="/legal/offer" style={{ color: C.terracotta }}>
                Публичной офертой
              </Link>
              ;
            </li>
            <li>направление Субъекту материалов, домашних заданий и иной информации, связанной с оказанием услуги;</li>
            <li>исполнение обязательств налогоплательщика — формирование чеков в приложении «Мой налог».</li>
          </List>
        </Section>

        <Section number="4" title="Действия с данными">
          <P>
            Согласие предоставляется на совершение следующих действий с персональными данными: сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача (предоставление, доступ) исключительно в рамках целей, указанных в разделе 3, обезличивание, блокирование, удаление, уничтожение.
          </P>
          <P>
            Обработка осуществляется как с использованием средств автоматизации, так и без использования таких средств.
          </P>
        </Section>

        <Section number="5" title="Срок действия согласия">
          <P>
            Согласие действует в течение всего срока оказания услуг и в течение 3 (трёх) лет после окончания оказания услуг — для соблюдения требований налогового и гражданского законодательства о хранении документов.
          </P>
          <P>
            Согласие может быть отозвано в любой момент путём направления Оператору письменного уведомления на email: timonrulez@yandex.ru. При отзыве согласия Оператор в течение 30 (тридцати) дней удаляет персональные данные Субъекта, за исключением данных, обязательное хранение которых установлено законом.
          </P>
        </Section>

        <Section number="6" title="Передача третьим лицам">
          <P>
            Персональные данные не передаются третьим лицам, за исключением:
          </P>
          <List>
            <li>обезличенных материалов — профессиональному супервизору в рамках обеспечения качества психологической работы;</li>
            <li>государственных органов — по их законным запросам в установленном законом порядке;</li>
            <li>обработчиков платежей (банков) — в объёме, необходимом для проведения платежа.</li>
          </List>
        </Section>

        <Section number="7" title="Подтверждение">
          <P>
            Отправляя форму записи на Сайте либо иным способом инициируя оказание услуги, Субъект подтверждает, что:
          </P>
          <List>
            <li>ознакомлен с настоящим Согласием и{' '}
              <Link href="/legal/privacy" style={{ color: C.terracotta }}>
                Политикой конфиденциальности
              </Link>
              ;</li>
            <li>понимает и принимает условия обработки своих персональных данных;</li>
            <li>достиг 18-летнего возраста и обладает полной дееспособностью;</li>
            <li>предоставляет данные о себе добровольно и подтверждает их достоверность.</li>
          </List>
        </Section>

        <div className="mt-16 pt-8 border-t" style={{ borderColor: C.line }}>
          <p className="text-sm leading-relaxed" style={{ ...sans, color: C.inkSoft }}>
            Связанные документы:{' '}
            <Link href="/legal/offer" style={{ color: C.terracotta }}>
              Публичная оферта
            </Link>
            {' · '}
            <Link href="/legal/privacy" style={{ color: C.terracotta }}>
              Политика конфиденциальности
            </Link>
            {' · '}
            <Link href="/ethics" style={{ color: C.terracotta }}>
              Этика работы
            </Link>
          </p>
        </div>
      </article>

      <Footer />
    </div>
  );
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <Reveal>
        <div className="flex items-baseline gap-4 mb-6">
          <span className="text-sm" style={{ ...sans, color: C.terracotta }}>
            {number}
          </span>
          <h2 className="text-2xl md:text-3xl leading-tight font-normal">{title}</h2>
        </div>
      </Reveal>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base leading-relaxed" style={{ color: C.ink }}>
      {children}
    </p>
  );
}

function List({ children }: { children: React.ReactNode }) {
  return (
    <ul className="space-y-2 pl-6 list-disc" style={{ color: C.ink }}>
      {children}
    </ul>
  );
}
