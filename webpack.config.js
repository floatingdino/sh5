const webpack = require('webpack');

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
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json']
	}
}
