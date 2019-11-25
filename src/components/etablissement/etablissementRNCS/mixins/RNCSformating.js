import Greffes from "@/assets/fixtures/codesGreffes.json";
import Filters from "@/components/mixins/filters.js";
import Formating from "@/components/mixins/formating.js";
import capitalize from "lodash/capitalize";
import toUpper from "lodash/toUpper";

function nameFromCodeGreffe(code) {
  return Greffes.listeGreffes[code];
}

function concatIfExist(base, thisExist, additionIfYes, additionIfNo) {
  if (thisExist) {
    return base.concat("", additionIfYes);
  } else {
    return base.concat("", additionIfNo);
  }
}

function FixeOrVariable(letter) {
  if (letter == "F") {
    return "Capital fixe";
  } else if (letter == "V") {
    return "Capital variable";
  }
  return letter;
}

function PrincipaleOrSecondaire(letter) {
  if (letter == "P") {
    return "Principale";
  } else if (letter == "S") {
    return "Secondaire";
  }
  return letter;
}

function RNCSDeviseSentence(infos) {
  let sentence = `${Filters.filters.ifEmptyShowPlaceholder(
    Filters.filters.frenchNumberFormat(infos.capital)
  )}`;

  sentence = concatIfExist(
    `${FixeOrVariable(infos.type_capital)} : `,
    infos.type_capital,
    sentence,
    ""
  );
  sentence = concatIfExist(
    sentence,
    infos.devise,
    ` ${infos.devise}`,
    ", de devise non précisée"
  );
  sentence = concatIfExist(
    sentence,
    infos.capital_actuel,
    `. Le capital actuel est de ${infos.capital_actuel}`,
    ""
  );

  return sentence;
}

function RNCSLastModification(infos) {
  let sentence = concatIfExist(
    "",
    infos.libelle_derniere_modification,
    infos.libelle_derniere_modification,
    ""
  );
  sentence = concatIfExist(
    sentence,
    infos.libelle_derniere_modification && infos.date_derniere_modification,
    ", ",
    ""
  );
  sentence = concatIfExist(
    sentence,
    infos.date_derniere_modification,
    `le ${infos.date_derniere_modification}.`,
    ""
  );

  return sentence;
}

function RNCSConcatGreffe(infos) {
  let sentence = infos.nom_greffe;
  sentence = concatIfExist(
    sentence,
    infos.code_greffe,
    ` (Code : ${infos.code_greffe})`,
    ""
  );

  return sentence;
}

function RNCSConcatName(person) {
  let name = toUpper(person.nom_patronyme);

  return concatIfExist(name, person.prenoms, `, ${person.prenoms}`, "");
}

function formatAddressInfos(entity, prefix = "", abbreviate = false) {
  let codePostal = entity[`${prefix}adresse_code_postal`];
  let ville = entity[`${prefix}adresse_ville`];
  let pays = entity[`${prefix}adresse_pays`];

  codePostal = toUpper(codePostal); // protect against null
  ville = capitalize(ville);
  pays = toUpper(pays);

  if (abbreviate && pays === "FRANCE") pays = "";

  return trimAddress(`${codePostal} ${ville}, ${pays}`);
}

function formatAddressInfosShort(entity) {
  return formatAddressInfos(entity, "", true);
}

function formatAddressInfosDAP(entity) {
  return formatAddressInfos(entity, "_dap", true);
}

function trimAddress(address) {
  const trim = new RegExp(/^, ?| ,| ?,$/g);
  return address.trim().replace(trim, "");
}

function collabName(person) {
  return Formating.methods.concatNames(
    person.conjoint_collab_prenoms,
    person.conjoint_collab_nom_patronyme
  );
}

function representName(person) {
  return Formating.methods.concatNames(
    person.representant_permanent_nom_patronyme,
    person.representant_permanent_prenoms
  );
}

export default {
  methods: {
    nameFromCodeGreffe,
    concatIfExist,
    PrincipaleOrSecondaire,
    RNCSDeviseSentence,
    RNCSLastModification,
    RNCSConcatGreffe,
    RNCSConcatName,
    formatAddressInfos,
    formatAddressInfosShort,
    formatAddressInfosDAP,
    collabName,
    representName
  }
};
