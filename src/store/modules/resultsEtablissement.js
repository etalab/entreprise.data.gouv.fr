// This module contains code relative to Results registration
// only the ones from SIREN endpoint
import store from "@/store/index.js";

const state = {
  singlePageResult: {
    RNA: null,
    SIRENE: null
  },
  sirenResults: null
};

const getters = {
  sireneAvailable: state => {
    if (state.singlePageResult["SIRENE"]) {
      return true;
    }
    return false;
  },
  RNAAvailable: state => {
    if (state.singlePageResult["RNA"]) {
      return true;
    }
    return false;
  },
  singlePageEtablissementSirene: () => {
    if (state.singlePageResult["SIRENE"]) {
      return state.singlePageResult["SIRENE"].etablissement;
    }
    return null;
  },
  singlePageEtablissementRNA: () => {
    if (state.singlePageResult["RNA"]) {
      return state.singlePageResult["RNA"].association;
    }
    return null;
  },
  storedSirenSiege: state => {
    if (state.sirenResults) {
      return state.sirenResults.unite_legale.etablissement_siege;
    }
    return null;
  },
  storedSirenTotalResults: state => {
    if (state.sirenResults) {
      return state.sirenResults.unite_legale.etablissements.length;
    }
    return null;
  },
  storedSirenChildren: state => {
    if (state.sirenResults && state.sirenResults.unite_legale) {
      const etablissements = state.sirenResults.unite_legale.etablissements;
      let listSiren = [];
      etablissements.forEach(etablissement => {
        listSiren.push(etablissement.siret);
      });
      return listSiren;
    }
  }
};

const mutations = {
  setSirenResults(state, value) {
    state.sirenResults = value;
  },
  clearSirenResults(state) {
    state.sirenResults = null;
  },
  setSinglePageResults(state, { value, api }) {
    if (api == "ALL") {
      state.singlePageResult = {
        RNA: value,
        SIRENE: value
      };
      return;
    }
    state.singlePageResult[api] = value;
  }
};

const actions = {
  async setResponseSiren(dispatch, response) {
    await store.commit("setStatusMainAPI", {
      value: response.status,
      endpoint: "SIRENE"
    });
    if (response.status == 200) {
      store.commit("setSirenResults", response.body);
    } else {
      store.commit("clearSirenResults");
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
