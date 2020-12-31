<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">algspec</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item ><router-link :to="{name: 'Algorithms'}">Algorithms</router-link></b-nav-item>
          <b-nav-item ><router-link :to="{ name: 'Tags'}">Tags</router-link></b-nav-item>
          <b-nav-item><router-link :to="{ name: 'AlgorithmManager'}">AlgorithmManager</router-link></b-nav-item>
          <b-nav-item><router-link :to="{ name: 'TagManager'}">TagManager</router-link></b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<style>

</style>
