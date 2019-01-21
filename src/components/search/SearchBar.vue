<template>
  <div class="form__group">
    <input type="text" name="search" placeholder="Nom, SIREN, SIRET, adresse..." v-model="fullText"
      @keydown="allowSuggestions"
      @keydown.down="suggestDown"
      @keydown.up.prevent="suggestUp"
      @keydown.esc="suggestReset"
      @blur="suggestReset"
      @keydown.enter="prepareThenSearch"/>
    <button class="overlay-button" @click="suggestSelectAndEnter(index)">
      <svg class="icon icon-search"><use xlink:href="#icon-search"></use></svg>
    </button>

    <ul v-show="suggestions.length && this.suggestionsAllowed" class="suggestions">
      <li class="suggestion__box"
          v-for="(suggestion, index) in suggestions"
          :key="index"
          v-bind:class="{'active': suggestActive(index)}"
          @mousedown="suggestSelectAndEnter(index)">
        <span>{{ suggestion | capitalize | removeExtraChars}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Filters from '@/components/mixins/filters.js'
import SuggestionsHelpers from '@/components/mixins/suggestionsHelpers.js'
import RegExps from '@/components/mixins/regExps.js'

export default {
  name: 'SearchBar',
  props: ['searchName'],
  computed: {
    fullText: {
      get: function () {
        return this.$store.state.searchFullText.storedFullText
      },
      set: function (fullText) {
        if (!fullText) {
          this.$store.dispatch('goToClearedHomePage')
        }
        if (String(fullText).length >= 3 && this.suggestionsAllowed) {
          this.resetIndexSuggestion()
          this.$store.dispatch('executeSearchSuggestions', fullText)
        }
        this.$store.commit('setFullText', fullText)
      }
    },
    isSearchNotEmpty () {
      return this.$store.state.searchFullText.storedFullText !== ''
    },
  },
  methods: {
    prepareThenSearch: async function() {
      this.$store.commit('setPage', 1)
      // Disallowing suggestions so we stop displaying them
      this.suggestionsAllowed = false
      // Set fullText to current suggestion if it is selected
      if (this.currentSuggestion) {
        this.fulltext = this.currentSuggestion
      }
      // Trimming input
      this.fullText = this.fullText.trim()

      // Start search except if input is empty
      if (this.isSearchNotEmpty) {
        this.requestSearch()
      }
    },
    requestSearch: function () {
      const natureSearchId = this.analyzeSearchId(this.fullText)

      if (natureSearchId) {
        this.fullText = this.removeSeparators(this.fullText)
        this.$router.push({ path: `/etablissement/${this.fullText}` })
      } else {
        this.requestFullTextSearch()
      }
      this.$store.commit('clearFullTextResults')
    },
    requestFullTextSearch: function () {
      const currentSuggestion = this.currentSuggestion()
      if (currentSuggestion) {
        this.$store.commit('setFullText', currentSuggestion)
      } else {
        const fullTextNoDiacritics = this.removeDiacritics(this.fullText)
        this.$store.commit('setFullText', fullTextNoDiacritics)
      }
      this.$store.dispatch('requestSearchFullText')
      this.suggestCount = -1
    }
  },
  beforeDestroy() {
    this.suggestReset()
  },
  mixins: [Filters, SuggestionsHelpers, RegExps]
}
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

  .hidden {
    visibility: hidden;
  }

  .active {
    background-color: $color-lighter-blue;
  }
</style>
