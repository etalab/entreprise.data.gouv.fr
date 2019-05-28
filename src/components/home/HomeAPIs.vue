<template>
  <section class="api text-center section">
    <div class="container">
      <div class="row">
        <div class="column">
          <p>
            Vous pouvez, si vous le souhaitez, interroger directement les APIs
          </p>
          <router-link class="button" :to="{ name: 'ApiDoc' }"
            >Documentation des APIs</router-link
          >
        </div>
        <div class="column api__image">
          <img
            src="../../assets/img/man-at-desktop.svg"
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
</template>

<script>
export default {
  name: "HomeAPIs"
};
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
</style>
