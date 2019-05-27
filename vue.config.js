const webpack = require('webpack')
const path = require('path');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        sourceEndpoints: path.resolve(path.join(__dirname, 'config/endpoints'))
      })
    ]
  },
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        data: `@import "~@/style/app.scss";`
      }
    }
  }
}
