<template>
  <div
    class="file__tab"
    v-show="showTab"
    :class="{ 'file__tab--active': showTab }"
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: 'FileTab',

  props: {
    title: {
      type: String,
      default: 'Все',
    },
    active: {
      type: Boolean,
      default: false,
    },
  },

  created() {
    if (this.visible) {
      this.showTab = true;
    }
  },

  data: () => ({
    showTab: false,
  }),
};
</script>
