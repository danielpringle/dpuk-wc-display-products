const notify = require("gulp-notify");
/**
 * Gulp Task: handleErrors
 * Description: Error handling
 * Dependencies: npm install
 * https://www.npmjs.com/package/gulp-notify
 * npm install --save-dev gulp-notify
 *
 */

function handleErrors(cb) {
  var args = Array.prototype.slice.call(arguments);

  notify
    .onError({
      title: "Task Failed [<%= error.message %>",
      message: "See console.",
      sound: "Sosumi", // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
    })
    .apply(this, args);

  gutil.beep(); // Beep 'sosumi' again

  // Prevent the 'watch' task from stopping
  this.emit("end");
  cb();
}
