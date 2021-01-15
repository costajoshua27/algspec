<template>
  <div>
    isAuthenticated: {{ isAuthenticated }}
    <br>
    user: {{ JSON.stringify(user) }}
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('user');

export default {
  name: 'Welcome',
  computed: {
    ...mapState({
      isAuthenticated: state => state.isAuthenticated,
      user: state => state.user
    })
  }
}
</script>

<style scoped>

</style>