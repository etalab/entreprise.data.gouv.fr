module.exports = {
  'Etablissement Page (company) got correct header': function (browser) {
    browser
      // Going to bouygues page
      .url(browser.launch_url + 'etablissement/57201524600216')
      .waitForElementVisible('body')

    // We have header infos
    browser.expect.element('.title__block').to.be.present
    // We have title
    browser.assert.containsText('.title__block > h2', "BOUYGUES")
  }
}
