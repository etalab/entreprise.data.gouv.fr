<template>
  <section class="section section-grey text-center public-administration">
    <div class="container">
      <p>
        Vous êtes une administration ?<br />
        Demandez un accès spécial à l'API Entreprise et obtenez des informations
        supplémentaires sur les sociétés
      </p>
      <a class="button" href="https://entreprise.api.gouv.fr/"
        >API Entreprise</a
      >
    </div>
  </section>
</template>

<script>
export default {
  name: "PublicAdministration"
};
</script>

<style lang="scss" scoped>
.public-administration {
  text-align: center;
}

.public-administration p {
  margin-left: auto;
  margin-right: auto;
}
</style>
