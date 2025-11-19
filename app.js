import { ResourcePanel } from './components/ResourcePanel.vue.js';
import { AppTabView } from './components/TabView.vue.js';

import { buildings, getBuildingCost, getBuildingIncome } from './modules/buildings.js';
import { upgrades } from './modules/upgrades.js';
import { experiments } from './modules/experiments.js';
import { achievements } from './modules/achievements.js';
import { exportSave, importSave } from './modules/save.js';

const { createApp, computed } = Vue;
const app = createApp({
  data() {
    return {
      // Состояние — копируем из твоего кода
      coins: 0, energy: 0, crystals: 0, souls: 0,
      totalClicks: 0, clickPower: 1, critChance: 0.05, critMultiplier: 3,
      chapter: 1, prestigeLevel: 0,
      energyBonus: 0, crystalEnergyBonus: 0, authorPower: 0, realityBonus: 0,
      buildings: JSON.parse(JSON.stringify(buildings)),
      upgrades: JSON.parse(JSON.stringify(upgrades)),
      experiments: JSON.parse(JSON.stringify(experiments)),
      achievements: JSON.parse(JSON.stringify(achievements)),
      activeTab: 'dig',
      particles: [],
      toasts: [],
      saveCode: '',
      saveMessage: '',
      quotes: [
        "Каждый клик — это вопрос. Каждый Лист — ответ.",
        "Энергия — не топливо. Это внимание Вселенной к твоему чтению."
      ],
      currentQuote: '',
      deferredPrompt: null
    };
  },

  computed: {
    showEnergy() {
      return this.buildings.some(b => b.id === 'lab' && b.count > 0) || this.energy > 0;
    },
    showCrystals() {
      return this.buildings.some(b => b.id === 'crystalMine' && b.count > 0) || this.crystals > 0;
    },
    coinsPerSec() {
      return this.buildings.reduce((sum, b) =>
        sum + getBuildingIncome(b, {
          robotHelpers: this.upgrades.find(u => u.id === 'robotHelpers')?.bought
        }, this.realityBonus)
      , 0);
    },
    energyPerSec() {
      if (!this.showEnergy) return 0;
      const lab = this.buildings.find(b => b.id === 'lab')?.count || 0;
      const cryst = this.buildings.find(b => b.id === 'crystalMine')?.count || 0;
      return lab * 0.03 * (1 + this.energyBonus) + cryst * 0.005 * (1 + this.crystalEnergyBonus);
    },
    crystalsPerSec() {
      if (!this.showCrystals) return 0;
      return (this.buildings.find(b => b.id === 'crystalMine')?.count || 0) * 0.002;
    },
    visibleBuildings() {
      return this.buildings.filter(b => b.chapter <= this.chapter);
    },
    visibleUpgrades() {
      return this.upgrades.filter(u => u.chapter <= this.chapter);
    },
    visibleExperiments() {
      return this.experiments.filter(e => e.chapter <= this.chapter);
    }
  },

  methods: {
    // Клики, частицы, покупки, престиж — копируешь из твоего кода
    click(e) { /* ... как у тебя, но с this.spawnParticle и this.addToast */ },
    spawnParticle(x, y, text, color, size) { /* ... */ },
    addToast(message, type = 'info') {
      this.$toast.add({ severity: type, summary: message, life: 3000 });
    },
    buyBuilding(building) {
      const cost = getBuildingCost(building);
      if (this.coins >= cost) {
        this.coins -= cost;
        building.count++;
        this.addToast(`🏗️ ${building.name} построен`);
      }
    },
    buyUpgrade(upgrade) {
      if (upgrade.bought) return;
      const costMap = { '📜': this.coins, '💎': this.crystals, '🧠': this.souls };
      if (costMap[upgrade.costRes] < upgrade.cost) return;
      if (upgrade.costRes === '📜') this.coins -= upgrade.cost;
      if (upgrade.costRes === '💎') this.crystals -= upgrade.cost;
      if (upgrade.costRes === '🧠') this.souls -= upgrade.cost;
      upgrade.bought = true;
      upgrade.effect(this);
      this.addToast(`🔬 ${upgrade.name} изучено`);
    },
    prestige() { /* ... */ },
    exportSave() {
      this.saveCode = exportSave(this.$data);
      navigator.clipboard.writeText(this.saveCode).catch(() => {});
      this.saveMessage = '✅ Код скопирован';
      setTimeout(() => this.saveMessage = '', 3000);
    },
    importSave() {
      if (importSave(this.saveCode, this.$data)) {
        this.addToast('✅ Прогресс загружен');
      } else {
        this.addToast('❌ Ошибка', 'error');
      }
    }
  },

  mounted() {
    // Автозагрузка, цикл, PWA — как у тебя
  }
});

// Регистрация компонентов PrimeVue
app.use(PrimeVue.ToastService);
app.component('Toast', PrimeVue.Toast);
app.component('TabView', PrimeVue.TabView);
app.component('TabPanel', PrimeVue.TabPanel);
app.component('Button', PrimeVue.Button);

// Твои компоненты
app.component('ResourcePanel', ResourcePanel);
app.component('AppTabView', AppTabView);

app.mount('#app');