<template>
  <section class="section">
    <div class="container">
      <template v-if="isRNCSError">
        <div class="notification error">
          Erreur du service RNCS : {{ RNCSError }}
        </div>
        <etablissement-rncs-404 />
      </template>
      <blocks-skeleton v-if="RNCSLoading" />
      <div v-else-if="haveRNCSInfo">
        <div class="company__buttons">
          <a
            class="button"
            :href="dataRequestPDF"
            title="Télécharger les données de cette entreprise au format PDF"
          >
            <img class="icon" src="@/assets/img/download.svg" alt="" />
            Version imprimable
          </a>
          <a
            class="button button__secondary"
            target="_blank"
            :href="linkBodacc"
            title="Aller vers les annonces BODACC"
          >
            <img class="icon" src="@/assets/img/arrow_top_left.svg" alt="" />
            Annonces BODACC
          </a>
        </div>
        <etablissement-rncs />
      </div>
      <div v-if="haveRNCSInfo" class="company__extra">
        <div class="notification grey">
          <div>
            Ces informations sont issues du RNCS mis à jour le {{ RNCSUpdate }}.
          </div>
          <a
            class="button-outline secondary"
            target="_blank"
            :href="dataRequestURL"
            title="Accéder aux données brutes de cette entreprise"
          >
            <img class="icon" src="@/assets/img/json.svg" alt="" />
            Accéder aux données JSON
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Filters from "@/components/mixins/filters";
import Formating from "@/components/mixins/formating";
import EtablissementRNCS from "@/components/etablissement/EtablissementRNCS";
import EtablissementRNCS404 from "@/components/etablissement/etablissementRNCS/EtablissementRNCS404";
import BlocksSkeleton from "@/components/etablissement/skeletons/BlocksSkeleton";

export default {
  name: "EntrepriseIdentityRNCS",
  metaInfo() {
    return {
      title: this.titleEtablissement()
    };
  },
  components: {
    EtablissementRncs: EtablissementRNCS,
    "etablissement-rncs-404": EtablissementRNCS404,
    BlocksSkeleton: BlocksSkeleton
  },
  mixins: [Filters, Formating],
  data() {
    return {
      baseAddress: process.env.VUE_APP_BASE_ADDRESS_RNCS,
      bodaccAddress: "https://www.bodacc.fr/annonce/liste/"
    };
  },
  computed: {
    searchId() {
      return this.$route.params.searchId;
    },
    haveRNCSInfo() {
      return this.$store.getters.additionalAPIAvailable("RNCS");
    },
    dataRequestURL() {
      if (this.haveRNCSInfo) {
        return `${this.baseAddress}${this.$store.getters.RNCSData.siren}`;
      }
      return null;
    },
    dataRequestPDF() {
      return `${this.baseAddress}${this.searchId}/pdf`;
    },
    RNCSUpdate() {
      if (this.haveRNCSInfo) {
        return Filters.filters.frenchDateFormat(
          this.$store.getters.RNCSData.db_current_date
        );
      }
      return null;
    },
    RNCSLoading() {
      return this.$store.getters.additionalAPILoading("RNCS");
    },
    isRNCSError() {
      return this.$store.getters.additionalAPINotWorking("RNCS");
    },
    RNCSError() {
      return this.$store.getters.RNCSError;
    },
    linkBodacc() {
      return `${this.bodaccAddress}${this.$store.getters.RNCSData.siren}`;
    }
  },
  watch: {
    $route() {
      this.$store.dispatch("executeSearchRNCS", this.$route.params.searchId);
    }
  },
  beforeCreate() {
    this.$store.commit("setStoredSuggestions", "");
  },
  created() {
    this.$store.dispatch("executeSearchRNCS", this.$route.params.searchId);
  },
  methods: {
    titleEtablissement() {
      if (this.haveRNCSInfo) {
        return Filters.filters.removeExtraChars(this.titleEtablissementRNCS());
      } else {
        return "Etablissement";
      }
    },
    titleEtablissementRNCS() {
      if (this.$store.getters.RNCSData.personne_morale) {
        return this.$store.getters.RNCSData.personne_morale.denomination;
      } else {
        return Formating.methods.concatNames(
          this.$store.getters.RNCSData.personne_physique.prenoms,
          this.$store.getters.RNCSData.personne_physique.nom_patronyme
        );
      }
    }
  }
};
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
</style>
