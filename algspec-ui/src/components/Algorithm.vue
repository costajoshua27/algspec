<template>
  <div v-if="algorithm !== null">
    <p>name: {{ algorithm.name }}</p> 
    <p>introduction: {{ algorithm.introduction }}</p>
    <p>overview: {{ algorithm.overview }}</p>
    <TestAnimation />
  </div>
</template>

<script>
import api from '@/config/api';
import TestAnimation from '@/components/animations/TestAnimation';

export default {
  name: 'Algorithm',
  props: {
    name: String,
  },
  components: {
    TestAnimation
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