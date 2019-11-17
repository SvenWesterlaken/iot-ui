<template lang="pug">
  #dashboard
    h1 IOT Sensor Dashboard
    .charts
      chart(:newValue="sensor1LastValue", title="Sensor 1")
      chart(:newValue="sensor2LastValue", title="Sensor 2")
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
      sensor2LastValue: {},
    };
  },
  sockets: {
    connect() {
      console.log('Socket Connected');
    },
    sensors(data) {
      this.sensor1LastValue = { x: data.date, y: data.sensor1 };
      this.sensor2LastValue = { x: data.date, y: data.sensor2 };
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
