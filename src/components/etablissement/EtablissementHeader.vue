<template>
  <div class="company">
    <div class="company__main">
      <header-skeleton v-if="isEtablissementLoading"></header-skeleton>
      <div v-else class="title__block">
        <h1 v-if="haveSireneInfo">{{resultSirene.nom_raison_sociale | removeExtraChars}}
          <span class="company__siren">(<span :inner-html.prop="resultSirene.siren | prettySirenHtml"/>)</span>
        </h1>
        <h1 v-if="haveOnlyRNAInfo">{{resultRNA.titre}} <span class="association__id">({{ resultRNA.id_association }})</span></h1>

        <template v-if="haveSireneInfo">
          <div class="subtitle">
            <div>{{ resultSirene.l4_normalisee }}</div>
            <div>{{ resultSirene.l6_normalisee }}</div>
          </div>
          <div class="second__subtitle"> {{ resultSirene.libelle_activite_principale_entreprise }}</div>
        </template>
        <div v-if="haveOnlyRNAInfo" class="second__subtitle"> {{ resultRNA.titre_court}}</div>
        <etablissement-sirene-children v-if=haveSireneInfo />

        <router-link v-if="haveSireneInfo" :to="{ name: 'RNCS', params: {searchId: resultSirene.siren}}"> Fiche d'immatriculation au RNCS </router-link>
      </div>
      <div v-if=isEtablissementLoading class="map__dummy panel"></div>
      <template v-else>
        <etablissement-map v-if=haveSireneInfo :positionEtablissement='coordinates' :etablissement='this.resultSirene'/>
      </template>
    </div>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters.js'
import EtablissementSireneChildren from '@/components/etablissement/etablissementSirene/EtablissementSireneChildren'
import EtablissementMap from '@/components/etablissement/EtablissementMap'
import HeaderSkeleton from '@/components/etablissement/skeletons/HeaderSkeleton'

export default {
  name: 'EtablissementHeader',
  props: ['searchId'],
  components: {
    'EtablissementSireneChildren': EtablissementSireneChildren,
    'EtablissementMap': EtablissementMap,
    'HeaderSkeleton': HeaderSkeleton
  },
  computed: {
    isEtablissementLoading () {
      return this.$store.getters.mainAPISLoading
    },
    resultSirene () {
      return this.$store.getters.singlePageEtablissementSirene
    },
    resultRNA () {
      return this.$store.getters.singlePageEtablissementRNA
    },
    haveOnlyRNAInfo () {
      return (!this.haveSireneInfo && this.haveRNAInfo)
    },
    haveSireneInfo () {
      if (this.$store.getters.sireneAvailable) {
        return true
      }
    },
    haveRNAInfo () {
      if (this.$store.getters.RNAAvailable) {
        return true
      }
    },
    coordinates () {
      if (this.resultSirene && this.resultSirene.longitude && this.resultSirene.latitude) {
        return [this.resultSirene.longitude, this.resultSirene.latitude]
      }
      return null
    }
  },
  mixins: [Filters]
}
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
</style>
