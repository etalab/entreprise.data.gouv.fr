<template>
  <div class="company__panel panel">
    <h4>Informations d’immatriculation et d’activité</h4>
    <div class="company__item">
      <div class="company__item">
        <div class="company__item-key">Type d’inscription</div>
        <div class="company__item-value">
          {{ PrincipaleOrSecondaire(this.RNCSData.type_inscription) }}
        </div>
      </div>
      <div class="company__item-key">Greffe</div>
      <div class="company__item-value">
        {{ RNCSConcatGreffe(this.RNCSData) }}
      </div>
    </div>
    <panel-info :parent="RNCSData" :elements="this.elementsToDisplay1" />
    <div class="company__item" v-if="haveRNCSPhysicalDAP">
      <div class="company__item-key">
        Déclaration d’attribution de Patrimoine :
      </div>
      <div class="company__item-value">{{ RNCSPhysical.dap }}</div>
    </div>
    <div class="company__item" v-if="RNCSPhysicalDAPIsPositive">
      <div class="company__item-key">
        Déclaration d’attribution de Patrimoine, Adresse :
      </div>
      <div class="company__item-value">
        <div v-if="RNCSPhysical.dap_adresse_ligne_1">
          {{ RNCSPhysical.dap_adresse_ligne_1 | ifExist }}
        </div>
        <div v-if="RNCSPhysical.dap_adresse_ligne_2">
          {{ RNCSPhysical.dap_adresse_ligne_2 }}
        </div>
        <div v-if="RNCSPhysical.dap_adresse_ligne_3">
          {{ RNCSPhysical.dap_adresse_ligne_3 }}
        </div>
        <div>{{ RNCSConcatAddressDAP(RNCSPhysical) }}</div>
        <div v-if="RNCSPhysical.dap_adresse_code_commune">
          Code Commune {{ RNCSPhysical.dap_adresse_code_commune }}
        </div>
      </div>
      <panel-info-inline
        class="company__item"
        :parent="RNCSPhysical"
        :elements="this.elementsToDisplay3"
      />
    </div>
  </div>
</template>

<script>
import PanelInfo from "@/components/etablissement/etablissementRNCS/templates/PanelInfo";
import PanelInfoInline from "@/components/etablissement/etablissementRNCS/templates/PanelInfoInline";
import Filters from "@/components/mixins/filters";
import RNCSFormating from "@/components/etablissement/etablissementRNCS/mixins/RNCSformating";

export default {
  name: "EtablissementRNCSRegistration",
  components: {
    PanelInfo: PanelInfo,
    PanelInfoInline: PanelInfoInline
  },
  data() {
    return {
      elementsToDisplay1: {
        "Numero Gestion Greffe": "numero_gestion",
        "Date de clotûre": "date_cloture",
        "Date de clotûre exceptionnelle": "date_cloture_exceptionnelle",
        "Durée personne morale": "duree_pm",
        "Economie Sociale Solidaire": "economie_sociale_solidaire",
        "Activité foraine": "activite_forain",
        "Status EIRL": "eirl",
        "Date d’immatriculation": "date_immatriculation",
        "Date de première immatriculation": "date_premiere_immatriculation",
        "Date de radiation": "date_radiation",
        "Date de transfert": "date_transfert",
        "Sans activité": "sans_activite",
        "Date de début d’activité": "date_debut_activite",
        "Date de début de première activité": "date_debut_premiere_activite",
        "Date de cessation d’activité": "date_cessation_activite"
      },
      elementsToDisplayDAP: {
        Dénomination: "dap_denomination",
        Objet: "dap_objet",
        "Date de fermeture": "dap_date_cloture"
      }
    };
  },
  computed: {
    RNCSData() {
      return this.$store.getters.RNCSData;
    },
    // Publishing DAP here from RNCSPhysical if exists, for formatting purpose
    RNCSPhysical() {
      return this.RNCSData.personne_physique;
    },
    haveRNCSPhysicalDAP() {
      return this.RNCSPhysical && this.RNCSPhysical.dap;
    },
    RNCSPhysicalDAPIsPositive() {
      if (this.haveRNCSPhysicalDAP && this.RNCSPhysical.dap == "Oui") {
        return true;
      }
      return false;
    }
  },
  mixins: [Filters, RNCSFormating]
};
</script>
