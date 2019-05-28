<template>
  <div v-if="RNCSObservations.length" class="company__panel">
    <h4>Observations</h4>
    <div class="comment-header">
      <div class="company__item company__comment-date">
        <div class="company__item-key">Date</div>
      </div>
      <div class="company__item">
        <div class="company__item-key">Observation</div>
      </div>
    </div>
    <div
      class="comment"
      v-for="observation in RNCSObservationsOrdered"
      :key="observation.id"
      v-if="observation.texte"
    >
      <div class="company__item company__comment-date">
        <div class="company__item-value">
          {{ observation.date_ajout | frenchDateFormat | ifExist }}
        </div>
      </div>
      <div class="company__item">
        <div class="company__item-value">{{ observation.texte }}</div>
      </div>
    </div>
    <panel-no-results :ifNotPresent="RNCSObservations" />
  </div>
</template>

<script>
import Filters from "@/components/mixins/filters";
import PanelNoResults from "@/components/etablissement/etablissementRNCS/templates/PanelNoResults";
import orderBy from "lodash/orderBy";

export default {
  name: "EtablissementRNCSObservations",
  components: { PanelNoResults: PanelNoResults },
  computed: {
    RNCSData() {
      return this.$store.getters.RNCSData;
    },
    RNCSObservations() {
      return this.$store.getters.RNCSData.observations;
    },
    RNCSObservationsOrdered() {
      return orderBy(this.RNCSObservations, "date_ajout", "desc");
    }
  },
  mixins: [Filters]
};
</script>

<style lang="scss" scoped>
.comment {
  background-color: $color-lightest-grey;
  padding: 1em;
  display: flex;
  flex-direction: row;
  width: 100%;
}

.comment + .comment {
  margin-top: 2em;
}

.comment-header {
  padding: 0 1em 0.5em;
  display: flex;
  flex-direction: row;
}

.company__comment-date {
  margin-right: 2em;
  flex: 0 0 100px;
}

@media screen and (max-width: $tablet) {
  .comment {
    flex-direction: column;
  }
}
</style>
