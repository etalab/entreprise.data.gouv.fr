import capitalize from "lodash/capitalize";
import toUpper from "lodash/toUpper";
import { placeHolderIfEmpty, frenchDateFormat, removeExtraChars } from "@/helpers";

import Vue from "vue";

Vue.filter("capitalize", capitalize);
Vue.filter("upperCase", toUpper);
Vue.filter("removeExtraChars", removeExtraChars);
Vue.filter("frenchDateFormat", frenchDateFormat);
Vue.filter("placeHolderIfEmpty", placeHolderIfEmpty);

Vue.filter("truncate", function(string) {
  if (string && string.length > 80) {
    return `${string.substring(0, 75)}...`;
  }
  return string;
});

Vue.filter("prettySiret", function(str) {
  if (!str) return null;
  // 11122233344444 => 111 222 333 444 44 => 111 222 333 44444.
  return str.replace(/(\d{3})/g, "$1 ").replace(/(\s)(?=(\d{2})$)/g, "");
});

Vue.filter("prettySiren", function(str) {
  if (!str) return null;
  // 111222333 => 111 222 333.
  return str.replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
});

Vue.filter("prettySirenHtml", function(str) {
  if (!str) return null;
  // 111222333 => 111 222 333 with &#8239 the NO-BREAK SPACE
  return str.replace(/(\d{3})(\d{3})(\d{3})/g, "$1&#8239;$2&#8239;$3");
});

Vue.filter("prettySiretHtml", function(str) {
  if (!str) return null;
  // 11122233344444 => 111 222 333 44444 with &#8239 the NO-BREAK SPACE
  return str.replace(/(\d{3})(\d{3})(\d{3})(\d{5})/g, "$1&#8239;$2&#8239;$3&#8239;$4");
});

Vue.filter("prettyTvaNumber", function(str) {
  if (!str) return null;
  return str.replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
});
