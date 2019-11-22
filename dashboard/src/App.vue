<template lang="pug">
  #dashboard
    h1 IOT Sensor Dashboard
    .charts
      realtime-chart(:newValue="sensor1LastValue", title="Sensor 1")
      realtime-chart(:newValue="sensor2LastValue", title="Sensor 2")
      .history-holder
        history-chart(:series="historySeries", title="History Chart")
        button.btn(@click="getHistory") Reload History Diagram
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
      });
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
  align-items: center

.chart-card,
  width: 90%
  max-width: 800px
  padding: 32px 32px 0
  border: 1px solid #ececec
  margin: 16px
  box-sizing: border-box
  box-shadow: 0 0px 12px 0 rgba(0,0,0,0.12)
  border-radius: 16px

  h4
    margin: 0

.history-holder
  width: 100%
  display: flex
  flex-direction: column
  align-items: center

.btn
  background: #008FFB
  color: white
  padding: 12px 16px
  font-size: 14px
  font-weight: bold
  text-transform: uppercase
  max-width: 800px
  box-sizing: border-box
  border: none
  border-radius: 8px
  box-shadow: 0 0px 12px 0 rgba(0,0,0,0.12)
  cursor: pointer
  transition: all 250ms ease-in-out
  outline: none

  &:hover, &:active
    box-shadow: 0 0px 14px 0 rgba(0,0,0,0.4)
    background: darken(#008FFB, 10)

</style>
