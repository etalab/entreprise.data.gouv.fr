<template>
  <div v-if="representantsPP || representantsPM" class="company__panel panel">
    <h4>Gestion, Direction, Administration, Contrôle, Associés ou Membres</h4>
    <div class="company__managers">
      <div v-for="rep in representantsPM" :key="rep.id">
        <representant-personne-morale :representant="rep" />
      </div>
      <div v-for="rep in representantsPP" :key="rep.id">
        <representant-personne-physique :representant="rep" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RepresentantPersonneMorale from "@/components/pages/etablissement/rncs/representants/PersonneMorale";
import RepresentantPersonnePhysique from "@/components/pages/etablissement/rncs/representants/PersonnePhysique";

export default {
  name: "Representants",

  computed: {
    ...mapGetters({
      representantsPM: "rncs/getRepresentantsPersonneMorale",
      representantsPP: "rncs/getRepresentantsPersonnePhysique"
    })
  },

  components: {
    "representant-personne-morale": RepresentantPersonneMorale,
    "representant-personne-physique": RepresentantPersonnePhysique
  },
};
</script>
