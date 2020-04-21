import sirene from "@/store/search/sirene";
import rna from "@/store/search/rna";
import suggestion from "@/store/search/suggestion";

export default {
  namespaced: true,
  modules: {
    sirene,
    rna,
    suggestion
  }
};
