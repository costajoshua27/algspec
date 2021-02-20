import api from '@/config/api';

const user = JSON.parse(localStorage.getItem('user'));
const state = { 
  user: user ? user : null,
  isAuthenticated: user ? true : false,
  loggingIn: false,
  registering: false,
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
  setLoggingIn(state, loggingIn) {
    state.loggingIn = loggingIn;
  },
  setRegistering(state, registering) {
    state.registering = registering;
  },
};

const actions = {
  register({ commit, dispatch }, payload) {
    commit('setRegistering', true);
    return new Promise((resolve, reject) => {
      api.post('user/register', payload)
        .then(response => {
          commit('setRegistering', false);
          dispatch('alert/success', { message: response.data.message }, { root: true });
          resolve();
        })
        .catch(error => {
          commit('setRegistering', false);
          dispatch('alert/error', { message: error.response.data.message, redirect: false }, { root: true });
          reject();
        });
    });
  },
  login({ commit, dispatch }, payload) {
    commit('setLoggingIn', true);
    return new Promise((resolve, reject) => {
      api.post('user/login', payload)
        .then(response => {
          commit('setLoggingIn', false);
          commit('setUser', response.data);
          commit('setIsAuthenticated', true);
          dispatch('alert/success', { message: 'Successfully logged in!' }, { root: true });
          localStorage.setItem('user', JSON.stringify(response.data));
          resolve();
        })
        .catch(error => {
          commit('setLoggingIn', false);
          commit('setUser', null);
          commit('setIsAuthenticated', false);
          dispatch('alert/error', { message: error.response.data.message, redirect: false }, { root: true });
          reject();
        });
    });
  },
  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      api.post('user/logout')
        .then(response => {
          commit('setUser', null);
          commit('setIsAuthenticated', false);
          dispatch('alert/success', { message: response.data.message }, { root: true });
          localStorage.removeItem('user');
          resolve();
        })
        .catch(error => {
          dispatch('alert/error', { message: 'An error occurred while logging out.', redirect: false }, { root: true });
          reject('An error occurred while logging out: ' + error);
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