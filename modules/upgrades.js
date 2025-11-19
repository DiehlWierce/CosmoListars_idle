export const upgrades = [
  { id: 'strongerHands', name: 'Сильные руки', desc: '+1 к листанию', cost: 50, costRes: '📜', bought: false, effect: (state) => { state.clickPower += 1; }, chapter: 1 },
  { id: 'crit', name: 'Острый взгляд', desc: '5% шанс ×3 (лист с треском!)', cost: 200, costRes: '📜', bought: false, effect: (state) => { state.critChance += 0.05; }, chapter: 1 },
  { id: 'robotHelpers', name: 'Робо-ассистенты', desc: 'Экскаваторы ×2', cost: 400, costRes: '📜', bought: false, effect: () => {}, chapter: 1 },
  { id: 'energyConverter', name: 'Конвертер энергии', desc: 'Лаборатории дают +50% Энергии', cost: 800, costRes: '📜', bought: false, effect: (state) => { state.energyBonus = 0.5; }, chapter: 2 },
  { id: 'crystalFocus', name: 'Фокусировка кристаллов', desc: 'Кристаллы приносят +10% Энергии', cost: 30, costRes: '💎', bought: false, effect: (state) => { state.crystalEnergyBonus = 0.1; }, chapter: 2 },
  { id: 'prestige', name: 'Первое прозрение', desc: 'Сбрось всё и получи Понимание', cost: 10000, costRes: '📜', bought: false, effect: (state) => { /* handled in prestige() */ }, chapter: 2 },
  { id: 'authorPen', name: 'Перо Автора', desc: 'Клики дают +0.1 Понимания', cost: 20, costRes: '🧠', bought: false, effect: (state) => { state.authorPower = 0.1; }, chapter: 4 },
  { id: 'realityInk', name: 'Чернила Реальности', desc: 'Понимание даёт +1% ко всем доходам', cost: 5, costRes: '🧠', bought: false, effect: (state) => { state.realityBonus += 0.01; }, chapter: 4 }
];