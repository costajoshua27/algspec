<template>
  <div id="dashboard">
    <AlgorithmProgress></AlgorithmProgress>
    <Level></Level>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AlgorithmProgress from '@/components/ui/AlgorithmProgress';
import Level from '@/components/ui/Level';

export default {
  name: 'Dashboard',
  components: {
    AlgorithmProgress,
    Level
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  data() {
    return {

    };
  },
  mounted() {
  },
  methods: {
    ...mapActions({
      error: 'alert/error'
    }),
  }
};
</script>

<style lang="scss" scoped>
  #dashboard {
    margin-top: 100px;

  }
</style>