const webpack = require("webpack");
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry: {
    app: ["@babel/polyfill", "./src/main.js"]
  },
  resolve: {
    extensions: ["", ".js", ".vue", "json"], // REVIEW voir si virable
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve(__dirname, "src")
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      mapboxgl: "mapbox-gl"
    }),
    new webpack.ProvidePlugin({
      sourceEndpoints: path.resolve(path.join(__dirname, "config/endpoints"))
    })
  ]
};
