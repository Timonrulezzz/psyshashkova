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
  { id: 1, schemaKey: 'abandonment', text: 'Я боюсь, что важные для меня отношения могут неожиданно закончиться.' },
  { id: 2, schemaKey: 'abandonment', text: 'Я переживаю, что люди, которых я люблю, не смогут оставаться рядом со мной надежно и надолго.' },
  { id: 3, schemaKey: 'abandonment', text: 'Я уверен(а), что другие люди будут рядом, когда мне понадобится их поддержка.', reverse: true },
  { id: 4, schemaKey: 'abandonment', text: 'Я боюсь потерять людей, на которых полагаюсь.' },
  { id: 5, schemaKey: 'emotional_deprivation', text: 'В моей жизни есть люди, на которых я могу опереться за советом и эмоциональной поддержкой.', reverse: true },
  { id: 6, schemaKey: 'emotional_deprivation', text: 'Если у меня случатся серьезные неприятности, я не буду знать, кому позвонить.' },
  { id: 7, schemaKey: 'emotional_deprivation', text: 'Другим людям нет дела до моих эмоциональных потребностей.' },
  { id: 8, schemaKey: 'emotional_deprivation', text: 'Я не чувствую поддержки со стороны других, поэтому не стал(а) бы делиться с ними своими чувствами.' },
  { id: 9, schemaKey: 'mistrust', text: 'Люди обычно скрывают свои настоящие намерения.' },
  { id: 10, schemaKey: 'mistrust', text: 'Я не доверяю людям.' },
  { id: 11, schemaKey: 'mistrust', text: 'Мне трудно верить людям на слово.' },
  { id: 12, schemaKey: 'mistrust', text: 'Обычно люди говорят правду.', reverse: true },
  { id: 13, schemaKey: 'social_isolation', text: 'По своей сути я сильно отличаюсь от других людей.' },
  { id: 14, schemaKey: 'social_isolation', text: 'Я не встречал(а) людей, которые думают так же, как я.' },
  { id: 15, schemaKey: 'social_isolation', text: 'Обычно другие люди принимают меня.', reverse: true },
  { id: 16, schemaKey: 'social_isolation', text: 'Я чувствую себя чужим(ой).' },
  { id: 17, schemaKey: 'defectiveness', text: 'Если бы люди узнали меня настоящего(ую), я бы им не понравился(ась).' },
  { id: 18, schemaKey: 'defectiveness', text: 'В глубине души я чувствую, что со мной что-то фундаментально не так.' },
  { id: 19, schemaKey: 'defectiveness', text: 'Из-за моих недостатков меня невозможно по-настоящему любить.' },
  { id: 20, schemaKey: 'defectiveness', text: 'У меня есть причины стыдиться себя и своего характера.' },
  { id: 21, schemaKey: 'vulnerability', text: 'Мне страшно далеко выходить за пределы привычного, потому что вокруг происходит слишком много плохого.' },
  { id: 22, schemaKey: 'vulnerability', text: 'Мир в целом безопасен для меня.', reverse: true },
  { id: 23, schemaKey: 'vulnerability', text: 'Мир опасен и не прощает ошибок, и я боюсь, что все может обернуться катастрофой.' },
  { id: 24, schemaKey: 'vulnerability', text: 'Мир — опасное место, которое может причинить мне вред.' },
  { id: 25, schemaKey: 'dependence', text: 'Я не могу позаботиться о себе сам(а), поэтому мне нужно, чтобы обо мне заботились другие.' },
  { id: 26, schemaKey: 'dependence', text: 'Мне кажется, что я не справляюсь с повседневными делами без помощи других.' },
  { id: 27, schemaKey: 'dependence', text: 'Я часто сомневаюсь в собственных решениях и предпочитаю, чтобы кто-то другой решал за меня.' },
  { id: 28, schemaKey: 'dependence', text: 'Я уверенно принимаю решения самостоятельно.', reverse: true },
  { id: 29, schemaKey: 'failure', text: 'Если задача трудная, скорее всего, я с ней не справлюсь.' },
  { id: 30, schemaKey: 'failure', text: 'Мне редко удается самому(ой) находить решения своих проблем.' },
  { id: 31, schemaKey: 'failure', text: 'Я способен(на) справиться с тем, что бы ни произошло.', reverse: true },
  { id: 32, schemaKey: 'failure', text: 'Большинство проблем слишком сложны для меня.' },
  { id: 33, schemaKey: 'low_self_efficacy', text: 'Большинство людей добились большего, чем я.' },
  { id: 34, schemaKey: 'low_self_efficacy', text: 'Я горжусь своими достижениями.', reverse: true },
  { id: 35, schemaKey: 'low_self_efficacy', text: 'Когда я думаю о достижениях других людей, я чувствую себя хуже них.' },
  { id: 36, schemaKey: 'low_self_efficacy', text: 'Я сравниваю свои достижения с чужими и чувствую, что менее успешен(на).' },
  { id: 37, schemaKey: 'enmeshment', text: 'Я отвечаю за эмоции человека, с которым я наиболее близок(ка).' },
  { id: 38, schemaKey: 'enmeshment', text: 'В близких отношениях мне трудно понять, где заканчиваются мои потребности и чувства и начинаются потребности и чувства другого человека.' },
  { id: 39, schemaKey: 'enmeshment', text: 'Я настолько близок(ка) с кем-то, что порой кажется, будто мы слились в одно целое.' },
  { id: 40, schemaKey: 'enmeshment', text: 'Потребности самого близкого мне человека поглощают меня.' },
  { id: 41, schemaKey: 'subjugation', text: 'Другие люди лучше меня знают, как правильно.' },
  { id: 42, schemaKey: 'subjugation', text: 'Я должен(на) всегда делать то, что мне говорят.' },
  { id: 43, schemaKey: 'subjugation', text: 'Другие люди лучше знают, что для меня хорошо.' },
  { id: 44, schemaKey: 'subjugation', text: 'В отношениях мне кажется, что я должен(на) позволять другим брать контроль на себя.' },
  { id: 45, schemaKey: 'self_sacrifice', text: 'Я всегда ставлю других на первое место, независимо от того, что происходит со мной.' },
  { id: 46, schemaKey: 'self_sacrifice', text: 'Я считаю своим долгом выслушивать чужие проблемы.' },
  { id: 47, schemaKey: 'self_sacrifice', text: 'Мои потребности так же важны, как потребности других людей.', reverse: true },
  { id: 48, schemaKey: 'self_sacrifice', text: 'Сколько бы я ни делал(а) для других, мне кажется, что этого все равно недостаточно.' },
  { id: 49, schemaKey: 'approval_seeking', text: 'Одобрение других часто важнее для меня, чем мои собственные желания.' },
  { id: 50, schemaKey: 'approval_seeking', text: 'Мне важно нравиться людям, поэтому я склонен(на) соглашаться с ними, даже если знаю, что они фактически неправы.' },
  { id: 51, schemaKey: 'approval_seeking', text: 'Даже если человек мне не нравится, мне все равно очень хочется нравиться ему.' },
  { id: 52, schemaKey: 'approval_seeking', text: 'Мне трудно принять решение, пока я не узнаю, что думают другие.' },
  { id: 53, schemaKey: 'emotional_inhibition', text: 'Обращать внимание на свои эмоции полезно для меня.', reverse: true },
  { id: 54, schemaKey: 'emotional_inhibition', text: 'Мои эмоции приносят больше вреда, чем пользы.' },
  { id: 55, schemaKey: 'emotional_inhibition', text: 'Эмоции бесполезны, поэтому мне нужно их игнорировать.' },
  { id: 56, schemaKey: 'emotional_inhibition', text: 'Сильные эмоции опасны.' },
  { id: 57, schemaKey: 'negativity', text: 'У меня почти всегда все идет не так.' },
  { id: 58, schemaKey: 'negativity', text: 'В неопределенных ситуациях я обычно ожидаю хорошего.', reverse: true },
  { id: 59, schemaKey: 'negativity', text: 'Все равно все обычно складывается не в мою пользу, поэтому я предпочитаю ожидать худшего, чтобы не разочаровываться.' },
  { id: 60, schemaKey: 'negativity', text: 'Я пессимистично смотрю в будущее.' },
  { id: 61, schemaKey: 'unrelenting_standards', text: 'Если я совершаю ошибку, мне легко отпустить ее и двигаться дальше.', reverse: true },
  { id: 62, schemaKey: 'unrelenting_standards', text: 'Соответствовать высоким стандартам для меня важнее, чем чувствовать себя счастливым(ой).' },
  { id: 63, schemaKey: 'unrelenting_standards', text: 'Я должен(на) всегда показывать очень высокий результат.' },
  { id: 64, schemaKey: 'unrelenting_standards', text: 'Для меня допустимо не всегда показывать высокий результат.', reverse: true },
  { id: 65, schemaKey: 'punitiveness_self', text: 'Когда я ошибаюсь, я стараюсь относиться к себе с пониманием и сочувствием.', reverse: true },
  { id: 66, schemaKey: 'punitiveness_self', text: 'Если что-то пошло не так, я не должен(на) просто избежать последствий.' },
  { id: 67, schemaKey: 'punitiveness_self', text: 'Если я потерпел(а) неудачу, я должен(на) понести за нее последствия.' },
  { id: 68, schemaKey: 'punitiveness_self', text: 'Какой бы маленькой ни была моя ошибка, я заслуживаю наказания.' },
  { id: 69, schemaKey: 'punitiveness_others', text: 'Когда другие ошибаются, я стараюсь относиться к ним с пониманием и сочувствием.', reverse: true },
  { id: 70, schemaKey: 'punitiveness_others', text: 'Людей нужно привлекать к ответственности за их промахи.' },
  { id: 71, schemaKey: 'punitiveness_others', text: 'Если человек терпит неудачу, он должен столкнуться с последствиями.' },
  { id: 72, schemaKey: 'punitiveness_others', text: 'Люди заслуживают наказания за свои ошибки.' },
  { id: 73, schemaKey: 'entitlement', text: 'Когда я прошу человека о чем-то, он должен соглашаться.' },
  { id: 74, schemaKey: 'entitlement', text: 'Я считаю, что обычные правила, которым следуют другие, на меня не распространяются.' },
  { id: 75, schemaKey: 'entitlement', text: 'Другие должны ценить то, насколько я особенный(ая).' },
  { id: 76, schemaKey: 'entitlement', text: 'Я заслуживаю особых привилегий.' }
];

export function scoredValue(question: MssQuestion, rawValue: number) {
  return question.reverse ? 4 - rawValue : rawValue;
}

export function answerLabel(value: number) {
  return ANSWER_OPTIONS.find((option) => option.value === value)?.label ?? 'Нет ответа';
}
