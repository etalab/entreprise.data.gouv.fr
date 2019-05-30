const listResults = ".container > div:first-of-type > ul";

import { cocaCola } from "../fixtures";

module.exports = {
  "Display list of etablissements": function(browser) {
    browser
      .url(browser.launch_url)
      // .url(process.env.BASE_ADDRESS_SIRENE_FULLTEXT)
      .waitForElementVisible("body")
      .setValue("input[name=search]", cocaCola.search)
      .click("button[class=overlay-button]");

    // Url etablissement list is correct
    browser.assert.urlEquals(
      browser.launch_url + "search?fullText=" + cocaCola.search + "&page=1"
    );
    // Some results are present
    browser.expect.element(listResults + " > li:first-of-type > .panel").to.be
      .visible;
    // First result should be main corporation
    browser.expect
      .element(listResults + " > li:first-of-type > .panel > h4")
      .text.to.contain(cocaCola.firstResultName);
    // Five results are present for Sirene
    browser.expect.element(listResults + " > li:nth-of-type(5)").to.be.present;
  },

  "Click on etablissement goes to etablissement card": function(browser) {
    browser
      .click(listResults + " > li:first-of-type > .panel")
      .waitForElementVisible("body");

    browser.assert.urlEquals(
      browser.launch_url + "etablissement/" + cocaCola.firstResultSiret
    );
    browser.end();
  }
};
