<template>
  <div id="app">
    <Menu></Menu>
    <b-container fluid class="main">
      <b-alert
        :show="variant !== null && message !== null"
        :variant="variant"
      >{{ message }}</b-alert>
      <b-overlay :show="globalLoading">
        <router-view></router-view>
      </b-overlay>
    </b-container>
  </div>
</template>

<script>
import Menu from '@/components/Menu';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
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
  mounted() {
    this.getUserTheme({ vm: this });
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
      this.getUserTheme({ vm: this });
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
  html {
    font-size: $font-root-size;
  }
  
  #app {
    font-family: $font-primary;
    text-align: center;
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;

    .container-fluid {
      padding-left: 0;
      padding-right: 0;
    }

    .main {
      height: inherit;
      padding: 0;
      overflow-y: auto;
    }
  }

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

      &-primary:disabled {
        background-color: $lm-btn-primary-disabled;
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

    .menu {
      background-color: $menu-lm-background;

      &__collapser {
        background-color: $menu-lm-background;
      }

    }

    .card, .modal-content {
      background-color: $lm-secondary;
    }

    .form-control {
      background-color: $lm-primary;
      border: none;
      border-bottom: 2px solid $lm-text;
      color: $lm-text;
    }

    .form-control:focus {
      background-color: $lm-primary;
      color: $lm-text;
    }

    .button-text {
      color: $lm-text;
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
      
      &-primary:disabled {
        background-color: $dm-btn-primary-disabled;
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

    .menu {
      background-color: $menu-dm-background;

      &__collapser {
        background-color: $menu-dm-background;
      }

    }

    .card, .modal-content {
      background-color: $dm-secondary;
    }

    .form-control {
      background-color: $dm-primary;
      border: none;
      border-bottom: 2px solid $dm-text;
      color: $dm-text;
    }

    .form-control:focus {
      background-color: $dm-primary;
      color: $dm-text;
    }

    .button-text {
      color: $dm-primary;
    }
  }
</style>
