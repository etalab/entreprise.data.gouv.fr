<template>
  <div>
    <api-doc-sirene-intro />
    <api-doc-sirene-generic />
    <api-doc-sirene-endpoints-v3 :base-adress="baseAdressV3" />
    <api-doc-sirene-endpoints-v2 :base-adress="baseAdressV2" />
    <api-doc-sirene-better-searches />
    <api-doc-sirene-geospace :base-adress="baseAdressV2" />
    <api-doc-sirene-example :base-adress="baseAdressV2" />
  </div>
</template>

<script>
import ApiDocSireneIntro from "@/components/apiDoc/apiDocSirene/ApiDocSireneIntro";
import ApiDocSireneGeneric from "@/components/apiDoc/apiDocSirene/ApiDocSireneGeneric";
import ApiDocSireneEndpointsV3 from "@/components/apiDoc/apiDocSirene/ApiDocSireneEndpointsV3";
import ApiDocSireneEndpointsV2 from "@/components/apiDoc/apiDocSirene/ApiDocSireneEndpointsV2";
import ApiDocSireneBetterSearches from "@/components/apiDoc/apiDocSirene/ApiDocSireneBetterSearches";
import ApiDocSireneGeospace from "@/components/apiDoc/apiDocSirene/ApiDocSireneGeospace";
import ApiDocSireneExample from "@/components/apiDoc/apiDocSirene/ApiDocSireneExample";

export default {
  name: "ApiDoc",
  metaInfo: {
    title: "Doc API Sirene"
  },
  components: {
    ApiDocSireneIntro: ApiDocSireneIntro,
    ApiDocSireneGeneric: ApiDocSireneGeneric,
    ApiDocSireneEndpointsV3: ApiDocSireneEndpointsV3,
    ApiDocSireneEndpointsV2: ApiDocSireneEndpointsV2,
    ApiDocSireneBetterSearches: ApiDocSireneBetterSearches,
    ApiDocSireneGeospace: ApiDocSireneGeospace,
    ApiDocSireneExample: ApiDocSireneExample
  },
  data() {
    return {
      baseAdressV2: "https://entreprise.data.gouv.fr/api/sirene/v1/",
      baseAdressV3: "https://entreprise.data.gouv.fr/api/sirene/v3/"
    };
  }
};
</script>
