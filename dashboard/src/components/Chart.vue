<template lang="pug">
  .chart-card
    apexchart(ref="chart", width=500, height=350,
              type="line", :options="chartOptions", :series="initValues")
</template>

<script>

export default {
  props: ['newValue'],
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
        title: {
          text: 'Realtime Test Datachart',
          align: 'left',
        },
        markers: {
          size: 0,
        },
        xaxis: {
          type: 'datetime',
          range: 10000,
          labels: {
            format: 'HH:mm:ss',
          },
        },
        yaxis: {
          max: 1,
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
