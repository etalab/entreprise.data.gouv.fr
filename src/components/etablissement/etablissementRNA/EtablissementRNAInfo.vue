<template>
  <div class="company__panel panel">
    <div class="name__category">
      <h4>Informations Générales Association</h4>
    </div>
    <div class="company__info-list">
      <div class="company__item">
        <div class="company__item-key">Numéro RNA :</div>
        <div class="company__item-value">{{ resultRNA.id_association }}</div>
      </div>
      <line-in-panel
        :company-key="id_ex_association"
        :company-value="resultRNA.id_ex_association"
      />
      <div class="company__item">
        <div class="company__item-key">Objet :</div>
        <div class="company__item-value">
          {{ resultRNA.objet | ifEmptyShowPlaceholder }}
        </div>
      </div>
      <line-in-panel
        :company-key="objet_social1"
        :company-value="resultRNA.objet_social1"
      />
      <line-in-panel :company-key="siret" :company-value="resultRNA.siret" />
    </div>
  </div>
</template>

<script>
import Filters from "@/components/mixins/filters";
import LineInPanel from "@/components/etablissement/templates/LineInPanel";

export default {
  name: "EtablissementRNAInfo",
  components: { LineInPanel: LineInPanel },
  mixins: [Filters],
  data() {
    return {
      id_ex_association: "Ancien numéro RNA :",
      objet_social1: "Code Objet Social :",
      siret: "Siret :"
    };
  },
  computed: {
    resultRNA() {
      return this.$store.getters.singlePageEtablissementRNA;
    }
  }
};
</script>
