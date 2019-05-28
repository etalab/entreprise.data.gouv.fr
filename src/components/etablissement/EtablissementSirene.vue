<template>
  <div class="company">
    <div class="company-container">
      <etablissement-sirene-contact />
      <etablissement-sirene-info />
    </div>
  </div>
</template>

<script>
import Filters from "@/components/mixins/filters.js";
import EtablissementSireneContact from "@/components/etablissement/etablissementSirene/EtablissementSireneContact";
import EtablissementSireneInfo from "@/components/etablissement/etablissementSirene/EtablissementSireneInfo";

export default {
  name: "EtablissementSirene",
  components: {
    EtablissementSireneContact: EtablissementSireneContact,
    EtablissementSireneInfo: EtablissementSireneInfo
  }
};
</script>

<style lang="scss" scoped>
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
