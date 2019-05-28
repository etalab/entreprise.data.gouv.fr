<template>
  <section class="section">
    <div class="container">
      <server-error v-if="serverError"></server-error>
      <results-skeleton v-else-if="resultsAreLoading" />

      <template v-else>
        <div v-if="sireneError">
          <p>
            SIRENE: Notre serveur connait des difficultés. Veuillez essayer plus
            tard.
          </p>
        </div>
        <results-sirene v-else />
        <div v-if="RNAError">
          <p>
            RNA: Notre serveur connait des difficultés. Veuillez essayer plus
            tard.
          </p>
        </div>
        <results-rna v-else />
        <!-- paginate module on RNA and Sirene, so we use the bigger values -->
        <results-paginate-module
          v-if="biggerNumberPages"
          :totalPages="biggerNumberPages"
        ></results-paginate-module>
      </template>
    </div>
  </section>
</template>

<script>
import Loader from "@/components/modules/Loader";
import ServerError from "@/components/modules/ServerError";
import ResultsSirene from "@/components/results/ResultsSirene";
import ResultsRNA from "@/components/results/ResultsRNA";
import ResultsPaginateModule from "@/components/results/ResultsPaginateModule";
import ResultsSkeleton from "@/components/results/ResultsSkeleton";

export default {
  name: "Results",
  metaInfo() {
    return {
      title: `Recherche : ${this.storedLastFullText()}`
    };
  },
  components: {
    Loader: Loader,
    ServerError: ServerError,
    ResultsSirene: ResultsSirene,
    ResultsRna: ResultsRNA,
    ResultsPaginateModule: ResultsPaginateModule,
    ResultsSkeleton: ResultsSkeleton
  },
  computed: {
    resultsAreLoading() {
      return this.$store.getters.fullTextLoading;
    },
    serverError() {
      return this.$store.getters.fullTextError;
    },
    RNAError() {
      return this.$store.getters.fullTextRNAError;
    },
    sireneError() {
      return this.$store.getters.fullTextSireneError;
    },
    biggerNumberPages() {
      return Math.max(
        this.$store.getters.totalPageNumberSirene,
        this.$store.getters.totalPageNumberRNA
      );
    }
  },
  methods: {
    storedLastFullText() {
      return this.$store.state.searchFullText.storedLastFullText;
    }
  }
};
</script>

<style lang="scss" scoped>
.section {
  min-height: 70vh;
}

.panel {
  margin-top: 2em;
}
</style>
