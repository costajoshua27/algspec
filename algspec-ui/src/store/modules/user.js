import api from '@/config/api';

const state = { 
  user: null,
  isAuthenticated: false,
  loggingIn: false,
  registering: false,
  loginError: '',
  registerError: ''
};

const getters = {
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setIsAuthenticated(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },
  registering(state) {
    state.registering = true;
    state.registerError = '';
  },
  loggingIn(state) {
    state.loggingIn = true;
    state.loginError = '';
  },
  registerSuccess(state) {
    state.registering = false;
    state.registerError = '';
  },
  registerFailure(state, errorMsg) {
    state.registering = false;
    state.registerError = errorMsg;
  },
  loginSuccess(state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.loginError = '';
    state.loggingIn = false;
  },
  loginFailure(state, errorMsg) {
    state.isAuthenticated = false;
    state.user = null;
    state.loginError = errorMsg;
    state.loggingIn = false;
  },
  logout(state) {
    state.isAuthenticated = false;
    state.user = null;
  }
};

const actions = {
  register({ commit }, payload) {
    commit('registering');
    return new Promise((resolve, reject) => {
      api.post('user/register', payload)
        .then(response => {
          commit('registerSuccess');
          resolve(response);
        })
        .catch(error => {
          commit('registerFailure', error.response.data.message);
          reject(error);
        });
    });
  },
  login({ commit }, payload) {
    commit('loggingIn');
    return new Promise((resolve, reject) => {
      api.post('user/login', payload)
        .then(response => {
          commit('loginSuccess');
          resolve(response);
        })
        .catch(error => {
          commit('loginFailure', error.response.data.message);
          reject(error);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      api.post('user/logout')
        .then(response => {
          commit('logout');
          resolve(response.data.message);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};