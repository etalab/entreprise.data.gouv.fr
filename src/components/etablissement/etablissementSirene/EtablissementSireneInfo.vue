<template>
  <div class="company__panel panel">
    <div class="name__category">
      <h4>Informations générales</h4>
    </div>
    <div class="company__item">
      <label class="company__item-key">SIRET</label>
      <div class="company__item-value">
        {{ resultSirene.siret | prettySiret }}
      </div>
    </div>
    <div class="company__item">
      <label class="company__item-key">SIREN</label>
      <div class="company__item-value">
        {{ resultSirene.siren | prettySiren }}
      </div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Clef NIC</label>
      <div class="company__item-value">{{ resultSirene.nic }}</div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Activité principale Etablissement</label>
      <div class="company__item-value">
        {{ resultSirene.activite_principale }} -
        {{ libelleFromCodeNaf(resultSirene.activite_principale) }}
      </div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Activité principale Entreprise</label>
      <div class="company__item-value">
        {{ resultSirene.unite_legale.activite_principale }} -
        {{ libelleFromCodeNaf(resultSirene.unite_legale.activite_principale) }}
      </div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Nature juridique</label>
      <div class="company__item-value">
        {{
          resultSirene.unite_legale.categorie_juridique | ifEmptyShowPlaceholder
        }}
        -
        {{
          libelleFromCategoriesJuridiques(
            resultSirene.unite_legale.categorie_juridique
          )
        }}
      </div>
    </div>
    <div class="company__item">
      <label class="company__item-key">Numéro RNA</label>
      <div class="company__item-value">
        {{
          resultSirene.unite_legale.identifiant_association
            | ifEmptyShowPlaceholder
        }}
      </div>
    </div>
    <div class="company__item">
      <label class="company__item-key">N° TVA Intracommunautaire</label>
      <div class="company__item-value">
        {{ tvaIntracommunautaire | prettyTvaNumber }}
      </div>
    </div>
  </div>
</template>

<script>
import Filters from "@/components/mixins/filters";
import Libelles from "@/components/mixins/libelles";

export default {
  name: "EtablissementSireneInfo",
  mixins: [Filters, Libelles],
  computed: {
    resultSirene() {
      return this.$store.getters.singlePageEtablissementSirene;
    },
    tvaIntracommunautaire() {
      const tvaKey = (12 + 3 * (this.resultSirene.siren % 97)) % 97;
      const tvaNumber = `${tvaKey}${this.resultSirene.siren}`;
      return `FR${tvaNumber}`;
    }
  }
};
</script>
