/**
 * Gulp task: cleanStyles
 * Description: Delete style.css and style.min.css.
 * Dependencies:
 * https://www.npmjs.com/package/del
 * npm install del --save-dev
 */

const { src, dest, watch, series, parallel } = require("gulp");

const config = require("./_config");
const del = require("del");

/**
 * Delete style.css and style.min.css before we minify and optimize
 * https://www.npmjs.com/package/del
 */
async function cleanStyles(cb) {
  await del([config.css.dest + "/*.css"]);

  cb();
}
