<template>
  <div class="company">
    <div class="company-container">
      <etablissement-rnm-contact />
      <etablissement-rnm-info />
    </div>
  </div>
</template>

<script>
import EtablissementRNMInfo from "@/components/etablissement/etablissementRNM/EtablissementRNMInfo";
import EtablissementRNMContact from "@/components/etablissement/etablissementRNM/EtablissementRNMContact";

export default {
  name: "EtablissementRNM",
  components: {
    EtablissementRnmInfo: EtablissementRNMInfo,
    EtablissementRnmContact: EtablissementRNMContact
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
