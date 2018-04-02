const webpack = require('webpack');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const weblog = require('webpack-log');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    "bundle": './js/src/index.ts'
  },
  output: {
    filename: './js/dist/[name].js',
    chunkFilename: './js/dist/[name].bundle.js',
    // path: path.resolve(__dirname, "js/dist")
  },
  devtool: 'eval',
  module: {
    rules: [
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
                    browsers: ["last 1 versions"]
                  }
                }],
                "@babel/preset-stage-0"
              ]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: "sass-loader"
          }
        }
      },
      {
        test: /scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
    ]
  },
  plugins: [
    // new ExtractTextPlugin("./css/style.css"),
    new BundleAnalyzerPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.vue'],
    alias: {
      components: path.resolve(__dirname, "js/src/components"),
      pages: path.resolve(__dirname, "js/src/pages")
    }
  }
}

module.exports.serve = {
  content: [__dirname],
  add: (app, middleware, options) => {

    app.use(convert(history({
      index: "index.html",
      // rewrites: [
      //   {
      //     from: /hot-update\.json$/,
      //     to(context) {
      //       return context.parsedUrl.pathname.replace(/.*(\/[^\/]*hot-update\.json)$/, /$&/);
      //     }
      //   }
      // ]
    })));
  }
};
