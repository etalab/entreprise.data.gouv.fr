import Vue from "vue";
import Vuex from "vuex";
import VueResource from "vue-resource";
import application from "./modules/application";
import results from "./modules/results";
import resultsSiren from "./modules/resultsSiren";
import resultsAdditionalInfos from "./modules/resultsAdditionalInfos.js";
import searchFullText from "./modules/searchFullText";
import searchEtablissement from "./modules/searchEtablissement";
import searchAdditionalInfos from "./modules/searchAdditionalInfos";
import suggestions from "./modules/suggestions";

Vue.use(Vuex);
Vue.use(VueResource);

export default new Vuex.Store({
  modules: {
    application,
    results,
    resultsSiren,
    resultsAdditionalInfos,
    searchFullText,
    searchEtablissement,
    searchAdditionalInfos,
    suggestions
  }
});
