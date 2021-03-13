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
  mounted() {
    this.getUserTheme({ vm: this });
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
      setNeedToClear: 'alert/setNeedToClear',
      getUserTheme: 'getUserTheme'
    })
  }
}
</script>

<style lang="scss">
  [data-theme="light"] {
    color: $lm-text;
    background-color: $lm-primary;

    a {
      color: $lm-link;

      &:hover {
        color: $lm-link-hover;
      }
    }

    .btn {
      color: $lm-btn-text;
      background-color: $lm-btn;
      border-color: $lm-btn-border;

      &:hover {
        color: $lm-btn-hover-text;
        background-color: $lm-btn-hover;
        border-color: $lm-btn-hover-border; 
      }

      &-primary, &-success {
        color: $lm-btn-primary-text;
        background-color: $lm-btn-primary;
        border-color: $lm-btn-primary-border;
      }

      &-primary:hover, &-success:hover {
        color: $lm-btn-primary-hover-text;
        background-color: $lm-btn-primary-hover;
        border-color: $lm-btn-primary-hover-border;
      }

      &-danger {
        color: $lm-btn-danger-text;
        background-color: $lm-btn-danger;
        border-color: $lm-btn-danger-border;
      }

      &-danger:hover {
        color: $lm-btn-danger-hover-text;
        background-color: $lm-btn-danger-hover;
        border-color: $lm-btn-danger-hover-border;
      }
    }

    .card, .modal-content {
      background-color: $lm-secondary;
    }
  }

  [data-theme="dark"] {
    color: $dm-text;
    background-color: $dm-primary;

    a {
      color: $dm-link;

      &:hover {
        color: $dm-link-hover;
      }
    }

    .btn {
      color: $dm-btn-text;
      background-color: $dm-btn;
      border-color: $dm-btn-border;

      &:hover {
        color: $dm-btn-hover-text;
        background-color: $dm-btn-hover;
        border-color: $dm-btn-hover-border; 
      }

      &-primary, &-success {
        color: $dm-btn-primary-text;
        background-color: $dm-btn-primary;
        border-color: $dm-btn-primary-border;
      }

      &-primary:hover, &-success:hover {
        color: $dm-btn-primary-hover-text;
        background-color: $dm-btn-primary-hover;
        border-color: $dm-btn-primary-hover-border;
      }

      &-danger {
        color: $dm-btn-danger-text;
        background-color: $dm-btn-danger;
        border-color: $dm-btn-danger-border;
      }

      &-danger:hover {
        color: $dm-btn-danger-hover-text;
        background-color: $dm-btn-danger-hover;
        border-color: $dm-btn-danger-hover-border;
      }
    }

    .card, .modal-content {
      background-color: $dm-secondary;
    }
  }

  #app {
    font-family: $font-primary;
    text-align: center;
    margin: 0;
    padding: 0;

    .row {
      margin-left: 0;
      margin-right: 0;
    }
  }
</style>
