<template>
  <div>
    <documentation-rncs-intro />
    <documentation-rncs-endpoints />
    <documentation-rncs-outro />
  </div>
</template>

<script>
import DocumentationRncsIntro from "@/components/doc/rncs/Intro";
import DocumentationRncsEndpoint from "@/components/doc/rncs/Endpoint";
import DocumentationRncsOutro from "@/components/doc/rncs/Outro";

export default {
  name: "DocumentationRncs",

  metaInfo: {
    title: "Documentation API RNCS"
  },

  components: {
    "documentation-rncs-intro": DocumentationRncsIntro,
    "documentation-rncs-endpoints": DocumentationRncsEndpoint,
    "documentation-rncs-outro": DocumentationRncsOutro
  }
};
</script>

<style lang="scss" scoped>
</style>
