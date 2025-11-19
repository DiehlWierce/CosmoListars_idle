export const buildings = [
  { id: 'excavator', name: 'Экскаваторный рой', desc: 'Роботы-муравьи копают первый слой', baseIncome: 0.2, count: 0, costBase: 25, costExp: 1.12, chapter: 1 },
  { id: 'lab', name: 'Полевая лаборатория', desc: 'Анализирует Листы, выделяя Энергию', baseIncome: 0.05, count: 0, costBase: 150, costExp: 1.1, chapter: 1 },
  { id: 'crystalMine', name: 'Кристаллическая шахта', desc: 'Добывает кристаллы из второго слоя', baseIncome: 0.01, count: 0, costBase: 500, costExp: 1.08, chapter: 2 },
  { id: 'obelisk', name: 'Обелиск Памяти', desc: 'Связь с древними разумами', baseIncome: 0.001, count: 0, costBase: 5000, costExp: 1.05, chapter: 2 },
  { id: 'authorTable', name: 'Писательский стол', desc: 'Позволяет писать новые Листы', baseIncome: 0.0005, count: 0, costBase: 50000, costExp: 1.04, chapter: 4 }
];

export function getBuildingCost(building) {
  return Math.floor(building.costBase * Math.pow(building.costExp, building.count));
}

export function getBuildingIncome(building, upgrades, realityBonus) {
  let mult = 1;
  if (building.id === 'excavator' && upgrades.robotHelpers) mult *= 2;
  return building.count * building.baseIncome * mult * (1 + realityBonus);
}