export const AppTabView = {
  props: ['activeTab'],
  emits: ['update:activeTab'],
  template: `
    <TabView :activeIndex="tabIndex" @tab-change="onTabChange">
      <TabPanel header="⛏️ Раскопки" left-icon="pi pi-building">
        <slot name="dig"></slot>
      </TabPanel>
      <TabPanel header="🔬 Исследования" left-icon="pi pi-search">
        <slot name="research"></slot>
      </TabPanel>
      <TabPanel header="🧪 Эксперименты" left-icon="pi pi-flask">
        <slot name="experiments"></slot>
      </TabPanel>
      <TabPanel header="🏆 Достижения" left-icon="pi pi-trophy">
        <slot name="achievements"></slot>
      </TabPanel>
      <TabPanel header="📖 Лор" left-icon="pi pi-book">
        <slot name="lore"></slot>
      </TabPanel>
      <TabPanel header="💾 Сохранение" left-icon="pi pi-save">
        <slot name="save"></slot>
      </TabPanel>
    </TabView>
  `,
  computed: {
    tabIndex() {
      const tabs = ['dig', 'research', 'experiments', 'achievements', 'lore', 'save'];
      return tabs.indexOf(this.activeTab);
    }
  },
  methods: {
    onTabChange(e) {
      const tabs = ['dig', 'research', 'experiments', 'achievements', 'lore', 'save'];
      this.$emit('update:activeTab', tabs[e.index]);
    }
  }
};