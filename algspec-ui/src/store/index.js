import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user
  },
  state: {
    globalLoading: true
  },
  mutations: {
    setGlobalLoading(state, globalLoading) {
      state.globalLoading = globalLoading;
    }
  }
});

export default store;