<template>
  <section class="section section-white">
    <div class="container">
      <div class="row">
        <div class="column__full">
          <h1>Documentation des endpoints V1 et V2</h1>
          <p>
            Attention, ces endpoints sont dépréciés et ne reçoivent plus de
            support.
          </p>
          <h2>Exemple de requête :</h2>
          <p>
            L’adresse à appeler pour une requête est :
            <strong>Adresse + Version + Informations</strong><br />
            <strong>Exemple :</strong> Je souhaite accéder aux informations sur
            la mairie de Montpellier, dont le siret est le 21340172201787. Je me
            rend sur
            <a
              class="dont-break-out"
              href="https://entreprise.data.gouv.fr/api/sirene/v1/siret/21340172201787/"
              >https://entreprise.data.gouv.fr/api/sirene/v1/siret/21340172201787</a
            >
          </p>
          <p>Essayez avec n’importe quel siret :</p>
          <api-url-input :defaultUrl="exempleSiret1"></api-url-input>
          <h2>Cinq moyens d’interroger l’API</h2>
          <h3>Recherche Texte :</h3>
          <p>
            La recherche texte permet de trouver un établissement depuis son nom
            (raison sociale ou nom commercial), son adresse, son enseigne, sa
            commune, son activité.<br />
            <strong>Exemple de recherches possible :</strong> "Boulangerie
            Paris", "Charcuterie Sanzot", "20 avenue de ségur"
          </p>
          <p>
            Les résultats sont paginés : l’API renvoie par défaut les 10
            premiers établissements, soit la première page avec 10 résultats par
            page. Ces valeurs peuvent être changées en précisant dans la requête
            les paramètres <em>page</em> et <em>per_page</em><br />
            Vous pouvez demander jusqu’à 100 résultats par page.<br />
            <strong>Exemple :</strong> je souhaite chercher les établissements
            de Montpellier, je tape la requête suivante :
          </p>
          <api-url-input :defaultUrl="exempleFullText1"></api-url-input>
          <p>
            J’obtiens les 10 premiers résultats. Je souhaite maintenant les
            résultats 20 à 40, je tape :
          </p>
          <api-url-input :defaultUrl="exempleFullText2"></api-url-input>
          <h3>Recherche par Siret :</h3>
          <p>
            La recherche par Siret permet de trouver un établissement
            directement depuis son numéro Siret, unique à chaque
            établissement.<br />
            Exemple pour l’établissement de la Mairie de Toulouse :
          </p>
          <api-url-input :defaultUrl="exempleSiret2"></api-url-input>
          <h3>Recherche par Siren :</h3>
          <p>
            La recherche par Siren permet de trouver tous les établissement
            dérivés d’un Siren.<br />
            Les informations sur le siège social correspondant à ce Siren, le
            numéro de TVA Intracommunautaire, ainsi que des informations sur les
            établissements enfants, tels leur nombre et leur Sirets, seront
            renvoyées.<br />
            Exemple, encore une fois pour Toulouse :
          </p>
          <api-url-input :defaultUrl="exempleSiren"></api-url-input>
          <h3>Recherche par Numero RNA :</h3>
          <p>
            La recherche par N° RNA permet de trouver un établissement depuis
            son numéro RNA (si présent). L’association ne sera trouvée que si
            elle dispose d’un SIRET.<br />
            Exemple pour la Croix-Rouge :
          </p>
          <api-url-input :defaultUrl="exempleRNA"></api-url-input>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ApiUrlInput from "@/components/doc/ApiUrlInput";

export default {
  name: "DocumentationSireneEndpointV2",

  data() {
    const baseAddress = "https://entreprise.data.gouv.fr/api/sirene/v1/";

    return {
      exempleSiret1: baseAddress + "siret/<VOTRE_SIRET>",
      exempleFullText1: baseAddress + "full_text/montpellier",
      exempleFullText2: baseAddress + "full_text/montpellier?page=2&per_page=20",
      exempleSiret2: baseAddress + "siret/21310555400017",
      exempleSiren: baseAddress + "siren/213105554",
      exempleRNA: baseAddress + "rna/W9C1000188"
    };
  },

  components: {
    "api-url-input": ApiUrlInput
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
  // min-width: 95%;
  p {
    max-width: 100%;
  }
}
</style>
