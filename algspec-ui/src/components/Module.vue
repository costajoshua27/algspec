<template>
  <div v-if="module !== null">
    <p>{{ module }}</p>
    <TestAnimation width=1000 />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import api from '@/config/api';
import TestAnimation from '@/components/animations/TestAnimation';

export default {
  name: 'Module',
  props: {
    id: String,
  },
  components: {
    TestAnimation
  },
  data: function() {
    return {
      module: null,
    }
  },
  mounted: async function() {
    try {
      // Get the module data
      this.module = (await api.get(`/module/${this.id}`)).data;

    } catch (err) {
      this.error({ message: `Error loading module data: ${err.message}`, redirect: false });
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