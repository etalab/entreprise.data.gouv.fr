<template>
  <section class="section section-white">
    <div class="container text-center">
      <h1>Les APIs Open Data</h1>
      <p class="text-center lead-text">
        Entreprise.data.gouv.fr met à votre disposition des APIs open-source gratuites<br/>
        pour faciliter l'utilisation des données par les professionnels et les particuliers.<br/>
      </p>
      <p class="text-center lead-text">
        De nombreuses APIs sont en cours d’ajout.
        Vous pouvez vous inscrire à notre mailing-list pour vous tenir au courant
        des nouveautés et changements à venir.<br />
      </p>
      <api-doc-mail />
    </div>
  </section>
</template>

<script>
import ApiDocMail from '@/components/apiDoc/ApiDocMail'
export default {
  name: 'ApiDocIntro',
  components: { 'ApiDocMail': ApiDocMail}
}
</script>

<style lang="scss" scoped>
  .section {
    padding-bottom: 2em;
  }
</style>

