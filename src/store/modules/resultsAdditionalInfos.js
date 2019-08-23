// This module contains code relative to Results registration
// that are not from SIRENE, SIREN/RNM or RNA
import store from "@/store/index.js";

const state = {
  additionalResults: {
    RNM: null,
    RNCS: null
  }
};

const getters = {
  RNMAvailable: state => {
    if (state.additionalResults["RNM"]) {
      return true;
    }
    return false;
  },
  RNCSData: state => {
    if (state.additionalResults["RNCS"]) {
      return state.additionalResults["RNCS"]
        .dossier_entreprise_greffe_principal;
    }
    return false;
  },
  RNCSError: state => {
    if (state.additionalResults["RNCS"]) {
      return state.additionalResults["RNCS"].error;
    }
  },
  RNMData: state => {
    if (state.additionalResults["RNM"]) {
      return state.additionalResults["RNM"];
    }
    return false;
  }
};

const mutations = {
  setAdditionalInfos: (state, { results, api }) => {
    state.additionalResults[api] = results;
  },
  clearAdditionalInfos: (state, api) => {
    if (api == "ALL") {
      state.additionalResults = {
        RNM: null,
        RNCS: null
      };
    } else {
      state.additionalResults[api] = null;
    }
  }
};

const actions = {
  async setResponseAdditionalInfo(dispatch, { response, api }) {
    store.commit("setAdditionalInfos", { results: response.body, api: api });
    store.commit("setStatusAdditionalAPI", {
      value: response.status,
      endpoint: api
    });

    // TEMPORARY HACK : RNM is returning 200 even in case of empty JSON.
    // This will change soon but in the meantime we have manage this.
    if (api == "RNM" && response.body.ID == null) {
      store.commit("setStatusAdditionalAPI", { value: 404, endpoint: "RNM" });
      store.commit("setAdditionalInfos", { results: null, api: "RNM" });
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
