const companyPanel = '.company-container > .company__panel'
const panelCategorySirene = '.container > .company:nth-of-type(2) > .company-container > .company__panel'
const panelCategoryRNA = '.container > .company:nth-of-type(3) > .company-container > .company__panel'

export const cssHelpers = {
  companyPanel: companyPanel,
  firstCompanyPanel: companyPanel + ':first-of-type',
  secondCompanyPanel: companyPanel + ':nth-of-type(2)',

  secondElementInPanel: '> .company__item:nth-of-type(2) > .company__item-value',
  secondElementListInPanel: ' > .company__info-list .company__item:nth-of-type(2) > .company__item-value',

  // Following selectors are only in case of RNA + SIRENE (due to vue.js merging divs)
  panelCategorySirene: panelCategorySirene,
  panelCategoryRNA: panelCategoryRNA,

  firstPanelCategorySirene: panelCategorySirene + ':first-of-type',
  secondPanelCategorySirene: panelCategorySirene + ':nth-of-type(2)',

  firstPanelCategoryRNA: panelCategoryRNA + ':first-of-type',
  secondPanelCategoryRNA: panelCategoryRNA + ':nth-of-type(2)'
}

// Case SIRENE only
export const bouygues = {
  siret: '57201524600216',
  siren: '572015246',
  sirenSpaced: '572 015 246',
  title: 'BOUYGUES',
  address: '32 AV HOCHE'
}

// Case RNA only
export const croixRouge = {
  rnaId: 'W9C1000188',
  oldRnaId: '101469',
  address: '14 av Docteur Mogès'
}

// Case RNA + SIRENE
export const school42 = {
  rnaId: 'W751218379',
  address: '96 BOULEVARD BESSIERES'
}

// First result when fulltext search is 'coca-cola'
export const cocaCola = {
  search: 'coca-cola',
  firstResultName: 'Coca-cola financial corporation',
  firstResultSiret: '48746376200020'
}
