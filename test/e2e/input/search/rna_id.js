module.exports = {
  'Search RNA_ID goes to Etablissement page': function (browser) {
    browser
      .url(browser.launch_url)
      .waitForElementVisible('body')
      // Searching for la croix rouge
      .setValue('input[name=search]', 'W9C1000188')
      .click('button[class=overlay-button]')
      .waitForElementVisible('body')

    // We land on right page
    browser.assert.urlEquals(browser.launch_url + 'etablissement/W9C1000188')
  }
}
