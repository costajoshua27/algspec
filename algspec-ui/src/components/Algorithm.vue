<template>
  <div v-if="algorithm !== null">
    <p>name: {{ algorithm.name }}</p> 
    <p>introduction: {{ algorithm.introduction }}</p>
    <p>overview: {{ algorithm.overview }}</p>
  </div>
</template>

<script>
import api from '@/config/api';

export default {
  name: 'Algorithm',
  props: {
    name: String,
  },
  data: function() {
    return {
      algorithm: null,
    }
  },
  mounted: async function() {
    try {
      this.algorithm = (await api.get(`/algorithm/${this.name}`)).data;
      console.log('setting algorithm...'. this.algorithm);
    } catch (error) {
      console.log('error when mounting components: ', error);
    }
  },
}
</script>

<style>

</style>