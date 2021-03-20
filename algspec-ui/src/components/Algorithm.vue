<template>
  <div v-if="algorithm !== null">
    <p>name: {{ algorithm.name }}</p> 
    <p>introduction: {{ algorithm.introduction }}</p>
    <p>overview: {{ algorithm.overview }}</p>
    <TestAnimation width=1000 />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
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

    } catch (err) {
      this.error({ message: `Error loading algorithm data: ${err.message}`, redirect: false });
    }
  },
  methods: {
    ...mapActions({
      error: 'alert/error'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>