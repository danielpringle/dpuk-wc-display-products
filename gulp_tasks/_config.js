/**
 * Gulp tasks config:
 *
 */
const config = {
  project: {
    root: "./",
    src: "./src",
    dist: "./",
  },
  css: {
    src: "./assets/css/*.css",
    dest: "./assets/css",
    outputName: "wc-display-products",
  },
  sass: {
    root: "./assets/sass",
    src: "./assets/sass/*.scss",
    dest: "./assets/css",
  },
  js: {
    src: "./src/js/*.js",
    dest: "./dist/js",
    outputName: "wc-display-products",
  },
  images: {
    src: "./src/images",
    dest: "./images",
  },
};
module.exports = config;
