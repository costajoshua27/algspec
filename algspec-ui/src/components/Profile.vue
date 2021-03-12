<template>
  <div class="profile p-4">
    <h3>{{ user.username }}</h3> 
    <h4>Level {{ user.currentLevel.number }}</h4>
    <h5>{{ user.currentExperience }}/{{ user.currentLevel.experienceNeeded }}</h5> 
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Profile',
  components: {

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