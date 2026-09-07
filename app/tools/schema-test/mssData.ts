export type SchemaKey =
  | 'abandonment'
  | 'emotional_deprivation'
  | 'mistrust'
  | 'social_isolation'
  | 'defectiveness'
  | 'vulnerability'
  | 'dependence'
  | 'failure'
  | 'low_self_efficacy'
  | 'enmeshment'
  | 'subjugation'
  | 'self_sacrifice'
  | 'approval_seeking'
  | 'emotional_inhibition'
  | 'negativity'
  | 'unrelenting_standards'
  | 'punitiveness_self'
  | 'punitiveness_others'
  | 'entitlement';

export type MssQuestion = {
  id: number;
  text: string;
  schemaKey: SchemaKey;
  reverse?: boolean;
};

export type MssSchema = {
  key: SchemaKey;
  name: string;
  nameEn: string;
  itemIds: number[];
};

export type NeedKey =
  | 'attachment'
  | 'autonomy'
  | 'expression'
  | 'spontaneity'
  | 'limits';

export type NeedGroup = {
  key: NeedKey;
  name: string;
  itemIds: number[];
};

export const ANSWER_OPTIONS = [
  { value: 0, label: 'Совсем не согласен(на)' },
  { value: 1, label: 'Не согласен(на)' },
  { value: 2, label: 'Нейтрально' },
  { value: 3, label: 'Согласен(на)' },
  { value: 4, label: 'Полностью согласен(на)' },
] as const;

export const SCHEMAS: MssSchema[] = [
  {
    key: 'abandonment',
    name: 'Покинутость / тревожная привязанность',
    nameEn: 'Abandonment / Anxious Attachment',
    itemIds: [1, 2, 3, 4],
  },
  {
    key: 'emotional_deprivation',
    name: 'Эмоциональная депривация',
    nameEn: 'Emotional Deprivation',
    itemIds: [5, 6, 7, 8],
  },
  {
    key: 'mistrust',
    name: 'Недоверие',
    nameEn: 'Mistrust of Others',
    itemIds: [9, 10, 11, 12],
  },
  {
    key: 'social_isolation',
    name: 'Социальная изоляция / ощущение себя чужим',
    nameEn: 'Social Isolation / Outsider',
    itemIds: [13, 14, 15, 16],
  },
  {
    key: 'defectiveness',
    name: 'Дефективность / стыд',
    nameEn: 'Defectiveness / Shame',
    itemIds: [17, 18, 19, 20],
  },
  {
    key: 'vulnerability',
    name: 'Уязвимость перед опасным миром',
    nameEn: 'Vulnerability to Dangerous World',
    itemIds: [21, 22, 23, 24],
  },
  {
    key: 'dependence',
    name: 'Зависимость',
    nameEn: 'Dependence',
    itemIds: [25, 26, 27, 28],
  },
  {
    key: 'failure',
    name: 'Неуспех / ощущение несостоятельности',
    nameEn: 'Failure / Achievement Inferiority',
    itemIds: [29, 30, 31, 32],
  },
  {
    key: 'low_self_efficacy',
    name: 'Низкая самоэффективность / ощущение слабости',
    nameEn: 'Low Self-Efficacy / Weakness',
    itemIds: [33, 34, 35, 36],
  },
  {
    key: 'enmeshment',
    name: 'Слияние / размытые границы',
    nameEn: 'Enmeshment / Diffuse Boundaries',
    itemIds: [37, 38, 39, 40],
  },
  {
    key: 'subjugation',
    name: 'Подчинение',
    nameEn: 'Subjugation / Submission to Others',
    itemIds: [41, 42, 43, 44],
  },
  {
    key: 'self_sacrifice',
    name: 'Самопожертвование',
    nameEn: 'Self-Sacrifice',
    itemIds: [45, 46, 47, 48],
  },
  {
    key: 'approval_seeking',
    name: 'Поиск одобрения / потребность нравиться',
    nameEn: 'Approval-Seeking / Excessive Need to be Liked',
    itemIds: [49, 50, 51, 52],
  },
  {
    key: 'emotional_inhibition',
    name: 'Подавление эмоций',
    nameEn: 'Emotional Inhibition',
    itemIds: [53, 54, 55, 56],
  },
  {
    key: 'negativity',
    name: 'Пессимизм / негативизм',
    nameEn: 'Pessimism / Negativity',
    itemIds: [57, 58, 59, 60],
  },
  {
    key: 'unrelenting_standards',
    name: 'Завышенные стандарты',
    nameEn: 'Unrelenting Standards',
    itemIds: [61, 62, 63, 64],
  },
  {
    key: 'punitiveness_self',
    name: 'Пунитивность к себе',
    nameEn: 'Punitiveness / Unforgiving of Self',
    itemIds: [65, 66, 67, 68],
  },
  {
    key: 'punitiveness_others',
    name: 'Пунитивность к другим',
    nameEn: 'Punitiveness / Unforgiving of Others',
    itemIds: [69, 70, 71, 72],
  },
  {
    key: 'entitlement',
    name: 'Особые права / исключительность',
    nameEn: 'Entitlement / Specialness',
    itemIds: [73, 74, 75, 76],
  }
];

export const NEED_GROUPS: NeedGroup[] = [
  {
    key: 'attachment',
    name: 'Безопасность и привязанность',
    itemIds: Array.from({ length: 24 }, (_, i) => i + 1),
  },
  {
    key: 'autonomy',
    name: 'Автономия, компетентность и идентичность',
    itemIds: Array.from({ length: 16 }, (_, i) => i + 25),
  },
  {
    key: 'expression',
    name: 'Свобода выражать потребности, мнения и эмоции',
    itemIds: Array.from({ length: 16 }, (_, i) => i + 41),
  },
  {
    key: 'spontaneity',
    name: 'Спонтанность и игра',
    itemIds: Array.from({ length: 16 }, (_, i) => i + 57),
  },
  {
    key: 'limits',
    name: 'Реалистичные и последовательные границы',
    itemIds: Array.from({ length: 4 }, (_, i) => i + 73),
  },
];

export const QUESTIONS: MssQuestion[] = [
  {
    id: 1,
    schemaKey: 'abandonment',
    text: 'Я боюсь, что важные для меня отношения могут неожиданно закончиться',
  },
  {
    id: 2,
    schemaKey: 'abandonment',
    text: 'Я беспокоюсь, что люди, которых я люблю, не смогут быть рядом со мной по-настоящему и надолго',
  },
  {
    id: 3,
    schemaKey: 'abandonment',
    text: 'Я уверен(а), что могу рассчитывать на других людей, когда мне понадобится поддержка',
    reverse: true,
  },
  {
    id: 4,
    schemaKey: 'abandonment',
    text: 'Я боюсь потерять людей, на которых рассчитываю',
  },

  {
    id: 5,
    schemaKey: 'emotional_deprivation',
    text: 'В моей жизни есть люди, к которым я могу обратиться за советом и эмоциональной поддержкой',
    reverse: true,
  },
  {
    id: 6,
    schemaKey: 'emotional_deprivation',
    text: 'Если я окажусь в серьезной беде, я не буду знать, кому позвонить',
  },
  {
    id: 7,
    schemaKey: 'emotional_deprivation',
    text: 'Другим людям нет дела до моих эмоциональных потребностей',
  },
  {
    id: 8,
    schemaKey: 'emotional_deprivation',
    text: 'Я не чувствую поддержки со стороны других, поэтому не стал(а) бы делиться с ними своими чувствами',
  },

  {
    id: 9,
    schemaKey: 'mistrust',
    text: 'Люди обычно скрывают свои настоящие намерения',
  },
  {
    id: 10,
    schemaKey: 'mistrust',
    text: 'Я не доверяю людям',
  },
  {
    id: 11,
    schemaKey: 'mistrust',
    text: 'Я не склонен(на) верить людям просто на слово',
  },
  {
    id: 12,
    schemaKey: 'mistrust',
    text: 'Обычно люди говорят правду',
    reverse: true,
  },

  {
    id: 13,
    schemaKey: 'social_isolation',
    text: 'По своей сути я сильно отличаюсь от других людей',
  },
  {
    id: 14,
    schemaKey: 'social_isolation',
    text: 'Мне не встречались люди, которые думают так же, как я',
  },
  {
    id: 15,
    schemaKey: 'social_isolation',
    text: 'Обычно другие люди принимают меня',
    reverse: true,
  },
  {
    id: 16,
    schemaKey: 'social_isolation',
    text: 'Я чувствую себя чужим(ой) среди других людей',
  },

  {
    id: 17,
    schemaKey: 'defectiveness',
    text: 'Если бы люди узнали меня по-настоящему, я бы им не понравился(ась)',
  },
  {
    id: 18,
    schemaKey: 'defectiveness',
    text: 'Мне кажется, что со мной по сути что-то не так',
  },
  {
    id: 19,
    schemaKey: 'defectiveness',
    text: 'Из-за моих недостатков меня невозможно по-настоящему любить',
  },
  {
    id: 20,
    schemaKey: 'defectiveness',
    text: 'У меня есть причины стыдиться себя и своего характера',
  },

  {
    id: 21,
    schemaKey: 'vulnerability',
    text: 'Мне страшно далеко уходить от привычного и знакомого, потому что вокруг происходит слишком много плохого',
  },
  {
    id: 22,
    schemaKey: 'vulnerability',
    text: 'В целом мир для меня безопасен',
    reverse: true,
  },
  {
    id: 23,
    schemaKey: 'vulnerability',
    text: 'Мир опасен и суров, и я боюсь, что все может обернуться катастрофой',
  },
  {
    id: 24,
    schemaKey: 'vulnerability',
    text: 'Я воспринимаю мир как опасное место, где мне могут причинить вред',
  },

  {
    id: 25,
    schemaKey: 'dependence',
    text: 'Я не могу самостоятельно позаботиться о себе, поэтому мне нужно, чтобы обо мне заботились другие',
  },
  {
    id: 26,
    schemaKey: 'dependence',
    text: 'Мне кажется, что без помощи других я не справляюсь с повседневными делами',
  },
  {
    id: 27,
    schemaKey: 'dependence',
    text: 'Я часто тревожусь, когда нужно принять решение самостоятельно, и предпочитаю, чтобы это сделал кто-то другой',
  },
  {
    id: 28,
    schemaKey: 'dependence',
    text: 'Я уверенно принимаю решения самостоятельно',
    reverse: true,
  },

  {
    id: 29,
    schemaKey: 'failure',
    text: 'Если задача сложная, я, скорее всего, не смогу с ней справиться',
  },
  {
    id: 30,
    schemaKey: 'failure',
    text: 'Мне редко удается самостоятельно находить решения своих проблем',
  },
  {
    id: 31,
    schemaKey: 'failure',
    text: 'Что бы ни произошло, я уверен(а), что смогу с этим справиться',
    reverse: true,
  },
  {
    id: 32,
    schemaKey: 'failure',
    text: 'Большинство проблем кажутся мне слишком сложными, чтобы справиться с ними самостоятельно',
  },

  {
    id: 33,
    schemaKey: 'low_self_efficacy',
    text: 'Большинство других людей добились большего, чем я',
  },
  {
    id: 34,
    schemaKey: 'low_self_efficacy',
    text: 'Я горжусь своими достижениями',
    reverse: true,
  },
  {
    id: 35,
    schemaKey: 'low_self_efficacy',
    text: 'Когда я думаю о достижениях других людей, я чувствую себя менее успешным(ой), чем они',
  },
  {
    id: 36,
    schemaKey: 'low_self_efficacy',
    text: 'Я сравниваю свои достижения с достижениями других людей и чувствую, что менее успешен(на)',
  },

  {
    id: 37,
    schemaKey: 'enmeshment',
    text: 'Я чувствую себя ответственным(ой) за эмоции самого близкого мне человека',
  },
  {
    id: 38,
    schemaKey: 'enmeshment',
    text: 'В близких отношениях мне трудно понять, где заканчиваются мои потребности и эмоции и начинаются потребности и эмоции другого человека',
  },
  {
    id: 39,
    schemaKey: 'enmeshment',
    text: 'Я бываю настолько близок(ка) с кем-то, что кажется, будто мы слились в одно целое',
  },
  {
    id: 40,
    schemaKey: 'enmeshment',
    text: 'Потребности самого близкого мне человека полностью меня поглощают',
  },

  {
    id: 41,
    schemaKey: 'subjugation',
    text: 'Другие люди лучше меня знают, как правильно поступать',
  },
  {
    id: 42,
    schemaKey: 'subjugation',
    text: 'Я должен(на) всегда делать то, что мне говорят',
  },
  {
    id: 43,
    schemaKey: 'subjugation',
    text: 'Другие люди лучше меня понимают, что для меня хорошо',
  },
  {
    id: 44,
    schemaKey: 'subjugation',
    text: 'В отношениях мне кажется, что я должен(на) отдавать контроль другому человеку',
  },

  {
    id: 45,
    schemaKey: 'self_sacrifice',
    text: 'Я всегда ставлю других на первое место, независимо от того, что происходит со мной',
  },
  {
    id: 46,
    schemaKey: 'self_sacrifice',
    text: 'Я считаю своим долгом выслушивать проблемы других людей',
  },
  {
    id: 47,
    schemaKey: 'self_sacrifice',
    text: 'Мои потребности так же важны, как потребности других людей',
    reverse: true,
  },
  {
    id: 48,
    schemaKey: 'self_sacrifice',
    text: 'Сколько бы я ни делал(а) для других, мне все равно кажется, что этого недостаточно',
  },

  {
    id: 49,
    schemaKey: 'approval_seeking',
    text: 'Для меня часто важнее получить одобрение других, чем поступить в соответствии со своими желаниями',
  },
  {
    id: 50,
    schemaKey: 'approval_seeking',
    text: 'Мне важно нравиться людям, поэтому я склонен(на) соглашаться с ними, даже когда знаю, что они неправы',
  },
  {
    id: 51,
    schemaKey: 'approval_seeking',
    text: 'Даже если человек мне не нравится, мне все равно очень важно нравиться ему',
  },
  {
    id: 52,
    schemaKey: 'approval_seeking',
    text: 'Мне трудно принять решение, пока я не узнаю, что думают другие',
  },

  {
    id: 53,
    schemaKey: 'emotional_inhibition',
    text: 'Мне полезно прислушиваться к своим эмоциям',
    reverse: true,
  },
  {
    id: 54,
    schemaKey: 'emotional_inhibition',
    text: 'Мои эмоции приносят больше вреда, чем пользы',
  },
  {
    id: 55,
    schemaKey: 'emotional_inhibition',
    text: 'Эмоции бесполезны, поэтому мне нужно их игнорировать',
  },
  {
    id: 56,
    schemaKey: 'emotional_inhibition',
    text: 'Опасно испытывать слишком сильные эмоции',
  },

  {
    id: 57,
    schemaKey: 'negativity',
    text: 'Со мной почти всегда что-нибудь идет не так',
  },
  {
    id: 58,
    schemaKey: 'negativity',
    text: 'В неопределенных ситуациях я обычно ожидаю, что все сложится хорошо',
    reverse: true,
  },
  {
    id: 59,
    schemaKey: 'negativity',
    text: 'Мне кажется, что все неизбежно складывается не в мою пользу, поэтому я предпочитаю ожидать худшего, чтобы не разочаровываться',
  },
  {
    id: 60,
    schemaKey: 'negativity',
    text: 'Я пессимистично смотрю в будущее',
  },

  {
    id: 61,
    schemaKey: 'unrelenting_standards',
    text: 'Если я совершаю ошибку, мне легко перестать о ней думать и двигаться дальше',
    reverse: true,
  },
  {
    id: 62,
    schemaKey: 'unrelenting_standards',
    text: 'Для меня важнее соответствовать высоким стандартам, чем чувствовать себя счастливым(ой)',
  },
  {
    id: 63,
    schemaKey: 'unrelenting_standards',
    text: 'Я должен(на) всегда показывать исключительно высокий результат',
  },
  {
    id: 64,
    schemaKey: 'unrelenting_standards',
    text: 'Я считаю допустимым не всегда показывать высокий результат',
    reverse: true,
  },

  {
    id: 65,
    schemaKey: 'punitiveness_self',
    text: 'Когда я ошибаюсь, я стараюсь относиться к себе с пониманием и сочувствием',
    reverse: true,
  },
  {
    id: 66,
    schemaKey: 'punitiveness_self',
    text: 'Если я делаю что-то не так, это не должно сходить мне с рук',
  },
  {
    id: 67,
    schemaKey: 'punitiveness_self',
    text: 'Если я терплю неудачу, я должен(на) столкнуться с последствиями',
  },
  {
    id: 68,
    schemaKey: 'punitiveness_self',
    text: 'Даже за самую маленькую ошибку я заслуживаю наказания',
  },

  {
    id: 69,
    schemaKey: 'punitiveness_others',
    text: 'Когда другие ошибаются, я стараюсь относиться к ним с пониманием и сочувствием',
    reverse: true,
  },
  {
    id: 70,
    schemaKey: 'punitiveness_others',
    text: 'Люди должны отвечать за свои промахи',
  },
  {
    id: 71,
    schemaKey: 'punitiveness_others',
    text: 'Если человек терпит неудачу, он должен столкнуться с последствиями',
  },
  {
    id: 72,
    schemaKey: 'punitiveness_others',
    text: 'Люди заслуживают наказания за свои ошибки',
  },

  {
    id: 73,
    schemaKey: 'entitlement',
    text: 'Если я о чем-то прошу человека, он должен согласиться',
  },
  {
    id: 74,
    schemaKey: 'entitlement',
    text: 'Я считаю, что обычные правила, которым следуют другие, на меня не распространяются',
  },
  {
    id: 75,
    schemaKey: 'entitlement',
    text: 'Другие люди должны ценить мою уникальность',
  },
  {
    id: 76,
    schemaKey: 'entitlement',
    text: 'Я заслуживаю особых привилегий',
  },
];

export function scoredValue(question: MssQuestion, rawValue: number) {
  return question.reverse ? 4 - rawValue : rawValue;
}

export function answerLabel(value: number) {
  return ANSWER_OPTIONS.find((option) => option.value === value)?.label ?? 'Нет ответа';
}
