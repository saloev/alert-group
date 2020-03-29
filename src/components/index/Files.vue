<template>
  <section id="files" class="section section__files files">
    <h2 class="section__title">Files</h2>
    <Tabs>
      <Tab
        v-for="({ title, fileList }, index) in tabsList"
        :key="`${title}${index}`"
        :title="title"
      >
        <FileList :list="fileList" />
      </Tab>
    </Tabs>
    <FilesFooter />
  </section>
</template>
<script>
import Tabs from './Tabs.vue';
import Tab from './Tab.vue';
import FileList from './FileList.vue';
import FilesFooter from './FilesFooter.vue';

export default {
  components: {
    Tabs,
    Tab,
    FilesFooter,
    FileList,
  },

  data: () => ({}),

  methods: {
    geteranteFiles() {
      const count = Math.floor(Math.random() * 3) + 1;
      return Array(count).fill({
        title: 'Lorem ipsum Lorem ipsum',
        size: '0.42',
        date: '28.05.2019 15:53',
        link: '',
      });
    },
  },

  computed: {
    tabsList() {
      const items = [
        {
          title: 'Tab 1',
          fileList: this.geteranteFiles(),
        },
        {
          title: 'Tab 2',
          fileList: this.geteranteFiles(),
        },
        {
          title: 'Tab 3',
          fileList: this.geteranteFiles(),
        },
      ];

      const allItem = items.reduce(
        (acc, { fileList }) => {
          return { ...acc, fileList: [...acc.fileList, ...fileList] };
        },
        { name: 'All', fileList: [] }
      );

      return [allItem, ...items];
    },
  },

  mounted() {},
};
</script>geteranteFiles