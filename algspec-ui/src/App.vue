<template>
  <div id="app">
    <NavBar v-if="!isAuthenticated"></NavBar>
    <Menu v-else></Menu>
    <b-alert
      :show="variant !== null && message !== null"
      :variant="variant"
    >{{ message }}</b-alert>
    <b-overlay :show="globalLoading">
      <router-view></router-view>
    </b-overlay>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import Menu from '@/components/Menu';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    NavBar,
    Menu,
  },
  computed: {
    ...mapState({
      globalLoading: state => state.globalLoading,
      variant: state => state.alert.variant,
      message: state => state.alert.message,
      needToClear: state => state.alert.needToClear,
      isAuthenticated: state => state.auth.isAuthenticated,
    })
  },
  watch: {
    $route() {
      if (this.variant || this.message) {
        if (!this.needToClear) {
          this.setNeedToClear();
        } else {
          this.clearAlert();
        }
      } 
    }
  },
  methods: {
    ...mapActions({
      clearAlert: 'alert/clear',
      setNeedToClear: 'alert/setNeedToClear'
    })
  }
}
</script>

<style lang="scss">
  #app {
    font-family: $font_primary;
    color: $dm_text;
    background-color: $dm_primary;
    text-align: center;
    margin: 0;
    padding: 0;
    
    a {
      color: $dm-link;
      &:hover {
        color: $dm-link-hover;
      }
    }

    .row {
      margin-left: 0;
      margin-right: 0;
    }
  }
</style>
