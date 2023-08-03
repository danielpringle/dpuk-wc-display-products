/**
 * Gulp Task:
 * Description:
 * Dependencies: npm install
 *
 *
 */

const config = require("./_config");

const browserSync = require("browser-sync").create();

function browsersyncServerVH(cb) {
  browserSync.init({
    injectChanges: true,
    notify: false,
    open: false,
    server: {
      //proxy: '.env.VHOST',
      proxy: process.env.VHOST,
    },
  });
  cb();
}

module.exports = browsersyncServerVH;
