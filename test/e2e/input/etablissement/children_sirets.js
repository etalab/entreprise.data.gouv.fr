const elementList = 'ul.company__children'
const secondElement = elementList + ' > .company__item-link:nth-of-type(2)'
const secondElementLink = secondElement + ' > a'

import { bouygues } from '../fixtures'

module.exports = {
  'Etablissement Page (company) displays Children Etablissements': function (browser) {
    browser
      .url(browser.launch_url + 'etablissement/' + bouygues.siret)
      .waitForElementVisible('body')

    browser.expect.element(elementList).to.be.present
    // We have at least 2 children etablissements
    browser.expect.element(secondElement).to.be.present
  },
  'Clicking on children etablissement goes to etablissement page': function (browser) {
    browser
      .waitForElementVisible(secondElement)
      .getText(secondElementLink, function (siret) {

        browser.click(secondElementLink)

        const siretNoSpaces = siret.value.replace(/\s/g, "")
        browser.assert.urlEquals(`${browser.launch_url}etablissement/${siretNoSpaces}`)
      })
    browser.end()
  }
}
