<template>
  <div class="form__group">
    <input
      v-model="searchInput"
      type="text"
      name="searchInput"
      autocomplete="off"
      placeholder="Nom, SIREN, SIRET, adresse..."
      @keydown.esc="emptySuggestions"
      @blur="emptySuggestions"
      @keydown.down="moveSelectionCursorDown"
      @keydown.up="moveSelectionCursorUp"
      @keydown.enter="submit"
    />
    <search-bar-button v-on:submitSearch="submit"/>

    <ul v-show="suggestions.length > 0" class="suggestions">
      <li
        v-for="(suggestion, index) in suggestions"
        :key="index"
        class="suggestion__box"
        :class="{ active: isSelected(index) }"
        @mousedown="selectAndSubmit(index)"
      >
        <span>{{ suggestion | capitalize | removeExtraChars }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { removeDiacritics } from "@/helpers";
import SearchBarButton from "@/components/search/SearchBarButton";
import _debounce from "lodash/debounce";

export default {
  name: 'SearchBar',

  data () {
    return {
      searchInput: "",
      selectionCursor: -1
    }
  },

  created: function() {
    this.debounceRequestSuggestion = _debounce(this.requestSuggestions, 200);
  },

  computed: {
    ...mapGetters({
      suggestions: "search/suggestion/getSuggestions"
    })
  },

  watch: {
    searchInput: function(val) {
      if (val !== "" && val !== null) this.debounceRequestSuggestion(val);
    }
  },

  methods: {
    submit () {
      const input = (this.selectionCursor !== -1) ? this.suggestions[this.selectionCursor] : this.searchInput;
      this.emptySuggestions();
      this.searchInput = null;
      const query = this.clearInput(input);

      if (this.isSirenOrSiret(query)) {
        this.$router.push({ name: "sirene-etablissement", params: { sirenOrSiret: query } })
      } else {
        this.$router.push({ name: "search-results", query: { fullText: query, page: 1 } })
      }
    },

    selectAndSubmit (suggestionIndex) {
      this.selectionCursor = suggestionIndex;
      this.submit();
    },

    clearInput(input) {
      let clearedInput = input.trim();
      clearedInput = removeDiacritics(clearedInput);
      return clearedInput;
    },

    isSirenOrSiret(str) {
      return str.match(/^\d{9}|\d{14}$/g);
    },

    requestSuggestions (val) {
      this.$store.dispatch("search/suggestion/requestSuggestions", val);
    },

    emptySuggestions () {
      this.selectionCursor = -1;
      this.$store.commit("search/suggestion/emptySuggestions");
    },

    moveSelectionCursorDown () {
      if (this.selectionCursor < this.suggestions.length - 1) this.selectionCursor += 1;
    },

    moveSelectionCursorUp () {
      if (this.selectionCursor > -1) this.selectionCursor -= 1;
    },

    isSelected (pos) {
      return pos === this.selectionCursor;
    }
  },

  components: {
    'search-bar-button': SearchBarButton
  }
}
</script>

<style lang="scss" scoped>
.form__group {
  width: 35em;
  max-width: 100%;
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

.active {
  background-color: $color-lighter-blue;
}
</style>
