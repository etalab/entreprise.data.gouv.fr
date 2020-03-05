<template>
  <div class="company-container">
    <div class="company__panel panel">
      <h5>
        Fiche d'immatriculation au RNCS sur
        <a target="_blank" href="https://data.inpi.fr">data.inpi.fr</a>
      </h5>
      <a
        class="button"
        target="_blank"
        :href="linkInpiWeb"
        title="Fiche d'immatriculation"
      >
        <img class="icon" src="@/assets/img/arrow_top_left.svg" alt="" />
        Fiche d'immatriculation
      </a>
      <a
        class="button"
        :href="linkInpiPdf"
        title="Télécharger la fiche d'immatriculaiton"
      >
        <img class="icon" src="@/assets/img/download.svg" alt="" />
        Télécharger la fiche d'immatriculation
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "EtablissementLinks",
  data() {
    return {
      baseAddressInpi: "https://data.inpi.fr/entreprises/"
    };
  },
  computed: {
    linkInpiWeb() {
      return `${this.baseAddressInpi}${this.$store.getters.sirenFromSirene}`;
    },
    linkInpiPdf() {
      return `${this.linkInpiWeb}?format=pdf`;
    }
  }
};
</script>

<style>
.company {
  margin-top: 2em;
}

.panel + .panel {
  margin-left: 2em;
}
@media (max-width: $tablet) {
  .panel + .panel {
    margin-left: 0;
  }
}

.company-container {
  margin-bottom: 30px;
}
</style>
