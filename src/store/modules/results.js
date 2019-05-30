// This module contains code relative to Results registration
// All SIRENE and RNA Endpoints except SIREN
import store from "@/store/index.js";

const state = {
  fullTextResults: {
    RNA: null,
    SIRENE: null
  },
  singlePageResult: {
    RNA: null,
    SIRENE: null
  }
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
  storedSpellcheckSirene: state => {
    if (state.fullTextResults["SIRENE"]) {
      return state.fullTextResults["SIRENE"].spellcheck;
    }
    return null;
  },
  storedSpellcheckRNA: state => {
    if (state.fullTextResults["RNA"]) {
      return state.fullTextResults["RNA"].spellcheck;
    }
    return null;
  },
  fullTextResultsSirene: state => {
    if (state.fullTextResults["SIRENE"]) {
      return state.fullTextResults["SIRENE"].etablissement;
    }
    return null;
  },
  fullTextResultsRNA: state => {
    if (state.fullTextResults["RNA"]) {
      return state.fullTextResults["RNA"].association;
    }
    return null;
  },
  singlePageEtablissementSirene: () => {
    if (store.state.results.singlePageResult["SIRENE"]) {
      return store.state.results.singlePageResult["SIRENE"].etablissement;
    }
    return null;
  },
  singlePageEtablissementRNA: () => {
    if (store.state.results.singlePageResult["RNA"]) {
      return store.state.results.singlePageResult["RNA"].association;
    }
    return null;
  },
  numberResultsFullTextSirene: state => {
    if (state.fullTextResults["SIRENE"]) {
      return state.fullTextResults["SIRENE"].total_results;
    } else {
      return 0;
    }
  },
  numberResultsFullTextRNA: state => {
    if (state.fullTextResults["RNA"]) {
      return state.fullTextResults["RNA"].total_results;
    } else {
      return 0;
    }
  },
  totalPageNumberSirene: state => {
    if (
      state.fullTextResults["SIRENE"] &&
      state.fullTextResults["SIRENE"].total_pages
    ) {
      return state.fullTextResults["SIRENE"].total_pages;
    } else {
      return 0;
    }
  },
  totalPageNumberRNA: state => {
    if (
      state.fullTextResults["RNA"] &&
      state.fullTextResults["RNA"].total_pages
    ) {
      return state.fullTextResults["RNA"].total_pages;
    } else {
      return 0;
    }
  }
};

const mutations = {
  setFullTextResults(state, { value, api }) {
    state.fullTextResults[api] = value;
  },
  clearFullTextResults(state, api) {
    if (api == "ALL") {
      state.singlePageResult = {
        RNA: null,
        SIRENE: null
      };
    } else {
      state.fullTextResults[api] = null;
    }
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
  setResponseFullText(dispatch, { response, api }) {
    store.commit("setStatusFullText", {
      value: response.status,
      endpoint: api
    });
    store.commit("setFullTextResults", { value: response.body, api: api });
  },
  setResponseEtablissement(dispatch, { response, api }) {
    store.commit("setStatusMainAPI", { value: response.status, endpoint: api });
    if (response.status == 200) {
      store.commit("setSinglePageResults", { value: response.body, api: api });
    } else {
      store.commit("setSinglePageResults", { value: null, api: api });
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
