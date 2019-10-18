<template>
  <div class="company__panel panel">
    <h4>Adresse RNM</h4>
    <div class="company__item">
      <label class="company__item-key">Nom</label>
      <div class="company__item-value">
        {{ resultRNM.NOM | ifEmptyShowPlaceholder }}
      </div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Adresse</label>
      <div class="company__item-value">
        {{ resultRNM.ADDRESSE | ifEmptyShowPlaceholder }}
      </div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Complément d’adresse</label>
      <div class="company__item-value">
        {{ resultRNM.COMPLEMENT | ifEmptyShowPlaceholder }}
      </div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Code postal</label>
      <div class="company__item-value">
        {{ resultRNM.CP | ifEmptyShowPlaceholder }}
      </div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Commune</label>
      <div class="company__item-value">
        {{ resultRNM.COMMUNE | ifEmptyShowPlaceholder }}
      </div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Departement</label>
      <div class="company__item-value">
        {{ resultRNM.DEPT | ifEmptyShowPlaceholder }}
      </div>
    </div>
  </div>
</template>

<script>
import Filters from "@/components/mixins/filters";

export default {
  name: "EtablissementRNMContact",
  mixins: [Filters],
  computed: {
    resultRNM() {
      return this.$store.getters.RNMData;
    }
  }
};
</script>
