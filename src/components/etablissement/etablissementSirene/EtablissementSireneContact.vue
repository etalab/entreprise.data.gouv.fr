<template>
  <div class="company__panel panel">
    <h4>Contact</h4>
    <div class="company__item">
      <label class="company__item-key">Gérant</label>
      <div class="company__item-value">
        {{ concatNames(resultSirene.prenom, resultSirene.nom) | ifExist }}
      </div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Adresse</label>
      <div class="company__item-value">{{ resultSirene.l4_normalisee }}</div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Ville</label>
      <div class="company__item-value">
        {{ resultSirene.code_postal }} {{ resultSirene.libelle_commune }}
      </div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Cedex</label>
      <div class="company__item-value">{{ resultSirene.cedex | ifExist }}</div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Date de création</label>
      <div class="company__item-value">{{ formattedDate }}</div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Téléphone</label>
      <div class="company__item-value">
        {{ resultSirene.telephone | ifExist }}
      </div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Email</label>
      <div class="company__item-value">{{ resultSirene.email | ifExist }}</div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Tranche d’effectif salariés</label>
      <div class="company__item-value">
        {{ resultSirene.libelle_tranche_effectif_salarie }}
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
    // Display nom only if present. Prenom is not required. Concatenate the two if presents.
    fullOwnerName() {
      const nomOwner = this.resultSirene.nom;
      const prenomOwner = this.resultSirene.prenom;
      if (!nomOwner) {
        return "";
      }
      if (!prenomOwner) {
        return nomOwner;
      } else {
        return `${nomOwner} ${prenomOwner}`;
      }
    },
    formattedDate() {
      if (!this.resultSirene.date_creation) {
        return null;
      }
      const year = this.resultSirene.date_creation.substring(0, 4);
      const month = this.resultSirene.date_creation.substring(4, 6);
      const day = this.resultSirene.date_creation.substring(6, 8);
      return `${day}/${month}/${year}`;
    }
  }
};
</script>
