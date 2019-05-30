<template>
  <div v-if="didYouMean">
    <h4>
      Essayez avec cette orthographe :
      <span class="did-you-mean" @click="didYouMeanSearch(didYouMean)">{{
        didYouMean
      }}</span>
    </h4>
  </div>
</template>

<script>
export default {
  name: "ResultsDidYoumean",
  props: ["api"],
  data() {
    return {
      apiToCall: this.api
    };
  },
  computed: {
    didYouMean() {
      if (this.apiToCall == "SIRENE") {
        return this.$store.getters.storedSpellcheckSirene;
      } else if (this.apiToCall == "RNA") {
        return this.$store.getters.storedSpellcheckRNA;
      }
      return null;
    }
  },
  methods: {
    didYouMeanSearch(didYouMean) {
      this.$store.commit("setFullText", didYouMean);
      this.$store.dispatch("requestSearchFullText");
    }
  }
};
</script>

<style lang="scss" scoped>
.did-you-mean {
  font-weight: bolder;
  color: $color-light-blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>
