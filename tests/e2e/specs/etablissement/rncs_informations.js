import { bouygues } from "../fixtures";

const linkToRncs =
  "#app > section > div > div:nth-child(1) > div > div.title__block > a";

const buttonBodacc =
  "#app > section > div > div:nth-child(1) > div.company__buttons > a.button.button__secondary";

const companySirenElement =
  "#app > section > div > div:nth-child(1) > div.company > div.company-container > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(1) > div.company__item-value";

const presidentNameElement =
  "#app > section > div > div:nth-child(1) > div.company > div.company__panel.panel > div > div:nth-child(9) > div > div:nth-child(2) > div.company__item-value";

const observationDateElement =
  "#app > section > div > div:nth-child(1) > div.company > div:nth-child(3) > div:nth-child(3) > div.company__item.company__comment-date > div";

const buttonDownloadPDF =
  "#app > section > div > div:nth-child(1) > div.company__buttons > a";

module.exports = {
  "Clicking on link text goes to RNCS page": function(browser) {
    browser
      .url(browser.launch_url + "etablissement/" + bouygues.siret)
      .waitForElementVisible(linkToRncs)
      .click(linkToRncs);

    browser.assert.urlEquals(browser.launch_url + "rncs/" + bouygues.siren);
  },

  "Page RNCS display correct info: Identification": function(browser) {
    browser
      .url(browser.launch_url + "rncs/" + bouygues.siren)
      .waitForElementVisible(companySirenElement);

    browser.assert.containsText(companySirenElement, bouygues.sirenSpaced);
  },

  "Page RNCS display correct info: Gestion": function(browser) {
    browser
      .url(browser.launch_url + "rncs/" + bouygues.siren)
      .waitForElementVisible(presidentNameElement);

    browser.assert.containsText(presidentNameElement, bouygues.namePresident);
  },

  "Page RNCS display correct info: Observations": function(browser) {
    browser
      .url(browser.launch_url + "rncs/" + bouygues.siren)
      .waitForElementVisible(observationDateElement);

    browser.assert.containsText(
      observationDateElement,
      bouygues.dateFirstObservation
    );
  },

  "'Download PDF' button goes to correct link": function(browser) {
    browser
      .url(browser.launch_url + "rncs/" + bouygues.siren)
      .waitForElementVisible(buttonDownloadPDF);

    browser.getAttribute(buttonDownloadPDF, "href", function(attribute) {
      browser.assert.equal(
        attribute.value,
        "https://entreprise.data.gouv.fr/api/rncs/v1/fiches_identite/" +
          bouygues.siren +
          "/pdf"
      );
    });
  },

  "Clicking on button BODACC goes to correct page": function(browser) {
    browser
      .url(browser.launch_url + "rncs/" + bouygues.siren)
      .waitForElementVisible(buttonBodacc);

    browser.getAttribute(buttonBodacc, "href", function(attribute) {
      browser.assert.equal(
        attribute.value,
        "https://www.bodacc.fr/annonce/liste/" + bouygues.siren
      );
    });
    browser.end();
  }
};
