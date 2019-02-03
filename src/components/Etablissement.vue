<template>
  <section class="section">
    <div class="container">
      <not-found v-if="isNotFound" />
      <server-error v-else-if="isError" />

      <!-- Temporary section here to display RNCS Only -->
      <template v-else-if=displayingOnlyRNCS>
        <etablissement-header :searchId=searchId />
        <blocks-skeleton v-if="RNCSLoading"/>
        <etablissement-rncs v-else-if="haveRNCSInfo"/>
        <div v-if=haveRNCSInfo class="company__extra">
          <div class="notification">
            <div>Ces informations sont issues du RNCS mis à jour le {{ RNCSUpdate }}.</div>
            <a class="button-outline secondary" target="_blank" v-bind:href="dataRequestURL" title="Accéder aux données brutes de cette entreprise">
              <img class="icon" src="@/assets/img/json.svg" alt="" />
              Accéder aux données JSON
            </a>
          </div>
        </div>
      </template>

      <template v-else>
        <etablissement-header :searchId=searchId />
        <blocks-skeleton v-if="mainAPISLoading"/>
        <etablissement-sirene v-if=haveSireneInfo />
        <etablissement-rna v-if=haveRNAInfo :haveComponentTop=haveSireneInfo />
        <etablissement-rnm v-if=haveRNMInfo />
      </template>
    </div>
  </section>
</template>

<script>
import Filters from '@/components/mixins/filters'
import Loader from '@/components/modules/Loader'
import ServerError from '@/components/modules/ServerError'
import NotFound from '@/components/etablissement/EtablissementNotFound'
import EtablissementHeader from '@/components/etablissement/EtablissementHeader'
import EtablissementSirene from '@/components/etablissement/EtablissementSirene'
import EtablissementRNA from '@/components/etablissement/EtablissementRNA'
import EtablissementRNM from '@/components/etablissement/EtablissementRNM'
import EtablissementRNCS from '@/components/etablissement/EtablissementRNCS'
import BlocksSkeleton from '@/components/etablissement/skeletons/BlocksSkeleton'

export default {
  name: 'Etablissement',
  metaInfo () {
    return {
      title: this.titleEtablissement()
    }
  },
  components: {
    'Loader': Loader,
    'ServerError': ServerError,
    'NotFound': NotFound,
    'EtablissementHeader': EtablissementHeader,
    'EtablissementSirene': EtablissementSirene,
    'EtablissementRna': EtablissementRNA,
    'EtablissementRnm': EtablissementRNM,
    'EtablissementRncs': EtablissementRNCS,
    'BlocksSkeleton': BlocksSkeleton
  },
  computed: {
    searchId () {
      return this.$route.params.searchId
    },
    isEtablissementLoading () {
      return this.$store.getters.mainAPISLoading
    },
    isNotFound () {
      return this.$store.getters.mainAPISNotFound
    },
    isError () {
      return this.$store.getters.mainAPISError
    },
    haveSireneInfo () {
      return this.$store.getters.sireneAvailable
    },
    haveRNAInfo () {
      return this.$store.getters.RNAAvailable
    },
    haveRNMInfo () {
      return this.$store.getters.RNMAvailable
    },
    haveRNCSInfo () {
      return this.$store.getters.RNCSAvailable
    },
    resultSirene () {
      if (this.haveSireneInfo) {
        return this.$store.getters.singlePageEtablissementSirene
      }
      return null
    },
    dataRequestURL () {
      if (this.resultSirene) {
        return `${process.env.BASE_ADDRESS_RNCS}${this.resultSirene.siren}`
      }
      return null
    },
    RNCSUpdate () {
      if (this.$store.getters.RNCSData) {
        return Filters.filters.frenchDateFormat(this.$store.getters.RNCSData.updated_at)
      }
      return null
    },
    RNCSLoading () {
      return this.$store.getters.additionalAPILoading('RNCS')
    },
    mainAPISLoading () {
      return this.$store.getters.mainAPISLoading
    },
    // Temporary methods for displaying RNCS-only
    displayingOnlyRNCS () {
      if (process.env.DISPLAY_RNCS)
        return true
    }
  },
  methods: {
    titleEtablissement () {
      if (this.haveSireneInfo) {
        return Filters.filters.removeExtraChars(this.$store.getters.singlePageEtablissementSirene.nom_raison_sociale)
      } else if (this.haveRNAInfo) {
        return this.$store.getters.singlePageEtablissementRNA.titre
      } else {
        return 'Etablissement'
      }
    }
  },
  beforeCreate () {
    this.$store.commit('setStoredSuggestions', '')
  },
  created () {
    this.$store.dispatch('executeSearchEtablissement', this.$route.params.searchId)
  },
  mixins: [Filters],
  watch: {
    '$route' (to, from) {
      this.$store.dispatch('executeSearchEtablissement', this.$route.params.searchId)
    }
  }
}
</script>

<style lang="scss" scoped>
.notification {
  border-color: $color-grey;
  background-color: $color-lightest-grey;
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

.company__extra {
  margin-top: 2em;
}
</style>
