<template>
  <section class="section section-grey">
    <div class="container">
      <div class="row">
        <div class="column">
          <h2>Un cas d’utilisation avancée</h2>
          <p>
            J’ouvre un commerce (Boulangerie) dans la région de Toulon. Je
            souhaite vérifier où sont situés les autres commerces.<br />
            Je constitue ma requête de la manière suivante :
          </p>
          <ul class="spaced-list">
            <li>
              L’adresse de base pour la recherche texte :<br />
              <a href="https://entreprise.data.gouv.fr/api/sirene/v1/full_text"
                >https://entreprise.data.gouv.fr/api/sirene/v1/full_text</a
              >
            </li>
            <li>
              Je ne me soucie pas du nom, donc je met un astérisque :<br />
              <a
                href="https://entreprise.data.gouv.fr/api/sirene/v1/full_text/*"
                >https://entreprise.data.gouv.fr/api/sirene/v1/full_text/*</a
              ><br />
              Ma requête me renvoie pour le moment tous les établissements.
            </li>
            <li>
              <p>
                Je rajoute un <strong>?</strong> pour passer aux paramètres,
                puis les paramètres <code>activité_principale</code> et
                <code>code_postal</code>, séparés par un <strong>&</strong>.
              </p>
              <p>
                Je renseigne le code activité (code NAF) pour les
                boulangeries.<br />
                Je peux trouver cette information
                <router-link :to="{ name: 'codes-naf' }"
                  >sur cette page</router-link
                >.<br />
                L’INSEE propose également un
                <a href="https://www.insee.fr/fr/information/2406147"
                  >moteur de recherche</a
                >
                avec des informations supplémentaires.<br /><br />
              </p>
              <p>
                Le code pour les boulangeries est le 1071C, et le code postal de
                Toulon est le 83000. Ma requête sera donc :
              </p>
              <api-url-input :defaultUrl="exempleBoulangerie1"></api-url-input>
              <p>
                Comme on peut le voir, il y a environ 60 établissements de
                boulangerie à Toulon.
              </p>
            </li>
            <li>
              <p>
                Comme précisé plus haut, les résultats sont paginés. Je récupère
                par défaut les 10 premiers, mais je peux changer cela avec les
                paramètres
                <code>page</code> et <code>per_page</code> :<br />
              </p>
              <api-url-input :defaultUrl="exempleBoulangerie2"></api-url-input>
            </li>
          </ul>
        </div>
        <div class="column__icon">
          <img src="@/assets/img/icons/croissant.svg" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ApiUrlInput from "@/components/doc/ApiUrlInput";

export default {
  name: "DocumentationSireneUseCase",

  data() {
    const baseAddress = "https://entreprise.data.gouv.fr/api/sirene/v1/";

    return {
      exempleBoulangerie1: baseAddress + "full_text/*?activite_principale=1071C&code_postal=83000",
      exempleBoulangerie2: baseAddress + "full_text/*?activite_principale=1071C&code_postal=83000&per_page=70"
    };
  },

  components: {
    "api-url-input": ApiUrlInput
  }
};
</script>

<style lang="scss" scoped>
a {
  overflow-wrap: break-word;
}

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
  order: 1;
  align-items: center;
  width: 100%;
  @media screen and (min-width: $tablet) {
    flex-direction: column;
    width: 20%;
  }
}

.spaced-list {
  li {
    margin: 1em 0 1em 0;
  }

  @media screen and (max-width: $tablet) {
    padding-left: 1px;
  }
}
</style>
