<template>
  <md-card id="ProcessingBox">
    <line-chart
      :chart-data="chartData"
      :options="chartOptions"
    />
    <h1 class="subtitle is-2 loading-title">{{text}}</h1>
  </md-card>
</template>

<script>
import LineChart from '@/components/LineChart';


export default {
  name: 'ProcessingBox',
  components: {
    'line-chart': LineChart,
  },
  props: ['text'],
  methods: {
    generateChartData() {
      this.chartData = {
        labels: Array.from({ length: 20 }, () => Math.floor(Math.random() * 40)),
        datasets: [
          {
            data: Array.from({ length: 20 }, () => Math.floor(Math.random() * 40)),
          },
        ],
      };
    },
    recusiveChartUpdate() {
      this.generateChartData();
      setTimeout(this.recusiveChartUpdate, 324);
    },
  },
  mounted() {
    this.recusiveChartUpdate();
  },
  data() {
    return {
      chartData: {},
      chartOptions: {
        elements: { point: { radius: 0 } },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        scales: {
          xAxes: [{
            display: false,
          }],
          yAxes: [{
            display: false,
          }],
        },
      },
    };
  },
};
</script>

<style scoped>
.loading-title {
  position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
