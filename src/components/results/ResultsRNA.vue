<template>
  <div>
    <h3>{{ resultsNumberSentence }}</h3>
    <did-you-mean :api="api"></did-you-mean>
    <ul>
      <li v-for="result in storedResultsAssociations" :key="result.id">
        <router-link
          class="panel"
          :to="{
            name: 'Etablissement',
            params: { searchId: result['id_association'] }
          }"
        >
          <h4 class="title">{{ result["titre"] | capitalize }}</h4>
          <p>{{ result["objet"] | truncate }}</p>
          <p>
            {{ result["adresse_code_postal"] }}
            {{ result["adresse_libelle_commune"] | capitalize }}
          </p>
        </router-link>
      </li>
    </ul>
    <p v-if="showNoResultMessage">Aucun résultat trouvé</p>
  </div>
</template>

<script>
import DidYouMean from "@/components/results/ResultsDidYouMean";
import Filters from "@/components/mixins/filters.js";

export default {
  name: "ResultsRNA",
  components: {
    DidYouMean: DidYouMean
  },
  mixins: [Filters],
  data() {
    return {
      api: "RNA"
    };
  },
  computed: {
    isSearchNotEmpty() {
      return this.$store.state.searchFullText.storedFullText !== "";
    },
    storedResultsAssociations() {
      return this.$store.getters.fullTextResultsRNA;
    },
    numberResults() {
      return this.$store.getters.numberResultsFullTextRNA;
    },
    showNoResultMessage() {
      return this.numberResults === 0;
    },
    resultsNumberSentence() {
      if (this.numberResults === undefined) {
        return "";
      }
      const resultText = this.numberResults > 1 ? "résultats" : "résultat";
      return `${this.numberResults} ${resultText} pour "${this.$store.state.searchFullText.storedLastFullText}" dans la base RNA des associations`;
    }
  }
};
</script>

<style lang="scss" scoped>
.panel {
  text-decoration: none;
  color: $color-black;
  display: block;
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
