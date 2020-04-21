<template>
  <div>
    <div class="notification error">
      <b>Etablissement non diffusable</b>
      <a
        class="button"
        href="https://statut-diffusion-sirene.insee.fr/"
        target="_blank"
      >
        Rendre mon entreprise diffusable
      </a>
    </div>
    <h3>Qu'est-ce que cela signifie ?</h3>
    <p>
      Vous ne pouvez pas obtenir les informations de cette entreprise
      individuelle car celle-ci a demandé à ne pas figurer sur les listes de
      diffusion publique en vertu de
      <a
        href="https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=C505A51DBC1A4EB1FFF3764C69ACDB1C.tpdjo11v_1?idArticle=LEGIARTI000020165030&cidTexte=LEGITEXT000005634379&dateTexte=20100702"
      >
        l'article A123-96 du code du commerce
      </a>
      .
    </p>
    <p>
      Pour des raisons de sécurité, certaines associations et les organismes
      relevant du Ministère de la Défense ne sont pas diffusables non plus.
    </p>
    <p class="bold">
      Si cette entreprise est la votre et que vous souhaitez vous rendre
      diffusible de nouveau la démarche est disponible
      <a href="https://statut-diffusion-sirene.insee.fr/" target="_blank">
        ICI
      </a>
    </p>
  </div>
</template>

<script>
export default {
  name: "EtablissementSireneNonDiffusable"
};
</script>

<style lang="scss" scoped>
.bold {
  font-weight: bold;
}

.button {
  margin: 8px;
  position: absolute !important;
  right: 0;
}
</style>
