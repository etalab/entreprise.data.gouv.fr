<template>
  <div class="company">
    <div
      class="company-container padding_top"
      v-bind:class="{ no_top_padding: this.haveComponentTop }"
    >
      <etablissement-rna-immatriculation />
      <etablissement-rna-info />
    </div>
  </div>
</template>

<script>
import EtablissementRNAInfo from "@/components/etablissement/etablissementRNA/EtablissementRNAInfo";
import EtablissementRNAImmatriculation from "@/components/etablissement/etablissementRNA/EtablissementRNAImmatriculation";

export default {
  name: "EtablissementRNA",
  props: ["haveComponentTop"],
  components: {
    EtablissementRnaInfo: EtablissementRNAInfo,
    EtablissementRnaImmatriculation: EtablissementRNAImmatriculation
  }
};
</script>

<style lang="scss" scoped>
.panel + .panel {
  margin-left: 2em;
}

@media (max-width: $tablet) {
  .panel + .panel {
    margin-left: 0;
  }
}
</style>
