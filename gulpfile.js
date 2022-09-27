const { dest } = require("vinyl-fs");

let gulp = require("gulp"),
  concat = require("gulp-concat"),
  autoprefix = require("gulp-autoprefixer"),
  notify = require("gulp-notify"),
  livereload = require("gulp-livereload"),
  plumber = require("gulp-plumber"),
  sass = require("gulp-sass")(require("sass")),
  pug = require("gulp-pug"),
  sourcemaps = require("gulp-sourcemaps"),
  uglify = require("gulp-uglify"),
  zip = require("gulp-zip");

// task for html
gulp.task("html", async function () {
  return gulp
    .src("./project/pug/index.pug")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(pug({ pretty: true }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/client"))
    .pipe(livereload());
});

// task for css
gulp.task("css", async function () {
  return gulp
    .src("./project/css/Bankist.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(autoprefix("last 2 version"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/client/css"));
});

// task for js
gulp.task("js", async function () {
  return gulp
    .src("./project/js/*.js")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat("Bankist.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/client/js"));
});

// task for compress
gulp.task("compress", async function () {
  return gulp
    .src("./dist/client/**/*.*")
    .pipe(zip("site.zip"))
    .pipe(gulp.dest("."))
    .pipe(notify("The project was compressed"));
});

// task for watch
gulp.task("watch", async function () {
  livereload.listen();
  gulp.watch("./project/pug/**/*.pug", gulp.series("html"));
  gulp.watch("./project/css/**/*.scss", gulp.series("css"));
  gulp.watch("./project/js/**/*.js", gulp.series("js"));
  gulp.watch("./dist/client/**/*.*", gulp.series("compress"));
});

// default function task
gulp.task("default", gulp.series("watch"));
