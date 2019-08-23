<template>
  <div class="emptyState">
    <h2>Etablissement non trouvé</h2>
  </div>
</template>

<script>
export default {
  name: "EtablissementSireneNotFound"
};
</script>

<style lang="scss" scoped>
.emptyState {
  display: flex;
  justify-content: center;
  min-height: $height-empty;
}
</style>
