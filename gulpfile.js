const { series, src, dest, watch, parallel } = require("gulp");
const browser = require("browser-sync");
const clean = require("gulp-clean");
const htmlmin = require("gulp-htmlmin");
const plumber = require("gulp-plumber");
const sass = require("gulp-dart-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");

const html = () => {
  return src("source/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true, // удаляем все переносы
        removeComments: true, // удаляем все комментарии
      })
    )
    .pipe(dest("build"));
};

const cleanBuild = (cb) => {
  return src("build", { allowEmpty: true }).pipe(clean());
};

const optimizeImages = () => {
  return src("source/img/**/*").pipe(dest("build/img"));
};

const server = (done) => {
  browser.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

const reload = (done) => {
  browser.reload();
  done();
};

const styles = () => {
  return src("source/sass/style.scss", { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(rename("style.min.css"))
    .pipe(dest("build/css", { sourcemaps: "." }))
    .pipe(browser.stream());
};

const scripts = (cb) => {
  return src("source/js/script.js")
    .pipe(dest("build/js"))
    .pipe(browser.stream());
};

const watcher = () => {
  watch("source/sass/**/*.scss", series(styles));
  watch("source/js/script.js", series(scripts));
  watch("source/*.html", series(html, reload));
};

const copy = (done) => {
  return src(["source/fonts/*", "source/*.ico"]).pipe(dest("build"));
};

exports.build = series(
  cleanBuild,
  copy,
  optimizeImages,
  parallel(styles, html)
);

exports.default = series(
  cleanBuild,
  copy,
  parallel(styles, html, scripts, optimizeImages),
  series(server, watcher)
);
