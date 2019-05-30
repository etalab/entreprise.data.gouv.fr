<template>
  <div>
    <api-doc-rncs-intro />
    <api-doc-rncs-generic />
    <api-doc-rncs-endpoints :baseAdress="baseAdress" />
    <api-doc-rncs-coming-soon />
  </div>
</template>

<script>
import ApiDocRNCSIntro from "@/components/apiDoc/apiDocRNCS/ApiDocRNCSIntro";
import ApiDocRNCSComingSoon from "@/components/apiDoc/apiDocRNCS/ApiDocRNCSComingSoon";
import ApiDocRNCSGeneric from "@/components/apiDoc/apiDocRNCS/ApiDocRNCSGeneric";
import ApiDocRNCSEndpoint from "@/components/apiDoc/apiDocRNCS/ApiDocRNCSEndpoints";

export default {
  name: "ApiDocRNCS",
  metaInfo: {
    title: "Doc API RNCS"
  },
  components: {
    ApiDocRncsIntro: ApiDocRNCSIntro,
    ApiDocRncsGeneric: ApiDocRNCSGeneric,
    ApiDocRncsEndpoints: ApiDocRNCSEndpoint,
    ApiDocRncsComingSoon: ApiDocRNCSComingSoon
  },
  data() {
    return {
      baseAdress: "https://entreprise.data.gouv.fr/api/rncs/"
    };
  }
};
</script>
