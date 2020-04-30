<template>
  <div id="app">
    <app-header/>
    <div class="notification full-width">
      Ce site est un travail en cours, actuellement en beta. Vous pouvez le
      consulter librement.
    </div>
    <search-banner/>
    <router-view v-if="dataFromApiAvailable"></router-view>
    <not-found v-else />
    <app-footer/>
  </div>
</template>

<script>
import AppHeader from "@/components/layout/AppHeader";
import SearchBanner from "@/components/search/SearchBanner";
import AppFooter from "@/components/layout/AppFooter";
import NotFound from "@/components/NotFound";

export default {
  name: 'App',

  metaInfo: {
    title: null,
    titleTemplate: "%s | Entreprise.data.gouv.fr"
  },

  computed: {
    dataFromApiAvailable() {
      return this.$store.state.apiDataIsAvailable;
    }
  },

  components: {
    'app-header': AppHeader,
    'search-banner': SearchBanner,
    'app-footer': AppFooter,
    'not-found': NotFound
  }
}
</script>

<style lang="scss" scoped>
#app {
  min-height: 100vh;
}
</style>
