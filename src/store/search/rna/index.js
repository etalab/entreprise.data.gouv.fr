import axios from "axios";

const http = axios.create({
  baseURL: `${process.env.VUE_APP_RNA_FULLTEXT}`,
  timeout: 30000
});

const state = {
  results: {
    metadata: {},
    associations: []
  }
};

const getters = {
  getResults(state) {
    return state.results.associations;
  },

  getResultsNumber(state) {
    return (parseInt(state.results.metadata.total_results) || 0);
  },

  getPagesNumber(state) {
    return (parseInt(state.results.metadata.total_pages) || 0);
  }
};

const mutations = {
  fillAssociations(state, associations) {
    state.results.associations = associations;
  },

  fillResultsMetadata(state, metadata) {
    state.results.metadata = metadata;
  },

  fillNoResults(state) {
    state.results.metadata = {};
    state.results.associations = [];
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
    commit("fillAssociations", response.association);
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
