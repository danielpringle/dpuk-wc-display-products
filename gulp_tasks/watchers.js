/**
 * Gulp Task: watcher
 * Description: Watch for changes and reload browser
 * Dependencies: npm install
 *
 *
 */

// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require("gulp");

const config = require("./_config");
const handleErrors = require("./handleErrors");
const compileSass = require("./compileSass");
const browserSync = require("browser-sync").create();

function watcher(cb) {
  watch("../*.html", browserSync.reload);

  watch("../includes/**/*.php", browserSync.reload);

  watch("../src/sass/**/*.scss").on(
    "change",
    series(compileSass, browserSync.reload)
  );

  watch("../src/js/**/*.js").on("change", series(browserSync.reload));

  cb();
}

module.exports = watcher;
