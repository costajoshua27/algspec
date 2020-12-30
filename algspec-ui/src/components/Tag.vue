<template>
  <div>
    <p v-if="tag !== null"><b>{{ tag.name }}</b></p>
    <div v-if="algorithms !== null">
      <div v-for="algorithm in algorithms" :key="algorithm.name">
        <p>name: {{ algorithm.name }}</p> 
        <p>introduction: {{ algorithm.introduction }}</p>
        <p>overview: {{ algorithm.overview }}</p>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/config/api';

export default {
  name: 'Tag',
  props: {
    name: String
  },
  data: function() {
    return {
      tag: null,
      algorithms: null
    }
  },
  mounted: async function() {
    try {
      this.tag = (await api.get(`/tag/${this.name}`)).data;
      this.algorithms = (await api.get(`/algorithm/tag/${this.name}`)).data;
      console.log('setting found algorithms...', this.algorithms);
    } catch(error) {
      console.log('error when mounting components: ', error);
    }
  }
  
}
</script>

<style>

</style>