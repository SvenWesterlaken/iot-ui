<template lang="pug">
  .chart-card
    h4 {{title}}
    apexchart(ref="chart", height=300,
              type="line", :options="chartOptions", :series="series")
</template>

<script>

export default {
  props: ['series', 'title'],
  data() {
    return {
      chartOptions: {
        chart: {
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000,
            },
          },
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
          toolbar: {
            autoSelected: 'zoom',
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
