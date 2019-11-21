import Vue from 'vue';

import VueSocketIO from 'vue-socket.io';
import VueApexCharts from 'vue-apexcharts';

import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://138.197.1.100',
}));

Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);

new Vue({
  render: h => h(App),
}).$mount('#app');
