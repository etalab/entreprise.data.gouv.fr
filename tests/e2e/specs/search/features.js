module.exports = {
  "Press enter launch search": function(browser) {
    browser
      .url(browser.launch_url)
      .waitForElementVisible("body")
      .setValue("input[name=search]", "coca-cola")
      .keys(browser.Keys.ENTER)

      .assert.urlEquals(
        browser.launch_url + "search?fullText=coca-cola&page=1"
      );
    browser.end();
  },

  "Pagination work": function(browser) {
    const lastButton = ".pagination > .pagesButtons:nth-last-of-type(2) > a";
    const firstButton = ".pagination > .pagesButtons:nth-of-type(2) > a";

    // Go to pagination, click on last page
    browser
      .url(browser.launch_url + "search?fullText=coca-cola&page=1")
      .waitForElementVisible(lastButton)
      .click(lastButton);
    browser
      .waitForElementVisible(lastButton)
      .moveToElement(lastButton, 0, 0)
      .getText(lastButton, function(number) {
        browser.assert.urlEquals(
          `${browser.launch_url}search?fullText=coca-cola&page=${number.value}`
        );
        // Pagination is consistent : check first and last number
        browser.assert.containsText(firstButton, "1");
        browser.assert.containsText(lastButton, number.value);
      });
    browser.end();
  }
};
