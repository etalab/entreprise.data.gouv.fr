<template>
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
            maintenance).
          </p>
          <h3>Limite de requêtes</h3>
          <p>
            Le serveur accepte 7 requêtes par seconde, soit 420 requêtes par
            minute. Au delà, un code 429 est renvoyé.
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
</template>

<script>
export default {
  name: "ApiDocSireneGeneric"
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
