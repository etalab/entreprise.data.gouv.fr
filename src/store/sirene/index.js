import axios from "axios";
import { concatNames } from "@/helpers";

const httpEtablissement = axios.create({
  baseURL: `${process.env.VUE_APP_SIRENE_ETABLISSEMENT}`,
  timeout: 30000
});

const httpUniteLegale = axios.create({
  baseURL: `${process.env.VUE_APP_SIRENE_UNITE_LEGALE}`,
  timeout: 30000
});

const httpGeoJson = axios.create({
  baseURL: `${process.env.VUE_APP_SIRENE_GEOJSON}`,
  timeout: 30000
});

const state = {
  etablissement: {},
  uniteLegale: {},
  etablissementsNearby: {}
};

const getters = {
  getEtablissement(state) {
    return state.etablissement;
  },

  getUniteLegale(state) {
    return state.uniteLegale;
  },

  getCompanyTitle(state) {
    const isEntrepreneur = (state.uniteLegale.categorie_juridique === "1000")
    if (isEntrepreneur) return concatNames(state.uniteLegale.prenom_1, state.uniteLegale.nom)
    else return state.uniteLegale.denomination
  },

  getEtablissementsNearby(state) {
    return state.etablissementsNearby;
  },

  getFormattedAddress(state) {
    if (
      state.etablissement.numero_voie &&
      state.etablissement.type_voie &&
      state.etablissement.libelle_voie
    ) {
      return `${state.etablissement.numero_voie} ${state.etablissement.type_voie} ${state.etablissement.libelle_voie}`;
    }
    else return null;
  }
};

const mutations = {
  fillEtablissement(state, etablissement) {
    state.etablissement = etablissement;
  },

  fillUniteLegale(state, uniteLegale) {
    state.uniteLegale = uniteLegale;
  },

  fillEtablissementsNearby(state, geoJson) {
    state.etablissementsNearby = geoJson;
  }
};

const actions = {
  async fetchEtablissement({ commit }, siret) {
    const response = await httpEtablissement.get(`${siret}`);
    const etablissement = response.data.etablissement;
    commit("fillEtablissement", etablissement);
  },

  async fetchUniteLegale({ commit }, siren) {
    const response = await httpUniteLegale.get(`${siren}`);
    commit("fillUniteLegale", response.data.unite_legale);
  },

  async fetchEtablissementsNearby({ commit }, siren) {
    try {
      const url = `${siren}/etablissements_geojson`;
      const response = await httpGeoJson.get(url);
      commit("fillEtablissementsNearby", response.data);
    } catch(e) {
      if (e.response.status === 404) commit("fillEtablissementsNearby", {});
      else console.error(e);
    }
  },

  async fetchAllData({ dispatch, state, commit }, sirenOrsiret) {
    try {
      // In case the entry point is the siret
      if (sirenOrsiret.length === 14) {
        await dispatch("fetchEtablissement", sirenOrsiret);
        const siren = state.etablissement.siren;
        await Promise.all([
          dispatch("fetchUniteLegale", siren),
          dispatch("fetchEtablissementsNearby", siren)
        ]);
      }
      // In case the entry point is the siren, loading uniteLegale first
      // to get the siret of the siege
      else if (sirenOrsiret.length === 9) {
        await Promise.all([
          dispatch("fetchUniteLegale", sirenOrsiret),
          dispatch("fetchEtablissementsNearby", sirenOrsiret)
        ]);
        state.etablissement = state.uniteLegale.etablissement_siege;
      }
      commit("setApiDataAvailability", true, { root: true })
    } catch(e) {
      if (e.response.status === 404) commit("setApiDataAvailability", false, { root: true });
      else console.error(e);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
