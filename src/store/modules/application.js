// This module contains code relative to Application State
import store from "@/store/index.js";
import router from "@/router/index.js";
import cloneDeep from "lodash/cloneDeep";
import mapValues from "lodash/mapValues";
import values from "lodash/values";
import includes from "lodash/includes";
import every from "lodash/every";

// Deep-cloning endpoints from config
const endpoints = cloneDeep(sourceEndpoints); // eslint-disable-line no-undef

const errorCodes = [500, 0];
const notFoundCodes = [400, 404, 422];
const badCodes = errorCodes.concat(notFoundCodes);

const state = {
  isLoading: {
    fullText: mapValues(endpoints.fullText, () => false),
    etablissementMain: mapValues(endpoints.etablissementMain, () => false),
    etablissementAdditional: mapValues(
      endpoints.etablissementAdditional,
      () => false
    )
  },
  status: {
    fullText: mapValues(endpoints.fullText, () => null),
    etablissementMain: mapValues(endpoints.etablissementMain, () => null),
    etablissementAdditional: mapValues(
      endpoints.etablissementAdditional,
      () => null
    )
  }
};

const getters = {
  // Getters to get fullText, Etablissement (main APIs) et Etablissement (secondary API)
  // 4 states : Loading, Error, Not found, Not working
  // The getters commented out are because not used yet, but might be useful
  fullTextLoading: state => {
    return includes(values(state.isLoading.fullText), true);
  },
  fullTextError: state => {
    return every(values(state.status.fullText), value =>
      includes(errorCodes, value)
    );
  },
  fullTextRNAError: state => {
    return includes(errorCodes, state.status.fullText["RNA"]);
  },
  fullTextSireneError: state => {
    return includes(errorCodes, state.status.fullText["SIRENE"]);
  },
  // fullTextNotFound: state => {
  //   return every(values(state.status.fullText), (value) => includes(notFoundCodes, value))
  // },
  // fullTextNotWorking: state => {
  //   return every(values(state.status.fullText), (value) => includes(badCodes, value))
  // },

  // Main endpoints (RNA_ID and SIRENE_SIRET)
  // any main API is loading = page Etablissement not ready
  mainAPISLoading: state => {
    return includes(values(state.isLoading.etablissementMain), true);
  },
  mainAPISError: state => {
    return every(values(state.status.etablissementMain), value =>
      includes(errorCodes, value)
    );
  },
  mainAPISNotFound: state => {
    return every(values(state.status.etablissementMain), value =>
      includes(notFoundCodes, value)
    );
  },
  // mainAPISNotWorking: (state) => {
  //   return every(values(state.status.etablissementMain), (value) => includes(badCodes, value))
  // },

  // Additional informations endpoints
  additionalAPILoading: state => {
    return api => {
      return state.isLoading.etablissementAdditional[api];
    };
  },
  additionalAPIAvailable: state => {
    return api => {
      return state.status.etablissementAdditional[api] == 200;
    };
  },
  additionalAPIError: state => {
    return api => {
      return includes(errorCodes, state.status.etablissementAdditional[api]);
    };
  },
  additionalAPINotWorking: state => {
    return api => {
      return includes(badCodes, state.status.etablissementAdditional[api]);
    };
  },
  additionalAPINotFound: state => {
    return api => {
      return includes(notFoundCodes, state.status.etablissementAdditional[api]);
    };
  },

  isWelcomeTextVisible: () => {
    if (store.state.route.name != "Home") {
      return false;
    }
    return true;
  }
};

const mutations = {
  setLoadingFullText(state, { value, endpoint }) {
    if (endpoint == "ALL") {
      state.isLoading.fullText = mapValues(
        state.isLoading.fullText,
        () => value
      );
    } else {
      state.isLoading.fullText[endpoint] = value;
    }
  },
  setLoadingMainAPI(state, { value, endpoint }) {
    if (endpoint == "ALL") {
      state.isLoading.etablissementMain = mapValues(
        state.isLoading.etablissementMain,
        () => value
      );
    } else {
      state.isLoading.etablissementMain[endpoint] = value;
    }
  },
  setLoadingAdditionalAPI(state, { value, endpoint }) {
    if (endpoint == "ALL") {
      state.isLoading.etablissementAdditional = mapValues(
        state.isLoading.etablissementAdditional,
        () => value
      );
    } else {
      state.isLoading.etablissementAdditional[endpoint] = value;
    }
  },
  setStatusFullText(state, { value, endpoint }) {
    if (endpoint == "ALL") {
      state.status.fullText = mapValues(state.status.fullText, () => value);
    } else {
      state.status.fullText[endpoint] = value;
    }
  },
  setStatusMainAPI(state, { value, endpoint }) {
    if (endpoint == "ALL") {
      state.status.etablissementMain = mapValues(
        state.status.etablissementMain,
        () => value
      );
    } else {
      state.status.etablissementMain[endpoint] = value;
    }
  },
  setStatusAdditionalAPI(state, { value, endpoint }) {
    if (endpoint == "ALL") {
      state.status.etablissementAdditional = mapValues(
        state.status.etablissementAdditional,
        () => value
      );
    } else {
      state.status.etablissementAdditional[endpoint] = value;
    }
  }
};

const actions = {
  clearAllStatus() {
    store.commit("setStatusFullText", { value: null, endpoint: "ALL" });
    store.commit("setStatusMainAPI", { value: null, endpoint: "ALL" });
    store.commit("setStatusAdditionalAPI", { value: null, endpoint: "ALL" });
  },
  resetApplicationState() {
    store.dispatch("clearAllStatus");
    store.commit("clearSirenResults");
    store.commit("setStoredSuggestions", "");
    store.commit("clearAdditionalInfos", "ALL");
    store.commit("setSinglePageResults", { value: null, api: "ALL" });
  },
  goToClearedHomePage() {
    router.push({ path: `/` });
    store.commit("setStoredSuggestions", "");
    store.commit("setFullText", "");
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
