<template>
  <div>
    <documentation-rna-intro />
    <documentation-rna-endpoint />
    <documentation-rna-outro />
  </div>
</template>

<script>
import DocumentationRnaIntro from "@/components/doc/rna/Intro";
import DocumentationRnaEndpoint from "@/components/doc/rna/Endpoint";
import DocumentationRnaOutro from "@/components/doc/rna/Outro";

export default {
  name: "DocumentationRnaEndpoint",

  metaInfo: {
    title: "Documentation API RNA"
  },

  components: {
    "documentation-rna-intro": DocumentationRnaIntro,
    "documentation-rna-endpoint": DocumentationRnaEndpoint,
    "documentation-rna-outro": DocumentationRnaOutro
  }
};
</script>

<style lang="scss" scoped>
</style>
