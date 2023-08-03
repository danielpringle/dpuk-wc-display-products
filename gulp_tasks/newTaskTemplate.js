/**
 * Gulp Task:
 * Description:
 * Dependencies: npm install
 *
 *
 */

// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require("gulp");
// Import our config
const config = require("./config");

// Bring in our dependencies
const handleErrors = require("./handleErrors");

function functionName(cb) {
  cb();
}

module.exports = functionName;
