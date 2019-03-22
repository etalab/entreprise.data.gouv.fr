<template>
  <div>
    <section class="section section-grey">
      <div class="container apis">
        <h2>L’API Sirene</h2>
        <div class="row">
          <p class="description">
            L’API Sirene contient tous les établissements des entreprises françaises,
            ainsi que toutes les associations disposant d’un code SIRET.
            Les données de l’API Sirene sont délivrées par l’INSEE.
          </p>
          <div class="cta">
            <router-link class="button" :to="{ name: 'ApiDocSirene'}">Documentation API Sirene</router-link>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-white">
      <div class="container apis">
        <h2>L’API Repertoire National des Associations (RNA)</h2>
        <div class="row">
          <p class="description">
            Cette API contient toutes les associations françaises.
            Les données proviennent du Ministère de l’Intérieur.
          </p>
          <div class="cta">
            <router-link class="button" :to="{ name: 'ApiDocRNA'}">Documentation API RNA</router-link>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-grey">
      <div class="container apis">
        <h2>L’API Répertoire National des Métiers (RNM)</h2>
        <div class="row">
          <p class="description">
            L’API RNM vous est gracieusement ouverte par les Chambres et Métiers de l’Artisanat.
            Les données sont mises à jour toutes les nuits.
          </p>
          <div class="cta">
            <a class="button" href="https://api-rnm.artisanat.fr/">Documentation API RNM</a>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-white">
      <div class="container apis">
        <h2>L’API Registre National du Commerce et des Sociétés (RNCS)</h2>
        <div class="row">
          <p class="description">
            <strong>⚠ En version alpha ⚠ </strong><br/>
            Cette API contient les données IMR (Immatriculation, Modification, Radiation) du Registre National du Commerce et des Sociétés de l’INPI.
          </p>
          <div class="cta">
            <router-link class="button" :to="{ name: 'ApiDocRNCS'}">Documentation API RNCS</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ApiDocList'
}
</script>

<style lang="scss" scoped>
.cta {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button {
  white-space: nowrap;
}
</style>
