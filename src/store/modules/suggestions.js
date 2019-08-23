// This module contains code relative to suggestions
import Vue from "vue";
import store from "@/store/index.js";
import debounce from "lodash/debounce";
import filterMixin from "@/components/mixins/filters";

const state = {
  baseAdressSuggestions: process.env.VUE_APP_SIRENE_SUGGESTIONS,
  storedSuggestions: {},
  suggestActive: ""
};

const mutations = {
  setStoredSuggestions(state, suggestions) {
    state.storedSuggestions = suggestions;
  }
};
const actions = {
  executeSearchSuggestions: debounce(function(dispatch, suggestion) {
    Vue.http.get(state.baseAdressSuggestions + suggestion).then(
      response => {
        store.dispatch("filterAndStoreSuggestions", response.body);
      },
      () => {
        store.commit("setStoredSuggestions", "");
      }
    );
  }, 30), // delay between suggestion searches
  filterAndStoreSuggestions: function(state, suggestionsObject) {
    const suggestionsArray = suggestionsObject.suggestions;
    const filteredSuggestions = suggestionsArray.map(
      filterMixin.filters.removeExtraChars
    );
    store.commit("setStoredSuggestions", filteredSuggestions);
  }
};

export default {
  state,
  mutations,
  actions
};
