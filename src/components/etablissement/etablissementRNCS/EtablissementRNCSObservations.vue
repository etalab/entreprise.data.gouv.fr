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
      v-for="observation in RNCSObservationsWithTextOrdered"
      :key="observation.id"
      class="comment"
    >
      <div class="company__item company__comment-date">
        <div class="company__item-value">
          {{ observation.date_ajout | ifExist }}
        </div>
      </div>
      <div class="company__item">
        <div class="company__item-value">{{ observation.texte }}</div>
      </div>
    </div>
    <panel-no-results :if-not-present="RNCSObservations" />
  </div>
</template>

<script>
import Filters from "@/components/mixins/filters";
import PanelNoResults from "@/components/etablissement/etablissementRNCS/templates/PanelNoResults";
import orderBy from "lodash/orderBy";

export default {
  name: "EtablissementRNCSObservations",
  components: { PanelNoResults: PanelNoResults },
  mixins: [Filters],
  computed: {
    RNCSData() {
      return this.$store.getters.RNCSData;
    },
    RNCSObservations() {
      return this.$store.getters.RNCSData.observations;
    },
    // Returning observations that have text, ordered.
    RNCSObservationsWithTextOrdered() {
      const RNCSObservationsWithText = this.RNCSObservations.filter(
        observation => {
          return observation.texte !== null;
        }
      );
      return orderBy(RNCSObservationsWithText, "date_ajout", "desc");
    }
  }
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
