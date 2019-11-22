import Vue from 'vue';

import axios from 'axios';

import VueAxios from 'vue-axios';
import VueSocketIO from 'vue-socket.io';
import VueApexCharts from 'vue-apexcharts';

import App from './App.vue';

Vue.config.productionTip = false;

const host = 'http://138.197.1.100:8080';
// const host = 'http://localhost';

const instance = axios.create({
  baseURL: `${host}/api/v1`,
});

Vue.use(VueAxios, instance);

Vue.use(new VueSocketIO({
  debug: true,
  connection: host,
}));

Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);

new Vue({
  render: h => h(App),
}).$mount('#app');
