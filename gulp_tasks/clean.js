/**
 * Gulp Task: Clean
 * Description: Deletes files
 * Dependencies:
 * https://www.npmjs.com/package/gulp-clean-css
 *
 * npm install gulp-clean-css --save-dev
 *
 */

const { src, dest, watch, series, parallel } = require("gulp");

const config = require("./_config");
const clean = require("gulp-clean");

function cleans(cb) {
  return src(config.css.dest + "/*.css", { read: false }).pipe(clean());
  cb();
}

module.exports = cleans;
