<template>
  <div>
    <section class="section section-white">
      <div class="container">
        <div class="row">
          <div class="column">
            <h1>Documentation de l’API Sirene</h1>
            <h2>Qu’est-ce que l’API Sirene ?</h2>
            <p>
              Dans le cadre du Service Public de la Donnée, de nombreux jeux de
              données s’ouvrent au grand public.<br />
              La base de données SIRENE sur les entreprises est donc maintenant
              <strong>Open data</strong>. Vous pouvez consulter la base de donnée
              librement et gratuitement !
            </p>
            <h2>Comment fonctionne Entreprise.data.gouv.fr ?</h2>
            <p>
              Ce site web interroge l’API Sirene développée par
              <a href="https://www.data.gouv.fr/fr/organizations/etalab/"
                >Étalab</a
              >. Ce site web et son API sont open-source : vous pouvez
              <a href="https://github.com/etalab/sirene_as_api"
                >télécharger le code sur GitHub</a
              >.<br />
              Les données de référence SIRENE sont disponibles sur
              <a
                href="https://www.data.gouv.fr/en/datasets/base-sirene-des-entreprises-et-de-leurs-etablissements-siren-siret/"
                >Data.gouv.fr</a
              >.
            </p>
          </div>
          <div class="column__icon">
            <img src="@/assets/img/icons/three-gears.svg" alt="" />
          </div>
        </div>
      </div>
    </section>

    <section class="section section-grey">
      <div class="container">
        <div class="row">
          <div class="column__icon">
            <img src="@/assets/img/icons/computer-user.svg" alt="" />
          </div>
          <div class="column__right">
            <h2>Maîtrisez l’API Sirene</h2>
            <h3>Comment interroger l’API ?</h3>
            <p>
              Vous devez faire pour cela une requête GET. L’adresse de l'API est :
              <code>https://entreprise.data.gouv.fr/api/sirene/v3/</code><br />
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
      </div>
      <div class="container container__subtext">
        <h2>Installez votre propre version de l’API Sirene</h2>
        <p>
          Si vos besoins excèdent les limites des serveurs, par exemple pour si
          vous voulez effectuer davantage de requêtes, vous pouvez installer votre
          propre copie de l’API. Un
          <a href="https://github.com/etalab/sirene_as_api_ansible"
            >script ansible</a
          >
          est à votre disposition pour vous faciliter la tâche.<br />
          Le manuel d’installation de l’API se trouve
          <a href="https://github.com/etalab/sirene_as_api">sur github</a>. Vous
          pouvez de même lancer
          <a href="https://github.com/etalab/entreprise.data.gouv.fr"
            >votre installation</a
          >
          du site Entreprise.data.gouv.fr.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "DocumentationSireneIntro"
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

h2 {
  @media screen and (max-width: $tablet) {
    font-size: 1.6em;
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

.column__right {
  display: flex;
  flex-direction: column;
  align-self: flex-end;
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
