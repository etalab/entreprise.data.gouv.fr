require("@babel/register")();

module.exports = (function(settings) {
  return settings;
})(require("./nightwatch.json"));
