<template>
  <div>
    <h5>{{ manager.qualite | ifExist | capitalize }}</h5>
    <panel-info
      :parent="manager"
      :elements="elementsToDisplayLegal"
      :inline-labels="true"
    />
    <div v-if="manager.siren_pm" class="company__item-inline">
      <div class="company__item-key">SIREN</div>
      <div class="company__item-value">
        <router-link
          :to="{
            name: 'Etablissement',
            params: { searchId: manager.siren_pm }
          }"
        >
          {{ manager.siren_pm | prettySiren }}</router-link
        >
      </div>
    </div>
    <div class="company__item-inline">
      <div class="company__item-key">Adresse</div>
      <div class="company__item-value">
        <div v-if="manager.adresse_ligne_1">
          {{ manager.adresse_ligne_1 | ifExist }}
        </div>
        <div v-if="manager.adresse_ligne_2">{{ manager.adresse_ligne_2 }}</div>
        <div v-if="manager.adresse_ligne_3">{{ manager.adresse_ligne_3 }}</div>
        <div>{{ RNCSConcatAddress(manager) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import PanelInfo from "@/components/etablissement/etablissementRNCS/templates/PanelInfo";
import Filters from "@/components/mixins/filters";
import RNCSFormating from "@/components/etablissement/etablissementRNCS/mixins/RNCSformating";

export default {
  name: "EtablissementRNCSGestionMorale",
  components: { PanelInfo: PanelInfo },
  mixins: [Filters, RNCSFormating],
  props: {
    manager: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      elementsToDisplayLegal: {
        Dénomination: "denomination",
        "Forme Juridique": "forme_juridique"
      },
      // Following stuff is representant permanent, deactivated for now
      elementsToDisplayLegal2: {
        "Nom d’usage": "representant_permanent_nom_usage",
        "Date de naissance": "representant_permanent_date_naissance",
        "Ville de naissance": "representant_permanent_ville_naissance",
        "Pays de naissance": "representant_permanent_pays_naissance",
        Nationalité: "representant_permanent_nationalite"
      }
    };
  }
};
</script>
