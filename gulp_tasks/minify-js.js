/**
 * Gulp Task: minifyJs
 * Description: Uglify our JavaScript
 * Dependencies: npm install
 * https://www.npmjs.com/package/gulp-uglify
 * https://babeljs.io/docs/en/usage
 * https://www.npmjs.com/package/gulp-babel
 * https://www.npmjs.com/package/@babel/core
 * https://www.npmjs.com/package/gulp-plumber
 *
 * npm install --save-dev gulp-uglify
 * npm install  gulp-babel @babel/core @babel/cli @babel/preset-env --save-dev
 * npm install --save-dev gulp-plumber
 */

const { src, dest, watch, series, parallel } = require("gulp");
const config = require("./_config");
const handleErrors = require("./handleErrors");

const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const notify = require("gulp-notify");

function minifyJs(cb) {
  src(`${config.js.dest}/*.js`)
    .pipe(plumber({ errorHandler: handleErrors }))
    .pipe(rename({ suffix: ".min" }))
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
    .pipe(
      uglify({
        mangle: false,
      })
    )
    .pipe(
      notify({
        message: "scripts are built.",
      })
    )
    .pipe(dest(config.js.dest));

  cb(); // callback function
}
module.exports = minifyJs;
