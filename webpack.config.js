const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,

	entry: {
		"wc-display-products": "./includes/blocks/wc-display-products/src/index.js",
	}
}