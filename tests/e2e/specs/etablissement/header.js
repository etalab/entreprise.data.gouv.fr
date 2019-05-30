import { bouygues } from "../fixtures";

module.exports = {
  "Etablissement Page (company) got correct header": function(browser) {
    browser
      .url(browser.launch_url + "etablissement/" + bouygues.siret)
      .waitForElementVisible("body");

    // We have correct infos
    browser.expect.element(".title__block").to.be.present;
    browser.assert.containsText(".title__block > h2", bouygues.title);
    browser.end();
  }
};
