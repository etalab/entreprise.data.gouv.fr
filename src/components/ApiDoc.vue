<template>
  <div>
    <api-doc-intro />
    <api-doc-list />
    <api-doc-others />
    <api-doc-outro />
  </div>
</template>

<script>
import ApiDocIntro from "@/components/apiDoc/ApiDocIntro";
import ApiDocList from "@/components/apiDoc/ApiDocList";
import ApiDocOthers from "@/components/apiDoc/ApiDocOthers";
import ApiDocOutro from "@/components/apiDoc/ApiDocOutro";

export default {
  name: "ApiDoc",
  metaInfo: {
    title: "Documentation"
  },
  components: {
    ApiDocIntro: ApiDocIntro,
    ApiDocList: ApiDocList,
    ApiDocOthers: ApiDocOthers,
    ApiDocOutro: ApiDocOutro
  }
};
</script>
