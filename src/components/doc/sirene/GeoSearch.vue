<template>
  <section class="section section-white">
    <div class="container">
      <div class="column__full">
        <h2>Recherches géographiques</h2>
        <p>
          <strong
            >L’API integre désormais le géocodage de la base Sirene !</strong
          >
          Chaque établissement affiche désormais sa latitude, longitude, ainsi
          qu’un <strong>geo_score</strong> indiquant la fiabilité du géocodage
          de l’établissement.
        </p>
      </div>
      <div class="container__columns">
        <div class="column">
          <h3>Recherche autour d’un point :</h3>
          <p>
            L’endpoint <code>/v1/near_point/</code> prend en paramètre une
            latitude (:lat) et une longitude (:long) et renvoie les
            établissements autour de ces coordonnées.<br />
            Vous pouvez également préciser un paramètre
            <code>radius</code> (défaut: 5 km).
          </p>
          <api-url-input :defaultUrl="exempleGeoSpace1"></api-url-input>
        </div>
        <div class="column__icon">
          <img src="@/assets/img/icons/around_point.svg" alt="" />
        </div>
      </div>
      <div class="container__full">
        <h3>Options de filtrage</h3>
        <p>
          Les paramètres de filtrage suivant sont disponibles sur les endpoint
          near_point :
        </p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Filtrage désiré</th>
            <th>Paramètre requête</th>
            <th>Valeur du paramètre</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Filtrage par code d’activité principale (code NAF)</td>
            <td><code>activite_principale</code></td>
            <td>le code NAF désiré</td>
          </tr>
          <tr>
            <td>Filtrage par activité principale proche</td>
            <td><code>approximate_activity</code></td>
            <td>Au moins 2 caractères (62 pour 620Z)</td>
          </tr>
          <tr>
            <td>Radius de recherche</td>
            <td><code>radius</code></td>
            <td>Nombre entier ou flottant, en km (défaut: 5)</td>
          </tr>
        </tbody>
      </table>
      <div class="container__columns">
        <div class="row">
          <div class="column">
            <h3>Recherche autour d’un établissement :</h3>
            <p>
              L’endpoint <code>/v1/near_etablissement/:SIRET</code> prend en
              paramètre un siret et renvoie les établissements autour de
              l’établissement correspondant à ce siret.
            </p>
            <api-url-input :defaultUrl="exempleGeoSpace2"></api-url-input>
            <h3>Recherche autour d’un établissement, format GeoJSON :</h3>
            <p>
              L’endpoint
              <code>/v1/near_etablissement_geoJSON/:SIRET</code> fonctionne
              exactement comme le précédent mais retourne les 100 établissements
              les plus proches au format GeoJSON. Les résultats ne sont pas
              paginés.
            </p>
            <api-url-input :defaultUrl="exempleGeoSpace3"></api-url-input>
          </div>
          <div class="column__icon">
            <img
              id="reduced-img"
              src="@/assets/img/icons/around_etablissement.svg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="container__full">
        <h3>Options de filtrage</h3>
        <p>
          Les paramètres de filtrage suivant sont disponibles sur les endpoint
          near_etablissement et near_etablissement_geojson :
        </p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Filtrage désiré</th>
            <th>Paramètre requête</th>
            <th>Valeur du paramètre</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Seulement des résultats avec la même activité principale (code
              NAF)
            </td>
            <td><code>only_same_activity</code></td>
            <td>true / false (défaut: false)</td>
          </tr>
          <tr>
            <td>Seulement des résultats avec une activité principale proche</td>
            <td><code>approximate_activity</code></td>
            <td>true / false (défaut: false)</td>
          </tr>
          <tr>
            <td>Radius de recherche</td>
            <td><code>radius</code></td>
            <td>Nombre entier ou flottant, en km (défaut: 5)</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import ApiUrlInput from "@/components/doc/ApiUrlInput";

export default {
  name: "DocumentationSireneGeoSearch",

  data() {
    const baseAddress = "https://entreprise.data.gouv.fr/api/sirene/v1/";
    return {
      exempleGeoSpace1: baseAddress + "near_point/?lat=43.6&long=3.884865",
      exempleGeoSpace2: baseAddress + "near_etablissement/21340172201787",
      exempleGeoSpace3: baseAddress + "near_etablissement_geojson/21340172201787"
    };
  },

  components: {
    "api-url-input": ApiUrlInput
  }
};
</script>

<style lang="scss" scoped>
h3 {
  padding-top: 2em;
  margin-bottom: 0;
}

.container {
  display: flex;
  flex-direction: column;
}

.column__full {
  display: flex;
  flex-direction: column;
  min-width: 100%;
  p {
    max-width: 100%;
  }
}

.container__columns {
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
  @media screen and (min-width: $tablet) {
    min-width: 70%;
  }
}

.column__icon {
  display: flex;
  justify-content: center;
  order: 1;
  align-items: center;
  width: 100%;
  @media screen and (min-width: $tablet) {
    flex-direction: column;
    width: 20%;
  }
}

#reduced-img {
  max-width: 120px;
  padding: 15px 15px 15px 15px;
}

// Table style
table {
  background-color: $color-white;
  margin: 10px 0px auto;
  border-collapse: collapse;
  border: 1px solid $color-white;
  border-bottom: 2px solid $color-blue;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1), 0px 10px 20px rgba(0, 0, 0, 0.05),
    0px 20px 20px rgba(0, 0, 0, 0.05), 0px 30px 20px rgba(0, 0, 0, 0.05);
  tr {
    &:hover {
      background: $color-lightest-grey;

      td {
        color: $color-blue;
      }
    }
  }
  th,
  td {
    color: $color-darker-grey;
    border: 1px solid $color-light-grey;
    border-collapse: collapse;
    padding: none;
    @media screen and (min-width: $tablet) {
      padding: 12px 35px;
    }
    @media screen and (max-width: $tablet) {
      max-width: 100px;
    }
  }
  th {
    background: $color-blue;
    color: $color-white;
    text-transform: uppercase;
    font-size: 1em;
    @media screen and (min-width: $tablet) {
      font-size: 1.2em;
    }
    &.last {
      border-right: none;
    }
  }
}
// End table style
</style>
