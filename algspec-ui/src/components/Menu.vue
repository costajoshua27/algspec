<template>
  <nav :class="{ menu: true, menu__collapsed: collapsed}">
    <!-- Border, collapser -->
    <div class="menu__border"></div>
    <button class="menu__toggle-collapse" @click="toggleCollapse">{{ collapsed }}</button>

    <!-- Main nav links -->
    <router-link
      v-for="link in (isAuthenticated ? authMenuLinks : unauthMenuLinks)"
      class="menu__link"
      :to="link.to"
      :key="link.label"
      v-b-popover.hover.right="link.label"
    >
      <div class="menu__icon-container">
        <b-icon
          class="menu__icon"
          :icon="link.icon"
        ></b-icon>
      </div>
      <span class="menu__label">{{ link.label }}</span>
    </router-link>

    <!-- User section of the menu -->
    <div v-if="isAuthenticated" class="menu__user-container">
      <div class="menu__icon-container">
        <b-icon
          class="menu__icon"
          icon="person-fill"
          id="user-profile-pic"
        ></b-icon>
        <b-popover target="user-profile-pic" triggers="hover focus" placement="top">
          <b-button @click="sendLogoutRequest">Logout</b-button>
        </b-popover>
      </div>
      <span class="menu__username">{{ user.username }}</span>
    </div>

  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Menu',
  computed: {
    ...mapState({
      user: state => state.auth.user,
      isAuthenticated: state => state.auth.isAuthenticated
    })
  },
  data() {
    return {
      collapsed: false,
      authMenuLinks: null,
      unauthMenuLinks: null
    };
  },
  created() {
    this.authMenuLinks = [
      {
        to: { name: 'Dashboard' },
        label: 'Dashboard',
        icon: 'grid1x2-fill'
      },
      {
        to: { name: 'Algorithms' },
        label: 'Learn',
        icon: 'bar-chart-fill'
      },
      {
        to: { name: 'Tags' },
        label: 'Practice',
        icon: 'diagram-3-fill'
      },
      {
        to: { name: 'Settings' },
        label: 'Settings',
        icon: 'gear-fill'
      },
    ];
    this.unauthMenuLinks = [
      {
        to: { name: 'Home' },
        label: 'Home',
        icon: 'house-fill'
      },
      {
        to: { name: 'LoginRegisterControl', params: { mode: 'login' } },
        label: 'Login',
        icon: 'door-open-fill'
      }
    ];
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
      error: 'alert/error'
    }),
    async sendLogoutRequest() {
      try {
        await this.logout();
        this.$router.push({ name: 'LoginRegisterControl', params: { mode: 'login' } });
      } catch (err) {
        this.error({ message: `Error occured logging out: ${err.message}`, redirect: false });
      }
    },
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    }
  }
};
</script>

<style lang="scss" scoped>
  .menu {
    width: $menu-width;
    height: inherit;
    position: relative;
    transition: $menu-width-transition;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
  }

  .menu__collapsed {
    width: $menu-icon-width;

    .menu__label {
      display: none;
    }

    .menu__username {
      display: none;
    }
  }

  .menu__link {
    display: flex;
    align-items: center;
  }

  .menu__icon-container {
    width: $menu-icon-width;
    height: $menu-icon-width;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .menu__label {
    white-space: nowrap;
  }

  .menu__border {
    position: absolute;
    left: 100%;
    top: 0;
    width: $menu-border-width;
    height: inherit;
  }

  .menu__user-container {
    margin-top: auto;
    display: flex;
    align-items: center;
  }

  .menu__username {
    font-weight: 700;
  }

</style>