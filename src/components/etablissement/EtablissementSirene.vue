<template>
  <div class="company">
    <etablissement-links />

    <h3>Informations de la base SIRENE de l'INSEE</h3>
    <div class="company-container">
      <etablissement-sirene-contact />
      <etablissement-sirene-info />
    </div>
  </div>
</template>

<script>
import EtablissementLinks from "@/components/etablissement/etablissementSirene/EtablissementLinks";
import EtablissementSireneContact from "@/components/etablissement/etablissementSirene/EtablissementSireneContact";
import EtablissementSireneInfo from "@/components/etablissement/etablissementSirene/EtablissementSireneInfo";

export default {
  name: "EtablissementSirene",
  components: {
    EtablissementLinks: EtablissementLinks,
    EtablissementSireneContact: EtablissementSireneContact,
    EtablissementSireneInfo: EtablissementSireneInfo
  }
};
</script>

<style lang="scss" scoped>
h3 {
  margin-bottom: 0;
}
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
</style>
