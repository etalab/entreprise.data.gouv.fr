import { bouygues, cssHelpers } from "../fixtures";

module.exports = {
  "Etablissement Page (SIRENE) displays correct info": function(browser) {
    browser
      .url(browser.launch_url + "etablissement/" + bouygues.siret)
      .waitForElementVisible("body");

    // we have two panels
    browser.expect.element(cssHelpers.secondCompanyPanel).to.be.present;

    // Infos are correct
    browser.assert.containsText(
      cssHelpers.firstCompanyPanel + cssHelpers.secondElementInPanel,
      bouygues.address
    );
    browser.assert.containsText(
      cssHelpers.secondCompanyPanel + cssHelpers.secondElementInPanel,
      bouygues.sirenSpaced
    );
    browser.end();
  }
};
