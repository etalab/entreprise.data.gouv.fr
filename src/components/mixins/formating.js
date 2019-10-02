import capitalize from "lodash/capitalize";

function concatNames(firstName, lastName) {
  let first,
    last = "";

  if (lastName) {
    last = lastName.toUpperCase();
  } else {
    return null;
  }

  if (firstName) {
    first = capitalize(firstName);
  }
  return `${first} ${last}`;
}

export default {
  methods: {
    concatNames
  }
};
