<template>
  <div v-if="managers.length" class="company__panel panel">
    <h4>Gestion, Direction, Administration, Contrôle, Associés ou Membres</h4>
    <div class="company__managers">
      <div v-for="manager in managersLegal" :key="manager.id">
        <etablissement-rncs-gestion-morale :manager="manager" />
      </div>
      <div v-for="manager in managersPhysical" :key="manager.id">
        <etablissement-rncs-gestion-physique :manager="manager" />
      </div>
    </div>
    <panel-no-results :if-not-present="managers" />
  </div>
</template>

<script>
import EtablissementRNCSGestionMorale from "@/components/etablissement/etablissementRNCS/etablissementRNCSGestion/EtablissementRNCSGestionMorale";
import EtablissementRNCSGestionPhysique from "@/components/etablissement/etablissementRNCS/etablissementRNCSGestion/EtablissementRNCSGestionPhysique";
import PanelNoResults from "@/components/etablissement/etablissementRNCS/templates/PanelNoResults";
import Filters from "@/components/mixins/filters";
import RNCSFormating from "@/components/etablissement/etablissementRNCS/mixins/RNCSformating";

export default {
  name: "EtablissementRNCSGestion",
  components: {
    PanelNoResults: PanelNoResults,
    EtablissementRncsGestionMorale: EtablissementRNCSGestionMorale,
    EtablissementRncsGestionPhysique: EtablissementRNCSGestionPhysique
  },
  mixins: [Filters, RNCSFormating],
  computed: {
    managers() {
      return this.$store.getters.RNCSData.representants;
    },
    managersLegal() {
      return this.managers.filter(
        manager =>
          manager.type_representant &&
          RegExp(/morale/).test(manager.type_representant.toLowerCase())
      );
    },
    managersPhysical() {
      return this.managers.filter(
        manager =>
          manager.type_representant &&
          RegExp(/physique/).test(manager.type_representant.toLowerCase())
      );
    }
  }
};
</script>
