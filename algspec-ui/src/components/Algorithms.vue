<template>
  <div>
    <b-container>
      <p v-for="algorithm in algorithms" :key="algorithm.name">
        {{ algorithm.name }}
        <router-link :to="{name: 'Algorithm', params: {name: algorithm.name}}">GO!</router-link>
      </p>
    </b-container>
  </div>
</template>

<script>
import api from '@/config/api';

export default {
  name: 'Algorithms',
  components: {
  },
  data: function() {
    return {
      tags: null,
      algorithms: null,
    }
  },
  mounted: async function() {
    try {
      this.algorithms = (await api.get('/algorithm/all')).data;
      this.tags = (await api.get('/tag/all')).data;
      console.log('setting tags...', this.tags);
      console.log('setting algorithms...', this.algorithms);
    } catch (error) {
      console.log('error when mounting component: ', error);
    }
  },
  methods: {

  }
}

</script>

<style>

</style>