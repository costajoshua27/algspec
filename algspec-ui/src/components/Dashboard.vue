<template>
  <div>
    isAuthenticated: {{ isAuthenticated }}
    <br>
    user: {{ JSON.stringify(user) }}
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Dashboard',
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