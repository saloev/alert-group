<template>
  <div class="file__tabs tabs">
    <ul class="tabs__list reset--list-style">
      <li
        class="tabs__item"
        v-for="({ title, showTab }, index) in tabs"
        :key="title"
      >
        <button
          class="tabs__btn"
          @click="selectTab(index)"
          :class="{ 'tabs__btn--active': showTab }"
        >
          {{ title }}
        </button>
      </li>
    </ul>
    <slot />
  </div>
</template>
<script>
export default {
  name: 'FileTabs',

  created() {
    // TODO this.$children is very fragile use this.$slots instead;
    this.tabs = this.$children;
  },

  data: () => ({
    tabs: [],
  }),

  methods: {
    selectTab(i = null) {
      let selectedIndex = i;
      if (i === null)
        this.tabs.forEach((tab, index, arr) => {
          if (tab.showTab) {
            selectedIndex = index;
          } else if (index === arr.length - 1) {
            selectedIndex = 0;
          }
        });

      this.tabs.forEach((tab, index) => {
        tab.showTab = false;
        if (index === selectedIndex) {
          tab.showTab = true;
        }
      });
    },
  },

  mounted() {
    this.selectTab();
  },
};
</script>

<style lang="scss">
.tabs {
  &__list {
    display: flex;
    margin-bottom: 60px;
    border-bottom: 1px solid $primary;

    .tabs {
      &__btn {
        &:first-child {
          margin-left: -25px;
        }
      }
    }
  }
  &__btn {
    background: transparent;
    padding: 5px 25px;
    border: 0px;

    font-size: 18px;
    line-height: 25px;
    color: #fff;
    text-transform: uppercase;

    &:hover {
      cursor: pointer;
    }

    &--active,
    &:hover,
    &:focus {
      color: $primary;
    }

    &:focus {
      outline: 0;
    }

    &:active {
      outline: 0;
    }
  }
}
</style>
