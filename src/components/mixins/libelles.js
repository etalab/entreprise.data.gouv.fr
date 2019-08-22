import { libellesCodesNaf } from "@/components/fixtures/libellesCodesNaf.js";
import { libellesCategoriesJuridiques } from "@/components/fixtures/libellesCategoriesJuridiques.js";

function libelleFromCodeNaf(codeNaf) {
  const formattedNaf = codeNaf.replace(/[.-]/g, "");
  return libellesCodesNaf[formattedNaf];
}
function libelleFromCategoriesJuridiques(categorie) {
  return libellesCategoriesJuridiques[categorie];
}

export default {
  methods: {
    libelleFromCodeNaf,
    libelleFromCategoriesJuridiques
  }
};
