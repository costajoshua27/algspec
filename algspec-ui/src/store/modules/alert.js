const state = {
  variant: null,
  message: null,
  needToClear: false,
};

const getters = {

};

const mutations = {
  success(state, { message, redirect = true }) {
    state.variant = 'success';
    state.message = message;
    state.needToClear = !redirect;
  },
  error(state, { message, redirect = true }) {
    state.variant = 'danger';
    state.message = message;
    state.needToClear = !redirect;
  },
  warning(state, { message, redirect = true }) {
    state.variant = 'warning';
    state.message = message;
    state.needToClear = !redirect;
  },
  setNeedToClear(state, needToClear) {
    state.needToClear = needToClear;
  },
  clear(state) {
    state.variant = null;
    state.message = null;
    state.needToClear = false;
  }
};

const actions = {
  success({ commit }, message) {
    commit('success', message);
  },
  error({ commit }, message) {
    commit('error', message);
  },
  warning({ commit }, message) {
    commit('warning', message);
  },
  setNeedToClear({ commit }) {
    commit('setNeedToClear', true);
  },
  clear({ commit }) {
    commit('clear');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};