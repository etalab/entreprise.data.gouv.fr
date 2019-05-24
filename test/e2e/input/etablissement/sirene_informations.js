const companyPanel = '.company-container > .company__panel'

module.exports = {
  'Etablissement Page (SIRENE) displays correct info': function (browser) {
    browser
      // Going to bouygues page
      .url(browser.launch_url + 'etablissement/57201524600216')
      .waitForElementVisible('body')

    // we have two panels
    browser.expect.element(companyPanel + ':nth-of-type(2)').to.be.present
    // Address info in first panel
    browser.assert.containsText(companyPanel + ':first-of-type > .company__item:nth-of-type(2) > .company__item-value', '32 AV HOCHE')
    // Siren info in second panel
    browser.assert.containsText(companyPanel + ':nth-of-type(2) > .company__item:nth-of-type(2) > .company__item-value', '572 015 246')
    browser.end()
  }
}
