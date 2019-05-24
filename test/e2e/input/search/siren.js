module.exports = {
  'Search SIREN goes to Etablissement page': function (browser) {
    browser
      .url(browser.launch_url)
      .waitForElementVisible('body')
      // Searching for Blizzard entertainement SAS
      .setValue('input[name=search]', '489952457')
      .click('button[class=overlay-button]')

    // We land on right page (main etablissement)
    browser.assert.urlEquals(browser.launch_url + 'etablissement/489952457')
  }
}
