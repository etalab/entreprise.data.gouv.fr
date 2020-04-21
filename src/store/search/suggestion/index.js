import axios from "axios";
import { removeExtraChars } from "@/helpers";

const http = axios.create({
  baseURL: `${process.env.VUE_APP_SIRENE_SUGGESTIONS}`,
  timeout: 30000
});

const state = {
  suggestions: []
};

const getters = {
  getSuggestions(state) {
    return state.suggestions.slice(0, 5);
  }
};

const mutations = {
  fillSuggestions(state, suggestions) {
    state.suggestions = suggestions.map(removeExtraChars);
  },

  emptySuggestions(state) {
    state.suggestions = [];
  }
};

const actions = {
  requestSuggestions({ commit }, searchInput) {
    const url = `${searchInput}`;
    http.get(url)
      .then(response => commit("fillSuggestions", response.data.suggestions))
      .catch(function(error) {
        if (error.response.status === 404) commit("emptySuggestions");
        else console.error(error);
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
