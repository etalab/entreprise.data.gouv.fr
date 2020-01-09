<template>
  <section class="section section-grey">
    <div class="container">
      <div class="column__icon">
        <img src="@/assets/img/icons/search.svg" alt="" />
      </div>
      <div class="column__right">
        <h2>L’API RNCS</h2>
        <h3>Comment interroger l’API ?</h3>
        <p>
          L'API RNCS est similaire aux API Sirene et RNA. Vous devez faire une
          requête GET. L’adresse de l’API est :
          <a href="https://entreprise.data.gouv.fr/api/rncs/"
            >https://entreprise.data.gouv.fr/api/rncs/</a
          ><br />
          Attention, vous devez rajouter votre requête sur l’adresse.
        </p>
        <h3>Format de réponse</h3>
        <p>
          L’API vous renverra les informations demandées au format JSON (code
          200).<br />
          Les codes suivants sont également renvoyés :
        </p>
        <ul>
          <li>404 : Entreprise non trouvée dans les dossiers de greffes</li>
          <li>
            422 : Impossible d'effectuer la requête (par exemple si le SIREN est
            mal formaté)
          </li>
          <li>500 : Erreur serveur (par exemple pendant une maintenance)</li>
          <li>429 après dépassement de la volumétrie maximale d'appels.</li>
        </ul>
        <p>
          Les différents champs renvoyés dans la réponse sont listés dans
          <a
            href="https://www.inpi.fr/sites/default/files/doc_tech_imr_juillet_2018_v1.4.pdf"
            >la documentation de l'INPI</a
          >
        </p>
        <h3>Limite de requêtes</h3>
        <p>
          Le serveur accepte un maximum de 7 requêtes par seconde. Au delà, un
          code 429 est renvoyé indiquant que la volumétrie d'appels a été dépassée.
          L'IP sera blacklistée si les appels ne sont pas régulés suite aux retours 429.
        </p>
      </div>
    </div>
    <div class="container container__subtext">
      <h2>Installer votre propre version de l’API RNCS</h2>
      <p>
        Si vos besoins excèdent les limites des serveurs, par exemple pour si
        vous voulez effectuer davantage de requêtes, vous pouvez installer votre
        propre copie de l’API. Le manuel d’installation de l’API se trouve
        <a href="https://github.com/etalab/rncs_worker_api_entreprise"
          >sur github</a
        >.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "ApiDocRNCSGeneric"
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
