'use client';

import Link from 'next/link';
import { C, serif, sans } from '@/app/lib/theme';
import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import Eyebrow from '@/app/components/Eyebrow';
import Reveal from '@/app/components/Reveal';

export default function Ethics() {
  return (
    <div style={{ ...serif, backgroundColor: C.bg, color: C.ink }} className="min-h-screen">
      <Nav />

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 md:pt-28">
        <Reveal>
          <Eyebrow>Этика работы</Eyebrow>
          <h1 className="text-4xl md:text-6xl leading-[1.1] tracking-tight font-normal mb-8">
            Как устроена работа со мной
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="text-lg leading-relaxed" style={{ color: C.inkSoft }}>
            Психология — профессия с большой степенью доверия. Я хочу, чтобы до начала работы было понятно, как я отношусь к конфиденциальности, к границам, к деньгам, к ситуациям, в которых нужна не я, а кто-то другой. Это та страница, которую полезно прочитать целиком до записи на консультацию.
          </p>
        </Reveal>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <Reveal>
          <Eyebrow>Конфиденциальность</Eyebrow>
          <h2 className="text-2xl md:text-3xl leading-tight font-normal mb-6">
            Что остаётся между нами
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-base leading-relaxed mb-5" style={{ color: C.ink }}>
            Всё, что вы рассказываете на сессии — содержание разговоров, ваши истории, переживания, отношения, любые личные подробности — остаётся между нами. Я не делюсь этим с близкими, друзьями, коллегами, никем. Я не комментирую ваши истории в социальных сетях. Я не упоминаю вас в публичных выступлениях или в учебных материалах.
          </p>
          <p className="text-base leading-relaxed mb-5" style={{ color: C.ink }}>
            Если мы случайно встретимся в общественном месте — я не подойду первой. Это не невежливость, а защита вашей анонимности: я не знаю, с кем вы рядом, и не хочу создавать ситуацию, в которой вам пришлось бы объяснять, откуда мы знакомы.
          </p>
          <p className="text-base leading-relaxed" style={{ color: C.ink }}>
            При записи я обращаюсь к вам по имени. Никаких фамилий, дат рождения, паспортных данных и других персональных сведений я не запрашиваю. Если для документов или налогового чека потребуется что-то ещё — я предупрежу заранее.
          </p>
        </Reveal>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <Reveal>
          <h3 className="text-xl md:text-2xl leading-tight font-normal mb-5">
            Когда я обязана раскрыть информацию
          </h3>
        </Reveal>
        <Reveal>
          <p className="text-base leading-relaxed mb-5" style={{ color: C.ink }}>
            Есть несколько исключений из принципа конфиденциальности. Они не мои личные правила — это этические нормы психологической профессии и требования российского законодательства. Я обязана действовать иначе, если:
          </p>
        </Reveal>
        <Reveal>
          <ul className="space-y-3 pl-6 list-disc mb-5" style={{ color: C.ink }}>
            <li className="text-base leading-relaxed">
              есть реальная угроза вашей жизни или жизни других людей;
            </li>
            <li className="text-base leading-relaxed">
              вы сообщаете о готовящемся или совершённом преступлении против жизни, здоровья или половой неприкосновенности несовершеннолетних;
            </li>
            <li className="text-base leading-relaxed">
              поступает официальный запрос суда или правоохранительных органов в установленном законом порядке.
            </li>
          </ul>
        </Reveal>
        <Reveal>
          <p className="text-base leading-relaxed" style={{ color: C.ink }}>
            Эти ситуации редки. Если они возникнут, я постараюсь сначала обсудить с вами, что и в какой форме нужно сделать.
          </p>
        </Reveal>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <Reveal>
          <h3 className="text-xl md:text-2xl leading-tight font-normal mb-5">
            Супервизия
          </h3>
        </Reveal>
        <Reveal>
          <p className="text-base leading-relaxed mb-5" style={{ color: C.ink }}>
            Я еженедельно прохожу профессиональную супервизию — это часть моей работы как клинического психолога. Супервизия нужна, чтобы я могла обсуждать сложные случаи с более опытным коллегой и оставаться эффективной в работе.
          </p>
          <p className="text-base leading-relaxed" style={{ color: C.ink }}>
            На супервизии я никогда не называю имён клиентов. Никаких идентифицирующих сведений — где работаете, откуда вы, как выглядите, имена родственников. Обсуждается только материал работы в обезличенной форме: «клиент, женщина около 30 лет, обратилась с запросом о...». Супервизор тоже связан этическим кодексом конфиденциальности.
          </p>
        </Reveal>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <Reveal>
          <Eyebrow>Границы работы</Eyebrow>
          <h2 className="text-2xl md:text-3xl leading-tight font-normal mb-6">
            С чем я работаю и не работаю
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-base leading-relaxed mb-5" style={{ color: C.ink }}>
            Я работаю с дееспособными совершеннолетними в индивидуальном формате. Это значит, что я не беру в работу:
          </p>
        </Reveal>
        <Reveal>
          <ul className="space-y-3 pl-6 list-disc mb-5" style={{ color: C.ink }}>
            <li className="text-base leading-relaxed">детей и подростков до 18 лет;</li>
            <li className="text-base leading-relaxed">пары, семьи, группы;</li>
            <li className="text-base leading-relaxed">людей в состоянии острого кризиса с активными суицидальными намерениями;</li>
            <li className="text-base leading-relaxed">людей с активными зависимостями — алкоголь, наркотики, азартные игры — если они не сопровождаются профильным специалистом;</li>
            <li className="text-base leading-relaxed">расстройства пищевого поведения;</li>
            <li className="text-base leading-relaxed">острые психиатрические состояния без сопровождения врача-психиатра.</li>
          </ul>
        </Reveal>
        <Reveal>
          <p className="text-base leading-relaxed mb-5" style={{ color: C.ink }}>
            Это не значит, что эти ситуации «неправильные» или «не подходят» — это значит, что для них нужна другая квалификация и часто командная работа: с психиатром, наркологом, диетологом, иногда госпитализация. Я как психолог в этих случаях буду менее эффективна, чем подходящий специалист.
          </p>
          <p className="text-base leading-relaxed" style={{ color: C.ink }}>
            Если в процессе нашей работы выяснится, что вам нужна другая помощь — я открыто скажу об этом и помогу с навигацией к нужным специалистам.
          </p>
        </Reveal>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <Reveal>
          <h3 className="text-xl md:text-2xl leading-tight font-normal mb-5">
            Что не входит в работу со мной
          </h3>
        </Reveal>
        <Reveal>
          <p className="text-base leading-relaxed mb-5" style={{ color: C.ink }}>
            Я не диагностирую психические расстройства — это компетенция врачей. Я могу заметить признаки, которые стоит проверить у психиатра, и порекомендую обратиться к нему. Но «диагноз» в моих руках — это всегда рабочая гипотеза, не медицинское заключение.
          </p>
          <p className="text-base leading-relaxed mb-5" style={{ color: C.ink }}>
            Я не назначаю лекарств и не комментирую назначения вашего психиатра. Если я считаю, что что-то стоит обсудить — я предложу вам поговорить с тем, кто их выписал.
          </p>
          <p className="text-base leading-relaxed" style={{ color: C.ink }}>
            Я не даю советов в смысле «делайте вот так». Психологическая работа — это поддержка вашего собственного выбора, а не выдача готовых решений. Иногда я предлагаю варианты или делюсь мнением, если вы спрашиваете — но конечный выбор всегда остаётся за вами.
          </p>
        </Reveal>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <Reveal>
          <Eyebrow>Деньги</Eyebrow>
          <h2 className="text-2xl md:text-3xl leading-tight font-normal mb-6">
            Стоимость и расчёты
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-base leading-relaxed mb-5" style={{ color: C.ink }}>
            Консультация — 3 500 рублей, 50 минут, онлайн через Телемост. Оплата производится переводом по номеру телефона на карту Альфа-банка не позднее, чем за час до встречи.
          </p>
          <p className="text-base leading-relaxed mb-5" style={{ color: C.ink }}>
            Я плательщик налога на профессиональный доход (самозанятая). После оплаты вы получаете чек, сформированный в приложении «Мой налог» — он подтверждает оплату и легализует наши отношения как договор оказания услуг.
          </p>
          <p className="text-base leading-relaxed" style={{ color: C.ink }}>
            Если вам нужно отменить или перенести встречу — предупредите не позднее, чем за 12 часов. В этом случае ничего не удерживается. Если меньше — удерживается 50% стоимости как компенсация за зарезервированное время. Если вы не пришли и не предупредили — удерживается полная стоимость. Подробнее об этом — в{' '}
            <Link href="/legal/offer" style={{ color: C.terracotta }}>
              Оферте
            </Link>
            .
          </p>
        </Reveal>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <Reveal>
          <Eyebrow>Кризисные ситуации</Eyebrow>
          <h2 className="text-2xl md:text-3xl leading-tight font-normal mb-6">
            Если плохо прямо сейчас
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-base leading-relaxed mb-5" style={{ color: C.ink }}>
            Я работаю на сессиях, не круглосуточно. Если вы написали мне в мессенджер вечером или ночью — я отвечу в рабочее время, не сразу. Это значит, что я не подхожу как «горячая линия» в моменты кризиса.
          </p>
          <p className="text-base leading-relaxed mb-5" style={{ color: C.ink }}>
            Если вам прямо сейчас плохо, страшно, или появились мысли о том, что жить не хочется — пожалуйста, обратитесь по одному из этих номеров. Это бесплатно, анонимно, круглосуточно. Там работают подготовленные специалисты, которые помогут пережить острый момент.
          </p>
        </Reveal>

        <div className="space-y-4 mt-8">
          <Reveal>
            <CrisisCard
              phone="112"
              label="Единая служба экстренной помощи"
              description="Скорая, полиция, МЧС, психологическая помощь в чрезвычайных ситуациях. Звонок бесплатный, работает с любого телефона."
            />
          </Reveal>
          <Reveal delay={80}>
            <CrisisCard
              phone="8 800 2000 122"
              label="Детский телефон доверия"
              description="Бесплатно, анонимно, круглосуточно. Для детей, подростков и их родителей по всей России."
            />
          </Reveal>
          <Reveal delay={160}>
            <CrisisCard
              phone="8 495 989 50 50"
              label="Центр экстренной психологической помощи МЧС России"
              description="Круглосуточно. Психологическая помощь в острых ситуациях."
            />
          </Reveal>
          <Reveal delay={240}>
            <CrisisCard
              phone="8 800 333 44 34"
              label="Бесплатная кризисная линия доверия"
              description="По всей России, круглосуточно, анонимно."
            />
          </Reveal>
          <Reveal delay={320}>
            <CrisisCard
              phone="8 495 988 44 34"
              label="Кризисная линия доверия Москвы"
              description="Круглосуточно, бесплатно для Москвы."
            />
          </Reveal>
          <Reveal delay={400}>
            <CrisisCard
              phone="051"
              label="Московская служба психологической помощи населению"
              description="С городского телефона Москвы. С мобильного — 8 495 051."
            />
          </Reveal>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16">
        <Reveal>
          <div className="p-10 rounded-sm" style={{ backgroundColor: C.surface, borderLeft: `3px solid ${C.moss}` }}>
            <h3 className="text-xl md:text-2xl leading-tight font-normal mb-5">
              Если вы сомневаетесь, подходит ли вам работа со мной
            </h3>
            <p className="text-base leading-relaxed mb-5" style={{ color: C.ink }}>
              Это нормально — сомневаться. Можно записаться на одну консультацию и посмотреть, насколько вам комфортно со мной как с человеком, насколько подходит формат, удобно ли время. После первой встречи никаких обязательств нет — вы можете решить продолжать или нет.
            </p>
            <p className="text-base leading-relaxed" style={{ color: C.ink }}>
              Если в процессе работы что-то будет идти не так — скажите мне напрямую. Это часть терапии — учиться говорить о неудобном. И со мной этому учиться можно безопасно.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <Reveal>
          <div className="rounded-sm p-12 md:p-20 text-center" style={{ backgroundColor: C.ink, color: C.bg }}>
            <h2 className="text-3xl md:text-4xl leading-tight font-normal mb-8 max-w-2xl mx-auto">
              Если есть вопросы — спросите до записи
            </h2>
            <p className="text-lg leading-relaxed max-w-xl mx-auto mb-10" style={{ color: '#C9C2B5' }}>
              Не нужно бронировать сессию, чтобы спросить «подходит ли мне это». Напишите — отвечу.
            </p>
            <Link
              href="/book"
              className="inline-block px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl"
              style={{ ...sans, backgroundColor: C.ochre, color: C.ink }}
            >
              Записаться или задать вопрос
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}

function CrisisCard({ phone, label, description }: { phone: string; label: string; description: string }) {
  return (
    <div className="p-6 rounded-sm" style={{ backgroundColor: C.surface }}>
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-6 mb-2">
        <p className="text-2xl md:text-2xl leading-none" style={{ color: C.terracotta }}>
          {phone}
        </p>
        <p className="text-sm md:text-right" style={{ ...sans, color: C.ink, fontWeight: 500 }}>
          {label}
        </p>
      </div>
      <p className="text-[14px] leading-relaxed" style={{ ...sans, color: C.inkSoft }}>
        {description}
      </p>
    </div>
  );
}
