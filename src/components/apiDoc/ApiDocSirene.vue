<template>
  <div>
    <api-doc-sirene-intro />
    <api-doc-sirene-generic />
    <api-doc-sirene-endpoints :base-adress="baseAdress" />
    <api-doc-sirene-better-searches />
    <api-doc-sirene-geospace :base-adress="baseAdress" />
    <api-doc-sirene-example :base-adress="baseAdress" />
  </div>
</template>

<script>
import ApiDocSireneIntro from "@/components/apiDoc/apiDocSirene/ApiDocSireneIntro";
import ApiDocSireneGeneric from "@/components/apiDoc/apiDocSirene/ApiDocSireneGeneric";
import ApiDocSireneEndpoints from "@/components/apiDoc/apiDocSirene/ApiDocSireneEndpoints";
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
    ApiDocSireneEndpoints: ApiDocSireneEndpoints,
    ApiDocSireneBetterSearches: ApiDocSireneBetterSearches,
    ApiDocSireneGeospace: ApiDocSireneGeospace,
    ApiDocSireneExample: ApiDocSireneExample
  },
  data() {
    return {
      baseAdress: "https://entreprise.data.gouv.fr/api/sirene/v1/"
    };
  }
};
</script>
