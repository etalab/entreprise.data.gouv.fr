<template>
  <div>
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

    <section class="section section-grey">
      <div class="container">
        <div class="column__icon">
          <img src="@/assets/img/icons/laptop.svg" alt="" />
        </div>
        <div class="column__right">
          <h2>L’API RNA</h2>
          <h3>Comment interroger l’API ?</h3>
          <p>
            L’API RNA fonctionne de manière similaire à l’API Sirene. Vous devez
            faire pour cela une requête GET. L’adresse de l’API est :
            <a href="https://entreprise.data.gouv.fr/api/rna/"
              >https://entreprise.data.gouv.fr/api/rna/</a
            ><br />
            Attention, vous devez rajouter votre requête sur l’adresse.
          </p>
          <h3>Format de réponse</h3>
          <p>
            L’API vous renverra les informations demandées au format JSON (code
            200).<br />
            Vous recevrez un code 404 si aucun établissement n’est trouvé, ou un
            500 si le serveur n’est pas fonctionnel (par exemple pendant une
            maintenance). 429 après dépassement de la volumétrie maximale
            d'appels.
          </p>
          <h3>Limite de requêtes</h3>
          <p>
            Le serveur accepte un maximum de 7 requêtes par seconde. Au delà, un
            code 429 est renvoyé indiquant que la volumétrie d'appels a été
            dépassée. L'IP sera blacklistée si les appels ne sont pas régulés
            suite aux retours 429.
          </p>
        </div>
      </div>
      <div class="container container__subtext">
        <h2>Installer votre propre version de l’API RNA</h2>
        <p>
          Si vos besoins excèdent les limites des serveurs, par exemple pour si
          vous voulez effectuer davantage de requêtes, vous pouvez installer votre
          propre copie de l’API. Le manuel d’installation de l’API se trouve
          <a href="https://github.com/etalab/rna_as_api">sur github</a>.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'DocumentationRnaIntro'
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

.column {
  display: flex;
  flex-direction: column;
}

.column__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  order: 1;
  @media screen and (min-width: $tablet) {
    flex-direction: column;
    width: 20%;
    order: 0;
  }
}

.column__right {
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  max-width: 100%;
  @media screen and (min-width: $tablet) {
    max-width: 70%;
  }
}

.container__subtext {
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  > p {
    max-width: 100%;
  }
}

h3 {
  margin-bottom: 0;
}
</style>
