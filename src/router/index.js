import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import Results from '@/components/Results'
import Etablissement from '@/components/Etablissement'
import LegalNotes from '@/components/LegalNotes'
import ApiDoc from '@/components/ApiDoc'
import ApiDocSirene from '@/components/apiDoc/ApiDocSirene'
import ApiDocRNA from '@/components/apiDoc/ApiDocRNA'
import ApiDocRNCS from '@/components/apiDoc/ApiDocRNCS'
import CodesNAF from '@/components/apiDoc/apiDocSirene/CodesNAF'
import EntrepriseIdentityRNCS from '@/components/etablissement/EntrepriseIdentityRNCS.vue'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home'
    },
    {
      path: '/search?*',
      name: 'Search',
      component: Results
    },
    {
      path: '/rncs/:searchId',
      name: 'RNCS',
      component: EntrepriseIdentityRNCS
    },
    {
      path: '/search',
      name: 'SearchEmpty',
      component: Results
    },
    {
      path: '/etablissement/:searchId',
      name: 'Etablissement',
      component: Etablissement
    },
    {
      path: '/mentions_legales',
      name: 'LegalNotes',
      component: LegalNotes
    },
    {
      path: '/api_doc',
      name: 'ApiDoc',
      component: ApiDoc
    },
    {
      path: '/api_doc_sirene',
      name: 'ApiDocSirene',
      component: ApiDocSirene
    },
    {
      path: '/api_doc_rna',
      name: 'ApiDocRNA',
      component: ApiDocRNA
    },
    {
      path: '/api_doc_rncs',
      name: 'ApiDocRNCS',
      component: ApiDocRNCS
    },
    {
      path: '/codes_naf',
      name: 'CodesNAF',
      component: CodesNAF
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Scroll to top when arriving on a component
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0}
    }
  }
})
