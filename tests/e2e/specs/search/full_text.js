const listResults = ".container > div:first-of-type > ul";

import { bouygues } from "../fixtures";

module.exports = {
  "Display list of etablissements": function(browser) {
    browser
      .url(browser.launch_url)
      .waitForElementVisible("body")
      .setValue("input[name=search]", bouygues.title)
      .click("button[class=overlay-button]");

    // Url etablissement list is correct
    browser.assert.urlEquals(
      browser.launch_url + "search?fullText=" + bouygues.title + "&page=1"
    );
    // Some results are present
    browser.expect.element(listResults + " > li:first-of-type > .panel").to.be
      .visible;
    // First result work
    browser.expect
      .element(listResults + " > li:first-of-type > .panel > h4")
      .text.to.contain("Bouygues");
    // Five results are present for Sirene
    browser.expect.element(listResults + " > li:nth-of-type(5)").to.be.present;
  },

  "Click on etablissement goes to etablissement card": function(browser) {
    browser
      .click(listResults + " > li:first-of-type > .panel")
      .waitForElementVisible("body");

    browser.assert.urlEquals(
      browser.launch_url + "etablissement/" + bouygues.siret
    );
    browser.end();
  }
};
