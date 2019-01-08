const jurisdiction = {
  state: {
    cache: sessionStorage.cache ? JSON.parse(sessionStorage.cache) : ''
  },

  mutations: {
    SET_JURISDICTION: (state, cache) => {
      state.cache = cache ? JSON.parse(cache) : '';
    }
  },

  actions: {
    GetJurisdictionCache({ commit }) {
      commit('SET_JURISDICTION', sessionStorage.cache);
    }
  }
};

export default jurisdiction
