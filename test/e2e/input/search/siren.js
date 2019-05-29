import { bouygues } from '../fixtures'

module.exports = {
  'Search SIREN goes to Etablissement page': function (browser) {
    browser
      .url(browser.launch_url)
      .waitForElementVisible('body')
      .setValue('input[name=search]', bouygues.siren)
      .click('button[class=overlay-button]')

    browser.assert.urlEquals(browser.launch_url + 'etablissement/' + bouygues.siren)
    browser.end()
  }
}
