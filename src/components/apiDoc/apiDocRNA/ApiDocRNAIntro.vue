<template>
  <section class="section section-white">
    <div class="container">
      <div class="column">
        <h1>Documentation de l’API RNA</h1>
        <h2>
          L’API du Répertoire National des Associations est désormais disponible
          !
        </h2>
        <p>
          Dans le cadre du Service Public de la Donnée, de nombreux jeux de
          données s’ouvrent au grand public.<br />
          La base de données RNA sur les associations est maintenant
          <strong>Open data</strong>.
          <br />
          L’API RNA est développée par
          <a href="https://www.data.gouv.fr/fr/organizations/etalab/">Étalab</a
          >.<br />
          Ce site web et son API sont open-source : vous pouvez
          <a href="https://github.com/etalab/rna_as_api"
            >télécharger le code sur GitHub</a
          >.<br />
          Les données RNA sont disponibles sur
          <a
            href="https://www.data.gouv.fr/en/datasets/repertoire-national-des-associations/"
            >Data.gouv.fr</a
          >.
        </p>
      </div>
      <div class="column__icon">
        <img src="@/assets/img/icons/book.svg" alt="" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ApiDocIntro"
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  @media screen and (min-width: $tablet) {
    flex-direction: row;
  }
}

.column {
  display: flex;
  flex-direction: column;
}

.column__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media screen and (min-width: $tablet) {
    flex-direction: column;
    width: 20%;
  }
}
</style>
