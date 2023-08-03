/**
 * Gulp task: compileSass
 * Description: Compile Sass and run stylesheet through PostCSS.
 * Dependencies:
 * https://www.npmjs.com/package/gulp-sass
 * https://www.npmjs.com/package/gulp-plumber
 * https://www.npmjs.com/package/gulp-postcss
 * https://www.npmjs.com/package/autoprefixer
 * https://www.npmjs.com/package/gulp-sourcemaps
 *
 * npm install sass gulp-sass --save-dev
 * npm install --save-dev postcss gulp-postcss
 * npm install --save-dev gulp-autoprefixer
 * npm install gulp-sourcemaps --save-dev
 * npm install --save-dev gulp-plumber
 * npm i  gulp-rename --save-dev
 */

const { src, dest, watch, series, parallel } = require("gulp");

const config = require("./_config");
const handleErrors = require("./handleErrors");

const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");
const browserSync = require("browser-sync").create();
const rename = require("gulp-rename");

function compileSass(cb) {
  return (
    src(config.sass.src)
      // Deal with errors.
      .pipe(
        plumber({
          errorHandler: handleErrors,
        })
      )

      // Wrap tasks in a sourcemap
      .pipe(sourcemaps.init())
      // Compile Sass
      .pipe(
        sass({
          //includePaths: [].concat(bourbon, neat),
          errLogToConsole: true,
          outputStyle: "expanded", // Options: nested, expanded, compact, compressed
        })
      )
      // Parse with PostCSS plugins.
      .pipe(
        postcss([
          autoprefixer(), // browserslist key added to package.json
        ])
      )

      // create the sourcemap
      .pipe(sourcemaps.write())
      // name our file
      // .pipe(rename(config.css.outputName+'.css'))
      // Create style.css.
      .pipe(dest(config.css.dest))
      //SASS + CSS Injecting
      .pipe(browserSync.stream())
  );

  cb();
}

module.exports = compileSass;
