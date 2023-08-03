/**
 * Gulp Task:
 * Description:
 * Dependencies: npm install
 * https://www.npmjs.com/package/browser-sync
 *
 * npm install browser-sync gulp --save-dev
 */

const config = require("./_config");

const browserSync = require("browser-sync").create();

function server(cb) {
  browserSync.init({
    notify: false,
    open: false,
    server: {
      baseDir: config.project.root,
    },
  });
  cb();
}

module.exports = server;
