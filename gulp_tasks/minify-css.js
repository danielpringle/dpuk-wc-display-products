/**
 * Gulp task: minifyCss
 * Description: Task for minifying our css.
 * Dependencies:
 * https://www.npmjs.com/package/gulp-clean-css
 * https://www.npmjs.com/package/gulp-plumber
 * https://www.npmjs.com/package/gulp-notify
 * https://www.npmjs.com/package/gulp-rename
 *
 * npm install gulp-clean-css --save-dev
 * npm install gulp-plumber --save-dev
 * npm install gulp-notify --save-dev
 * npm install gulp-rename --save-dev
 */

const { src, dest, watch, series, parallel } = require("gulp");

const config = require("./_config");
const handleErrors = require("./handleErrors");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const notify = require("gulp-notify");
const cleanCSS = require("gulp-clean-css");

function minifyCss(cb) {
  return (
    src(config.css.src)
      // Error handling
      .pipe(
        plumber({
          errorHandler: handleErrors,
        })
      )
      .pipe(
        cleanCSS({ debug: true }, (details) => {
          console.log(`${details.name}: ${details.stats.originalSize}`);
          console.log(`${details.name}: ${details.stats.minifiedSize}`);
        })
      )
      .pipe(rename(config.css.outputName + ".min.css"))
      .pipe(dest(config.css.dest))
      .pipe(
        notify({
          message: "Styles are built.",
        })
      )
      .on("finish", function () {
        console.log(config.css.src);
      })
  );

  cb();
}

module.exports = minifyCss;
