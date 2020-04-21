<template>
  <div class="company">
    <div class="company-container">
      <div class="company__panel panel">
        <h4>Contact</h4>
        <div class="company__item">
          <label class="company__item-key">Gérant</label>
          <div class="company__item-value">
            {{ managingDirector | placeHolderIfEmpty }}
          </div>
        </div>
        <div class="company__item">
          <label class="company__item-key">Adresse</label>
          <div class="company__item-value">
            {{ formattedAddress | placeHolderIfEmpty }}
          </div>
        </div>
        <div class="company__item">
          <label class="company__item-key">Ville</label>
          <div class="company__item-value">
            {{ etablissement.code_postal }} {{ etablissement.libelle_commune }}
          </div>
        </div>
        <div class="company__item">
          <label class="company__item-key">Cedex</label>
          <div class="company__item-value">
            {{ etablissement.code_cedex | placeHolderIfEmpty }}
          </div>
        </div>
        <div class="company__item">
          <label class="company__item-key">Date de création</label>
          <div class="company__item-value">{{ formattedDate }}</div>
        </div>
        <div class="company__item">
          <label class="company__item-key">Tranche d’effectif salariés</label>
          <div class="company__item-value">
            {{ etablissement.tranche_effectifs | placeHolderIfEmpty }}
          </div>
        </div>
      </div>

      <div class="company__panel panel">
        <div class="name__category">
          <h4>Informations générales</h4>
        </div>
        <div class="company__item">
          <label class="company__item-key">SIRET</label>
          <div class="company__item-value">
            {{ etablissement.siret | prettySiret }}
          </div>
        </div>
        <div class="company__item">
          <label class="company__item-key">SIREN</label>
          <div class="company__item-value">
            {{ etablissement.siren | prettySiren }}
          </div>
        </div>
        <div class="company__item">
          <label class="company__item-key">Clef NIC</label>
          <div class="company__item-value">{{ etablissement.nic }}</div>
        </div>
        <div class="company__item">
          <label class="company__item-key">Activité principale Etablissement</label>
          <div class="company__item-value">
            {{ etablissement.activite_principale }} -
            {{ libelleFromCodeNaf(etablissement.activite_principale) }}
          </div>
        </div>
        <div class="company__item">
          <label class="company__item-key">Activité principale Entreprise</label>
          <div class="company__item-value">
            {{ uniteLegale.activite_principale }} -
            {{ libelleFromCodeNaf(uniteLegale.activite_principale) }}
          </div>
        </div>
        <div class="company__item">
          <label class="company__item-key">Nature juridique</label>
          <div class="company__item-value">
            {{
              uniteLegale.categorie_juridique | placeHolderIfEmpty
            }}
            -
            {{
              libelleFromCategoriesJuridiques(uniteLegale.categorie_juridique)
            }}
          </div>
        </div>
        <div class="company__item">
          <label class="company__item-key">Numéro RNA</label>
          <div class="company__item-value">
            {{
              uniteLegale.identifiant_association
                | placeHolderIfEmpty
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { concatNames, libelleFromCodeNaf, libelleFromCategoriesJuridiques } from "@/helpers";

export default {
  name: 'EtablissementDetails',

  computed: {
    ...mapGetters({
      uniteLegale: "sirene/getUniteLegale",
      etablissement: "sirene/getEtablissement",
      formattedAddress: "sirene/getFormattedAddress"
    }),

    managingDirector: function() {
      return concatNames(this.uniteLegale.prenom_1, this.uniteLegale.nom);
    },

    formattedDate() {
      const year = this.uniteLegale.date_creation.substring(0, 4);
      const month = this.uniteLegale.date_creation.substring(5, 7);
      const day = this.uniteLegale.date_creation.substring(8, 10);
      return `${day}/${month}/${year}`;
    },

    tvaIntracommunautaire() {
      const tvaKey = (12 + 3 * (this.etablissement.siren % 97)) % 97;
      const tvaNumber = `${tvaKey}${this.etablissement.siren}`;
      return `FR${tvaNumber}`;
    }
  },

  methods: {
    libelleFromCodeNaf: libelleFromCodeNaf,
    libelleFromCategoriesJuridiques: libelleFromCategoriesJuridiques,
  }
}
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
