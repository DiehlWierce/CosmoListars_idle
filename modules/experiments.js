export const experiments = [
  { 
    id: 'speedRead', 
    name: 'Скорочтение', 
    desc: '×3 к клику на 8 секунд', 
    cost: 500,
    energyCost: 10,
    cooldown: 0, 
    maxCooldown: 45,
    buttonText: 'ЛИСТАТЬ БЫСТРЕЕ!',
    chapter: 2,
    run: (state) => {
      const orig = state.clickPower;
      state.clickPower *= 3;
      setTimeout(() => { state.clickPower = orig; }, 8000);
    }
  },
  {
    id: 'soulEcho',
    name: 'Эхо душ',
    desc: 'Позвать древнего хранителя — получить Понимание',
    cost: 5000,
    energyCost: 50,
    cooldown: 0,
    maxCooldown: 120,
    buttonText: 'Позвать хранителя',
    chapter: 3,
    run: (state) => {
      state.souls += Math.max(1, Math.floor(state.coins / 10000));
    }
  },
  {
    id: 'writeNewPage',
    name: 'Написать страницу',
    desc: 'Создать новый Лист Вселенной',
    cost: 1000,
    soulsCost: 1,
    cooldown: 0,
    maxCooldown: 10,
    buttonText: '🖋️ Написать',
    chapter: 4,
    run: (state) => {
      state.coins += 1000;
    }
  }
];