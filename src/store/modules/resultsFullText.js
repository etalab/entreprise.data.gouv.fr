// This module contains code relative to FullText results
import store from "@/store/index.js";

const state = {
  fullTextResults: {
    RNA: null,
    SIRENE: null
  }
};

const getters = {
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
  }
};

const actions = {
  setResponseFullText(dispatch, { response, api }) {
    store.commit("setStatusFullText", {
      value: response.status,
      endpoint: api
    });
    store.commit("setFullTextResults", { value: response.body, api: api });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
