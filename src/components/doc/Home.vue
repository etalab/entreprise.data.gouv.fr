<template>
  <div>
    <section class="section section-white">
      <div class="container text-center">
        <h1>Les APIs Open Data</h1>
        <p class="text-center lead-text">
          Entreprise.data.gouv.fr met à votre disposition des APIs open-source
          gratuites<br />
          pour faciliter l'utilisation des données par les professionnels et les
          particuliers.<br />
        </p>
        <p class="text-center lead-text">
          De nombreuses APIs sont en cours d’ajout. Vous pouvez vous inscrire à
          notre mailing-list pour vous tenir au courant des nouveautés et
          changements à venir.<br />
        </p>
      </div>

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
    </section>

    <section class="section section-grey">
      <div class="container apis">
        <h2>L’API Sirene</h2>
        <div class="row">
          <p class="description">
            L’API Sirene contient tous les établissements des entreprises
            françaises, ainsi que toutes les associations disposant d’un code
            SIRET. Les données de l’API Sirene sont délivrées par l’INSEE.
          </p>
          <div class="cta">
            <router-link class="button" :to="{ name: 'api-doc-sirene' }"
              >Documentation API Sirene</router-link
            >
          </div>
        </div>
      </div>
    </section>

    <section class="section section-white">
      <div class="container apis">
        <h2>L’API Repertoire National des Associations (RNA)</h2>
        <div class="row">
          <p class="description">
            Cette API contient toutes les associations françaises. Les données
            proviennent du Ministère de l’Intérieur.
          </p>
          <div class="cta">
            <router-link class="button" :to="{ name: 'api-doc-rna' }"
              >Documentation API RNA</router-link
            >
          </div>
        </div>
      </div>
    </section>

    <section class="section section-grey">
      <div class="container apis">
        <h2>L’API Répertoire National des Métiers (RNM)</h2>
        <div class="row">
          <p class="description">
            L’API RNM vous est gracieusement ouverte par les Chambres et Métiers
            de l’Artisanat. Les données sont mises à jour toutes les nuits.
          </p>
          <div class="cta">
            <a class="button" href="https://api-rnm.artisanat.fr/"
              >Documentation API RNM</a
            >
          </div>
        </div>
      </div>
    </section>

    <section class="section section-white">
      <div class="container apis">
        <h2>L’API Registre National du Commerce et des Sociétés (RNCS)</h2>
        <div class="row">
          <p class="description">
            <strong>⚠ En version alpha ⚠ </strong><br />
            Cette API contient les données IMR (Immatriculation, Modification,
            Radiation) du Registre National du Commerce et des Sociétés de
            l’INPI.
          </p>
          <div class="cta">
            <router-link class="button" :to="{ name: 'api-doc-rncs' }"
              >Documentation API RNCS</router-link
            >
          </div>
        </div>
      </div>
    </section>

    <section class="section section-grey">
      <div class="container">
        <div class="row">
          <div class="column__right">
            <h2>Découvrez les autres APIs et jeux de données Data.gouv</h2>
            <p>
              <a href="https://data.gouv.fr">Data.gouv.fr</a> met a votre
              disposition de nombreux jeux de données "Open Data".<br />
              Quelques exemples&nbsp;:
            </p>
            <ul>
              <li>
                <a
                  href="https://www.data.gouv.fr/fr/datasets/resultats-de-lintegralite-des-elections-depuis-2001/"
                  >Les résultats électoraux</a
                >
              </li>
              <li>
                <a
                  href="https://www.data.gouv.fr/fr/datasets/fichier-des-prenoms-edition-2016/"
                  >Le fichier des prénoms</a
                >
              </li>
              <li>
                <a
                  href="https://www.data.gouv.fr/fr/datasets/secteurs-de-localisation-de-la-loutre-dans-le-jura/"
                  >Les secteurs de localisation de la loutre dans le Jura</a
                >
              </li>
            </ul>
            <p>
              Vous pouvez également consulter des réutilisations utiles de ces
              jeux de données.
            </p>
            <h3>La mission Etalab</h3>
            <p>
              Etalab coordonne la politique d’ouverture et de partage des données
              publiques (“open data”).
              <br />
              <a href="https://www.etalab.gouv.fr/en/qui-sommes-nous"
                >Plus d’informations.</a
              >
            </p>
          </div>
          <div class="column__icon">
            <img src="@/assets/img/icons/statistics-on-a-screen.svg" alt="" />
          </div>
        </div>
      </div>
    </section>

    <section class="section section-white">
      <div class="container text-center">
        <h2>Notre autre produit : l'API Entreprise.</h2>
        <div class="column__img">
          <img src="@/assets/img/city.svg" alt="" />
        </div>
        <h3>
          Vous justifiez d’une mission de service public ? L’API Entreprise est
          pour vous.
        </h3>
        <p>
          Dans le respect du principe "Dites le nous une seule fois", la DINSIC a
          mis en place l’API Entreprise, l’API qui aggrège les informations sur
          les entreprises.<br />
          Obtenez les Greffes, Certificats, Liasses fiscales, Attestations
          sociales, et bien plus encore...<br />
        </p>
        <p>
          <strong>Attention :</strong> Ces données ne sont pas publiques et sont
          donc reservées aux administrations ou entreprises justifiant d'une
          mission de service public.<br />
          Pour toutes questions :
          <a href="maito:entreprise@data.gouv.fr"
            >entreprise@data.gouv.fr</a
          >
        </p>
        <a class="button" href="https://entreprise.api.gouv.fr/"
          >Demander un accès</a
        >
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "DocumentationHome",

  metaInfo: {
    title: "Documentation"
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding-bottom: 2em;
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

.cta {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button {
  white-space: nowrap;
}

.column__icon {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    max-height: 150px;
  }

  @media screen and (max-width: $mobile) {
    width: auto;
  }
}

.column__img {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 3em 0;
}
</style>
