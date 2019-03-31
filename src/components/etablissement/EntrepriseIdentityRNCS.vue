<template>
  <section class="section">
    <div class="container">
      <template v-if=isRNCSError>
        <div class="notification error">Erreur du service RNCS : {{ RNCSError }}</div>
        <etablissement-rncs-404 />
      </template>
      <blocks-skeleton v-if=RNCSLoading />
      <div v-else-if=haveRNCSInfo>
        <div class="company__buttons">
          <a class="button" v-bind:href="dataRequestPDF" title="Télécharger les données de cette entreprise au format PDF">
            <img class="icon" src="@/assets/img/download.svg" alt="" />
            Version imprimable
          </a>
        </div>

        <etablissement-rncs />
      </div>
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
import Formating from '@/components/mixins/formating'
import Loader from '@/components/modules/Loader'
import ServerError from '@/components/modules/ServerError'
import NotFound from '@/components/etablissement/EtablissementNotFound'
import EtablissementRNCS from '@/components/etablissement/EtablissementRNCS'
import EtablissementRNCS404 from '@/components/etablissement/etablissementRNCS/EtablissementRNCS404'
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
    'EtablissementRncs': EtablissementRNCS,
    'etablissement-rncs-404': EtablissementRNCS404,
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
    dataRequestPDF () {
      return `${process.env.BASE_ADDRESS_RNCS}${this.searchId}/pdf`
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
  methods: {
    titleEtablissement () {
      if (this.haveRNCSInfo) {
        return Filters.filters.removeExtraChars(this.titleEtablissementRNCS())
      } else {
        return 'Etablissement'
      }
    },
    titleEtablissementRNCS () {
      if (this.$store.getters.RNCSData.personne_morale) {
        return this.$store.getters.RNCSData.personne_morale.denomination
      } else {
        return Formating.methods.concatNames(
          this.$store.getters.RNCSData.personne_physique.prenoms,
          this.$store.getters.RNCSData.personne_physique.nom_patronyme
        )
      }
    }
  },
  beforeCreate () {
    this.$store.commit('setStoredSuggestions', '')
  },
  created () {
    this.$store.dispatch('executeSearchRNCS', this.$route.params.searchId)
  },
  mixins: [Filters, Formating],
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
