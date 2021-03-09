<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#" class="navbar-brand"><router-link :to="{ name: 'Dashboard' }">algspec</router-link></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item><router-link :to="{ name: 'Algorithms' }">Algorithms</router-link></b-nav-item>
          <b-nav-item><router-link :to="{ name: 'Tags' }">Tags</router-link></b-nav-item>
          <b-nav-item><router-link :to="{ name: 'AlgorithmManager' }">AlgorithmManager</router-link></b-nav-item>
          <b-nav-item><router-link :to="{ name: 'TagManager' }">TagManager</router-link></b-nav-item>
          <b-nav-item><router-link :to="{ name: 'LevelManager' }">LevelManager</router-link></b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ user ? user.username : '' }}</em>
            </template>
            <b-dropdown-item><router-link :to="{ name: 'Profile' }">Profile</router-link></b-dropdown-item>
            <b-dropdown-item><router-link :to="{ name: 'Settings' }">Settings</router-link></b-dropdown-item>
            <b-dropdown-item @click="sendLogoutRequest()">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Menu',
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout' 
    }),
    async sendLogoutRequest() {
      try {
        await this.logout();
        this.$router.push({ name: 'Home' });
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
