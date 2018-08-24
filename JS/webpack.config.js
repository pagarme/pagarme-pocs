module.exports = {
	entry: __dirname+"/src/index.js",
	output: {
	    path: __dirname + '/public/js',
	    filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test:/\.js$/,
				exclude: /${node_modules_}$/,
				loader: "babel-loader"
			},
			{
			       test: /\.scss\.css$/,
			       loader: 'style-loader!css-loader!sass-loader'
     		}

		]
	}
}
			
