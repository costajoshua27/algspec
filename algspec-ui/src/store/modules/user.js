import api from '@/config/api';

const user = JSON.parse(localStorage.getItem('user'));
const state = { 
  user: user ? user : null,
  isAuthenticated: !!user,
  loggingIn: false,
  loginError: '',
  registerError: ''
};

const getters = {
};

const mutations = {
  registerFailure(state, errorMsg) {
    state.registerError = errorMsg;
  },
  loggingIn(state) {
    state.loggingIn = true;
    state.loginError = '';
  },
  loginSuccess(state, user) {
    state.isAuthenticated = true;
    state.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    state.loginError = '';
    state.loggingin = false;
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
  login({ commit }, payload) {
    commit('loggingIn');
    return new Promise((resolve, reject) => {
      api.post('user/login', payload)
        .then(response => {
          commit('loginSuccess', response.data);
          resolve();
        })
        .catch(error => {
          commit('loginFailure', error.response.data.message);
          reject(error);
        })
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