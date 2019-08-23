// This module contains code relative to base search on Etablissement page
import Vue from "vue";
import store from "@/store/index.js";
import regExps from "@/components/mixins/regExps.js";

const state = {
  baseAdressSiret: {
    SIRENE: process.env.VUE_APP_SIRENE_SIRET,
    RNA: process.env.VUE_APP_RNA_SIRET
  },
  baseAdressRNAId: {
    SIRENE: process.env.VUE_APP_SIRENE_ID_ASSOCIATION, // THIS!!!
    RNA: process.env.VUE_APP_RNA_ID_ASSOCIATION
  },
  baseAdressSiren: process.env.VUE_APP_SIRENE_SIREN
};

const actions = {
  async executeSearchEtablissement(dispatch, searchId) {
    await store.dispatch("resetApplicationState");
    const natureSearchId = regExps.methods.analyzeSearchId(searchId);

    switch (natureSearchId) {
      case "SIRET":
        await store.dispatch("searchEtablissementFromSiret", searchId);
        break;
      case "SIREN":
        await store.dispatch("searchEtablissementFromSiren", searchId);
        break;
      case "ID_ASSOCIATION":
        await store.dispatch("searchEtablissementFromIdAssociation", searchId);
        break;
      default:
        store.commit("setStatusMainAPI", { value: 404, endpoint: "ALL" });
    }
    store.commit("setLoadingMainAPI", { value: false, endpoint: "ALL" });
  },

  async searchEtablissementFromSiret(dispatch, searchId) {
    await store.dispatch("executeSearchBySiret", {
      siret: searchId,
      api: "SIRENE"
    });
    if (store.getters.singlePageEtablissementSirene)
      await store.dispatch(
        "executeSearchBySiren",
        store.getters.singlePageEtablissementSirene.siren
      );
    store.dispatch("fromSireneRequestOtherAPIs", searchId);
  },

  async searchEtablissementFromSiren(dispatch, searchId) {
    await store.dispatch("executeSearchBySiren", searchId);
    if (store.getters.storedSirenSiege) {
      await store.dispatch("executeSearchBySiret", {
        siret: store.getters.storedSirenSiege.siret,
        api: "SIRENE"
      });
      store.dispatch(
        "fromSireneRequestOtherAPIs",
        store.getters.storedSirenSiege.siret
      );
    } else {
      // Need to fill RNA error status value to respect error manaement
      store.commit("setStatusMainAPI", { value: 404, endpoint: "RNA" });
    }
  },

  async searchEtablissementFromIdAssociation(dispatch, searchId) {
    await store.dispatch("executeSearchByIdAssociation", {
      id: searchId,
      api: "RNA"
    });
    store.dispatch("fromRNARequestOtherAPIs", searchId);
  },

  async executeSearchBySiret(dispatch, { siret, api }) {
    store.commit("setLoadingMainAPI", { value: true, endpoint: api });
    await store
      .dispatch("sendAPIRequest", state.baseAdressSiret[api] + siret)
      .then(response => {
        store.dispatch("setResponseEtablissement", {
          response: response,
          api: api
        });
      })
      .catch(notFound => {
        store.dispatch("setResponseEtablissement", {
          response: notFound,
          api: api
        });
      })
      .finally(() =>
        store.commit("setLoadingMainAPI", { value: false, endpoint: api })
      );
  },

  async executeSearchByIdAssociation(dispatch, { id, api }) {
    store.commit("setLoadingMainAPI", { value: true, endpoint: api });
    await store
      .dispatch("sendAPIRequest", state.baseAdressRNAId[api] + id)
      .then(response => {
        store.dispatch("setResponseEtablissement", {
          response: response,
          api: api
        });
      })
      .catch(notFound => {
        store.dispatch("setResponseEtablissement", {
          response: notFound,
          api: api
        });
      })
      .finally(() =>
        store.commit("setLoadingMainAPI", { value: false, endpoint: api })
      );
  },

  // This function is API-Sirene only
  async executeSearchBySiren(dispatch, siren) {
    await store
      .dispatch("sendAPIRequest", dispatch.state.baseAdressSiren + siren)
      .then(response => {
        store.dispatch("setResponseSiren", response);
      })
      .catch(notFound => {
        store.dispatch("setResponseSiren", notFound);
      })
      .finally(() =>
        store.commit("setLoadingMainAPI", { value: false, endpoint: "SIRENE" })
      );
  },

  sendAPIRequest: async function(dispatch, query) {
    return await Vue.http.get(query);
  }
};

export default {
  state,
  actions
};
