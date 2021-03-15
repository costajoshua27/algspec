<template>
  <b-spinner v-if="algorithmChartLoading"></b-spinner>
  <AlgorithmChart v-else id="algorithm-chart" :chart-data="algorithmChartData"></AlgorithmChart>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import api from '@/config/api';
import AlgorithmChart from '@/components/charts/AlgorithmChart';

export default {
  name: 'AlgorithmProgress',
  components: {
    AlgorithmChart
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  data() {
    return {
      algorithmChartData: null,
      algorithmChartLoading: true
    };
  },
  mounted() {
    this.initAlgorithmChart();
  },
  methods: {
    ...mapActions({
      error: 'alert/error'
    }),
    async initAlgorithmChart() {
      try {
        const total = (await api.get('/algorithm/all')).data.length;
        const completed = this.user.algorithmsCompleted.length;
        const inProgress = this.user.algorithmsInProgress.length;

        this.algorithmChartData = {
          labels: ['Uncompleted', 'In Progress', 'Completed'],
          datasets: [
            {
              backgroundColor: [
                '#0000ff',
                '#00ff00',
                '#ff0000'
              ],
              data: [
                total - completed - inProgress,
                inProgress,
                completed
              ]
            }, 
          ]
        };

        this.algorithmChartLoading = false;

      } catch(err) {
        this.error({ message: `Error loading algorithm data: ${err.message}`, redirect: false });
      }
    },
  }
};
</script>

<style>
  #algorithm-chart {
    width: 500px;
    height: 500px;
    margin: 0 auto;
  }
</style>