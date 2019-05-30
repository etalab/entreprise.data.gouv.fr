<template>
  <div class="company__panel panel">
    <h4>Adresse RNM</h4>
    <div class="company__item">
      <label class="company__item-key">Nom</label>
      <div class="company__item-value">{{ this.resultRNM.NOM | ifExist }}</div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Adresse</label>
      <div class="company__item-value">
        {{ this.resultRNM.ADDRESSE | ifExist }}
      </div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Complément d’adresse</label>
      <div class="company__item-value">
        {{ this.resultRNM.COMPLEMENT | ifExist }}
      </div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Code postal</label>
      <div class="company__item-value">{{ this.resultRNM.CP | ifExist }}</div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Commune</label>
      <div class="company__item-value">
        {{ this.resultRNM.COMMUNE | ifExist }}
      </div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Departement</label>
      <div class="company__item-value">{{ this.resultRNM.DEPT | ifExist }}</div>
    </div>
  </div>
</template>

<script>
import Filters from "@/components/mixins/filters";

export default {
  name: "EtablissementRNMContact",
  computed: {
    resultRNM() {
      return this.$store.getters.RNMData;
    }
  },
  mixins: [Filters]
};
</script>
