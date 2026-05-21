'use client';

import { useState } from 'react';
import Link from 'next/link';
import { C, serif, sans } from '@/app/lib/theme';
import Nav from '@/app/components/Nav';
import Footer from '@/app/components/Footer';
import Eyebrow from '@/app/components/Eyebrow';
import Reveal from '@/app/components/Reveal';

type Schema = {
  key: string;
  name: string;
  domain: string;
  description: string;
  questions: string[];
};

const schemas: Schema[] = [
  {
    key: 'emotional_deprivation',
    name: 'Эмоциональная депривация',
    domain: 'Нарушение связи и отвержение',
    description: 'Ощущение, что никто никогда по-настоящему не заботился, не понимал, не направлял. Сложно даже представить, что кто-то может это дать.',
    questions: [
      'Рядом со мной не было человека, который бы обо мне заботился, проявлял участие и искренний интерес ко всему, что происходило со мной',
      'Я никогда не чувствовал/а, что я был/а кем-то особенным для другого человека',
      'Я не знаю таких людей, которые давали бы мне тепло, любовь и заботу',
      'У меня никогда не было человека, который бы по-настоящему выслушивал и понимал меня или интересовался моими истинными потребностями и чувствами',
      'В моей жизни не было такого человека, который мог бы дать мне хороший совет или направить меня, когда я не знал/а, как поступить',
    ],
  },
  {
    key: 'abandonment',
    name: 'Покинутость / Нестабильность',
    domain: 'Нарушение связи и отвержение',
    description: 'Ожидание, что близкие исчезнут — умрут, бросят, перестанут любить. За этим стоит ощущение, что ни на кого нельзя положиться надолго.',
    questions: [
      'Я «цепляюсь» за близких мне людей, так как боюсь, что они меня покинут',
      'Я так сильно нуждаюсь в других людях, что боюсь их потерять',
      'Я опасаюсь, что мои близкие покинут или «бросят» меня',
      'Когда я чувствую, что близкий человек отдаляется или уходит от меня, я впадаю в отчаяние',
      'Иногда я так боюсь, что кто-то покинет меня, что сам/а первым/ой начинаю отталкивать этого человека',
    ],
  },
  {
    key: 'mistrust',
    name: 'Недоверие / Ожидание жестокого обращения',
    domain: 'Нарушение связи и отвержение',
    description: 'Ожидание, что люди обманут, используют, унизят, причинят боль. Часто сопровождается постоянной настороженностью.',
    questions: [
      'Мне кажется, что другие люди меня используют',
      'Я чувствую, что не могу ослабить свою защиту и вести себя естественно в присутствии других людей, так как они могут причинить мне боль',
      'Думаю, что рано или поздно, кто-нибудь меня обязательно предаст',
      'Я очень подозрительно отношусь к тому, какими мотивами руководствуются другие люди',
      'Обычно я ищу скрытые мотивы у других людей',
    ],
  },
  {
    key: 'social_isolation',
    name: 'Социальная изоляция / Отчуждённость',
    domain: 'Нарушение связи и отвержение',
    description: 'Ощущение, что ты не такой, как другие. Не принадлежишь ни к одной группе. Везде немного чужой.',
    questions: [
      'Я не вписываюсь ни в одну из компаний',
      'Я очень сильно отличаюсь от других людей',
      'Я – одиночка, и не принадлежу ни к какому «кругу»',
      'Я чувствую себя отчужденным/ой или изолированным/ой от других людей',
      'Я чувствую себя посторонним/ей в любой группе',
    ],
  },
  {
    key: 'defectiveness',
    name: 'Дефективность / Стыд',
    domain: 'Нарушение связи и отвержение',
    description: 'Глубокое убеждение «со мной что-то не так». Страх, что если меня по-настоящему узнают — отвергнут.',
    questions: [
      'Ни один/одна мужчина/женщина, к которым я испытываю влечение, не мог/могла бы полюбить меня, если бы узнал/а о моих недостатках',
      'Никто, о ком я мечтаю, не захотел бы остаться рядом со мной, если бы узнал, какой/какая я на самом деле',
      'Я недостоен/йна любви, внимания или уважения других людей',
      'Мне кажется, что меня нельзя полюбить',
      'У меня много неприемлемых качеств, из-за которых я не могу открываться перед другими людьми или позволять им узнавать меня получше',
    ],
  },
  {
    key: 'failure',
    name: 'Неуспех / Некомпетентность',
    domain: 'Нарушение автономии',
    description: 'Убеждение «у других получится, у меня — нет». Глубокая уверенность в своей профессиональной или личной несостоятельности.',
    questions: [
      'Почти всё, что я делаю на работе (в учебе) не так хорошо, как это могли бы сделать другие люди',
      'Я неспособен/на добиться успеха',
      'Большинство людей достигают лучших результатов в работе, чем я',
      'В работе я не так талантлив/а, как большинство других людей',
      'В том, что касается работы или учебы, я не такой/ая сообразительный/ая как большинство других людей',
    ],
  },
  {
    key: 'dependence',
    name: 'Зависимость / Некомпетентность',
    domain: 'Нарушение автономии',
    description: 'Чувство, что не справишься самостоятельно с обычной жизнью. Решения, обязанности, выбор — пугают.',
    questions: [
      'Думаю, что я не способен/способна самостоятельно справляться с повседневными делами',
      'В повседневной жизни я во многом завишу от других людей',
      'Мне не хватает здравого смысла',
      'В житейских ситуациях на мое мнение нельзя полагаться',
      'Я не уверен/а в своей способности справляться с повседневными проблемами, которые постоянно возникают',
    ],
  },
  {
    key: 'vulnerability',
    name: 'Уязвимость',
    domain: 'Нарушение автономии',
    description: 'Постоянное ожидание катастрофы — болезни, аварии, потери. Тревога будто живёт фоном.',
    questions: [
      'Я не могу избавиться от ощущения, что должно случиться что-то плохое',
      'Я полагаю, что в любой момент может произойти нечто ужасное (природная катастрофа, преступление, финансовый кризис или несчастный случай)',
      'Я боюсь, что на меня могут напасть',
      'Я боюсь, что потеряю все деньги или останусь без средств к существованию',
      'Я беспокоюсь, что у меня развивается тяжелое заболевание, хотя врачи не обнаруживают ничего серьезного',
    ],
  },
  {
    key: 'enmeshment',
    name: 'Слияние / Неразвитая идентичность',
    domain: 'Нарушение автономии',
    description: 'Размытое ощущение себя. Сложно понять, где твои желания, а где — то, что от тебя ждут.',
    questions: [
      'Я не смог/смогла «отделиться» от своих родителей в той мере, в какой это сделали мои сверстники',
      'Я и мои родители склонны (были склонны) принимать излишнее участие в жизни и решении проблем друг друга',
      'Мне всегда было очень трудно скрывать от родителей подробности личной жизни, не испытывая при этом чувства вины',
      'Я чувствую, что живу не собственной жизнью, а так, как хотели бы от меня мои родители',
      'Я не чувствую себя целостной личностью отдельно от личности моего партнера или кого-то из родителей',
    ],
  },
  {
    key: 'self_sacrifice',
    name: 'Самопожертвование',
    domain: 'Ориентация на других',
    description: 'Постоянная забота о других в ущерб себе. Чувство вины, когда заботишься о себе.',
    questions: [
      'В конце концов, именно мне приходится заботиться о моих близких',
      'Я – хороший человек, так как думаю о других больше, чем о себе',
      'Я так занят/а делами моих близких, что у меня не остается времени для себя',
      'Мне всегда приходится выслушивать проблемы других людей',
      'Люди считают, что я делаю слишком много для других и недостаточно для себя',
    ],
  },
  {
    key: 'approval_seeking',
    name: 'Поиск одобрения / Признания',
    domain: 'Ориентация на других',
    description: 'Самооценка зависит от того, что подумают другие. Решения принимаются с оглядкой на внешнюю реакцию.',
    questions: [
      'Знакомство с важными людьми и наличие денег дают мне ощущение собственной значимости',
      'Достижения имеют для меня наибольшую ценность, если их замечают другие люди',
      'Когда я не получаю повышенного внимания, я чувствую себя недостаточно значимым человеком',
      'Если меня знакомят с новой компанией или я кому-нибудь что-то рассказываю, то для меня очень важно получить признание и восхищение',
      'Я чувствую себя по-настоящему ценным человеком, когда меня хвалят или осыпают комплиментами',
    ],
  },
  {
    key: 'emotional_inhibition',
    name: 'Подавление эмоций',
    domain: 'Повышенная бдительность',
    description: 'Привычка сдерживать чувства, особенно сильные. Спонтанность пугает, контроль кажется безопаснее.',
    questions: [
      'Я слишком застенчив/а, чтобы проявлять свою симпатию (внимание или привязанность) к другим людям',
      'Мне неловко показывать другим свои чувства',
      'Мне трудно быть раскованным/ой и непосредственным/ой с другими людьми',
      'Я так сильно контролирую себя, что меня считают неэмоциональной или бесчувственной',
      'Меня считают эмоционально зажатым/ой и напряженным/ой',
    ],
  },
  {
    key: 'unrelenting_standards',
    name: 'Жёсткие стандарты',
    domain: 'Повышенная бдительность',
    description: 'Внутренний голос, который постоянно требует «лучше, быстрее, идеальнее». Никакой результат не воспринимается как достаточный.',
    questions: [
      'Я должен/должна быть лучшим/ей во всём, что я делаю, и не могу быть хуже других',
      'Я стараюсь делать всё как можно лучше и не приемлю, когда говорят «…и так уже достаточно хорошо…»',
      'Я должен/должна выполнять все свои обязательства',
      'Я постоянно испытываю давление от того, что нужно что-то сделать или чего-то достичь',
      'Мне трудно снять с себя ответственность за что-либо или дать себе право на ошибку',
    ],
  },
  {
    key: 'entitlement',
    name: 'Привилегированность / Грандиозность',
    domain: 'Нарушение границ',
    description: 'Ощущение «мне можно больше». Сложно принимать правила, отказы, ограничения.',
    questions: [
      'Мне очень трудно принять «нет» в качестве ответа, если я чего-нибудь хочу от других людей',
      'Я особенный человек и не обязан/а подчиняться многим ограничениям, установленным для других людей',
      'Я терпеть не могу, когда меня ограничивают или не дают делать то, что я хочу',
      'Считаю, что я не должен/на следовать общепринятым правилам и договоренностям, как это делают другие люди',
      'То, что я предлагаю и делаю, является более ценным, чем вклад других людей',
    ],
  },
  {
    key: 'insufficient_control',
    name: 'Недостаток самодисциплины',
    domain: 'Нарушение границ',
    description: 'Сложно доводить дела до конца, выдерживать дискомфорт, откладывать удовольствие. Импульсивность.',
    questions: [
      'Я не могу заставить себя выполнять рутинные или скучные задания',
      'Если мне не удается достичь цели, я легко отчаиваюсь и сдаюсь',
      'Мне очень трудно отказывать себе в удовлетворении сиюминутных желаний ради достижения отдаленной цели',
      'Я не могу заставить себя делать то, что мне не нравится, даже если я знаю, что это нужно для моего же блага',
      'Мне редко удаётся сдерживать обещания, которые я даю самому/самой себе',
    ],
  },
  {
    key: 'negativity',
    name: 'Негативизм / Пессимизм',
    domain: 'Повышенная бдительность',
    description: 'Фокус на плохом. Из любой ситуации мозг достаёт, что может пойти не так.',
    questions: [
      'Даже когда дела идут хорошо, у меня такое ощущение, что это ненадолго',
      'Когда случается что-то хорошее, я жду, что должно случиться что-то плохое',
      'Невозможно всё предусмотреть – что-нибудь обязательно пойдёт не так',
      'Независимо от того, насколько усердно я работаю, меня беспокоит, что я могу лишиться денежных средств и остаться ни с чем',
      'Я боюсь, что любое неправильное решение может привести к катастрофе',
    ],
  },
  {
    key: 'subjugation',
    name: 'Покорность',
    domain: 'Ориентация на других',
    description: 'Привычка ставить чужие потребности выше своих. Чтобы избежать конфликта, наказания или вины.',
    questions: [
      'Я думаю, что если я буду делать только то, что мне хочется, это непременно приведет к неприятностям',
      'Я чувствую, что я должен/должна уступать желаниям других людей, иначе они могут отвергнуть меня или как-то отомстить',
      'В отношениях с другими людьми я легко соглашаюсь быть на вторых ролях',
      'Так как решения за меня всегда принимали другие, то теперь я сам/а не знаю, чего хочу на самом деле',
      'Мне очень трудно требовать от других, чтобы они уважали мои права и считались с моими чувствами',
    ],
  },
  {
    key: 'punitiveness',
    name: 'Пунитивность / Карательность',
    domain: 'Повышенная бдительность',
    description: 'Жёсткая внутренняя реакция на ошибки — свои и чужие. Сложно прощать, в том числе себя.',
    questions: [
      'Если я допущу ошибку, то я должен/должна быть наказан/а',
      'Если я не буду стараться изо всех сил, то у меня обязательно будут неприятности',
      'Если я не сделаю какую-либо работу как следует, то должен/должна буду отвечать за последствия',
      'Не имеет значения, почему я сделал/а ошибку – если я сделаю что-то не так, то мне придётся за это расплачиваться',
      'Я плохой человек, который заслуживает наказания',
    ],
  },
];

// Восстанавливаем оригинальный порядок YSQ-S3:
// первые 13 схем идут "интерливингом" (по одному вопросу из каждой по очереди), 5 кругов = 65 вопросов
// оставшиеся 5 схем идут блоками по 5 подряд = 25 вопросов
// итого 90 вопросов в правильном порядке опросника
const allQuestions = (() => {
  const result: { schemaKey: string; question: string; index: number }[] = [];
  const firstBlock = schemas.slice(0, 13);
  for (let round = 0; round < 5; round++) {
    for (const s of firstBlock) {
      result.push({ schemaKey: s.key, question: s.questions[round], index: round });
    }
  }
  const secondBlock = schemas.slice(13);
  for (const s of secondBlock) {
    s.questions.forEach((q, qi) => {
      result.push({ schemaKey: s.key, question: q, index: qi });
    });
  }
  return result;
})();

const scaleLabels = [
  'Совершенно не про меня',
  'В основном не про меня',
  'Скорее не про меня, чем про меня',
  'Скорее про меня, чем не про меня',
  'В основном про меня',
  'Точно про меня',
];

function classify(avg: number): { level: 'low' | 'medium' | 'high'; label: string; color: string } {
  if (avg < 2.5) return { level: 'low', label: 'низкая выраженность', color: C.moss };
  if (avg < 4) return { level: 'medium', label: 'средняя выраженность', color: C.ochre };
  return { level: 'high', label: 'высокая выраженность', color: C.terracotta };
}

export default function SchemaTest() {
  const [step, setStep] = useState<'intro' | 'test' | 'result'>('intro');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const totalQuestions = allQuestions.length;
  const progress = ((current + (transitioning ? 1 : 0)) / totalQuestions) * 100;

  const currentKey = `${allQuestions[current]?.schemaKey}_${allQuestions[current]?.index}`;
  const currentAnswer = answers[currentKey];

  const handleAnswer = (value: number) => {
    const key = `${allQuestions[current].schemaKey}_${allQuestions[current].index}`;
    setAnswers({ ...answers, [key]: value });
    setTransitioning(true);
    setTimeout(() => {
      if (current < totalQuestions - 1) {
        setCurrent(current + 1);
        setTransitioning(false);
      } else {
        setStep('result');
        setTransitioning(false);
      }
    }, 300);
  };

  const goBack = () => {
    if (current > 0) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrent(current - 1);
        setTransitioning(false);
      }, 200);
    }
  };

  const results = schemas
    .map((s) => {
      const values = s.questions.map((_, qi) => answers[`${s.key}_${qi}`] || 0);
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      return { ...s, avg, classification: classify(avg) };
    })
    .sort((a, b) => b.avg - a.avg);

  return (
    <div style={{ ...serif, backgroundColor: C.bg, color: C.ink }} className="min-h-screen">
      <Nav active="/tools" />

      {step === 'intro' && (
        <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 md:pt-28">
          <Reveal>
            <Eyebrow>Тест · 15–20 минут</Eyebrow>
            <h1 className="text-4xl md:text-5xl leading-[1.1] tracking-tight font-normal mb-8">
              Тест на ранние дезадаптивные схемы
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-lg leading-relaxed mb-6" style={{ color: C.inkSoft }}>
              «Схемы» — это устойчивые убеждения о себе и мире, которые сложились в детстве. Большинство из них болезненные: «меня бросят», «со мной что-то не так», «нужно всё контролировать». Они работают автоматически, и человек обычно их не замечает — пока не начинает замечать, что снова и снова попадает в одни и те же ситуации.
            </p>
            <p className="text-lg leading-relaxed mb-6" style={{ color: C.inkSoft }}>
              Это полный опросник Янга YSQ-S3 (90 пунктов) в официальной русской адаптации. Он покажет, какие из 18 схем у вас сейчас наиболее активны.
            </p>
            <p className="text-base leading-relaxed mb-10" style={{ color: C.inkSoft }}>
              Отвечайте быстро, без долгих раздумий — первой реакцией. Тест ничего не сохраняет на сервере, всё происходит у вас в браузере. Если уйдёте со страницы, результаты обнулятся.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="border-l-2 pl-6 py-2 mb-10" style={{ borderColor: C.terracotta }}>
              <p className="text-sm leading-relaxed mb-3" style={{ color: C.inkSoft }}>
                <strong style={{ color: C.ink }}>Важно.</strong> Это не диагностика и не лечение. Результат — это пища для размышления и материал для работы со специалистом, а не приговор.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>
                Используется официальная адаптация YSQ-S3 (Касьяник П. М., Романова Е. В. и др.). Инструмент скрининговый.
              </p>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <button
              onClick={() => setStep('test')}
              className="px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
              style={{ ...sans, backgroundColor: C.ink, color: C.bg }}
            >
              Начать тест →
            </button>
          </Reveal>
        </section>
      )}

      {step === 'test' && (
        <section className="max-w-3xl mx-auto px-6 pt-20 pb-32 md:pt-28">
          <div className="mb-12">
            <div className="flex justify-between items-baseline mb-3">
              <p className="text-sm" style={{ ...sans, color: C.inkSoft }}>
                Вопрос {current + 1} из {totalQuestions}
              </p>
              <p className="text-sm" style={{ ...sans, color: C.terracotta }}>
                {Math.round(progress)}%
              </p>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: C.surface }}>
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%`, backgroundColor: C.terracotta }}
              />
            </div>
          </div>

          <div
            style={{
              opacity: transitioning ? 0 : 1,
              transform: transitioning ? 'translateY(8px)' : 'translateY(0)',
              transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
            }}
          >
            <p className="text-xs tracking-widest uppercase mb-6" style={{ ...sans, color: C.terracotta }}>
              Насколько это про вас
            </p>
            <h2 className="text-2xl md:text-3xl leading-snug mb-12">
              «{allQuestions[current].question}»
            </h2>

            <div className="space-y-3">
              {scaleLabels.map((label, i) => {
                const value = i + 1;
                const active = currentAnswer === value;
                return (
                  <button
                    key={value}
                    onClick={() => handleAnswer(value)}
                    className="w-full text-left p-5 rounded-sm transition-all duration-200 hover:translate-x-1 group"
                    style={{
                      backgroundColor: active ? C.surfaceWarm : C.surface,
                      boxShadow: active ? '0 4px 16px rgba(31, 27, 22, 0.08)' : 'none',
                    }}
                  >
                    <div className="flex items-center gap-5">
                      <span
                        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors"
                        style={{
                          ...sans,
                          backgroundColor: active ? C.terracotta : 'transparent',
                          color: active ? C.bg : C.terracotta,
                          border: `1px solid ${C.terracotta}`,
                        }}
                      >
                        {value}
                      </span>
                      <span className="text-base flex-1" style={{ color: C.ink }}>
                        {label}
                      </span>
                      <span
                        className="text-lg shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                        style={{ color: active ? C.terracotta : C.inkSoft }}
                      >
                        →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 flex justify-between items-center">
              {current > 0 ? (
                <button
                  onClick={goBack}
                  className="text-sm underline underline-offset-4 transition-opacity hover:opacity-60"
                  style={{ ...sans, color: C.inkSoft }}
                >
                  ← Предыдущий вопрос
                </button>
              ) : (
                <div />
              )}
              <p className="text-xs" style={{ ...sans, color: C.inkSoft }}>
                Шкала от 1 (совсем нет) до 6 (полностью да)
              </p>
            </div>
          </div>
        </section>
      )}

      {step === 'result' && (
        <>
          <section className="max-w-4xl mx-auto px-6 pt-20 pb-12 md:pt-28">
            <Reveal>
              <Eyebrow>Ваш результат</Eyebrow>
              <h1 className="text-4xl md:text-5xl leading-[1.1] tracking-tight font-normal mb-6">
                Вот как у вас сейчас распределены 18 схем
              </h1>
              <p className="text-base leading-relaxed mb-4" style={{ color: C.inkSoft }}>
                Схемы упорядочены от самых выраженных к наименее. Высокая выраженность не значит «диагноз» — это значит, что эта тема в вашей жизни сейчас активна, и её можно разбирать.
              </p>
              <p className="text-base leading-relaxed" style={{ color: C.inkSoft }}>
                Запишите или сфотографируйте результат, если хотите его сохранить — при перезагрузке страницы он исчезнет.
              </p>
            </Reveal>
          </section>

          <section className="max-w-4xl mx-auto px-6 py-8">
            <div className="space-y-4">
              {results.map((r, i) => (
  <Reveal key={r.key} delay={i * 40}>
    <Link
      href={`/tools/schemas-needs#${r.key}`}
      className="block p-6 rounded-sm transition-all duration-300 hover:-translate-y-1 group"
      style={{ backgroundColor: C.surface }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
        <div className="flex-1">
          <p className="text-xs tracking-widest uppercase mb-2" style={{ ...sans, color: C.inkSoft }}>
            {r.domain}
          </p>
          <h3 className="text-xl">{r.name}</h3>
        </div>
        <div className="shrink-0 md:text-right">
          <p className="text-2xl" style={{ color: r.classification.color }}>
            {r.avg.toFixed(1)}
          </p>
          <p className="text-xs" style={{ ...sans, color: r.classification.color }}>
            {r.classification.label}
          </p>
        </div>
      </div>
      <div className="h-1.5 rounded-full mb-4 overflow-hidden" style={{ backgroundColor: C.bg }}>
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${(r.avg / 6) * 100}%`, backgroundColor: r.classification.color }}
        />
      </div>
      <p className="text-[15px] leading-relaxed mb-3" style={{ color: C.inkSoft }}>
        {r.description}
      </p>
      <span
        className="text-sm transition-transform duration-300 group-hover:translate-x-1 inline-block"
        style={{ ...sans, color: C.ink }}
      >
        Подробнее о схеме →
      </span>
    </Link>
  </Reveal>
))}
            </div>
          </section>

          <section className="max-w-4xl mx-auto px-6 pt-8 pb-16">
            <Reveal>
              <div className="p-8 rounded-sm border-l-2" style={{ backgroundColor: C.surface, borderColor: C.terracotta }}>
                <p className="text-sm tracking-widest uppercase mb-3" style={{ ...sans, color: C.terracotta }}>
                  Как читать результат
                </p>
                <div className="space-y-3 text-[15px] leading-relaxed" style={{ color: C.inkSoft }}>
                  <p><strong style={{ color: C.ink }}>1.0–2.4 — низкая выраженность:</strong> схема в этой области сейчас не активна.</p>
                  <p><strong style={{ color: C.ink }}>2.5–3.9 — средняя выраженность:</strong> схема присутствует, проявляется в определённых ситуациях.</p>
                  <p><strong style={{ color: C.ink }}>4.0–6.0 — высокая выраженность:</strong> схема активна и, вероятно, влияет на жизнь регулярно. Хороший повод разобрать её в работе со специалистом.</p>
                </div>
              </div>
            </Reveal>
          </section>

          <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
            <Reveal>
              <div className="rounded-sm p-12 md:p-20 text-center" style={{ backgroundColor: C.ink, color: C.bg }}>
                <h2 className="text-3xl md:text-4xl leading-tight font-normal mb-8 max-w-3xl mx-auto">
                  Что дальше?
                </h2>
                <p className="text-lg leading-relaxed max-w-xl mx-auto mb-10" style={{ color: '#C9C2B5' }}>
                  Если в результатах есть схемы с высокой выраженностью, и они вам узнаваемы — это хорошая точка входа в работу. На первой сессии мы можем разобрать ваш результат и решить, как двигаться.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/book"
                    className="inline-block px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl"
                    style={{ ...sans, backgroundColor: C.ochre, color: C.ink }}
                  >
                    Записаться на сессию
                  </Link>
                  <Link
                    href="/approaches"
                    className="inline-block px-8 py-4 rounded-full text-base border transition-all duration-300 hover:opacity-80"
                    style={{ ...sans, borderColor: C.bg, color: C.bg }}
                  >
                    Прочитать про схема-терапию
                  </Link>
                </div>
                <p className="text-sm mt-8" style={{ ...sans, color: '#C9C2B5' }}>
                  Онлайн · 50 минут · 3 500 ₽
                </p>
              </div>
            </Reveal>
          </section>

          <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
            <button
              onClick={() => {
                setAnswers({});
                setCurrent(0);
                setStep('intro');
              }}
              className="text-sm underline underline-offset-4 transition-opacity hover:opacity-60"
              style={{ ...sans, color: C.inkSoft }}
            >
              Пройти тест ещё раз
            </button>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}