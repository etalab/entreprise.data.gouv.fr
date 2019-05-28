<template>
  <section class="section section-white">
    <div class="container">
      <div class="row">
        <div class="column">
          <h1>Documentation de l’API RNCS</h1>
          <p>
            <strong
              >⚠ Attention: Cette API est encore en version alpha et donc
              non-stable pour une utilisation en production. ⚠</strong
            >
          </p>
          <h2>Qu’est-ce que le RNCS ?</h2>
          <p>
            Le RNCS est le
            <strong>Répertoire National du Commerce et des Sociétés</strong>. Le
            RNCS est le Répertoire National du Commerce et des Sociétés. Il
            s'agit de l'ensemble des informations sur les sociétés françaises
            immatriculées, dans tous les registres locaux des greffes des
            tribunaux à compétence commerciale, et centralisées à l'INPI.
          </p>
          <p>
            L’API RNCS est développée par l'équipe
            <a href="https://entreprise.api.gouv.fr/">API Entreprise</a> au sein
            d'<a href="https://www.data.gouv.fr/fr/organizations/etalab/"
              >Étalab</a
            >.<br />
            L'API est open-source : vous pouvez
            <a href="https://github.com/etalab/rncs_worker_api_entreprise"
              >télécharger le code sur GitHub</a
            >.<br />
            L INPI poste ses données sur
            <a
              href="https://www.data.gouv.fr/fr/organizations/institut-national-de-la-propriete-industrielle-inpi/"
              >Data.gouv.fr</a
            >.
          </p>
        </div>
        <div class="column__icon">
          <img src="@/assets/img/icons/court.svg" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ApiDocRNCSIntro"
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  @media screen and (min-width: $tablet) {
    flex-direction: row;
  }
}

.column {
  display: flex;
  flex-direction: column;
}

.column__icon {
  display: flex;
  justify-content: center;
  align-self: center;
  max-width: 300px;
  @media screen and (min-width: $tablet) {
    flex-direction: column;
    width: 20%;
  }
}
</style>
