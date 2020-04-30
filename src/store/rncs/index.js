import axios from "axios";
import toUpper from "lodash/toUpper";
import orderBy from "lodash/orderBy";
import { concatNames, frenchDateFormat, formatAddressZone } from "@/helpers";

const http = axios.create({
  baseURL: `${process.env.VUE_APP_FICHE_IDENTITE_RNCS}`,
  timeout: 30000
});

const state = {
  dossierPrincipal: {}
};

const getters = {
  getLastUpdate(state) {
    return frenchDateFormat(state.dossierPrincipal.db_current_date);
  },

  getCompanyTitle(state, getters) {
    if (getters.getPersonneMorale) return getters.getPersonneMoraleAttribute("denomination");
    else if (getters.getPersonnePhysique) return getters.getPersonnePhysiqueTitle;
  },

  getPersonnePhysiqueTitle(state, { getPersonnePhysiqueAttribute }) {
    return concatNames(
      getPersonnePhysiqueAttribute("prenoms"),
      getPersonnePhysiqueAttribute("nom_patronyme")
    );
  },

  getPersonnePhysiqueIdentity(state, { getPersonnePhysiqueAttribute, getPersonnePhysiqueTitle }) {
    const data = {
      "Nom": getPersonnePhysiqueTitle(),
      "Nom d'usage": toUpper(getPersonnePhysiqueAttribute("nom_usage")),
      "Pseudonyme": getPersonnePhysiqueAttribute("pseudonyme"),
      "Date de naissance": getPersonnePhysiqueAttribute("date_naissance"),
      "Ville de naissance": getPersonnePhysiqueAttribute("ville_naissance"),
      "Pays de naissance": getPersonnePhysiqueAttribute("pays_naissance"),
      "Nationalité": getPersonnePhysiqueAttribute("nationalite")
    };
    return data;
  },

  getPersonnePhysiqueAddress(state) {
    const adresseZone = formatAddressZone(
      state.dossierPrincipal.personne_physique.adresse_code_postal,
      state.dossierPrincipal.personne_physique.adresse_ville,
      state.dossierPrincipal.personne_physique.adresse_pays
    );
    return {
      ligne_1: state.dossierPrincipal.personne_physique.adresse_ligne_1,
      ligne_2: state.dossierPrincipal.personne_physique.adresse_ligne_2,
      ligne_3: state.dossierPrincipal.personne_physique.adresse_ligne_3,
      zone: adresseZone
    }
  },

  getConjointCollaborateur(state, { getPersonnePhysiqueAttribute }) {
    const nom = concatNames(
      getPersonnePhysiqueAttribute("conjoint_collab_prenoms"),
      getPersonnePhysiqueAttribute("conjoint_collab_nom_patronyme")
    );
    if (nom === null) return null;
    else {
      return {
        "Conjoint collaborateur, Nom": nom,
        "Conjoint collaborateur, Nom d’usage": getPersonnePhysiqueAttribute("conjoint_collab_nom_usage"),
        "Conjoint collaborateur, date de fin": getPersonnePhysiqueAttribute("conjoint_collab_date_fin"),
        "Conjoint collaborateur, Pseudonyme": getPersonnePhysiqueAttribute("conjoint_collab_pseudonyme")
      }
    }
  },

  getRegistrationDetails(state, getters) {
    const data = {
      "Type d'inscription": getters.typeInscription,
      "Greffe": getters.friendlyGreffeId,
      "Numero Gestion Greffe": state.dossierPrincipal.numero_gestion,
      "Date de clotûre de l'exercice sociale": getters.getPersonneMoraleAttribute("date_cloture"),
      "Date de clotûre du 1er exercice sociale": getters.getPersonneMoraleAttribute("date_cloture_exceptionnelle"),
      "Durée de la personne morale": getters.friendlyDureePM,
      "Economie Sociale Solidaire": getters.getPersonneMoraleAttribute("economie_sociale_solidaire"),
      "Activité foraine": getters.getPersonnePhysiqueAttribute("activite_forain"),
      "Status EIRL": getters.getPersonnePhysiqueAttribute("eirl"),
      "Date d’immatriculation": state.dossierPrincipal.date_immatriculation,
      "Date de première immatriculation": state.dossierPrincipal.date_premiere_immatriculation,
      "Date de radiation": state.dossierPrincipal.date_radiation,
      "Date de transfert": state.dossierPrincipal.date_transfert,
      "Sans activité": state.dossierPrincipal.sans_activite,
      "Date de début d’activité": state.dossierPrincipal.date_debut_activite,
      "Date de début de première activité": state.dossierPrincipal.date_debut_premiere_activite,
      "Date de cessation d’activité": state.dossierPrincipal.date_cessation_activite
    }
    return data;
  },

  getPersonneMorale(state) {
    return state.dossierPrincipal.personne_morale;
  },

  getRepresentantsPersonneMorale(state) {
    return state.dossierPrincipal.representants.filter(
      rep => rep.type_representant && RegExp(/morale/).test(rep.type_representant.toLowerCase())
    );
  },

  getRepresentantsPersonnePhysique(state) {
    return state.dossierPrincipal.representants.filter(
      rep => rep.type_representant && RegExp(/physique/).test(rep.type_representant.toLowerCase())
    );
  },

  getObservations(state) {
    const nonEmptyObservations = state.dossierPrincipal.observations.filter(
      obs => obs.texte !== null
    );
    return orderBy(nonEmptyObservations, "date_ajout", "desc");
  },

  getPersonneMoraleAttribute: (state) => (attr) => {
    return state.dossierPrincipal.personne_morale ? state.dossierPrincipal.personne_morale[attr] : null;
  },

  getPersonnePhysiqueAttribute: (state) => (attr) => {
    return state.dossierPrincipal.personne_physique ? state.dossierPrincipal.personne_physique[attr] : null;
  },

  getPersonnePhysique(state) {
    return state.dossierPrincipal.personne_physique;
  },

  getDAPDetails(state, getters) {
    if (getters.getPersonnePhysiqueAttribute("dap") !== "Oui") return null;
    else {
      const dapAddressZone = formatAddressZone(
        getters.getPersonnePhysique.dap_adresse_code_postal,
        getters.getPersonnePhysique.dap_adresse_ville,
        getters.getPersonnePhysique.dap_adresse_pays
      );

      return {
        dap_adresse_ligne_1: getters.getPersonnePhysique.dap_adresse_ligne_1,
        dap_adresse_ligne_2: getters.getPersonnePhysique.dap_adresse_ligne_2,
        dap_adresse_ligne_3: getters.getPersonnePhysique.dap_adresse_ligne_3,
        dap_adresse_zone: dapAddressZone,
        dap_adresse_code_commune: getters.getPersonnePhysique.dap_adresse_code_commune,
        denomination: getters.getPersonnePhysique.dap_denomination,
        objet: getters.getPersonnePhysique.dap_objet,
        date_cloture: getters.getPersonnePhysique.dap_date_cloture
      }
    }
  },

  typeInscription(state) {
    const inscription = state.dossierPrincipal.type_inscription;
    if (inscription === "P") return "Principale";
    else if (inscription === "S") return "Secondaire";
    else return "Donnée erronée";
  },

  friendlyGreffeId(state) {
    const nomGreffe = state.dossierPrincipal.nom_greffe;
    const codeGreffe = state.dossierPrincipal.code_greffe;
    return `${nomGreffe} (Code : ${codeGreffe})`;
  },

  friendlyDureePM(state) {
    const immatDateString = state.dossierPrincipal.date_premiere_immatriculation;
    if (immatDateString === null) return null;
    const dateEl = immatDateString.split('/');
    const immatDate = new Date(dateEl[2], dateEl[1] - 1, dateEl[0]);
    const yearsToLast = parseInt(state.dossierPrincipal.personne_morale.duree_pm);
    const endDate = new Date(immatDate.setFullYear(immatDate.getFullYear() + yearsToLast)).toString();

    return `Jusqu'au ${frenchDateFormat(endDate)}`;
  },

  getSiege(state) {
    const siege = state.dossierPrincipal.etablissements.find(eta => {
      return eta.type_etablissement == "SIE" || eta.type_etablissement == "SEP";
    });
    return siege;
  }
};

const mutations = {
  fillRncsData(state, data) {
    state.dossierPrincipal = data.dossier_entreprise_greffe_principal;
  }
};

const actions = {
  async fetchData({ commit }, siren) {
    const response = await http.get(`${siren}`);
    commit("fillRncsData", response.data);
    commit("setApiDataAvailability", true, { root: true });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
