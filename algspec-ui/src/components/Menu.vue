<template>
  <nav :class="{ menu: true, menu__collapsed: collapsed}">
    <!-- Collapser -->
    <div class="menu__collapser" @click="toggleCollapse">
      <b-icon
        icon="caret-right-fill"
        class="menu__icon"
        id="menu__collapse-icon"
      ></b-icon>
    </div>

    <h4 class="menu__brand mt-3 ml-3 mb-3">algspec</h4>

    <!-- Main nav links -->
    <router-link
      v-for="link in (isAuthenticated ? [...authMenuLinks, ...(user.isAdmin ? adminLinks : [])] : unauthMenuLinks)"
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
        <b-popover class="menu__popover-container" target="user-profile-pic" triggers="hover focus" placement="top">
          <b-button class="menu__user-button">
            <router-link id="menu__profile-link" :to="{name: 'Profile'}">
              Profile
            </router-link>
          </b-button>
          <b-button class="menu__user-button" @click="sendLogoutRequest">Logout</b-button>
        </b-popover>
      </div>
      <span class="menu__username">{{ user.username }}</span>
    </div>

  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import gsap from 'gsap';

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
      adminLinks: null,
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
        to: { name: 'Learn' },
        label: 'Learn',
        icon: 'bar-chart-fill'
      },
      {
        to: { name: 'Practice' },
        label: 'Practice',
        icon: 'diagram-3-fill'
      },
      {
        to: { name: 'Settings' },
        label: 'Settings',
        icon: 'gear-fill'
      },
    ];

    this.adminLinks = [
      {
        to: { name: 'ModuleManager'},
        label: 'Module Manager',
        icon: 'gear-fill'
      },
      {
        to: { name: 'CategoryManager'},
        label: 'Category Manager',
        icon: 'gear-fill'
      },
      {
        to: { name: 'LevelManager'},
        label: 'Level Manager',
        icon: 'gear-fill'
      }
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
  mounted() {
    this.animateCollapser();
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
      this.animateCollapser();
    },
    animateCollapser() {
      gsap.to('#menu__collapse-icon', {
        duration: 0.3,
        rotation: this.collapsed ? 0 : 180,
        transformOrigin: 'center center'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .menu {
    width: $menu-width;
    font-size: 1.6rem;
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

    .menu__brand {
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

  .menu__user-container {
    margin-top: auto;
    display: flex;
    align-items: center;
  }

  .menu__username {
    font-weight: 700;
  }

  .menu__collapser {
    position: absolute;
    left: 100%;
    top: 50%;
    width: $menu-collapse-width;
    height: $menu-collapse-height;
    border-top-right-radius: $menu-collapse-border-radius;
    border-bottom-right-radius: $menu-collapse-border-radius;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .menu__brand {
    text-align: left;
    font-weight: 700;
    font-size: 3.0rem;
  }

  .menu__popover-container {
    margin: -.3rem;
  }

  .menu__user-button {
    margin: .3rem;
  }

  #menu__profile-link {
    color:black;
  }

</style>