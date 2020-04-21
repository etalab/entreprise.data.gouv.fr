import VueRouter from 'vue-router'
import Vue from 'vue'

import store from "@/store";

import Homepage from "@/components/pages/Home";
import NotFound from "@/components/NotFound";
import LegalNotes from "@/components/pages/LegalNotes";
import CodesNaf from "@/components/doc/sirene/CodesNaf";
import DocumentationHome from "@/components/doc/Home";
import DocumentationSirene from "@/components/doc/Sirene";
import DocumentationRna from "@/components/doc/Rna";
import DocumentationRncs from "@/components/doc/Rncs";
import SearchResultsList from "@/components/pages/search_results/List";
import SireneEtablissement from "@/components/pages/etablissement/Sirene";
import RNAEtablissement from "@/components/pages/etablissement/Rna";
import Rncs from "@/components/pages/etablissement/Rncs";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Homepage
    },
    {
      path: "/search",
      name: "search-results",
      component: SearchResultsList,
      props: (route) => ({ fullText: route.query.fullText, page: parseInt(route.query.page) })
    },
    {
      path: "/sirene/etablissements/:sirenOrSiret",
      name: "sirene-etablissement",
      props: true,
      component: SireneEtablissement
    },
    {
      path: "/rna/etablissements/:assoId",
      name: "rna-etablissement",
      props: true,
      component: RNAEtablissement
    },
    {
      path: "/rncs/:siren",
      name: "rncs",
      props: true,
      component: Rncs
    },
    {
      path: "/api_doc",
      name: "api-doc",
      component: DocumentationHome
    },
    {
      path: "/api_doc/sirene",
      name: "api-doc-sirene",
      component: DocumentationSirene
    },
    {
      path: "/api_doc/rna",
      name: "api-doc-rna",
      component: DocumentationRna
    },
    {
      path: "/api_doc/rncs",
      name: "api-doc-rncs",
      component: DocumentationRncs
    },
    {
      path: "/api-doc/codes_naf",
      name: "codes-naf",
      component: CodesNaf
    },
    {
      path: "/mentions_legales",
      name: "legal-notes",
      component: LegalNotes
    },
    {
      path: "*",
      name: "not-found",
      component: NotFound
    }
  ]
});

// Reset the boolean to avoid a persistent NotFound component
// Ex without this hook:
//  1. SIRENE API returns a 404
//  2. The vue app displays the NotFound component
//  3. User clicks on the top left logo (he wants to go to the homepage)
//  4. No homepage, still the NotFound component (no API call so the boolean
//  isn't reset to true)
router.beforeEach((to, from, next) => {
  store.commit("setApiDataAvailability", true);
  next();
});

export default router;
