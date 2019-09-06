<template>
  <div class="form__group">
    <input
      v-model="fullText"
      type="text"
      name="search"
      placeholder="Nom, SIREN, SIRET, adresse..."
      @keydown="allowSuggestions"
      @keydown.down="suggestDown"
      @keydown.up.prevent="suggestUp"
      @keydown.esc="suggestReset"
      @blur="suggestReset"
      @keydown.enter="prepareThenSearch"
    />
    <button class="overlay-button" @click="suggestSelectAndEnter(index)">
      <svg
        class="icon icon-search"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
      >
        <path
          d="M15.504 13.616l-3.79-3.223c-0.392-0.353-0.811-0.514-1.149-0.499 0.895-1.048 1.435-2.407 1.435-3.893 0-3.314-2.686-6-6-6s-6 2.686-6 6 2.686 6 6 6c1.486 0 2.845-0.54 3.893-1.435-0.016 0.338 0.146 0.757 0.499 1.149l3.223 3.79c0.552 0.613 1.453 0.665 2.003 0.115s0.498-1.452-0.115-2.003zM6 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"
        ></path>
      </svg>
    </button>

    <ul v-show="suggestions.length && suggestionsAllowed" class="suggestions">
      <li
        v-for="(suggestion, index) in suggestions"
        :key="index"
        class="suggestion__box"
        :class="{ active: suggestActive(index) }"
        @mousedown="suggestSelectAndEnter(index)"
      >
        <span>{{ suggestion | capitalize | removeExtraChars }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Filters from "@/components/mixins/filters.js";
import SuggestionsHelpers from "@/components/mixins/suggestionsHelpers.js";
import RegExps from "@/components/mixins/regExps.js";

export default {
  name: "SearchBar",
  mixins: [Filters, SuggestionsHelpers, RegExps],
  computed: {
    fullText: {
      get: function() {
        return this.$store.state.searchFullText.storedFullText;
      },
      set: function(fullText) {
        if (!fullText) {
          this.$store.dispatch("goToClearedHomePage");
        }
        if (String(fullText).length >= 3 && this.suggestionsAllowed) {
          this.resetIndexSuggestion();
          this.$store.dispatch("executeSearchSuggestions", fullText);
        }
        this.$store.commit("setFullText", fullText);
      }
    },
    isSearchNotEmpty() {
      return this.$store.state.searchFullText.storedFullText !== "";
    }
  },
  beforeDestroy() {
    this.suggestReset();
  },
  methods: {
    prepareThenSearch: async function() {
      this.$store.commit("setPage", 1);
      // Disallowing suggestions so we stop displaying them
      this.suggestionsAllowed = false;
      // Set fullText to current suggestion if it is selected
      if (this.currentSuggestion) {
        this.fulltext = this.currentSuggestion;
      }
      // Trimming input
      this.fullText = this.fullText.trim();

      // Start search except if input is empty
      if (this.isSearchNotEmpty) {
        this.requestSearch();
      }
    },
    requestSearch: function() {
      const natureSearchId = this.analyzeSearchId(this.fullText);

      if (natureSearchId) {
        this.fullText = this.removeSeparators(this.fullText);
        this.$router.push({ path: `/etablissement/${this.fullText}` });
      } else {
        this.requestFullTextSearch();
      }
      this.$store.commit("clearFullTextResults");
    },
    requestFullTextSearch: function() {
      const currentSuggestion = this.currentSuggestion();
      if (currentSuggestion) {
        this.$store.commit("setFullText", currentSuggestion);
      } else {
        const fullTextNoDiacritics = this.removeDiacritics(this.fullText);
        this.$store.commit("setFullText", fullTextNoDiacritics);
      }
      this.$store.dispatch("requestSearchFullText");
      this.suggestCount = -1;
    }
  }
};
</script>

<style lang="scss" scoped>
.form__group {
  width: 35em;
  max-width: 100%;
}

.form__select {
  margin-bottom: 5px;
}

.suggestions {
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: absolute;
  width: 100%;
  z-index: 20;
  color: $color-almost-black;
  border-radius: 3px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid $color-grey-blue;
  background: $color-white;
}

.suggestion__box {
  min-height: 2.7em;
  outline: none;
  padding: 8px 14px;
  font: inherit;
  line-height: 1.6;
  vertical-align: middle;
  position: relative;
}

.suggestion__box:hover {
  cursor: pointer;
  background: $color-lighter-blue;
}

.overlay-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  padding: 0;
  right: 6px;
  top: 5px;
}

.icon-search {
  font-size: 20px;
  color: $color-grey;
}

.active {
  background-color: $color-lighter-blue;
}
</style>
