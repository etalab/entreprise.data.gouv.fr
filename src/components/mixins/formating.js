function concatNames(firstName, lastName) {
  let first,
    last = "";

  if (lastName) {
    last = lastName.toUpperCase();
  } else {
    return null;
  }

  if (firstName) {
    first = firstName.capitalize();
  }
  return `${first} ${last}`;
}

export default {
  methods: {
    concatNames
  }
};
