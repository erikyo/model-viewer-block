const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");
const isProduction = "production" === process.env.NODE_ENV;

let entry = {};
entry[`model-viewer-block-admin-page`] = path.resolve(process.cwd(), `blocks/model-viewer-block/index.js`);
entry[`model-viewer-block-settings`] = path.resolve(process.cwd(), `admin/model-viewer-settings/index.js`);
entry[`./assets/js/blocks.frontend`] = path.resolve(process.cwd(), `blocks/model-viewer-block/frontend.js`);

module.exports = {
	mode: isProduction ? "production" : "development",
	...defaultConfig,
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	entry,
	output: {
		filename: "[name].js",
		path: path.join(__dirname, "./build"),
	},
	externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
};
