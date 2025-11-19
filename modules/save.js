export function exportSave(state) {
  const saveState = {
    coins: state.coins,
    energy: state.energy,
    crystals: state.crystals,
    souls: state.souls,
    totalClicks: state.totalClicks,
    chapter: state.chapter,
    prestigeLevel: state.prestigeLevel,
    buildings: state.buildings.map(b => ({ id: b.id, count: b.count })),
    upgrades: state.upgrades.map(u => ({ id: u.id, bought: u.bought })),
    energyBonus: state.energyBonus,
    crystalEnergyBonus: state.crystalEnergyBonus,
    authorPower: state.authorPower,
    realityBonus: state.realityBonus
  };
  return btoa(encodeURIComponent(JSON.stringify(saveState)));
}

export function importSave(encoded, state) {
  try {
    const json = decodeURIComponent(atob(encoded));
    const data = JSON.parse(json);
    Object.assign(state, {
      coins: data.coins || 0,
      energy: data.energy || 0,
      crystals: data.crystals || 0,
      souls: data.souls || 0,
      totalClicks: data.totalClicks || 0,
      chapter: data.chapter || 1,
      prestigeLevel: data.prestigeLevel || 0,
      energyBonus: data.energyBonus || 0,
      crystalEnergyBonus: data.crystalEnergyBonus || 0,
      authorPower: data.authorPower || 0,
      realityBonus: data.realityBonus || 0
    });
    if (data.buildings) {
      state.buildings.forEach(b => {
        const saved = data.buildings.find(sb => sb.id === b.id);
        if (saved) b.count = saved.count;
      });
    }
    if (data.upgrades) {
      data.upgrades.forEach(saved => {
        const u = state.upgrades.find(u => u.id === saved.id);
        if (u) u.bought = saved.bought;
      });
    }
    return true;
  } catch (e) {
    return false;
  }
}