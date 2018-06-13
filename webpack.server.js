const webpack = require("webpack");
const uglify = require("uglifyjs-webpack-plugin");
const path = require("path");
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

module.exports = {
  mode: "production",
  devtool: "sourcemap",
  target: "node",
  entry: {
    bundle: "./js/src/entry-server.js",
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "js/serve"),
    publicPath: "js/serve/",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            css: "sass-loader",
          },
        },
      },
      // {
      //   test: /(.js|.ts)$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: "babel-loader",
      //       options: {
      //         cacheDirectory: true,
      //         presets: [
      //           [
      //             "@babel/preset-env",
      //             {
      //               targets: {
      //                 browsers: ["> 3%", "last 2 versions", "IE 10"],
      //               },
      //             },
      //           ],
      //           "@babel/preset-stage-0",
      //         ],
      //       },
      //     },
      //   ],
      // },
      {
        test: /scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new VueSSRServerPlugin()
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".vue"],
    alias: {
      components: path.resolve(__dirname, "js/src/components"),
      pages: path.resolve(__dirname, "js/src/pages"),
    },
  },
};
