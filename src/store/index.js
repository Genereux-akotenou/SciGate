import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      site: localStorage.getItem('site') || 'No site selected',
      currentMenu: 'dashboard',
      startTime: localStorage.getItem('startTime') ? parseInt(localStorage.getItem('startTime')) : Date.now(),
      elapsedTime: 0,
      sshManagerId: null
    };
  },
  mutations: {
    setSshManagerId(state, id) {
        state.sshManagerId = id;
    },
    setSite(state, site) {
      state.site = site;
      localStorage.setItem('site', site);
    },
    setCurrentMenu(state, menu) {
      state.currentMenu = menu;
    },
    setElapsedTime(state, time) {
      state.elapsedTime = time;
    },
    setStartTime(state, time) {
      state.startTime = time;
      localStorage.setItem('startTime', time);
    }
  },
  actions: {
    updateElapsedTime({ commit, state }) {
      const elapsedTime = Math.floor((Date.now() - state.startTime) / 1000);
      commit('setElapsedTime', elapsedTime);
    },
    saveSshManagerId({ commit }, id) {
        commit('setSshManagerId', id); 
    }
  },
  getters: {
    formattedTime(state) {
      const hours = String(Math.floor(state.elapsedTime / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((state.elapsedTime % 3600) / 60)).padStart(2, '0');
      const seconds = String(state.elapsedTime % 60).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    },
    getSshManagerId: (state) => state.sshManagerId 
  },
});

export default store;
