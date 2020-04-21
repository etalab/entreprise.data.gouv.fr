<template>
  <section v-if="dataLoaded" class="section">
    <div class="container">
      <rncs-error v-if="apiError" :message="apiErrorMsg" />
      <div v-else>
      <div class="company__buttons">
        <a
          class="button"
          :href="linkToPDF"
          title="Télécharger les données de cette entreprise au format PDF"
        >
          <img class="icon" src="@/assets/img/download.svg" alt="" />
          Version imprimable
        </a>
        <a
          class="button button__secondary"
          target="_blank"
          :href="linkToBodacc"
          title="Aller vers les annonces BODACC"
        >
          <img class="icon" src="@/assets/img/arrow_top_left.svg" alt="" />
          Annonces BODACC
        </a>
      </div>

      <div class="company">
        <div class="company-container">
          <div class="company__panel panel">
            <personne-morale-identity v-if="personneMorale"/>
            <personne-physique-identity v-if="personnePhysique" />
          </div>
          <registration-details />
        </div>
        <representants />
        <observations />
      </div>

      <div class="company__extra">
        <div class="notification grey">
          <div>
            Ces informations sont issues du RNCS mis à jour le {{ rncsLastUpdate }}.
          </div>
          <a
            class="button-outline secondary"
            target="_blank"
            :href="linkToJSON"
            title="Accéder aux données brutes de cette entreprise"
          >
            <img class="icon" src="@/assets/img/json.svg" alt="" />
            Accéder aux données JSON
          </a>
        </div>
      </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import PersonneMoraleIdentity from "@/components/pages/etablissement/rncs/PersonneMoraleIdentity";
import PersonnePhysiqueIdentity from "@/components/pages/etablissement/rncs/PersonnePhysiqueIdentity";
import RegistrationDetails from "@/components/pages/etablissement/rncs/RegistrationDetails";
import Representants from "@/components/pages/etablissement/rncs/Representants";
import Observations from "@/components/pages/etablissement/rncs/Observations";
import RncsError from "@/components/pages/etablissement/rncs/Errors";

export default {
  name: 'Rncs',

  metaInfo() {
    const titleLabel = this.companyTitle || this.siren;
    return {
      title: `${titleLabel} - Données du RNCS`
    }
  },

  props: { siren: String },

  data() {
    return {
      apiErrorMsg: "",
      baseAddress: process.env.VUE_APP_FICHE_IDENTITE_RNCS,
      bodaccAddress: "https://www.bodacc.fr/annonce/liste/",
      dataLoaded: false
    }
  },

  computed: {
    ...mapGetters({
      companyTitle: "rncs/getCompanyTitle",
      rncsLastUpdate: "rncs/getLastUpdate",
      personneMorale: "rncs/getPersonneMorale",
      personnePhysique: "rncs/getPersonnePhysique"
    }),

    linkToPDF: function() {
      return `${this.baseAddress}${this.siren}/pdf`;
    },

    linkToJSON: function() {
      return `${this.baseAddress}${this.siren}`;
    },

    linkToBodacc() {
      return `${this.bodaccAddress}${this.siren}`;
    },

    apiError() {
      return this.apiErrorMsg !== "";
    }
  },

  watch: {
    siren: function() { this.fetchRncsData() }
  },

  created() {
    this.fetchRncsData();
  },

  methods: {
    fetchRncsData: function() {
      this.dataLoaded = false;
      this.$store.dispatch("rncs/fetchData", this.siren)
        .catch((e) => this.apiErrorMsg = e.response.data.error)
        .finally(() => this.dataLoaded = true)
    }
  },

  components: {
    "personne-morale-identity": PersonneMoraleIdentity,
    "personne-physique-identity": PersonnePhysiqueIdentity,
    "registration-details": RegistrationDetails,
    "representants": Representants,
    "observations": Observations,
    "rncs-error": RncsError
  }
}
</script>

<style lang="scss" scoped>
.grey {
  background-color: $color-lightest-grey;
}

.button__secondary {
  background-color: $color-dark-grey !important;
  &:hover {
    background-color: $color-darker-grey !important;
  }
}

.notification {
  border-color: $color-grey;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .button-outline {
    flex-shrink: 0;
    margin-left: 1em;
  }
}

@media (max-width: $tablet) {
  .notification {
    flex-direction: column;

    .button-outline {
      margin-left: 0;
      margin-top: 1em;
    }
  }

  .company-container .panel + .panel {
    margin-left: 0;
  }
}

.company__buttons > .button {
  min-width: 220px;
  min-height: 42px;
  margin-left: 10px;
  margin-right: 10px;
}

.company__extra {
  margin-top: 2em;
}

.company-container .panel + .panel {
  margin-left: 2em;
}
</style>
