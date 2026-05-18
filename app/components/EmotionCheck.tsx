'use client';

import { useState } from 'react';
import { C, serif, sans } from '@/app/lib/theme';

type Emotion = {
  key: string;
  label: string;
  description: string;
  cbtNote: string;
};

const emotions: Emotion[] = [
  {
    key: 'anxiety',
    label: 'Тревога',
    description: 'Внутреннее напряжение, ожидание плохого, прокручивание сценариев.',
    cbtNote: 'Тревога часто работает через катастрофизацию — мозг автоматически достраивает худший вариант. КПТ учит замечать эти автоматические мысли и проверять их: насколько вероятно то, что я представляю? Что было бы, если бы было правдой? Это не «успокоиться», а вернуть себе способность думать ясно.',
  },
  {
    key: 'sadness',
    label: 'Грусть',
    description: 'Тяжесть, пустота, нежелание делать обычные вещи.',
    cbtNote: 'Грусть часто сопровождается мыслью «так всегда будет» и сужением активности — человек перестаёт делать то, что раньше радовало, и от этого становится только тяжелее. В КПТ есть техника поведенческой активации: маленькие шаги в сторону того, что когда-то имело смысл, помогают вернуть энергию раньше, чем уйдёт сама грусть.',
  },
  {
    key: 'anger',
    label: 'Злость',
    description: 'Раздражение, желание ответить резко, накопленное напряжение.',
    cbtNote: 'Злость — это сигнал. Обычно за ней стоит нарушенная граница, обманутое ожидание, или несправедливость. В терапии мы не «избавляемся от злости», а учимся её слышать: о чём она? что вы пытаетесь защитить? как сказать об этом так, чтобы вас услышали?',
  },
  {
    key: 'shame',
    label: 'Стыд',
    description: 'Желание спрятаться, ощущение «со мной что-то не так».',
    cbtNote: 'Стыд отличается от вины: вина — «я сделал плохое», стыд — «я сам плохой». Стыд держится на убеждении, что если вас увидят настоящим, вас отвергнут. В терапии мы аккуратно проверяем это убеждение и работаем с самокритичным внутренним голосом, который часто принадлежит не вам, а тому, кто когда-то так с вами говорил.',
  },
  {
    key: 'apathy',
    label: 'Апатия',
    description: 'Ничего не хочется. Ни плохо, ни хорошо. Просто никак.',
    cbtNote: 'Апатия — не лень и не слабость. Это часто реакция на длительный стресс или выгорание: психика отключает «хотелки», чтобы не тратить ресурс. Здесь не работает «возьми себя в руки» — работает разбор, что именно вас истощило, и постепенное возвращение к маленьким, не требовательным действиям.',
  },
  {
    key: 'confusion',
    label: 'Замешательство',
    description: 'Не понимаю, что я чувствую и почему. Внутри туман.',
    cbtNote: 'Замешательство — это нормальное состояние, когда внутри одновременно несколько чувств, и они противоречат друг другу. В терапии первый шаг — просто их назвать. Не «всё сразу плохо», а «здесь злость, здесь страх, здесь обида». Когда чувства называются, они перестают давить как один большой комок.',
  },
];

export default function EmotionCheck() {
  const [selected, setSelected] = useState<Emotion | null>(null);

  return (
    <div className="grid md:grid-cols-12 gap-12 items-start">
      <div className="md:col-span-5">
        <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ ...sans, color: C.terracotta }}>
          Маленький эксперимент
        </p>
        <h2 className="text-3xl md:text-4xl leading-tight font-normal mb-6" style={serif}>
          Что вы чувствуете прямо сейчас?
        </h2>
        <p className="text-base leading-relaxed mb-6" style={{ color: C.inkSoft }}>
          Выберите эмоцию, которая ближе всего к вашему сейчас. В ответ покажу, как с ней обходится КПТ — не для того, чтобы лечить через интернет, а чтобы вы увидели, как примерно устроена работа.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>
          Можно выбирать несколько раз. Это не тест, никаких баллов.
        </p>
      </div>

      <div className="md:col-span-7">
        <div className="flex flex-wrap gap-2 mb-6">
          {emotions.map((e) => {
            const active = selected?.key === e.key;
            return (
              <button
                key={e.key}
                onClick={() => setSelected(e)}
                className="px-5 py-2.5 rounded-full text-[15px] border transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  borderColor: active ? C.terracotta : C.line,
                  backgroundColor: active ? C.terracotta : C.bg,
                  color: active ? C.bg : C.ink,
                  ...sans,
                }}
              >
                {e.label}
              </button>
            );
          })}
        </div>

        <div
          className="rounded-sm p-8 transition-all duration-500"
          style={{
            backgroundColor: C.surface,
            opacity: selected ? 1 : 0.5,
            transform: selected ? 'translateY(0)' : 'translateY(8px)',
            minHeight: 220,
          }}
        >
          {selected ? (
            <div>
              <p className="text-xs tracking-widest uppercase mb-3" style={{ ...sans, color: C.terracotta }}>
                {selected.label}
              </p>
              <p className="text-base leading-relaxed mb-5" style={{ color: C.ink, fontStyle: 'italic' }}>
                {selected.description}
              </p>
              <p className="text-[15px] leading-relaxed" style={{ color: C.inkSoft }}>
                {selected.cbtNote}
              </p>
            </div>
          ) : (
            <p className="text-base" style={{ color: C.inkSoft }}>
              Выберите эмоцию слева, чтобы появился короткий разбор.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}