<template>
  <div v-if="algorithm !== null">
    <p>name: {{ algorithm.name }}</p> 
    <p>introduction: {{ algorithm.introduction }}</p>
    <p>overview: {{ algorithm.overview }}</p>
    <!-- Dis needs to change bruh -->
    <Visualization 
      :stageConfig="{ height: 1000, width: 1000 }"
      :entities="algorithm.visualization.entities" 
    ></Visualization>
  </div>
</template>

<script>
import api from '@/config/api';
import Visualization from '@/components/Visualization';

export default {
  name: 'Algorithm',
  props: {
    name: String,
  },
  components: {
    Visualization
  },
  data: function() {
    return {
      algorithm: null,
    }
  },
  mounted: async function() {
    try {
      // Get the algorithm data
      this.algorithm = (await api.get(`/algorithm/${this.name}`)).data;

    } catch (error) {
      console.log('error when mounting components: ', error);
    }
  },
}
</script>

<style>

</style>