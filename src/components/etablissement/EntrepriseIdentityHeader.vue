<template>
  <div class="company">
    <div class="company__main">
      <header-skeleton v-if="isEtablissementLoading"></header-skeleton>
      <div class="title__block" v-else>
        <h2 v-if="haveSireneInfo">{{resultSirene.nom_raison_sociale | removeExtraChars}} <span class="company__siren">({{ resultSirene.siren }})</span></h2>

        <template v-if="haveSireneInfo">
          <div class="subtitle">
            <div>{{ resultSirene.l4_normalisee }}</div>
            <div>{{ resultSirene.l6_normalisee }}</div>
          </div>
          <div class="second__subtitle"> {{ resultSirene.libelle_activite_principale_entreprise }}</div>
        </template>
        <div class="company__buttons">
          <a class="button" v-bind:href="dataRequestPDF" title="Télécharger les données de cette entreprise au format PDF">
            <img class="icon" src="@/assets/img/download.svg" alt="" />
            Version imprimable
          </a>
        </div>
        <etablissement-sirene-children v-if=haveSireneInfo />
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
    haveSireneInfo () {
      if (this.$store.getters.sireneAvailable) {
        return true
      }
    },
    coordinates () {
      if (this.resultSirene && this.resultSirene.longitude && this.resultSirene.latitude) {
        return [this.resultSirene.longitude, this.resultSirene.latitude]
      }
      return null
    },
    dataRequestPDF () {
      return `${process.env.BASE_ADDRESS_RNCS}${this.searchId}/pdf`
    },
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
