const gulp = require("gulp");

const $gp = require("gulp-load-plugins")();

const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const moduleImporter = require("sass-module-importer");
const del = require("del");

const SRC_DIR = "src";
const DIST_DIR = "public/";
const ROOT_PATH = `./public`;

gulp.task("styles", () => {
  return gulp
    .src(`${SRC_DIR}/styles/main.scss`)
    .pipe($gp.plumber())
    .pipe($gp.sassGlob())
    .pipe($gp.sourcemaps.init())
    .pipe(
      $gp.sass({
        outputStyle: "compressed",
        importer: moduleImporter()
      })
    )
    .pipe(
      $gp.autoprefixer({
        browsers: [
          "ie >= 9",
          "last 10 versions",
          "android 4",
          "opera 12",
          "Safari >= 8"
        ],
        cascade: false
      })
    )
    .pipe($gp.pxtorem())
    .pipe($gp.sourcemaps.write())
    .pipe($gp.rename({ suffix: ".min" }))
    .pipe(gulp.dest(`${DIST_DIR}/styles/`))
    .pipe(reload({ stream: true }));
});

gulp.task("scripts", function() {
  return gulp
    .src(`${SRC_DIR}/scripts/*.js`)
    .pipe($gp.sourcemaps.init())
    .pipe(
      $gp.babel({
        presets: ["@babel/env"]
      })
    )
    .pipe($gp.uglify())
    .pipe($gp.sourcemaps.write("."))
    .pipe(gulp.dest(`${DIST_DIR}/scripts/`))
    .pipe(reload({ stream: true }));
});

gulp.task("templates", () => {
  return gulp
    .src(`${SRC_DIR}/*.html`)
    .pipe(gulp.dest(`${DIST_DIR}`))
    .pipe(reload({ stream: true }));
});

gulp.task("fonts", () => {
  return gulp.src(`${SRC_DIR}/fonts/**`).pipe(gulp.dest(`${DIST_DIR}/fonts/`));
});

gulp.task("clean", () => {
  return del(ROOT_PATH);
});

gulp.task("watch", () => {
  gulp.watch(`${SRC_DIR}/styles/**/*.scss`, gulp.series("styles"));
  gulp.watch(`${SRC_DIR}/scripts/**/*.js`, gulp.series("scripts"));
  gulp.watch(`${SRC_DIR}/*.html`, gulp.series("templates"));
});

gulp.task("server", () => {
  browserSync.init({
    server: `${DIST_DIR}`
  });
  browserSync.watch(`${DIST_DIR}/**/*.*`, browserSync.reload);
});

// GULP:RUN
gulp.task(
  "default",
  gulp.series(
    "clean",
    gulp.parallel("styles", "scripts", "fonts", "templates"),
    gulp.parallel("watch", "server")
  )
);
