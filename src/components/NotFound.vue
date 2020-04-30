<template>
  <div class="emptyState">
    <h2>Erreur 404 : la page demandée n'a pas pu être trouvée.</h2>
  </div>
</template>

<script>
export default {
  name: "NotFound",

  metaInfo: {
    title: "Page non trouvée"
  }
};
</script>

<style lang="scss" scoped>
.emptyState {
  display: flex;
  justify-content: center;
  min-height: $height-empty;
  margin-top: 75px;
}
</style>
