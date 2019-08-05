// This module contains code relative to Results registration
// only the ones from SIREN endpoint
import store from "@/store/index.js";

const state = {
  sirenResults: null
};

const getters = {
  singlePageEtablissementSirene: () => {
    if (state.resultsFullText.singlePageResult["SIRENE"]) {
      return state.resultsFullText.ult["SIRENE"].etablissement;
    }
    return null;
  },
  singlePageEtablissementRNA: () => {
    if (state.resultsFullText.ult["RNA"]) {
      return state.resultsFullText.ult["RNA"].association;
    }
    return null;
  },
  storedSirenSiege: state => {
    if (state.sirenResults) {
      return state.sirenResults.sirene.siege;
    }
    return null;
  },
  storedSirenTotalResults: state => {
    if (state.sirenResults) {
      return state.sirenResults.sirene.etablissements.length();
    }
    return null;
  },
  storedSirenChildren: state => {
    if (state.sirenResults) {
      return state.sirenResults.sirene.data.other_etablissements_sirets;
    }
  }
};

const mutations = {
  setSirenResults(state, value) {
    state.sirenResults = value;
  },
  clearSirenResults(state) {
    state.sirenResults = null;
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
