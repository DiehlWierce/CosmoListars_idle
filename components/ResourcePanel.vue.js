export const ResourcePanel = {
  props: ['coins', 'energy', 'crystals', 'souls', 'coinsPerSec', 'energyPerSec', 'crystalsPerSec', 'showEnergy', 'showCrystals'],
  template: `
    <div class="resources">
      <div class="res">
        <div class="res-label">📜 Листы</div>
        <div class="res-value">{{ fmt(coins) }}</div>
        <div class="res-per-sec" v-if="coinsPerSec > 0">+{{ fmt(coinsPerSec) }}/сек</div>
      </div>
      <div class="res" v-if="showEnergy">
        <div class="res-label">⚡ Энергия</div>
        <div class="res-value">{{ fmt(energy) }}</div>
        <div class="res-per-sec" v-if="energyPerSec > 0">+{{ fmt(energyPerSec) }}/сек</div>
      </div>
      <div class="res" v-if="showCrystals">
        <div class="res-label">💎 Кристаллы</div>
        <div class="res-value">{{ fmt(crystals) }}</div>
        <div class="res-per-sec" v-if="crystalsPerSec > 0">+{{ fmt(crystalsPerSec) }}/сек</div>
      </div>
      <div class="res" v-if="souls > 0">
        <div class="res-label">🧠 Понимание</div>
        <div class="res-value">{{ souls }}</div>
      </div>
    </div>
  `,
  methods: {
    fmt(num) {
      if (num >= 1e12) return (num/1e12).toFixed(2) + 'T';
      if (num >= 1e9) return (num/1e9).toFixed(2) + 'B';
      if (num >= 1e6) return (num/1e6).toFixed(2) + 'M';
      if (num >= 1e3) return (num/1e3).toFixed(1) + 'k';
      return Math.floor(num);
    }
  }
};