<template>
  <section class="section section-white">
    <div class="container">
      <div class="column__full">
        <h2>Recherches sur l'API</h2>
        <p>
          La recherche se fait par numéro SIREN.<br/>
          L'endpoint à requêter est: <a class="dont-break-out" v-bind:href=exempleRNCS1>{{ this.exempleRNCS1 }}</a>:SIREN<br/>
          Exemple pour la SNCF :
        </p>
        <api-doc-input :request=exempleRNCS2></api-doc-input>
        <h3>Télécharger un document d'immatriculation</h3>
        <p>Les informations peuvent être requêtées en document prêt à l'emploi. Un fichier PDF sera automatiquement téléchargé.</p>
        <api-doc-input :request=exempleRNCSPDF></api-doc-input>
      </div>
    </div>
  </section>
</template>

<script>
import ApiDocInput from '@/components/apiDoc/ApiDocInput'

export default {
  name: 'ApiDocRNCSEndpoints',
  components: {
    'ApiDocInput': ApiDocInput
  },
  props: ['baseAdress'],
  data () {
    return {
      exempleRNCS1: `${this.baseAdress}v1/fiches_identite/`,
      exempleRNCS2: `${this.baseAdress}v1/fiches_identite/808332670`,
      exempleRNCSPDF: `${this.baseAdress}v1/fiches_identite/808332670/pdf`
    }
  }
}
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

.column__full {
  display: flex;
  flex-direction: column;
  min-width: 100%;
  p {
    max-width: 100%;
  }
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

</style>
