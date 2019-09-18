<template>
  <section class="section section-white">
    <div class="container">
      <div class="row">
        <div class="column__full">
          <h1>Documentation des endpoints V3</h1>

          <p>
            Les endpoints V3 sont maintenant disponibles. Ils renvoient le
            nouveau format des fichiers SIRENE Open Data.<br />
          </p>
          <p>
            Attention, des différences notables existent sur cette nouvelle
            version :
          </p>
          <ul>
            <li>
              - Les ressources sont maintenant divisées entre Unités Légales et
              Établissements
            </li>
            <li>
              - Les Unités Légales / Établissements fermés sont maintenant
              également disponibles
            </li>
          </ul>

          <h5>Ressource Établissements</h5>
          <h6>Index des Établissements</h6>
          <api-doc-input :request="exampleEtablissement1"></api-doc-input>
          <h6>Recherche par Siret</h6>
          <api-doc-input :request="exampleEtablissement2"></api-doc-input>

          <h5>Ressource Unités Légales</h5>
          <h6>Index des unités légales :</h6>
          <api-doc-input :request="exampleUniteLegale1"></api-doc-input>
          <h6>Rechercher une unité légale par Siren:</h6>
          <api-doc-input :request="exampleUniteLegale2"></api-doc-input>

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
          <api-doc-input :request="exampleFiltering"></api-doc-input>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ApiDocInput from "@/components/apiDoc/ApiDocInput";

export default {
  name: "ApiDocSireneEndpointsV3",
  components: {
    ApiDocInput: ApiDocInput
  },
  props: { baseAdress: { type: String, default: "" } },
  data() {
    return {
      exampleEtablissement1: this.baseAdress + "etablissements/",
      exampleEtablissement2: this.baseAdress + "etablissements/<VOTRE_SIRET>",
      exampleUniteLegale1: this.baseAdress + "unites_legales/",
      exampleUniteLegale2: this.baseAdress + "unites_legales/<VOTRE_SIREN>",
      exampleFiltering:
        this.baseAdress + "etablissements/?etat_administratif=A&siren=345184428"
    };
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
