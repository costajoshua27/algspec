<template>
  <div v-if="algorithm !== null">
    <p>name: {{ algorithm.name }}</p> 
    <p>introduction: {{ algorithm.introduction }}</p>
    <p>overview: {{ algorithm.overview }}</p>
    <Visualization 
      :stageConfig="{ height: 300, width: 300 }"
      :circleConfig="{ x: 100, y: 100, radius: 70, fill: 'red', stroke: 'black', strokeWidth: 4, draggable: true}"
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
      this.algorithm = (await api.get(`/algorithm/${this.name}`)).data;
      console.log('setting algorithm...', this.algorithm);
    } catch (error) {
      console.log('error when mounting components: ', error);
    }
  },
}
</script>

<style>

</style>