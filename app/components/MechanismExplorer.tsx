import { C, radius, sans } from '@/app/lib/theme';

const mechanisms = [
  {
    number: '01',
    quote: 'Похоже, этот человек больше не хочет быть со мной',
    title: 'Страх отвержения',
    text:
      'На первый план может выходить страх потери отношений, дистанции или того, что другой человек перестал быть заинтересован. Тогда важно исследовать не только саму переписку, но и то, что происходит в моменты, когда близость становится менее определенной.',
  },
  {
    number: '02',
    quote: 'Наверное, дело во мне',
    title: 'Страх неодобрения',
    text:
      'Здесь значимой частью проблемы может быть привычка быстро искать причину чужой реакции в себе. Молчание другого человека превращается в сигнал: причина во мне, со мной что-то не так.',
  },
  {
    number: '03',
    quote: 'Я просто не могу сидеть и не знать, что происходит',
    title: 'Трудно выдерживать неопределенность',
    text:
      'Иногда тревогу запускает не столько возможный отказ, сколько отсутствие ответа как такового. Тогда появляются проверки, новые сообщения, попытки получить информацию или мысленно перебрать все возможные объяснения.',
  },
  {
    number: '04',
    quote: 'Не буду писать. Вдруг это выглядит навязчиво',
    title: 'Страх проявить заинтересованность',
    text:
      'За такой реакцией могут стоять жесткие представления о том, что проявить заинтересованность, значит оказаться слабее, зависимее или дать другому слишком много власти. Тогда защита от возможного отвержения сама начинает мешать близости.',
  },
  {
    number: '05',
    quote: 'Да и ладно. Мне вообще никто не нужен',
    title: 'Желание резко отдалиться',
    text:
      'Иногда после сильной тревоги психика быстро меняет стратегию: вместо желания близости появляется обесценивание отношений и желание отдалиться. Это действительно может уменьшить напряжение сейчас, но одновременно не дает разобраться с тем, что произошло.',
  },
] as const;

export default function MechanismExplorer() {
  return (
    <div>
      <div
  className="mb-4 px-6 py-4 md:px-7 md:py-4"
  style={{
    backgroundColor: C.ink,
    color: C.bg,
    borderRadius: radius.md,
  }}
>
  <p
    className="mb-1.5 text-[9px] uppercase tracking-[0.18em]"
    style={{
      ...sans,
      color: C.ochre,
    }}
  >
    Одна ситуация
  </p>

  <p className="text-[20px] leading-[1.25] md:text-[22px]">
    Близкий человек несколько часов не отвечает на сообщение
  </p>
</div>

<p
  className="mb-3 px-1 text-[12px] leading-relaxed"
  style={{
    ...sans,
    color: C.inkSoft,
  }}
>
  Нажмите на любой вариант — откроется короткое объяснение.
</p>

      <div className="grid gap-x-6 gap-y-2 md:grid-cols-2">
        {mechanisms.map((mechanism, index) => (
          <details
            key={mechanism.number}
            name="mechanism-example"
            className={
              index === mechanisms.length - 1
                ? 'group md:col-span-2'
                : 'group'
            }
          >
            <summary
              className="flex min-h-[82px] cursor-pointer list-none items-start gap-3 border-b px-2 py-4 transition-all duration-300"
              style={{
                borderColor: C.line,
              }}
            >
              <span
                className="shrink-0 pt-1 text-[10px]"
                style={{
                  ...sans,
                  color: C.terracotta,
                }}
              >
                {mechanism.number}
              </span>

              <div className="min-w-0 flex-1">
                <p className="pr-3 text-[16px] leading-[1.35] md:text-[17px]">
                  «{mechanism.quote}»
                </p>

                <p
                  className="mt-1 text-[12px]"
                  style={{
                    ...sans,
                    color: C.inkSoft,
                  }}
                >
                  {mechanism.title}
                </p>
              </div>

              <span
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-xl leading-none transition-transform duration-300 group-open:rotate-45"
                style={{
                  color: C.terracotta,
                }}
              >
                +
              </span>
            </summary>

            <div
              className="mx-2 border-l px-4 py-4 text-[13px] leading-[1.65]"
              style={{
                borderColor: C.terracotta,
                color: C.inkSoft,
              }}
            >
              {mechanism.text}
            </div>
          </details>
        ))}
      </div>

      <div className="mt-4 grid gap-3 pt-3 md:grid-cols-2 md:gap-8">
        
        <p className="text-[14px] leading-[1.65]">
  За похожими реакциями могут стоять разные страхи, ожидания
  и привычные способы защищаться.
</p>

<div
  className="flex gap-3"
  style={{
    color: C.berry,
  }}
>
  <span
    aria-hidden="true"
    className="mt-[0.55em] h-2 w-2 shrink-0 rounded-full"
    style={{
      backgroundColor: C.berry,
    }}
  />

  <p className="text-[14px] leading-[1.65]">
    Поэтому в работе мы не начинаем с универсального совета.
    Сначала разбираемся, что именно происходит у вас.
  </p>
</div>
      </div>
    </div>
  );
}