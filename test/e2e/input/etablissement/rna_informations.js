const panel = '.company-container > .company__panel'

const panelCategorySirene = '.container > .company:nth-of-type(2) > .company-container > .company__panel'
const panelCategoryRNA = '.container > .company:nth-of-type(3) > .company-container > .company__panel'

module.exports = {
  'Etablissement Page (RNA) displays correct info': function (browser) {
    browser
      // Going to la croix-rouge page
      .url(browser.launch_url + 'etablissement/W9C1000188')
      .waitForElementVisible('body')

    // we have two panels
    browser.expect.element(panel + ':nth-of-type(2)').to.be.present
    // Address info in first panel
    browser.assert.containsText(panel + ':first-of-type > .company__item:nth-of-type(2) > .company__item-value', '14 av Docteur Mogès')
    // Old RNA number info in second panel
    browser.assert.containsText(panel + ':nth-of-type(2) > .company__info-list .company__item:nth-of-type(2) > .company__item-value', '101469')
  },

  'Etablissement Page (RNA + SIRENE) displays correct info': function (browser) {
    browser
      // Going to page of school 42
      .url(browser.launch_url + 'etablissement/W751218379')
      .waitForElementVisible('body')

    // we have 2 categories

    // we have 2 categories, each with 2 panels
    browser.expect.element(panelCategorySirene + ':nth-of-type(2)').to.be.present
    browser.expect.element(panelCategoryRNA + ':nth-of-type(2)').to.be.present
    // Address info in first SIRENE panel
    browser.assert.containsText(panelCategorySirene + ':first-of-type > .company__item:nth-of-type(2) > .company__item-value', '96 BOULEVARD BESSIERES')
    // RNA number info in 2th RNA panel
    browser.assert.containsText(panelCategoryRNA + ':nth-of-type(2) > .company__info-list > .company__item:first-of-type > .company__item-value', 'W751218379')
  }
}
