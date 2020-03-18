<template>
  <div class="company__panel panel">
    <h4>Contact</h4>
    <div class="company__item">
      <label class="company__item-key">Gérant</label>
      <div class="company__item-value">
        {{
          concatNames(resultUniteLegale.prenom_1, resultUniteLegale.nom)
            | ifEmptyShowPlaceholder
        }}
      </div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Adresse</label>
      <div class="company__item-value">
        {{ formattedAdresse | ifEmptyShowPlaceholder }}
      </div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Ville</label>
      <div class="company__item-value">
        {{ resultSirene.code_postal }} {{ resultSirene.libelle_commune }}
      </div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Cedex</label>
      <div class="company__item-value">
        {{ resultSirene.code_cedex | ifEmptyShowPlaceholder }}
      </div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Date de création</label>
      <div class="company__item-value">{{ formattedDate }}</div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Tranche d’effectif salariés</label>
      <div class="company__item-value">
        {{ resultSirene.tranche_effectifs | ifEmptyShowPlaceholder }}
      </div>
    </div>
  </div>
</template>

<script>
import Filters from "@/components/mixins/filters";
import Formating from "@/components/mixins/formating";

export default {
  name: "EtablissementSireneContact",
  mixins: [Filters, Formating],
  computed: {
    resultSirene() {
      return this.$store.getters.singlePageEtablissementSirene;
    },
    resultUniteLegale() {
      if (this.resultSirene) {
        return this.resultSirene.unite_legale;
      }
      return null;
    },
    formattedDate() {
      if (!this.resultUniteLegale) {
        return null;
      }
      const year = this.resultUniteLegale.date_creation.substring(0, 4);
      const month = this.resultUniteLegale.date_creation.substring(5, 7);
      const day = this.resultUniteLegale.date_creation.substring(8, 10);
      return `${day}/${month}/${year}`;
    },
    formattedAdresse() {
      var adresse_items = [
        this.resultSirene.numero_voie,
        this.resultSirene.type_voie,
        this.resultSirene.libelle_voie
      ];
      return adresse_items.join(" ");
    }
  }
};
</script>
