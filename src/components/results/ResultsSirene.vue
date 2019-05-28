<template>
  <div>
    <h3>{{ resultsNumberSentence }}</h3>
    <did-you-mean :api="api"></did-you-mean>
    <results-skeleton v-if="resultsAreLoading"></results-skeleton>
    <ul v-else>
      <li v-for="result in storedResultsEntreprises" :key="result.siret">
        <router-link
          class="panel"
          :to="{ name: 'Etablissement', params: { searchId: result['siret'] } }"
        >
          <h4 class="title">
            {{ result["nom_raison_sociale"] | capitalize | removeExtraChars }}
          </h4>
          <p>{{ result["libelle_activite_principale_entreprise"] }}</p>
          <p>
            {{ result["code_postal"] }}
            {{ result["libelle_commune"] | capitalize }}
          </p>
        </router-link>
      </li>
    </ul>
    <h4 v-if="noResults">Aucun résultat trouvé.</h4>
  </div>
</template>

<script>
import DidYouMean from "@/components/results/ResultsDidYouMean";
import Filters from "@/components/mixins/filters.js";
import ResultsSkeleton from "@/components/results/ResultsSkeleton";

export default {
  name: "ResultsSirene",
  data() {
    return {
      api: "SIRENE"
    };
  },
  components: {
    DidYouMean: DidYouMean,
    ResultsSkeleton: ResultsSkeleton
  },
  computed: {
    resultsAreLoading() {
      return this.$store.getters.isFullTextLoading;
    },
    isSearchNotEmpty() {
      return this.$store.state.searchFullText.storedFullText !== "";
    },
    storedResultsEntreprises() {
      return this.$store.getters.fullTextResultsSirene;
    },
    numberResults() {
      return this.$store.getters.numberResultsFullTextSirene;
    },
    resultsNumberSentence() {
      if (this.numberResults === undefined) {
        return "";
      }
      const resultText = this.numberResults > 1 ? "résultats" : "résultat";
      return `${this.numberResults} ${resultText} pour "${
        this.$store.state.searchFullText.storedLastFullText
      }" dans la base SIRENE des entreprises`;
    },
    noResults() {
      if (
        this.storedResultsEntreprises &&
        this.storedResultsEntreprises.length > 0
      ) {
        return false;
      }
      return true;
    }
  },
  mixins: [Filters]
};
</script>

<style lang="scss" scoped>
.title {
  display: inline;
  margin: 0.15em;
}

.subtitle {
  display: inline;
  margin-left: 5px;
  font-family: "Evolventa", "Trebuchet MS", sans-serif;
}

.panel {
  display: block;
  text-decoration: none;
  color: $color-black;

  &:hover {
    border: 1px solid $color-light-blue;
  }
}

p {
  margin: 0.15em;
}

ul {
  list-style: none;
  padding: 0;
  margin: 2em 0;

  li:hover {
    background-color: $color-lightest-grey;
  }
}

li + li {
  margin-top: 2em;
}
</style>
