<template>
  <div class="errorPage">
    <h2>Erreur sur le serveur</h2>
  </div>
</template>

<script>
export default {
  name: "ServerError"
};
</script>

<style lang="scss" scoped>
.errorPage {
  display: flex;
  justify-content: center;
  min-height: $height-empty;
}
</style>
