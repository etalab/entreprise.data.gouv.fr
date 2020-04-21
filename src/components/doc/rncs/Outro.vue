<template>
  <section class="section section-grey">
    <div class="container column__full">
      <h2>Restez connectés !</h2>
      <p>
        L’API RNCS est en phase de développement intensif.<br />
        La documentation est encore en phase d’écriture !<br />
        Revenez vite pour voir les avancées.
      </p>
      <img class="icon" src="@/assets/img/icons/work_in_progress.svg" alt="" />
    </div>
  </section>
</template>

<script>
export default {
  name: "DocumentationRncsOutro"
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
