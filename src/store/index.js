import "es6-promise/auto";

import Vue from "vue";
import Vuex from "vuex";

import search from "./search";
import sirene from "./sirene";
import rna from "./rna";
import rncs from "./rncs";

Vue.use(Vuex);

const state = {
  apiDataIsAvailable: true
};

const mutations = {
  setApiDataAvailability(state, status) {
    state.apiDataIsAvailable = status;
  }
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: state,
  mutations: mutations,
  modules: {
    search,
    sirene,
    rna,
    rncs
  }
});
