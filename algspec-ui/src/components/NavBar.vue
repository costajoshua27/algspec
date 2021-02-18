<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">algspec</b-navbar-brand>

      <b-navbar-toggle v-if="isAuthenticated" target="nav-collapse"></b-navbar-toggle>

      <b-collapse v-if="isAuthenticated" id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item ><router-link :to="{name: 'Algorithms'}">Algorithms</router-link></b-nav-item>
          <b-nav-item ><router-link :to="{ name: 'Tags'}">Tags</router-link></b-nav-item>
          <b-nav-item><router-link :to="{ name: 'AlgorithmManager'}">AlgorithmManager</router-link></b-nav-item>
          <b-nav-item><router-link :to="{ name: 'TagManager'}">TagManager</router-link></b-nav-item>
          <b-nav-item><router-link :to="{ name: 'LevelManager'}">LevelManager</router-link></b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav v-if="isAuthenticated" class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ user ? user.username : '' }}</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="sendLogoutRequest()">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('user');

export default {
  name: 'NavBar',
  computed: {
    ...mapState({
      isAuthenticated: state => state.isAuthenticated,
      user: state => state.user
    })
  },
  methods: {
    ...mapActions({
      'logout': 'logout'
    }),
    async sendLogoutRequest() {
      try {
        const message = await this.logout();
        this.$router.push({ name: 'Login', params: { initAlertMessage: message } });
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style>

</style>
