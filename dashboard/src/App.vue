<template lang="pug">
  #dashboard
    h1 Test
    .chart-card
      chart(:newValue="sensor1LastValue")
</template>

<script>
import Chart from './components/Chart.vue';

export default {
  name: 'Dashboard',
  components: {
    Chart,
  },
  data() {
    return {
      sensor1LastValue: {},
      sensor2: [],
    };
  },
  sockets: {
    connect() {
      console.log('Socket Connected');
    },
    sensors(data) {
      this.sensor1LastValue = { x: data.date, y: data.sensor1 };

      // this.sensor2.push(data.sensor2);
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
  height: 100vh
  width: 100vw
</style>
