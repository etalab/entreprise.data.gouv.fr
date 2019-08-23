<template>
  <div>
    <api-doc-rna-intro />
    <api-doc-rna-generic />
    <api-doc-rna-endpoints :base-adress="baseAdress" />
    <api-doc-rna-coming-soon />
  </div>
</template>

<script>
import ApiDocRNAIntro from "@/components/apiDoc/apiDocRNA/ApiDocRNAIntro";
import ApiDocRNAGeneric from "@/components/apiDoc/apiDocRNA/ApiDocRNAGeneric";
import ApiDocRNAEndpoints from "@/components/apiDoc/apiDocRNA/ApiDocRNAEndpoints";
import ApiDocRNAComingSoon from "@/components/apiDoc/apiDocRNA/ApiDocRNAComingSoon";

export default {
  name: "ApiDocRNA",
  metaInfo: {
    title: "Doc API RNA"
  },
  components: {
    ApiDocRnaIntro: ApiDocRNAIntro,
    ApiDocRnaGeneric: ApiDocRNAGeneric,
    ApiDocRnaEndpoints: ApiDocRNAEndpoints,
    ApiDocRnaComingSoon: ApiDocRNAComingSoon
  },
  data() {
    return {
      baseAdress: "https://entreprise.data.gouv.fr/api/rna/v1/"
    };
  }
};
</script>
