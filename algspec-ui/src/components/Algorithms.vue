<template>
  <div>
    <b-container>
      <b-row v-for="tag in tags" :key="tag.name">
        <b-button @click="selectTag(tag)">{{ tag.name }}</b-button>
      </b-row>
      <p>{{ displaySelectedTags }}</p>
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
import { mapActions } from 'vuex';

export default {
  name: 'Algorithms',
  components: {
  },
  data: function() {
    return {
      tags: null,
      algorithms: null,
      selectedTags: null,
      displaySelectedTags: null
    }
  },
  computed: {
    shownAlgs: function() {
      return this.algorithms.filter(alg => alg.show);
    }
  },
  mounted: async function() {
    try {
      this.algorithms = (await api.get('/algorithm/all')).data;
      this.algorithms.forEach(alg => this.$set(alg, 'show', true)); // adds a new reactive property
      this.tags = (await api.get('/tag/all')).data;
      this.selectedTags = new Set();
      this.displaySelectedTags = Array.from(this.selectedTags);
      console.log('setting tags...', this.tags);
      console.log('setting algorithms...', this.algorithms);
    } catch (err) {
      this.error({ message: `Error loading algorithms data: ${err.message}`, redirect: false });
    }
  },
  methods: {
    ...mapActions({
      error: 'alert/error'
    }),
    toggleTag(tag) { // should be toggleTag
      this.selectedTags.has(tag.name) ? this.selectedTags.delete(tag.name) : this.selectedTags.add(tag.name);
      this.displaySelectedTags = Array.from(this.selectedTags);
    },
    async filterAlgorithms() {
      if (this.selectedTags.size > 0){
        let tagParams = [...this.selectedTags].reduce((acc, elem, index) => {
          if (index === 0) {
            return acc += elem;
          } else {
            return acc += `,${elem}`;
          }
        }, '');
        const specifiedAlgs = (await api.get(`/algorithm/tags/${tagParams}`)).data;
        const algNames = specifiedAlgs.map(alg => alg.name);
        const selectedAlgs = new Set(algNames);
        this.algorithms.forEach(alg => selectedAlgs.has(alg.name) ? alg.show = true : alg.show = false);
      }
      else {
        this.algorithms.forEach(alg => alg.show = true);
      }
    },
    selectTag(tag) {
      this.toggleTag(tag);
      this.filterAlgorithms();
    }
  }
};
</script>

<style lang="scss" scoped>

</style>