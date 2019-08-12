import { bouygues } from "../fixtures";

const companyNameElement =
  "#app > section > div > div:nth-child(1) > div.company > div.company-container > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(1) > div.company__item-value";

const buttonDownloadPDF =
  "#app > section > div > div:nth-child(1) > div.company__buttons > a";

module.exports = {
  "Clicking on link text goes to RNCS page": function(browser) {
    browser
      .url(browser.launch_url + "etablissement/" + bouygues.siret)
      .click("link text", "Fiche d'immatriculation au RNCS");

    browser.assert.urlEquals(browser.launch_url + "rncs/" + bouygues.siren);
  },

  "Page RNCS display correct info": function(browser) {
    browser
      .url(browser.launch_url + "rncs/" + bouygues.siren)
      .waitForElementVisible(companyNameElement);

    browser.assert.containsText(companyNameElement, bouygues.title);
  },

  "'Download PDF' button goes to correct link": function(browser) {
    browser
      .url(browser.launch_url + "rncs/" + bouygues.siren)
      .waitForElementVisible(buttonDownloadPDF);

    browser.getAttribute(buttonDownloadPDF, "href", function(attribute) {
      browser.assert.equal(
        attribute.value,
        browser.launch_url + "rncs/" + bouygues.siren + "/pdf"
      );
    });
    browser.end();
  }
};
