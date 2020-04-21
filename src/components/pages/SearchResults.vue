<template>
  <section class="section">
    <div class="container">
      <h4 v-if="noResultFromBothSource">Aucun résultat trouvé.</h4>
      <div v-else>
        <h3>{{ resultsNumberSirene }} résultats pour "{{ fullText }}" dans la base SIRENE des entreprises.</h3>
        <ul>
          <sirene-result v-for="(result, index) in resultsSirene" :etablissement="result" :key="'sirene-' + index" />
        </ul>

        <h3>{{ resultsNumberRna }} résultats pour "{{ fullText }}" dans le Répertoire National des Associations.</h3>
        <ul>
          <rna-result v-for="(result, index) in resultsRna" :association="result" :key="'rna-' + index" />
        </ul>
        <pagination v-on:goToPage="routeToPage" :currentPage="page" :pagesNumber="maxPagesFromSource" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import SireneResult from "@/components/pages/search_results/SireneResult";
import RnaResult from "@/components/pages/search_results/RnaResult";
import Pagination from "@/components/pages/search_results/Pagination";

export default {
  name: 'SearchResultsList',

  metaInfo() {
    return {
      title: `Recherche : "${this.fullText}" - Page : ${this.page}`
    }
  },

  props: {
    fullText: {
      type: String,
      default: ""
    },

    page: {
      type: Number,
      default: 1
    }
  },

  computed: {
    ...mapGetters({
      resultsSirene: "search/sirene/getResults",
      resultsNumberSirene: "search/sirene/getResultsNumber",
      pagesNumberSirene: "search/sirene/getPagesNumber",
      resultsRna: "search/rna/getResults",
      resultsNumberRna: "search/rna/getResultsNumber",
      pagesNumberRna: "search/rna/getPagesNumber"
    }),

    maxPagesFromSource: function() {
      return Math.max(this.pagesNumberSirene, this.pagesNumberRna);
    },

    noResultFromBothSource: function() {
      return (this.resultsSirene.length == 0 && this.resultsRna.length == 0);
    }
  },

  created: function() { this.searchForResults(); },

  watch: {
    fullText: function() { this.searchForResults(); },
    page: function() { this.searchForResults(); }
  },

  methods: {
    searchForResults: function() {
      const args = { searchInput: this.fullText, pageNumber: this.page };
      this.$store.dispatch("search/sirene/fulltextSearch", args);
      this.$store.dispatch("search/rna/fulltextSearch", args);
    },

    routeToPage: function(pageNumber) {
      this.$router.push({ name: "search-results", query: { fullText: this.fullText, page: pageNumber } });
    }
  },

  components: {
    "sirene-result": SireneResult,
    "rna-result": RnaResult,
    "pagination": Pagination
  }
}
</script>

<style lang="scss" scoped>
.section {
  min-height: 70vh;
}

ul {
  list-style: none;
  padding: 0;
  margin: 2em 0;
}
</style>
