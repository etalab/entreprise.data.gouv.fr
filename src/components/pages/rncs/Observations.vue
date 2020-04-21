<template>
  <div v-if="observations" class="company__panel">
    <h4>Observations</h4>
    <div class="comment-header">
      <div class="company__item company__comment-date">
        <div class="company__item-key">Date</div>
      </div>
      <div class="company__item">
        <div class="company__item-key">Observation</div>
      </div>
    </div>

    <div v-for="obs in observations" :key="obs.id" class="comment">
      <div class="company__item company__comment-date">
        <div class="company__item-value">
          {{ obs.date_ajout | placeHolderIfEmpty }}
        </div>
      </div>
      <div class="company__item">
        <div class="company__item-value">{{ obs.texte }}</div>
      </div>
    </div>
    <!--<panel-no-results :if-not-present="RNCSObservations" />-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Observations",

  computed: {
    ...mapGetters({
      observations: "rncs/getObservations"
    })
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
