const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

module.exports = {
  mode: "production",
  entry: {
    "bundle": './js/src/index.ts'
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, "js/dist"),
    publicPath: "js/dist/",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: "sass-loader"
          }
        },
      },
      {
        test: /(.js|.ts)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                "@babel/preset-typescript",
                ["@babel/preset-env", {
                  targets: {
                    browsers: ["> 3%", "last 2 versions", "IE 10"]
                  }
                }],
                "@babel/preset-stage-0"
              ]
            }
          }
        ]
      },
      {
        test: /scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  plugins: [
    new uglify({
      extractComments: true,
      parallel: true,
      cache: true
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.vue'],
    alias: {
      components: path.resolve(__dirname, "js/src/components"),
      pages: path.resolve(__dirname, "js/src/pages")
    }
  }
}
