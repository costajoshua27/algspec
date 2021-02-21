<template>
  <div>
    HOME
    isAuthenticated: {{ isAuthenticated }}
    <br>
    user: {{ JSON.stringify(user) }}
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('auth');

export default {
  name: 'Home',
  computed: {
    ...mapState({
      isAuthenticated: state => state.isAuthenticated,
      user: state => state.user
    })
  }
}
</script>

<style lang="scss" scoped>

</style>