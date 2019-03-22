<template>
  <section class="section">
    <div class="container">
      <server-error v-if="isError" />

      <template>
        <not-found v-if="isNotFound" />
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
    haveRNAInfo () {
      return this.$store.getters.RNAAvailable
    },
    haveRNMInfo () {
      return this.$store.getters.RNMAvailable
    },
    mainAPISLoading () {
      return this.$store.getters.mainAPISLoading
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
