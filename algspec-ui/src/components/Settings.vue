<template>
  <div>
    Theme: {{ user.settings.theme }}  
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Settings',
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

</style>