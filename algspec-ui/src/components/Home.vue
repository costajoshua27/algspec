<template>
  <h1 class="text-center mt-5">
    This is home!
  </h1>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated,
      user: state => state.auth.user
    })
  },
  methods: {
    ...mapActions({

    })
  }
}
</script>

<style lang="scss" scoped>

</style>