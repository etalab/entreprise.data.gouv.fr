<template>
  <div class="company">
    <div class="company__main">
      <header-skeleton v-if="isEtablissementLoading"></header-skeleton>
      <div v-else class="title__block">
        <h2 v-if="haveSireneInfo">
          <div v-if="isEntrepreneurIndividuel">
            {{
              concatNames(
                resultSirene.unite_legale.prenom_1,
                resultSirene.unite_legale.nom
              ) | ifExist
            }}
          </div>
          <div v-else>
            {{ resultSirene.unite_legale.denomination | removeExtraChars }}
          </div>
          <span class="company__siren"
            >(<span
              :inner-html.prop="resultSirene.siren | prettySirenHtml"
            />)</span
          >
        </h2>
        <h2 v-if="haveOnlyRNAInfo">
          {{ resultRNA.titre }}
          <span class="association__id">({{ resultRNA.id_association }})</span>
        </h2>

        <template v-if="haveSireneInfo">
          <div class="subtitle">
            <div>{{ resultSirene.geo_l4 }}</div>
            <div>{{ resultSirene.geo_l5 }}</div>
          </div>
          <div class="second__subtitle">
            {{ resultSirene.libelle_activite_principale_entreprise }}
          </div>
        </template>
        <div v-if="haveOnlyRNAInfo" class="second__subtitle">
          {{ resultRNA.titre_court }}
        </div>
        <etablissement-header-sirene-children v-if="haveSireneInfo" />

        <router-link
          v-if="haveSireneInfo"
          :to="{ name: 'RNCS', params: { searchId: resultSirene.siren } }"
        >
          Fiche d'immatriculation au RNCS
        </router-link>
        <a v-if="haveSireneInfo" class="link__external" :href="linkBodacc"
          >Liste des annonces BODACC</a
        >
        <etablissement-header-timestamp
          :result-sirene="resultSirene"
          :result-r-n-a="resultRNA"
        />
      </div>
      <div v-if="isEtablissementLoading" class="map__dummy panel"></div>
      <template v-else>
        <etablissement-map
          v-if="haveSireneInfo"
          :position-etablissement="coordinates"
          :etablissement="resultSirene"
        />
      </template>
    </div>
  </div>
</template>

<script>
import Filters from "@/components/mixins/filters";
import Formating from "@/components/mixins/formating";
import EtablissementHeaderSireneChildren from "@/components/etablissement/etablissementHeader/EtablissementHeaderSireneChildren";
import EtablissementMap from "@/components/etablissement/EtablissementMap";
import HeaderSkeleton from "@/components/etablissement/skeletons/HeaderSkeleton";
import EtablissementHeaderTimestamp from "@/components/etablissement/etablissementHeader/EtablissementHeaderTimestamp";

export default {
  name: "EtablissementHeader",
  components: {
    EtablissementHeaderTimestamp: EtablissementHeaderTimestamp,
    EtablissementHeaderSireneChildren: EtablissementHeaderSireneChildren,
    EtablissementMap: EtablissementMap,
    HeaderSkeleton: HeaderSkeleton
  },
  mixins: [Filters, Formating],
  props: { searchId: { type: String, default: "" } },
  computed: {
    isEtablissementLoading() {
      return this.$store.getters.mainAPISLoading;
    },
    resultSirene() {
      return this.$store.getters.singlePageEtablissementSirene;
    },
    resultRNA() {
      return this.$store.getters.singlePageEtablissementRNA;
    },
    haveOnlyRNAInfo() {
      return !this.haveSireneInfo && this.haveRNAInfo;
    },
    haveSireneInfo() {
      if (this.$store.getters.sireneAvailable) {
        return true;
      }
      return false;
    },
    haveRNAInfo() {
      if (this.$store.getters.RNAAvailable) {
        return true;
      }
      return false;
    },
    coordinates() {
      if (
        this.resultSirene &&
        this.resultSirene.longitude &&
        this.resultSirene.latitude
      ) {
        return [this.resultSirene.longitude, this.resultSirene.latitude];
      }
      return null;
    },
    isEntrepreneurIndividuel() {
      if (this.resultSirene.unite_legale.categorie_juridique == "1000") {
        return true;
      }
      return false;
    },
    linkBodacc() {
      return "https://www.bodacc.fr/annonce/liste/" + this.resultSirene.siren;
    }
  }
};
</script>

<style lang="scss" scoped>
.company__main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#map {
  margin-left: 2em;
}

@media (max-width: $desktop) {
  .company__main {
    flex-direction: column;
  }

  #map {
    margin-left: 0;
  }
}

.company__buttons {
  margin-top: 1.5em;

  .button {
    padding: 0.5em 1em 0.6em;
    vertical-align: middle;
    margin-left: 0;
  }
}

h2 {
  margin: 0;
}

.subtitle {
  font-size: 1.25em;
}

.second__subtitle {
  margin-top: 0.5em;
}

.company__siren,
.second__subtitle {
  color: $color-darker-grey;
}

.map__dummy {
  height: 350px;
  width: 48%;
  background-color: #f2eae2;
}

.link__external {
  margin-top: 10px;
  display: inline-block;
}
</style>
