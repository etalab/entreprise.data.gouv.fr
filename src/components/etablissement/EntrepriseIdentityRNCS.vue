<template>
  <section class="section">
    <div class="container">
      <server-error v-if=isError />
      <not-found v-else-if=isNotFound />
      <div v-else>
        <div class="notification error" v-if=isRNCSError>Erreur du service RNCS : {{ RNCSError }}</div>
        <entreprise-identity-header :searchId=searchId />
        <blocks-skeleton v-if=RNCSLoading />
        <etablissement-rncs v-else-if=haveRNCSInfo />
        <div v-if=haveRNCSInfo class="company__extra">
          <div class="notification grey">
            <div>Ces informations sont issues du RNCS mis à jour le {{ RNCSUpdate }}.</div>
            <a class="button-outline secondary" target="_blank" v-bind:href="dataRequestURL" title="Accéder aux données brutes de cette entreprise">
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
import Filters from '@/components/mixins/filters'
import Loader from '@/components/modules/Loader'
import ServerError from '@/components/modules/ServerError'
import NotFound from '@/components/etablissement/EtablissementNotFound'
import EntrepriseIdentityHeader from '@/components/etablissement/EntrepriseIdentityHeader'
import EtablissementRNCS from '@/components/etablissement/EtablissementRNCS'
import BlocksSkeleton from '@/components/etablissement/skeletons/BlocksSkeleton'

export default {
  name: 'EntrepriseIdentityRNCS',
  metaInfo () {
    return {
      title: this.titleEtablissement()
    }
  },
  components: {
    'Loader': Loader,
    'ServerError': ServerError,
    'NotFound': NotFound,
    'EntrepriseIdentityHeader': EntrepriseIdentityHeader,
    'EtablissementRncs': EtablissementRNCS,
    'BlocksSkeleton': BlocksSkeleton
  },
  computed: {
    searchId () {
      return this.$route.params.searchId
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
    haveRNCSInfo () {
      return this.$store.getters.additionalAPIAvailable('RNCS')
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
        return Filters.filters.frenchDateFormat(this.$store.getters.RNCSData.db_current_date)
      }
      return null
    },
    RNCSLoading () {
      return this.$store.getters.additionalAPILoading('RNCS')
    },
    isRNCSError () {
      return this.$store.getters.additionalAPINotWorking('RNCS')
    },
    RNCSError () {
      return this.$store.getters.RNCSError
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
    this.$store.dispatch('executeSearchRNCS', this.$route.params.searchId)
  },
  mixins: [Filters],
  watch: {
    '$route' (to, from) {
      this.$store.dispatch('executeSearchRNCS', this.$route.params.searchId)
    }
  }
}
</script>

<style lang="scss" scoped>
.grey {
  background-color: $color-lightest-grey;
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

.company__extra {
  margin-top: 2em;
}
</style>
