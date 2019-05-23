module.exports = {
  'Display list of etablissements': function (browser) {
    browser
      .url(browser.launch_url)
      // .url(process.env.BASE_ADDRESS_SIRENE_FULLTEXT)
      .waitForElementVisible('body')
      .setValue('input[name=search]', 'coca-cola')
      .click('button[class=overlay-button]')

    // Url etablissement list is correct
    browser.assert.urlEquals(browser.launch_url + 'search?fullText=coca-cola&page=1')
    // Some results are present
    browser.expect.element('.container > div:first-child > ul > li:first-child > .panel').to.be.visible
    // First result should be main corporation
    browser.expect.element('.container > div:first-child > ul > li:first-child > .panel > h4').text.to.contain('Coca-cola financial corporation')
    // Five results are present for Sirene
    browser.expect.element('.container > div:first-child > ul > li:nth-child(5)').to.be.present
  },

  'Click on etablissement goes to etablissement card': function (browser) {
    browser
      .click('.container > div:first-child > ul > li:first-child > .panel')
      .waitForElementVisible('body')

    // Url page etablissement is right
    browser.assert.urlEquals(browser.launch_url + 'etablissement/48746376200020')
    browser.end()
  }
}
