<template>
  <header class="navbar" role="navigation">
    <div class="navbar__container">
      <a v-on:click="clearHomepage" class="navbar__home">
        <img
          class="navbar__logo"
          src="../assets/img/entreprise.svg"
          alt="entreprise.data.gouv.fr"
        />
      </a>
    </div>
  </header>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    clearHomepage() {
      this.$store.dispatch("goToClearedHomePage");
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar__container {
  @media screen and (max-width: $mobile) {
    padding: 0.3em;
  }
}

.navbar__logo {
  @media screen and (max-width: $mobile) {
    margin-right: 0em;
  }
}

.navbar__home {
  display: block;
}
</style>
