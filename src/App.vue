<template>
  <div id="app">
    <navbar></navbar>
    <search></search>
    <!-- TODO: put home in router-view (maybe?) -->
    <home v-if="showWelcomeText"></home>
    <router-view></router-view>
    <footer-etalab></footer-etalab>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Search from '@/components/Search'
import Home from '@/components/Home'
import Results from '@/components/Results'
import Etablissement from '@/components/Etablissement'
import FooterEtalab from '@/components/FooterEtalab'

export default {
  name: 'app',
  metaInfo: {
    title: null,
    titleTemplate: '%s | Entreprise.data.gouv.fr'
  },
  components: {
    'Navbar': Navbar,
    'Search': Search,
    'Home': Home,
    'Results': Results,
    'Etablissement': Etablissement,
    'FooterEtalab': FooterEtalab
  },
  computed: {
    showWelcomeText () {
      return this.$store.getters.isWelcomeTextVisible
    }
  }
}
</script>

<style lang="scss" scoped>
  #app {
    min-height: 100vh;
  }
</style>
