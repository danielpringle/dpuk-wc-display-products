/**
 * Gulp task: lintSass
 * Description: Task for linting our sass.
 * Dependencies:
 * https://www.npmjs.com/package/gulp-sass-lint
 * npm install gulp-sass-lint --save-dev
 */
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require("gulp");
const config = require("./_config");
const handleErrors = require("./handleErrors");
const sassLint = require("gulp-sass-lint");

function lintSass(cb) {
  src([
    config.sass.root + "/**/*.scss",
    `!${config.sass.src}/base/html5-reset/_normalize.scss`,
    !config.sass.src + "/utilities/animate/**/*.*",
  ])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
  cb();
}

module.exports = lintSass;
