<template>
  <div>
    <b-container>
      <b-row v-for="tag in tags" :key="tag.name">
        <b-button @click="addTag(tag); filterOut();">{{ tag.name }}</b-button>
      </b-row>
      <!-- <p>{{ selectedTags}}</p> -->
    </b-container>
    <hr>
    <b-container>
      <div v-if="algorithms !== null">
        <p v-for="algorithm in shownAlgs" :key="algorithm.name">
          {{ algorithm.name }}
          <router-link :to="{name: 'Algorithm', params: {name: algorithm.name}}">GO!</router-link>
        </p>
      </div>
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
      selectedTags: null,
    }
  },
  computed: {
    shownAlgs: function () {
      return this.algorithms.filter(alg => alg.show);
    }
  },
  mounted: async function() {
    try {
      this.algorithms = (await api.get('/algorithm/all')).data;
      this.algorithms.forEach(alg => this.$set(alg, 'show', true)); // adds a new reactive property
      this.tags = (await api.get('/tag/all')).data;
      this.selectedTags = new Set();
      console.log('setting tags...', this.tags);
      console.log('setting algorithms...', this.algorithms);
    } catch (error) {
      console.log('error when mounting component: ', error);
    }
  },
  methods: {
    addTag(tag) { // should be toggleTag
      this.selectedTags.has(tag.name) ? this.selectedTags.delete(tag.name) : this.selectedTags.add(tag.name);
    },
    async filterOut() {
      const specifiedAlgs = [];
      for (const tagName of this.selectedTags) {
        const a = (await api.get(`/algorithm/tag/${tagName}`)).data;
        specifiedAlgs.push(...a.map(alg=>alg.name));
      }
      const selectedAlgs = new Set(specifiedAlgs);
      this.algorithms.forEach(alg => selectedAlgs.has(alg.name) ? alg.show = true : alg.show = false);
    }
  }
};
</script>

<style>

</style>