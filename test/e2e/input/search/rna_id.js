module.exports = {
  'Search RNA_ID goes to Etablissement page': function (browser) {
    browser
      .url('https://entreprise.data.gouv.fr/')
      .waitForElementVisible('body')
      // Searching for la croix rouge
      .setValue('input[name=search]', 'W9C1000188')
      .click('button[class=overlay-button]')

    // We land on right page
    browser.assert.urlEquals('https://entreprise.data.gouv.fr/etablissement/W9C1000188')
  }
}
