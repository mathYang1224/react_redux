const path = require('path');
const webpack = require("webpack");
 
module.exports = {
    entry: "./app/app.js",  
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath:"/xuni/",
        filename: "all.js"
    },
    module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/ ,
				use: {
					loader: 'babel-loader',
					options: {
				  		presets: ['es2015','react'],
				  		plugins: ["transform-object-rest-spread"]
					}
				}
			}
		]
	}
};