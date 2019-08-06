<template>
  <section class="section section-white">
    <div class="container">
      <div class="column__full">
        <h2>Exemple de requête :</h2>
        <p>
          L’adresse à taper pour une requête est :
          <strong>Adresse + Version + Informations</strong><br />
          <api-doc-input :request="exempleFullText"></api-doc-input>
        </p>
        <h2>Trois moyens d’interroger l’API.</h2>
        <h3>Recherche Texte :</h3>
        <p>
          La recherche texte permet de trouver un établissement depuis son nom
          (titre).<br />
          <strong>Exemple de recherches possible :</strong> "Croix rouge",
          "Medecins sans frontieres"
        </p>
        <p>
          Les résultats sont paginés de la même façon que pour l’API Sirene. Les
          paramètres <em>page</em> et <em>per_page</em> sont disponibles.<br />
          Vous pouvez demander jusqu’à 100 résultats par page.<br />
        </p>

        <h3>Recherche par Numéro RNA :</h3>
        <p>
          La recherche par numéro RNA permet de trouver une association par son
          numéro RNA unique.<br />
          Exemple pour la Croix-Rouge :
        </p>
        <api-doc-input :request="exempleRNA"></api-doc-input>
        <h3>Recherche par Siret :</h3>
        <p>
          La recherche par Siret permet de trouver une association par son
          numéro de Siret unique, si elle en possède un.<br />
        </p>
        <api-doc-input :request="exempleSiret"></api-doc-input>
      </div>
    </div>
  </section>
</template>

<script>
import ApiDocInput from "@/components/apiDoc/ApiDocInput";

export default {
  name: "ApiDocRNAEndpoints",
  components: {
    ApiDocInput: ApiDocInput
  },
  props: { baseAdress: { type: String, default: "" } },
  data() {
    return {
      exempleFullText: this.baseAdress + "full_text/<TITRE>",
      exempleRNA: this.baseAdress + "id/W9C1000188",
      exempleSiret: this.baseAdress + "siret/48077929700013"
    };
  }
};
</script>

<style lang="scss" scoped>
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
  min-width: 100%;
  p {
    max-width: 100%;
  }
}
</style>
