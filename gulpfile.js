// const { series, src, watch, dest, parallel } = require("gulp");
import gulp from "gulp";
import pkg from "gulp";
const { series, parallel, src, watch, dest } = pkg;
import scss from "gulp-dart-scss";
import htmlmin from "gulp-htmlmin";
import cleanCSS from "gulp-clean-css";
import minifyjs from "gulp-jsmin";
import clean from "gulp-clean";
import autoPrefixer from "autoprefixer";
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from "gulp-imagemin";
import fontmin from "gulp-fontmin";
import browsersync from "browser-sync";

const html = () => {
  return src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest("build/"))
    .pipe(browsersync.stream());
};

const styles = () => {
  return src("source/sass/style.scss")
    .pipe(scss([autoPrefixer()]))
    .pipe(cleanCSS())
    .pipe(dest("build/css/"))
    .pipe(browsersync.stream());
};

const scripts = (cb) => {
  return src("source/js/*.js")
    .pipe(minifyjs())
    .pipe(dest("build/js/"))
    .pipe(browsersync.stream());
};

const fonts = () => {
  return src("source/fonts/*.ttf").pipe(fontmin()).pipe(dest("build/fonts/"));
};

const cleanUp = () => {
  return src("build", { allowEmpty: true }).pipe(clean());
};

const img = () =>
  src("source/img/**/*")
    .pipe(
      imagemin([
        gifsicle({ interlaced: true }),
        mozjpeg({ quality: 70, progressive: true }),
        optipng({ optimizationLevel: 1 }),
        svgo({
          plugins: [
            {
              name: "removeViewBox",
              active: true,
            },
            {
              name: "cleanupIDs",
              active: false,
            },
          ],
        }),
      ])
    )
    .pipe(gulp.dest("build/img"))
    .pipe(browsersync.stream());

const server = (done) => {
  browsersync.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

const reload = () => {
  browsersync.reload();
};

const watcher = () => {
  watch("source/sass/**/*.scss", series(styles));
  watch("source/js/script.js", series(scripts));
  watch("source/*.html", series(html));
};

// const _default = series(
//   cleanUp,
//   parallel(html, styles, scripts)
//   // series(server, watcher)
// );

export const build = series(
  cleanUp,
  img,
  parallel(html, styles, scripts, fonts)
);

export const browser = series(
  cleanUp,
  img,
  parallel(html, styles, scripts, fonts),
  series(server, watcher)
);
