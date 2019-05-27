const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const config = require('config/index')

module.exports = {
  entry: {
    app: ['@babel/polyfill', './src/main.js']
  },
  output: { // REVIEW check si fonctionne
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'vue-style-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // REVIEW voir si virable
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // REVIEW voir si virable
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(txt)(\?.*)?$/, // REVIEW voir si virable
        loader: 'ignore-loader'
        // },
        // {
        //   noParse: /(mapbox-gl)\.js$/
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.vue'], // REVIEW voir si virable
    alias: {
      '@': path.resolve(__dirname, 'src')
      // config: path.join(__dirname, 'config', process.env.NODE_ENV)
      // 'endpoints': path.resolve(__dirname, './config/endpoints')  // <-- When you build or restart dev-server, you'll get an error if the path to your utils.js file is incorrect.
    },
    extensions: [
      '.js',
      '.vue',
      'json'
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      mapboxgl: 'mapbox-gl'
    }),
    new webpack.ProvidePlugin({
      sourceEndpoints: path.resolve(path.join(__dirname, 'config/endpoints'))
    })
  ]
}
