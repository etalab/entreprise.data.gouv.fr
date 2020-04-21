<template>
  <li>
    <router-link
      class="panel"
      :to="{
        name: 'rna-etablissement',
        params: { assoId: association.id_association }
      }"
    >
      <h4 class="title">{{ association.titre | capitalize }}</h4>
      <p>{{ association.objet | truncate }}</p>
      <p>
        {{ association.adresse_code_postal }}
        {{ association.adresse_libelle_commune | capitalize }}
      </p>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "RnaResult",

  props: {
    association: Object
  }
};
</script>

<style lang="scss" scoped>
.title {
  display: inline;
  margin: 0.15em;
}

.panel {
  text-decoration: none;
  color: $color-black;
  display: block;

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
