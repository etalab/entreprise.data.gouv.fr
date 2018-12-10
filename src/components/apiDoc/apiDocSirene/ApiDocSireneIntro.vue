<template>
  <section class="section section-white">
    <div class="container">
      <div class="row">
        <div class="column">
          <h1>Documentation de l’API Sirene</h1>
          <h2>Qu’est-ce que l’API Sirene ?</h2>
          <p>
            Dans le cadre du Service Public de la Donnée, de nombreux jeux de données s’ouvrent au grand public.<br>
            La base de données SIRENE sur les entreprises est donc maintenant <strong>Open data</strong>.
            Vous pouvez consulter la base de donnée librement et gratuitement !
          </p>
          <h2>Comment fonctionne Entreprise.data.gouv.fr ?</h2>
          <p>
            Ce site web interroge l’API Sirene développée par <a href="https://www.data.gouv.fr/fr/organizations/etalab/">Étalab</a>.
            Ce site web et son API sont open-source : vous pouvez <a href="https://github.com/etalab/sirene_as_api">télécharger le code sur GitHub</a>.<br/>
            Les données de référence SIRENE sont disponibles sur <a href="https://www.data.gouv.fr/en/datasets/base-sirene-des-entreprises-et-de-leurs-etablissements-siren-siret/">Data.gouv.fr</a>.
          </p>
        </div>
        <div class="column__icon">
          <img src="@/assets/img/icons/three-gears.svg" alt="">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ApiDocSireneIntro'
}
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

h2 {
  @media screen and (max-width: $tablet) {
    font-size: 1.60em;
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
  width: 90%;
  margin: auto;
  @media screen and (min-width: $tablet) {
    flex-direction: column;
    width: 20%;
  }
}


</style>
