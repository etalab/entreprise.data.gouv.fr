<template>
  <section class="section">
    <div class="container">
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
    haveRNCSInfo () {
      return this.$store.getters.additionalAPIAvailable('RNCS')
    },
    dataRequestURL () {
      if (this.haveRNCSInfo) {
        return `${process.env.BASE_ADDRESS_RNCS}${this.$store.getters.RNCSData.siren}`
      }
      return null
    },
    RNCSUpdate () {
      if (this.haveRNCSInfo) {
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
