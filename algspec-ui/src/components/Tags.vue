<template>
  <div>
    <b-container>
      <p v-for="tag in tags" :key="tag.name">
        {{ tag.name }}
        <router-link :to="{ name: 'Tag', params: { name: tag.name } }">GO!</router-link>
      </p>
    </b-container>
  </div>
</template>

<script>
import api from '@/config/api';

export default {
  name: 'Tags',
  data: function() {
    return {
      tags: null
    }
  },
  mounted: async function() {
    try {
      this.tags = (await api.get('/tag/all')).data;
      console.log('setting tags...', this.tags);
    } catch (error) {
      console.log('error when mounting component: ', error);
    }
  }
}
</script>

<style>

</style>