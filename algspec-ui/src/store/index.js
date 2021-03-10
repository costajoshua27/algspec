import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/config/api';
import auth from './modules/auth';
import alert from './modules/alert';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    alert
  },
  state: {
    globalLoading: false,
    theme: 'light'
  },
  mutations: {
    setGlobalLoading(state, globalLoading) {
      state.globalLoading = globalLoading;
    },
    setTheme(state, theme) {
      state.theme = theme;
      localStorage.setItem('theme', theme);
    }
  },
  actions: {
    getUserTheme({ commit, state, rootState }, { vm }) {
      if (rootState.auth.user !== null) {
        const userTheme = rootState.auth.user.settings.theme;
        commit('setTheme', userTheme);
        // We pass the vue instance (vm) to call our theme select method
        vm.$themes.select(state.theme);
      }
    },
    async setTheme({ commit, state }, { theme, vm }) {
      commit('setTheme', theme);
      // We pass the vue instance (vm) to call our theme select method
      vm.$themes.select(state.theme);

      // Save the theme (need to rework this probably to be more flexible)
      const response = await api.post('user/updateSettings', { id: state.auth.user._id, theme });
      commit('auth/setUser', response.data);
    }
  }
});

export default store;