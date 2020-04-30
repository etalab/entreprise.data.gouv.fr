import axios from "axios";

const http = axios.create({
  baseURL: `${process.env.VUE_APP_SIRENE_FULLTEXT}`,
  timeout: 30000
});

const state = {
  results: {
    metadata: {},
    etablissements: []
  }
};

const getters = {
  getResults(state) {
    return state.results.etablissements;
  },

  getResultsNumber(state) {
    return (parseInt(state.results.metadata.total_results) || 0);
  },

  getPagesNumber(state) {
    return (parseInt(state.results.metadata.total_pages) || 0);
  }
};

const mutations = {
  fillEtablissements(state, etablissements) {
    state.results.etablissements = etablissements;
  },

  fillResultsMetadata(state, metadata) {
    state.results.metadata = metadata;
  },

  fillNoResults(state) {
    state.results.metadata = {};
    state.results.etablissements = [];
  }
};

const actions = {
  fulltextSearch({ dispatch, commit }, { searchInput, pageNumber }) {
    const url = `${searchInput}?per_page=5&page=${pageNumber}`;
    http.get(url)
      .then(response => dispatch("fillResults", response.data))
      .catch(function(error) {
        if (error.response.status === 404) commit("fillNoResults");
        else console.error(error);
      });
  },

  fillResults({ commit }, response) {
    commit("fillEtablissements", response.etablissement);
    commit("fillResultsMetadata", {
      total_results: response.total_results,
      total_pages: response.total_pages,
      per_page: response.per_page,
      page: response.page
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
