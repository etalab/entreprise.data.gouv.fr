<template>
  <section class="section section-white">
    <div class="container text-center">
      <h2>Notre autre produit : l'API Entreprise.</h2>
      <div class="column__img">
        <img src="@/assets/img/city.svg" alt="">
      </div>
      <h3>Vous justifiez d’une mission de service public ? L’API Entreprise est pour vous.</h3>
      <p>
        Dans le respect du principe "Dites le nous une seule fois", la DINSIC a mis en place l’API Entreprise,
        l’API qui aggrège les informations sur les entreprises.<br/>
        Obtenez les Greffes, Certificats, Liasses fiscales, Attestations sociales, et bien plus encore...<br/>
      </p>
      <p>
        <strong>Attention :</strong> Ces données ne sont pas publiques et sont donc reservées
        aux administrations ou entreprises justifiant d'une mission de service public.<br/>
        Pour toutes questions : <a href="maito:tech@entreprise.api.gouv.fr">tech@entreprise.api.gouv.fr</a>
      </p>
      <a class="button" href="https://entreprise.api.gouv.fr/">Demander un accès</a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ApiDocOutro'
}
</script>

<style lang="scss" scoped>
.column__img {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 3em 0;
}

.button {
  margin-top: 2em;
}
</style>
