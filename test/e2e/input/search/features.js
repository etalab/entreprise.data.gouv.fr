module.exports = {
  'Press enter launch search': function (browser) {
    browser
      .url(browser.launch_url)
      // .url(process.env.BASE_ADDRESS_SIRENE_FULLTEXT)
      .waitForElementVisible('body')
      .setValue('input[name=search]', 'coca-cola')
      .keys(browser.Keys.ENTER)
      // We land on etablissement list
      .assert.urlEquals(browser.launch_url + 'search?fullText=coca-cola&page=1')
  },

  'Pagination work': function (browser) {
    const lastButton = '.pagination > .pagesButtons:nth-last-of-type(2) > a'
    const firstButton = '.pagination > .pagesButtons:nth-of-type(2) > a'

    // Go to pagination, click on last page
    browser
      .waitForElementVisible(lastButton)
      .click(lastButton)
    browser
      .waitForElementVisible(lastButton)
      .moveToElement(lastButton, 0, 0)
      .getText(lastButton, function (number) {
      // Url is correct
        browser.assert.urlEquals(`${browser.launch_url}search?fullText=coca-cola&page=${number.value}`)
        // Pagination is consistent : check first and last number
        browser.assert.containsText(firstButton, '1')
        browser.assert.containsText(lastButton, number.value)
      })
    browser.end()
  }
}
