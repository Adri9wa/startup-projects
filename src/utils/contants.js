export const defaultEfficiencyFields = [
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
  { value: "" },
];

export const defaultRiskFields = { linguistic: "", value: "" };

export const getRisksFields = (n) => {
  return Array.from(Array(n)).map((x, i) => ({ ...defaultRiskFields, id: i }));
};

export const EFFICIENCY_INITIAL_HEADERS = [
  "Групи критеріїв",
  "Бальна оцінка",
  "Ф-ція незалежності бальної оцінки",
  "Бажані значення",
  "Ф-ція незалежності бажаних значень",
];

export const EFFICIENCY_TERM_HEADERS = [
  "Групи критеріїв",
  "Отриманий терм",
  "Достовірність терму",
  "Побажання значення терму ОПР",
];

export const AB_SUMS = [
  [20, 115],
  [15, 60],
  [10, 50],
  [50, 225],
  [25, 90],
];

export const RISKS_HEADERS = [
  "№",
  "Критерій",
  "Лінгвістична змінна",
  "Достовірність",
];

export const RISK_TERMS = ["H", "HC", "C", "BC", "B"];
