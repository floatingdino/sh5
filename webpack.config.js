const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	mode: "development",
	entry: {
		"bundle": './js/src/index.ts'
	},
	output: {
		filename: './js/dist/[name].js'
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
								}]
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
		extensions: ['.ts', '.tsx', '.js', '.json', '.vue']
	}
}

module.exports.serve = {
  content: [__dirname],
  add: (app, middleware, options) => {
    const historyOptions = {
      // ... see: https://github.com/bripkens/connect-history-api-fallback#options
    };

    app.use(convert(history(historyOptions)));
  }
};
