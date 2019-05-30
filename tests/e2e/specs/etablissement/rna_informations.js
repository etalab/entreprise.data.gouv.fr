import { cssHelpers, croixRouge, school42 } from "../fixtures";

module.exports = {
  "Etablissement Page (RNA) displays correct info": function(browser) {
    browser
      .url(browser.launch_url + "etablissement/" + croixRouge.rnaId)
      .waitForElementVisible("body");

    // we have two panels
    browser.expect.element(cssHelpers.secondCompanyPanel).to.be.present;

    browser.assert.containsText(
      cssHelpers.firstCompanyPanel + cssHelpers.secondElementInPanel,
      croixRouge.address
    );
    browser.assert.containsText(
      cssHelpers.secondCompanyPanel + cssHelpers.secondElementListInPanel,
      croixRouge.oldRnaId
    );
  },

  "Etablissement Page (RNA + SIRENE) displays correct info": function(browser) {
    browser
      .url(browser.launch_url + "etablissement/" + school42.rnaId)
      .waitForElementVisible("body");

    // we have 2 categories, each with 2 panels
    browser.expect.element(cssHelpers.secondPanelCategorySirene).to.be.present;
    browser.expect.element(cssHelpers.secondPanelCategoryRNA).to.be.present;

    browser.assert.containsText(
      cssHelpers.firstPanelCategorySirene + cssHelpers.secondElementInPanel,
      school42.address
    );
    browser.assert.containsText(
      cssHelpers.secondPanelCategoryRNA +
        " > .company__info-list > .company__item:first-of-type > .company__item-value",
      school42.rnaId
    );
    browser.end();
  }
};
