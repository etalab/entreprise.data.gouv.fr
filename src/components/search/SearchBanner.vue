<template>
  <div class="hero" role="banner">
    <div class="hero__container container">
      <transition name="fade">
        <div class="text-center">
          <h1 class="search__title">
            Retrouvez toutes les informations publiques concernant les
            entreprises et associations de France
          </h1>
          <p class="search__subtitle">
            Les bases de données sur l’état civil des entreprises et
            associations françaises sont maintenant accessibles à tous, sans
            frais.
          </p>
        </div>
      </transition>
      <search-bar/>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/search/SearchBar";

export default {
  name: 'SearchBanner',

  components: {
    "search-bar": SearchBar
  }
}
</script>

<style lang="scss" scoped>
.hero {
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
