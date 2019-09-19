import { bouygues } from "../fixtures";

const titleNotSkeleton =
  "#app > section > div > div:nth-child(1) > div > div.title__block > h2:not(.loading)";

module.exports = {
  "Etablissement Page (company) got correct header": function(browser) {
    browser
      .url(browser.launch_url + "etablissement/" + bouygues.siret)
      .waitForElementVisible("body");

    // We have correct infos
    browser.waitForElementVisible(titleNotSkeleton);
    browser.expect.element(titleNotSkeleton).to.be.present;
    browser.assert.containsText(titleNotSkeleton, bouygues.title);
    browser.end();
  },
  "Clicking on link BODACC goes to correct page": function(browser) {
    browser
      .url(browser.launch_url + "etablissement/" + bouygues.siret)
      .click("link text", "Liste des annonces BODACC");

    browser.assert.urlEquals(
      "https://www.bodacc.fr/annonce/liste/" + bouygues.siren
    );
  }
};
