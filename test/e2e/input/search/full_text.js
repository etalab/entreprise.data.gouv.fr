module.exports = {
  'Display list of etablissements': function (browser) {
    browser
      .url('https://entreprise.data.gouv.fr/')
      // .url(process.env.BASE_ADDRESS_SIRENE_FULLTEXT)
      .waitForElementVisible('body')
      .setValue('input[name=search]', 'coca-cola')
      .click('button[class=overlay-button]')

    // Some results are present
    browser.expect.element('.container > div:first-child > ul > li:first-child > .panel').to.be.visible
    browser.expect.element('.container > div:first-child > ul > li:first-child > .panel > h4').text.to.contain('Coca-cola financial corporation')
    // Five results are present for Sirene
    browser.expect.element('.container > div:first-child > ul > li:nth-child(5)').to.be.present
  },

  'Click on etablissement goes to etablissement card': function (browser) {
    browser
    .end()
  }
}
