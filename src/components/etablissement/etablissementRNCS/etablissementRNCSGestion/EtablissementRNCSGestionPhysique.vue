<template>
  <div>
    <h5>{{ manager.qualite | ifEmptyShowPlaceholder | capitalize }}</h5>
    <div class="company__item-inline">
      <div class="company__item-key">Nom</div>
      <div class="company__item-value">
        {{ concatNames(manager.prenoms, manager.nom_patronyme) }}
      </div>
    </div>
    <div v-if="manager.nom_usage" class="company__item-inline">
      <div class="company__item-key">Nom d’usage</div>
      <div class="company__item-value">{{ manager.nom_usage | upperCase }}</div>
    </div>
    <panel-info
      :parent="manager"
      :elements="elementsToDisplayPhysical1"
      :inline-labels="true"
    />
    <div class="company__item-inline">
      <div class="company__item-key">Adresse</div>
      <div class="company__item-value">
        <div>{{ manager.adresse_ligne_1 | ifEmptyShowPlaceholder }}</div>
        <div v-if="manager.adresse_ligne_2">{{ manager.adresse_ligne_2 }}</div>
        <div v-if="manager.adresse_ligne_3">{{ manager.adresse_ligne_3 }}</div>
        <div>{{ formatAddressInfos(manager, "", true) }}</div>
      </div>
    </div>
    <panel-info
      :parent="manager"
      :elements="elementsToDisplayPhysical2"
      :inline-labels="true"
    />
    <div v-if="collabName(manager)" class="company__item-inline">
      <div class="company__item-key">Nom du conjoint collaborateur</div>
      <div class="company__item-value">{{ collabName(manager) }}</div>
    </div>
  </div>
</template>

<script>
import PanelInfo from "@/components/etablissement/etablissementRNCS/templates/PanelInfo";
import Filters from "@/components/mixins/filters";
import Formating from "@/components/mixins/formating";
import RNCSFormating from "@/components/etablissement/etablissementRNCS/mixins/RNCSformating";

export default {
  name: "EtablissementRNCSGestionPhysique",
  components: { PanelInfo: PanelInfo },
  mixins: [Filters, Formating, RNCSFormating],
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
      elementsToDisplayPhysical1: {
        Pseudonyme: "pseudonyme",
        "Date de naissance": "date_naissance",
        "Ville de naissance": "ville_naissance",
        "Pays de naissance": "pays_naissance",
        Nationalité: "nationalite"
      },
      elementsToDisplayPhysical2: {
        "Conjoint collaborateur, Nom d’usage": "conjoint_collab_nom_usage",
        "Conjoint collaborateur, Date de Fin": "conjoint_collab_date_fin",
        "Conjoint collaborateur, Nom": "conjoint_collab_nom_patronyme",
        "Conjoint collaborateur, Pseudonyme": "conjoint_collab_pseudonyme",
        "Conjoint collaborateur, Prénoms": "conjoint_collab_prénoms"
      }
    };
  }
};
</script>
