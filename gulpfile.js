// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require("gulp");

// Bring in browserSync
const browserSync = require("browser-sync").create();
// Import our config and tasks
const config = require("./gulp_tasks/_config");
// Bring in tasks.
// const clean = require("./gulp_tasks/clean");
const compileSass = require("./gulp_tasks/compileSass");
// const concatJs = require("./gulp_tasks/concat-js");
// const lintJs = require("./gulp_tasks/lint-js");
// const lintSass = require("./gulp_tasks/lint-sass");
// const minifyCss = require("./gulp_tasks/minify-css");
// const minifyJs = require("./gulp_tasks/minify-js");
// const watcher = require("./gulp_tasks/watchers");

/**
 * Runs browserSync
 * @param {*} cb
 */
function browsersyncServerVH(cb) {
	browserSync.init({
		injectChanges: true,
		notify: false,
		open: false,
		server: {
			//proxy: '.env.VHOST',
			proxy: process.env.VHOST,
		},
	});
	cb();
}

// Individual tasks
// exports.clean = clean;
exports.compileSass = compileSass;
// exports.concatJs = concatJs;
// exports.lintSass = lintSass;
// exports.lintJs = lintJs;
// exports.minifyCss = minifyCss;
// exports.minifyJs = minifyJs;

/**
 * Main tasks
 */
// exports.build = series(compileSass, browsersyncServerVH, watcher);
// exports.default = series(compileSass, minifyCss);
