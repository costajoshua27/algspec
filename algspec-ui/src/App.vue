<template>
  <div id="app">
    <NavBar></NavBar>
    <b-overlay :show="globalLoading">
      <router-view></router-view>
    </b-overlay>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  computed: {
    ...mapState({
      globalLoading: state => state.globalLoading
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
