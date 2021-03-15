<template>
  <nav :class="{ menu: true, menu__collapsed: collapsed}">
    <div class="menu__border"></div>
    <router-link
      v-for="link in menuLinks"
      class="menu__link"
      :to="link.to"
      :key="link.label"
    >
      <div class="menu__icon-container">
        <b-icon
          class="menu__icon"
          :icon="link.icon"
        ></b-icon>
      </div>
      <span class="menu__label">{{ link.label }}</span>
    </router-link>
    <br>
    <button class="btn" @click="() => collapsed = !collapsed"> HI</button>

    <router-link
      v-if="isAuthenticated"
      class="menu__link"
      :to="{ name: 'Profile' }">
      <div class="menu__icon-container">
        <b-icon
          class="menu__icon"
          icon="menu-app"
        ></b-icon>
      </div>
      <span class="menu__label">{{ user.username }}</span>
    </router-link>

    <a v-if="isAuthenticated" class="menu-link" @click="sendLogoutRequest()">
      Logout
    </a>
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
      menuLinks: null
    };
  },
  mounted() {
    this.menuLinks = [
      {
        to: { name: 'Dashboard' },
        label: 'Dashboard',
        icon: 'menu-app'
      },
      {
        to: { name: 'Algorithms' },
        label: 'Learn',
        icon: 'menu-app'
      },
      {
        to: { name: 'Tags' },
        label: 'Practice',
        icon: 'menu-app'
      },
      {
        to: { name: 'Settings' },
        label: 'Settings',
        icon: 'menu-app'
      },
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
  }

  .menu__collapsed {
    width: $menu-icon-width;

    .menu__label {
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
</style>