import { croixRouge } from "../fixtures";

module.exports = {
  "Search RNA_ID goes to Etablissement page": function(browser) {
    browser
      .url(browser.launch_url)
      .waitForElementVisible("body")
      // Searching for la croix rouge
      .setValue("input[name=search]", croixRouge.rnaId)
      .click("button[class=overlay-button]")
      .waitForElementVisible("body");

    browser.assert.urlEquals(
      browser.launch_url + "etablissement/" + croixRouge.rnaId
    );
    browser.end();
  }
};
