const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		"bundle": './js/src/index.ts'
	},
	output: {
		filename: './js/dist/[name].js'
	},
	devtool: 'cheap-module-eval-source-map',
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					extractCSS: true
				}
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
			// {
			// 	test: /scss$/,
			// 	use: ['style-loader', 'css-loader', 'sass-loader']
			// }
		]
	},
	plugins: [
		new ExtractTextPlugin("./css/style.css"),
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
