import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import alert from './modules/alert';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    alert
  },
  state: {
    globalLoading: false
  },
  mutations: {
    setGlobalLoading(state, globalLoading) {
      state.globalLoading = globalLoading;
    }
  }
});

export default store;