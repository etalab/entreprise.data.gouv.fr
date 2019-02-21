<template>
  <div class="hero" role="banner">
    <div class="hero__container container" v-bind:class="[showWelcomeText ? '' : 'hero__compact' ]">
      <transition name="fade">
        <div class="text-center" v-if="showWelcomeText">
          <h1 class="search__title">
            Retrouvez toutes les informations publiques concernant les entreprises et associations de France
          </h1>
          <p class="search__subtitle">Les bases de données sur l’état civil des entreprises et associations françaises sont maintenant accessibles à tous, sans frais.</p>
        </div>
      </transition>
      <SearchBar searchName="Recherche par nom"></SearchBar>
      <router-link v-if="showBackToResultsButton" class="back-to-results" :to="{ path: pathBack, query: queryBack }">
        ← Revenir aux résultats
      </router-link>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/search/SearchBar'
import Results from '@/components/Results.vue'

export default {
  name: 'Search',
  components: {
    'SearchBar': SearchBar,
    'Results': Results
  },
  created: function () {
    if (this.$route.query.page) {
      this.$store.commit('setPage', this.$route.query.page)
    }
    if (this.$route.query.fullText) {
      this.$store.commit('setFullText', this.$route.query.fullText)
      this.$store.dispatch('requestSearchFullText')
    }
  },
  data () {
    return {
      toggleFilters: true,
      results: null,
      pathBack: '/search',
      queryBack: {
        // Have to add a string to this value for coming-back to save query (bug?)
        fullText: 'backAction',
        page: this.$store.getters.pageNumber
      }
    }
  },
  computed: {
    isSearchNotEmpty () {
      return this.$store.state.storedFullText !== ''
    },
    showWelcomeText () {
      return this.$store.getters.isWelcomeTextVisible
    },
    showBackToResultsButton () {
      // show back button only on etablissement page
      return this.$route.path.includes('/etablissement')
      // only if there is more than one result
        && this.$store.getters.numberResultsFullText > 1
    }
  },
  watch: {
    '$route' (to, from) {
      if (this.$route.query.fullText) {
        this.$store.dispatch('requestSearchFullText')
      }
    }
  }
}

</script>

<style lang="scss" scoped>
  .hero__compact {
    min-height: initial;
  }

  .search__subtitle {
    color: $color-white;
  }

  .back-to-results {
    color: $color-white;
    display: block;
    width: 100%;
    margin: 2em 0 1em;
  }

</style>
