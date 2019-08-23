// This module contains code relative to fulltext search
import store from "@/store/index.js";
import router from "@/router/index.js";

const state = {
  storedFullText: "",
  storedLastFullText: "",
  pageNumber: 1,

  baseAdressFullText: {
    SIRENE: process.env.VUE_APP_SIRENE_FULLTEXT,
    RNA: process.env.VUE_APP_RNA_FULLTEXT
  }
};

const getters = {
  addressToGetFullText: (state, api) => {
    return state.baseAdressFullText[api] + store.getters.queryToGet;
  },
  queryToGet: () => {
    return store.state.route.query.fullText + store.getters.pageNumberToGet;
  },
  pageNumberToGet: state => {
    return "?per_page=5&page=" + state.pageNumber;
  },
  storedFullText: state => {
    return state.storedFullText;
  },
  pageNumber: state => {
    return state.pageNumber;
  }
};

const mutations = {
  setFullText(state, value) {
    state.storedFullText = value;
  },
  setLastFullText(state, value) {
    state.storedLastFullText = value;
  },
  setPage(state, value) {
    state.pageNumber = value;
  }
};

const actions = {
  requestSearchFullText() {
    router.push({
      path: "/search",
      query: {
        fullText: state.storedFullText,
        page: state.pageNumber
      }
    });
    store.dispatch("searchFullText");
    // We save the last fulltext searched, so Results page display correctly name of last search
    store.commit("setLastFullText", state.storedFullText);
  },

  searchFullText() {
    store.dispatch("executeSearchFullText", "SIRENE");
    store.dispatch("executeSearchFullText", "RNA");
  },

  async executeSearchFullText(dispatch, api) {
    store.commit("setLoadingFullText", { value: true, endpoint: api });
    await store
      .dispatch("sendAPIRequest", getters.addressToGetFullText(state, api))
      .then(response => {
        store.dispatch("setResponseFullText", { response: response, api: api });
      })
      .catch(error => {
        store.dispatch("setResponseFullText", { response: error, api: api });
      })
      .finally(() =>
        store.commit("setLoadingFullText", { value: false, endpoint: api })
      );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
