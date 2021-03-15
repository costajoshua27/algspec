<template>
  <div class="profile p-4">
    <h3>{{ user.username }}</h3> 
    <Level></Level>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Level from '@/components/ui/Level';

export default {
  name: 'Profile',
  components: {
    Level
  },
  computed: {
    ...mapState({
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
  .profile {
    height: 100vh;
  }
</style>