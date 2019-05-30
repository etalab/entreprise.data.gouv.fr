import { bouygues } from "../fixtures";

module.exports = {
  "Search SIRET goes to Etablissement page": function(browser) {
    browser
      .url(browser.launch_url)
      .waitForElementVisible("body")
      .setValue("input[name=search]", bouygues.siret)
      .click("button[class=overlay-button]");

    browser.assert.urlEquals(
      browser.launch_url + "etablissement/" + bouygues.siret
    );
    browser.end();
  }
};
