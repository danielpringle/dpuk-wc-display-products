/**
 * Gulp Task: concatJs
 * Description: ConCatinate our JavaScipt
 * Dependencies: npm install
 * https://www.npmjs.com/package/gulp-concat
 * https://www.npmjs.com/package/gulp-babel
 * https://www.npmjs.com/package/gulp-replace
 * https://www.npmjs.com/package/gulp-plumber
 * https://babeljs.io/docs/en/usage
 *
 * npm install --save-dev gulp-concat
 * npm install  gulp-babel @babel/core @babel/cli @babel/preset-env --save-dev
 * npm install --save-dev gulp-replace
 * npm install --save-dev gulp-plumber
 * npm install gulp-sourcemaps --save-dev
 */

const { src, dest, watch, series, parallel } = require("gulp");
const config = require("./_config");
const handleErrors = require("./handleErrors");

const plumber = require("gulp-plumber");
const replace = require("gulp-replace");
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");

function concatJs(cb) {
  src(config.js.src)
    // Deal with errors.
    .pipe(plumber({ errorHandler: handleErrors }))
    // Start a sourcemap.
    .pipe(sourcemaps.init())
    // Convert ES6+ to ES2015.
    .pipe(
      babel({
        presets: [
          [
            "@babel/env",
            {
              targets: {
                browsers: ["last 2 versions"],
              },
            },
          ],
        ],
      })
    )
    // Concatenate partials into a single script.
    .pipe(concat(config.js.outputName + ".js"))
    // Append the sourcemap to project.js.
    .pipe(sourcemaps.write())
    .pipe(replace("    ", "\t"))
    // Save project.js
    .pipe(dest(config.js.dest))
    .pipe(browserSync.stream());

  cb();
}

module.exports = concatJs;
