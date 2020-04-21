import capitalize from "lodash/capitalize";
import toUpper from "lodash/toUpper";
import removeDiacritics from "@/helpers/diacritics";
import { libellesCodesNaf } from "@/fixtures/codes_naf";
import { libellesCategoriesJuridiques } from "@/fixtures/categories_juridiques";

function concatNames(firstName, lastName) {
  const last = toUpper(lastName);
  const first = capitalize(firstName);

  if (first !== "" && last !== "") return `${first} ${last}`;
  else return last;
}

function removeExtraChars(str) {
  if (!str) return;

  return str
    .replace(/\*/g, " ")
    .replace(/\//g, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/\s$/, "");
}

function placeHolderIfEmpty(str) {
  return (str && str !== "null") ? str : "Non renseigné";
}

function libelleFromCodeNaf(codeNaf) {
  const formattedNaf = codeNaf.replace(/[.-]/g, "");
  return libellesCodesNaf[formattedNaf];
}
function libelleFromCategoriesJuridiques(categorie) {
  return libellesCategoriesJuridiques[categorie];
}

// convert a date into the DD/MM/YYYY format
function frenchDateFormat(date) {
  const dateFormatHyphens = RegExp(/^\d{4}-\d{2}-\d{2}$/);
  const timestamp = Date.parse(date);

  if (dateFormatHyphens.test(date)) {
    return (date == null) ? null : new Intl.DateTimeFormat("en-GB").format(new Date(date));
  }
  else if (!isNaN(timestamp)) {
    return new Intl.DateTimeFormat("en-GB").format(new Date(timestamp));
  }
  else return date;
}

function formatAddressZone(codePostal, ville, pays, { shortened = false } = {}) {
  let zone = `${toUpper(codePostal)} ${capitalize(ville)}, ${toUpper(pays)}`;
  if (shortened) zone = zone.replace(/FRANCE/, "");
  const trim = new RegExp(/^, ?| ,| ?,$/g);
  return zone.trim().replace(trim, "");
}

export {
  concatNames,
  frenchDateFormat,
  formatAddressZone,
  placeHolderIfEmpty,
  removeDiacritics,
  removeExtraChars,
  libelleFromCodeNaf,
  libelleFromCategoriesJuridiques
};
