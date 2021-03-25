<template>
  <b-spinner v-if="moduleChartLoading"></b-spinner>
  <ModuleChart v-else id="module-chart" :chart-data="moduleChartData"></ModuleChart>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import api from '@/config/api';
import ModuleChart from '@/components/charts/ModuleChart';

export default {
  name: 'ModuleProgress',
  components: {
    ModuleChart
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  data() {
    return {
      moduleChartData: null,
      moduleChartLoading: true
    };
  },
  mounted() {
    this.initModuleChart();
  },
  methods: {
    ...mapActions({
      error: 'alert/error'
    }),
    async initModuleChart() {
      try {
        const total = (await api.get('/module/all')).data.length;
        const completed = this.user.modulesCompleted.length;
        const inProgress = this.user.modulesInProgress.length;

        this.moduleChartData = {
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

        this.moduleChartLoading = false;

      } catch(err) {
        this.error({ message: `Error loading module data: ${err.message}`, redirect: false });
      }
    },
  }
};
</script>

<style>
  #module-chart {
    width: 500px;
    height: 500px;
    margin: 0 auto;
  }
</style>