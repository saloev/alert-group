import Vue from 'vue';
import Files from './Files.vue';
import map from './map';

const app = new Vue({
  el: '#files',
  render: (h) => h(Files),
});

console.log(app);
