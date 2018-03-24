const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  entry: {
    "bundle": './js/src/index.ts'
  },
  output: {
    filename: '../js/dist/[name].js'
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
                }]
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
    extensions: ['.ts', '.tsx', '.js', '.json', '.vue']
  }
}
