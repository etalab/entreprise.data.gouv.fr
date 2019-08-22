import Intl from "intl";

export default {
  filters: {
    capitalize: function(string) {
      if (!string) {
        return null;
      }
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },
    upperCase: function(string) {
      if (!string) {
        return null;
      }
      return string.toUpperCase();
    },
    ifExist: function(string) {
      if (string && string != "null") {
        return string;
      }
      return "Non renseigné";
    },
    removeExtraChars: function(string) {
      if (!string) {
        return null;
      }
      const withoutAsterisk = string.replace(/\*/g, " ");
      const withoutAsteriskOrSlash = withoutAsterisk.replace(/\//g, " ");
      // Remove potential double spaces and potential space at end of string
      return withoutAsteriskOrSlash.replace(/ {2}/g, " ").replace(/ $/, "");
    },
    truncate: function(string) {
      if (string && string.length > 80) {
        return `${string.substring(0, 75)}...`;
      }
      return string;
    },
    pluralizeDependingOn: function(string, int) {
      if (int > 1) {
        return `${string}s`;
      } else {
        return string;
      }
    },
    frenchNumberFormat: function(input) {
      return new Intl.NumberFormat("fr-FR", {
        minimumFractionDigits: 2
      }).format(input);
    },
    frenchDateFormat: function(input) {
      if (input == null) {
        return null;
      }
      return new Intl.DateTimeFormat("en-GB").format(new Date(input));
    },
    formatIfDate: function(input) {
      if (input == null) {
        return null;
      }

      const dateFormat = RegExp(/^\d{4}-\d{2}-\d{2}$/);

      if (dateFormat.test(input)) {
        return new Intl.DateTimeFormat("en-GB").format(new Date(input));
      }
      return input;
    },
    prettySiren: function(string) {
      if (!string) {
        return null;
      }
      // 111222333 => 111 222 333.
      return string.replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
    },
    prettySiret: function(string) {
      if (!string) {
        return null;
      }
      // 11122233344444 => 111 222 333 444 44 => 111 222 333 44444.
      return string.replace(/(\d{3})/g, "$1 ").replace(/(\s)(?=(\d{2})$)/g, "");
    },
    prettyTvaNumber: function(string) {
      if (!string) {
        return null;
      }
      return string.replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
    },
    prettySirenHtml: function(string) {
      if (!string) {
        return null;
      }
      // &#8239 is the NO-BREAK SPACE
      return string.replace(/(\d)(?=(\d{3})+$)/g, "$1&#8239;");
    },
    prettySiretHtml: function(string) {
      if (!string) {
        return null;
      }
      // &#8239 is the NO-BREAK SPACE
      return string
        .replace(/(\d{3})/g, "$1&#8239;")
        .trim()
        .replace(/(&#8239;)(?=(\d{2})$)/g, "");
    },
    prettySirenIfSiren: function(string) {
      if (!isNaN(string)) {
        return string.replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
      } else {
        return string;
      }
    }
  },
  methods: {
    concatIfExist(base, addition) {
      if (addition) {
        return base.concat(" ", addition);
      }
      return base;
    }
  }
};
