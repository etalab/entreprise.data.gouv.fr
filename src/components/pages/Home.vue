<template>
  <div>
    <section class="api text-center section">
      <div class="container">
        <div class="row">
          <div class="column">
            <p>
              Vous pouvez, si vous le souhaitez, interroger directement les APIs
            </p>
            <router-link class="button" :to="{ name: 'api-doc' }"
              >Documentation des APIs</router-link
            >
          </div>
          <div class="column api__image">
            <img
              src="@/assets/img/man-at-desktop.svg"
              alt="man-at-desktop"
              width="200"
            />
          </div>
          <div class="column">
            <p>Téléchargez les données de référence sur le site data.gouv.fr</p>
            <a class="button" href="https://www.data.gouv.fr/fr/reference"
              >Données de référence</a
            >
          </div>
        </div>
      </div>
    </section>

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

    <form class="text-center">
      <h4>Inscription Mailing-List</h4>
      <p>
        Vos données sont traitées par Mailjet.<br />
        Vos informations ne seront jamais utilisées à des fins commerciales.
      </p>
      <iframe
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        src="https://app.mailjet.com/widget/iframe/zR1/ack"
        width="340"
        height="95"
      ></iframe>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Homepage',

  metaInfo: {
    title: "Accueil"
  }
}
</script>

<style lang="scss" scoped>
a.button {
  padding: 0.5em 0.5em;
  min-width: 280px;
}

.api .column {
  min-width: 200px;
}

.api__image {
  margin: 0em 2em;
}

.public-administration {
  text-align: center;
}

.public-administration p {
  margin-left: auto;
  margin-right: auto;
}

h4 {
  margin-bottom: 0;
  margin-top: 20px;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
iframe {
  margin: auto;
  @media screen and (max-width: $mobile) {
    width: 290px;
  }
}
</style>
