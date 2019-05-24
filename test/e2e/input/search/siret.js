module.exports = {
  'Search SIREN goes to Etablissement page': function (browser) {
    browser
      .url(browser.launch_url)
      .waitForElementVisible('body')
      // Searching for la croix rouge
      .setValue('input[name=search]', '48995245700039')
      .click('button[class=overlay-button]')

    // We land on right page (main etablissement)
    browser.assert.urlEquals(browser.launch_url + 'etablissement/48995245700039')
  }
}
