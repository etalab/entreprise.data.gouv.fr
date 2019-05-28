<template>
  <div v-if="!dataIsAvailable">
    <p class="no-result">Pas de résultats dans cette catégorie</p>
  </div>
</template>

<script>
export default {
  name: "PanelNoResults",
  props: ["ifNotPresent"],
  computed: {
    dataIsAvailable() {
      if (this.ifNotPresent && this.ifNotPresent.length != 0) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.no-result {
  color: $color-dark-grey;
}
</style>
