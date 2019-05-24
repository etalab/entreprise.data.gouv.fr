const childrenList = 'ul.company__children'
const secondChild = childrenList + ' > .company__item-link:nth-child(2)'
const secondChildLink = secondChild + ' > a'

module.exports = {
  'Etablissement Page (company) displays Children Etablissements': function (browser) {
    browser
      // Going to bouygues page
      .url(browser.launch_url + 'etablissement/57201524600216')
      .waitForElementVisible('body')

    browser.expect.element(childrenList).to.be.present
    // We have at least 2 children etablissements
    browser.expect.element(secondChild).to.be.present
  },
  'Clicking on children etablissement goes to etablissement page': function (browser) {
    browser
      .waitForElementVisible(secondChild)
      .getText(secondChildLink, function (siret) {
        browser.click(secondChildLink)
        const siretNoSpaces = siret.value.replace(/\s/g, "")
        browser.assert.urlEquals(`${browser.launch_url}etablissement/${siretNoSpaces}`)
      })
  }
}
