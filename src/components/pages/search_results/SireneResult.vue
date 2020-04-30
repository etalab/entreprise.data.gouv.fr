<template>
  <li>
    <router-link
      class="panel"
      :to="{ name: 'sirene-etablissement', params: { sirenOrSiret: etablissement.siret } }"
    >
      <h4 class="title">
        {{ etablissement.nom_raison_sociale | capitalize | removeExtraChars }}
      </h4>
      <p>{{ etablissement.libelle_activite_principale_entreprise }}</p>
      <p>
        {{ etablissement.code_postal }}
        {{ etablissement.libelle_commune | capitalize }}
      </p>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'SireneResult',

  props: {
    etablissement: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  display: inline;
  margin: 0.15em;
}

.panel {
  display: block;
  text-decoration: none;
  color: $color-black;

  &:hover {
    border: 1px solid $color-light-blue;
  }
}

p {
  margin: 0.15em;
}

ul {
  li:hover {
    background-color: $color-lightest-grey;
  }
}

li + li {
  margin-top: 2em;
}
</style>
