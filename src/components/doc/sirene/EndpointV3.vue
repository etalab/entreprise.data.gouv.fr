<template>
  <section class="section section-white">
    <div class="container">
      <div class="row">
        <div class="column__full">
          <h1>Documentation des endpoints V3</h1>

          <p>
            Une nouvelle version des API SIRENE Open Data est disponible, la V3,
            construite à partir des
            <a
              href="https://www.data.gouv.fr/en/datasets/base-sirene-des-entreprises-et-de-leurs-etablissements-siren-siret/"
              >fichiers déposés sur data.gouv.fr</a
            >
            par l'INSEE depuis le mois d'avril 2019.<br />
          </p>
          <p>
            Des différences notables existent sur cette nouvelle version :
          </p>
          <ul>
            <li>
              - Les unités légales et leurs établissements sont disponibles au
              travers de deux endpoints différents.
            </li>
            <li>
              - L'historique des entreprises et des établissements fermés sont
              aujourd'hui disponibles.
            </li>
          </ul>

          <h5>Ressource Établissements</h5>
          <h6>Index des Établissements</h6>
          <api-url-input :defaultUrl="exampleEtablissement1"></api-url-input>
          <h6>Rechercher un établissement par Siret</h6>
          <api-url-input :defaultUrl="exampleEtablissement2"></api-url-input>

          <h5>Ressource Unités Légales</h5>
          <h6>Index des unités légales :</h6>
          <api-url-input :defaultUrl="exampleUniteLegale1"></api-url-input>
          <h6>Rechercher une unité légale par Siren:</h6>
          <api-url-input :defaultUrl="exampleUniteLegale2"></api-url-input>

          <h5>Pagination des index</h5>
          <p>
            Les index sont paginés. Les paramètres de pagination sont
            <code>page</code> pour la page souhaitée et
            <code>per_page</code> pour le nombre de résultats souhaités par page
            (maximum 100).
          </p>

          <h5>Options de filtrage</h5>
          <p>
            Il est possible de filtrer les résultats sur ces endpoints par
            n'importe lesquels des attributs des ressources unités légales ou
            établissements.
          </p>

          <h5>Exemple de requête</h5>
          <p>
            Pour renvoyer tous les établissements actifs (etat_administratif=A)
            qui correspondent au siren 345184428 :
          </p>
          <api-url-input :defaultUrl="exampleFiltering"></api-url-input>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ApiUrlInput from "@/components/doc/ApiUrlInput";

export default {
  name: "ApiDocSireneEndpointsV3",

  data() {
    const baseAddress = "https://entreprise.data.gouv.fr/api/sirene/v3/";
    return {
      exampleEtablissement1: baseAddress + "etablissements/",
      exampleEtablissement2: baseAddress + "etablissements/<VOTRE_SIRET>",
      exampleUniteLegale1: baseAddress + "unites_legales/",
      exampleUniteLegale2: baseAddress + "unites_legales/<VOTRE_SIREN>",
      exampleFiltering: baseAddress + "etablissements/?etat_administratif=A&siren=345184428"
    };
  },

  components: {
    "api-url-input": ApiUrlInput
  }
};
</script>

<style lang="scss" scoped>
section {
  padding-bottom: 0;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

h2 {
  margin-top: 40px;
}

h3 {
  margin-bottom: 0;
}

h5 {
  margin-top: 15px;
  margin-bottom: 5px;
}

h6 {
  margin-top: 15px;
  margin-bottom: 5px;
}

// With the help of https://css-tricks.com/snippets/css/prevent-long-urls-from-breaking-out-of-container/
.dont-break-out {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}

.column__full {
  display: flex;
  flex-direction: column;
  // min-width: 95%;
  p {
    max-width: 100%;
  }
}
</style>
