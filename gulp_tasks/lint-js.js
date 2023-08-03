/**
 * Gulp task: lintSass
 * Description: Task for linting our sass.
 * Dependencies:
 *
 * https://www.npmjs.com/package/gulp-eslint
 * npm install gulp-eslint --save-dev
 * npm install --save-dev gulp-notify
 */
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require("gulp");
const config = require("./_config");
const handleErrors = require("./handleErrors");
const eslint = require("gulp-eslint");

function lintJs(cb) {
  src([
    config.js.src + "/*.js",
    "!src/js/*.min.js",
    "!Gruntfile.js",
    "!Gulpfile.js",
    "!node_modules/**",
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

  cb(); // callback function
}

module.exports = lintJs;
