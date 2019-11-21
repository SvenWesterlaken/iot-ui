<template lang="pug">
  .chart-card
    h4 {{title}}
    apexchart(ref="chart", height=300,
              type="line", :options="chartOptions", :series="initValues")
</template>

<script>
import moment from 'moment';

export default {
  props: ['newValue', 'title'],
  data() {
    return {
      values: [],
      initValues: [{
        data: [],
      }],
      chartOptions: {
        chart: {
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000,
            },
          },
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        markers: {
          size: 0,
        },
        xaxis: {
          type: 'datetime',
          range: 12000,
          labels: {
            formatter(value, timestamp) {
              return moment(timestamp).format('h:mm:ss');
            },
          },
        },
        yaxis: {
          min: 0,
          decimalsInFloat: 1,
        },
        legend: {
          show: false,
        },
      },
    };
  },
  watch: {
    newValue(data) {
      if (this.values.length > 40) {
        this.values = this.values.splice(this.values.length - 30, this.values.length);
        this.$refs.chart.updateSeries([{ data: this.values }], false, true);
      }

      this.values.push(data);
      this.$refs.chart.updateSeries([{ data: this.values }]);
    },
  },
};
</script>

<style lang="sass">
  .chart-card
    width: 80%
    max-width: 800px
    padding: 32px 32px 0
    border: 1px solid #ececec
    margin: 16px
    box-shadow: 0 0px 12px 0 rgba(0,0,0,0.12)
    border-radius: 16px

    h4
      margin: 0
</style>
