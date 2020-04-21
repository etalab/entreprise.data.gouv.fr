<template>
  <section class="section section-grey">
    <div class="container column__full">
      <h2>Restez connectés !</h2>
      <p>
        L’API RNA est en phase de développement intensif.<br />
        Vous pouvez suivre l’avancée des travaux sur
        <a href="https://github.com/etalab/rna_as_api">github</a><br />
        ou sur cette page de documentation pour les futures fonctionnalités !
      </p>
      <img class="icon" src="@/assets/img/icons/work_in_progress.svg" alt="" />
    </div>
  </section>
</template>

<script>
export default {
  name: "DocumentationRnaOutro"
};
</script>

<style lang="scss" scoped>
.column__full {
  text-align: center;

  p {
    margin: auto;
  }
}

.icon {
  margin-top: 2em;
  min-height: 100px;
  min-width: 100px;
}
</style>
