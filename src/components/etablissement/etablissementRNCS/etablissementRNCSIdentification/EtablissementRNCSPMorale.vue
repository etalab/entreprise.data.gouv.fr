<template>
  <div v-if="RNCSLegal">
    <h4>Identification de la Personne Morale</h4>
    <panel-info
      class="company__item"
      :parent="RNCSLegal"
      :elements="elementsToDisplay1"
    />
    <div class="company__item">
      <div class="company__item-key">Informations capital</div>
      <div class="company__item-value">
        {{ RNCSDeviseSentence(RNCSLegal) }}
      </div>
    </div>
    <div class="company__item">
      <div class="company__item-key">Adresse du siège</div>
      <div v-if="siege.adresse_ligne_1" class="company__item-value">
        {{ siege.adresse_ligne_1 | ifEmptyShowPlaceholder }}
      </div>
      <div v-if="siege.adresse_ligne_2" class="company__item-value">
        {{ siege.adresse_ligne_2 | ifEmptyShowPlaceholder }}
      </div>
      <div v-if="siege.adresse_ligne_3" class="company__item-value">
        {{ siege.adresse_ligne_3 | ifEmptyShowPlaceholder }}
      </div>
      <div>
        {{ RNCSConcatAddressSiege(siege) | ifEmptyShowPlaceholder }}
      </div>
    </div>
  </div>
</template>

<script>
import PanelInfo from "@/components/etablissement/etablissementRNCS/templates/PanelInfo";
import Filters from "@/components/mixins/filters";
import RNCSFormating from "@/components/etablissement/etablissementRNCS/mixins/RNCSformating";

export default {
  name: "EtablissementRNCSPMorale",
  components: { PanelInfo: PanelInfo },
  mixins: [Filters, RNCSFormating],
  data() {
    return {
      elementsToDisplay1: {
        Dénomination: "denomination",
        Sigle: "sigle",
        SIREN: "siren",
        "Forme juridique": "forme_juridique",
        "Associé unique": "associe_unique",
        "Activité principale": "activite_principale"
      }
    };
  },
  computed: {
    RNCSLegal() {
      return this.$store.getters.RNCSData.personne_morale;
    },
    siege() {
      const etablissements = this.$store.getters.RNCSData.etablissements;

      const siege = etablissements.find(etablissement => {
        return (
          etablissement.type_etablissement == "SIE" ||
          etablissement.type_etablissement == "SEP"
        );
      });

      return siege;
    }
  }
};
</script>
