import Filters from "@/components/mixins/filters";

function concatNames(firstName, lastName) {
  let first,
    last = "";

  if (lastName) {
    last = lastName.toUpperCase();
  } else {
    return null;
  }

  if (firstName) {
    first = Filters.filters.capitalize(firstName);
  }
  return `${first} ${last}`;
}

export default {
  methods: {
    concatNames
  }
};
