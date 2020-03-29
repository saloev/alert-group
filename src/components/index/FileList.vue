<template>
  <ul class="file__list reset--list-style">
    <FileItem v-for="(file, index) in list" :key="`${index}`" :file="file" />
  </ul>
</template>
<script>
import FileItem from './FileItem.vue';

export default {
  name: 'FileList',

  components: {
    FileItem,
  },

  props: {
    list: {
      type: Array,
      required: true,
      validator(value) {
        return value.every((item) =>
          Object.keys(item).every((key) =>
            ['title', 'link', 'date', 'size'].includes(key)
          )
        );
      },
    },
  },

  mounted() {},
};
</script>

<style lang="scss">
.file__list {
  .file__item {
    margin-bottom: 40px;
    padding-bottom: 20px;

    &:not(:last-child) {
      border-bottom: 1px solid rgba(156, 74, 74, 0.2);
    }
  }
}
</style>
