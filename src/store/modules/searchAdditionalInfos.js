// This module is for code relative to searching additional information
// after we have a base of information already
// For now: RNA / RNCS / RNM from SIRENE, SIRENE from RNA
import store from "@/store/index.js";

const state = {
  baseAdressAdditionalInfo: {
    RNCS: process.env.VUE_APP_BASE_ADDRESS_RNCS,
    RNM: process.env.VUE_APP_RNM
  }
};

const getters = {
  idAssociationFromSirene: () => {
    if (store.state.resultsEtablissement.singlePageResult["SIRENE"]) {
      return store.state.resultsEtablissement.singlePageResult["SIRENE"]
        .etablissement.numero_rna;
    }
    return null;
  },
  siretFromRNA: () => {
    if (store.state.resultsEtablissement.singlePageResult["RNA"]) {
      return store.state.resultsEtablissement.singlePageResult["RNA"]
        .association.siret;
    }
    return null;
  }
};

const actions = {
  async executeSearchRNCS(dispatch, siren) {
    const api = "RNCS";
    store.commit("setLoadingAdditionalAPI", { value: true, endpoint: api });

    await store
      .dispatch("sendAPIRequest", state.baseAdressAdditionalInfo[api] + siren)
      .then(response => {
        store.dispatch("setResponseAdditionalInfo", {
          response: response,
          api: api
        });
      })
      .catch(notFound => {
        store.dispatch("setResponseAdditionalInfo", {
          response: notFound,
          api: api
        });
      })
      .finally(() =>
        store.commit("setLoadingAdditionalAPI", { value: false, endpoint: api })
      );
  },

  // When we have an RNA ID, check if there is a Siret. If yes, look up Sirene. If no, look up the ID in Sirene.
  async fromRNARequestOtherAPIs(dispatch, id) {
    if (store.getters.siretFromRNA) {
      await store.dispatch("executeSearchBySiret", {
        siret: store.getters.siretFromRNA,
        api: "SIRENE"
      });
    } else {
      await store.dispatch("executeSearchByIdAssociation", {
        id: id,
        api: "SIRENE"
      });
    }

    store.dispatch("searchAdditionalInfoSirene", "RNCS");
  },
  // When we have Siret, check if there is an RNA ID. If yes, look up RNA. If no, look up Siret in RNA.
  // Also get additional RNCS and RNM Info if from SIRENE
  async fromSireneRequestOtherAPIs(dispatch, siret) {
    if (store.getters.idAssociationFromSirene) {
      await store.dispatch("executeSearchByIdAssociation", {
        id: store.getters.idAssociationFromSirene,
        api: "RNA"
      });
    } else {
      await store.dispatch("executeSearchBySiret", {
        siret: siret,
        api: "RNA"
      });
    }
    store.dispatch("searchAdditionalInfoSirene", "RNM");
  },

  searchAdditionalInfoSirene(dispatch, api) {
    store.commit("setLoadingAdditionalAPI", { value: true, endpoint: api });
    const siren = store.getters.singlePageEtablissementSirene.siren;

    store
      .dispatch("sendAPIRequest", state.baseAdressAdditionalInfo[api] + siren)
      .then(response => {
        store.dispatch("setResponseAdditionalInfo", {
          response: response,
          api: api
        });
      })
      .catch(notFound => {
        store.dispatch("setResponseAdditionalInfo", {
          response: notFound,
          api: api
        });
      })
      .finally(() =>
        store.commit("setLoadingAdditionalAPI", { value: false, endpoint: api })
      );
  }
};

export default {
  state,
  getters,
  actions
};
