<template>
  <div id="dashboard">
    <b-spinner v-if="algorithmChartLoading"></b-spinner>
    <AchievementsChart v-else id="algorithm-chart" :chart-data="algorithmChartData"></AchievementsChart>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import api from '@/config/api';
import AchievementsChart from '@/components/AchievementsChart';

export default {
  name: 'Dashboard',
  components: {
    AchievementsChart
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated,
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

    }),
    async initAlgorithmChart() {
      try {
        const total = (await api.get('/algorithm/all')).data.length;
        const completed = this.user.algorithmsCompleted.length + 2;
        const inProgress = this.user.algorithmsInProgress.length + 1;

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
      } catch(error) {
        console.log("Hello");
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  #dashboard {
    margin-top: 50px;

    #algorithm-chart {
      width: 500px;
      height: 500px;
      margin: 0 auto;
    }
  }
</style>