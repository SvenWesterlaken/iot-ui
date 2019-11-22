<template lang="pug">
  #dashboard
    h1 IOT Sensor Dashboard
    .charts
      realtime-chart(:newValue="sensor1LastValue", title="Sensor 1")
      realtime-chart(:newValue="sensor2LastValue", title="Sensor 2")
      history-chart(:series="historySeries", title="History Chart")
</template>

<script>
import _ from 'lodash';
import RealtimeChart from './components/RealtimeChart.vue';
import HistoryChart from './components/HistoryChart.vue';

export default {
  name: 'Dashboard',
  components: {
    RealtimeChart,
    HistoryChart,
  },
  data() {
    return {
      sensor1LastValue: {},
      sensor2LastValue: {},
      historySeries: [],
    };
  },
  sockets: {
    sensors(data) {
      this.sensor1LastValue = { x: data.time, y: data.sensor1 };
      this.sensor2LastValue = { x: data.time, y: data.sensor2 };
    },
  },
  mounted() {
    console.log(this.axios);
    this.getHistory();
  },
  methods: {
    getHistory() {
      this.axios.get('data').then(({ data }) => {
        const sensor1 = { name: 'Sensor 1', data: [] };
        const sensor2 = { name: 'Sensor 2', data: [] };

        _.forEach(data, (v) => {
          sensor1.data.push([v.time, v.sensor1]);
          sensor2.data.push([v.time, v.sensor2]);
        });

        this.historySeries = [sensor1, sensor2];
      }).catch((err) => { console.log(err); });
    },
  },
};
</script>

<style lang="sass">
body
  padding: 0
  margin: 0

#dashboard
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  text-align: center
  color: #2c3e50
  box-sizing: padding-box
  padding: 16px

.charts
  margin-top: 16px
  display: flex
  flex-wrap: wrap
  justify-content: center
</style>
