<template>
  <section class="section section-grey">
    <div class="container">
      <div class="row">
        <div class="column__right">
          <h2>Découvrez les autres APIs et jeux de données Data.gouv</h2>
          <p>
            <a href="https://data.gouv.fr">Data.gouv.fr</a> met a votre
            disposition de nombreux jeux de données "Open Data".<br />
            Quelques exemples&nbsp;:
          </p>
          <ul>
            <li>
              <a
                href="https://www.data.gouv.fr/fr/datasets/resultats-de-lintegralite-des-elections-depuis-2001/"
                >Les résultats électoraux</a
              >
            </li>
            <li>
              <a
                href="https://www.data.gouv.fr/fr/datasets/fichier-des-prenoms-edition-2016/"
                >Le fichier des prénoms</a
              >
            </li>
            <li>
              <a
                href="https://www.data.gouv.fr/fr/datasets/secteurs-de-localisation-de-la-loutre-dans-le-jura/"
                >Les secteurs de localisation de la loutre dans le Jura</a
              >
            </li>
          </ul>
          <p>
            Vous pouvez également consulter des réutilisations utiles de ces
            jeux de données.
          </p>
          <h3>La mission Etalab</h3>
          <p>
            Etalab coordonne la politique d’ouverture et de partage des données
            publiques (“open data”).
            <br />
            <a href="https://www.etalab.gouv.fr/en/qui-sommes-nous"
              >Plus d’informations.</a
            >
          </p>
        </div>
        <div class="column__icon">
          <img src="@/assets/img/icons/statistics-on-a-screen.svg" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ApiDocOthers"
};
</script>

<style lang="scss" scoped>
.column__icon {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    max-height: 150px;
  }

  @media screen and (max-width: $mobile) {
    width: auto;
  }
}
</style>
