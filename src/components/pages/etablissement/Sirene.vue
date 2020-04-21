<template>
  <section class="section">
    <div class="container">
      <div v-if="dataLoaded" class="company">
        <company-details />
        <etablissement-details />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import CompanyDetails from "@/components/pages/etablissement/sirene/CompanyDetails.vue";
import EtablissementDetails from "@/components/pages/etablissement/sirene/EtablissementDetails.vue";

export default {
  name: 'SireneEtablissement',

  metaInfo() {
    const companyName = this.companyTitle || "Non diffusable"

    return {
      title: `${companyName} - Données de la base SIRENE`
    }
  },

  props: { sirenOrSiret: String },

  data() {
    return {
      dataLoaded: false
    }
  },

  watch: {
    sirenOrSiret: function() { this.fetchAllData() }
  },

  created() {
    this.fetchAllData();
  },

  computed: {
    ...mapGetters({ companyTitle: "sirene/getCompanyTitle"})
  },

  methods: {
    fetchAllData: function() {
      this.dataLoaded = false;
      this.$store.dispatch("sirene/fetchAllData", this.sirenOrSiret)
        .then(() => this.dataLoaded = true)
    }
  },

  components: {
    "company-details": CompanyDetails,
    "etablissement-details": EtablissementDetails
  }
}
</script>

<style lang="scss" scoped>
</style>
