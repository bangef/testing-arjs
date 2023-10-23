const path = require("path");

module.exports = {
	mode: "development",
	// entry: "./src/js/main.js",
	entry: "./src/js/main4.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},
	optimization: {
		minimize: false,
	},
};
