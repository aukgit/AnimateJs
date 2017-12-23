var gulp = require("gulp");
//var less = require("gulp-less");
//var browserSync = require("browser-sync").create();
//var header = require("gulp-header");
//var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
//var pkg = require("./package.json");
var concat = require('gulp-concat');


gulp.task("minify-js",
  function() {

    var files = [
      "src/scripts/animateJs.js",
      "src/scripts/stringmanipulation/stringManipulation.js",
      "src/scripts/stringmanipulation/Attributes.js",
      "src/scripts/stringmanipulation/extractActions.js",
      "src/scripts/stringmanipulation/getParameterValue.js",
      "src/scripts/stringmanipulation/getFuncName.js",
      "src/scripts/stringmanipulation/initiateCurrentStyle.js",
      "src/scripts/stringmanipulation/processJoinCommand.js",
      "src/scripts/stringmanipulation/extractStyles.js",
      "src/scripts/stylemanipulation/styleManipulation.js",
      "src/scripts/stylemanipulation/applySingleStyle.js",
      "src/scripts/stylemanipulation/totalDuration.js",
      "src/scripts/stylemanipulation/trimSecond.js",
      "src/scripts/stylemanipulation/wrapper.js",
      "src/scripts/stylemanipulation/applySimultaneousStyle.js",
      "src/scripts/stylemanipulation/multipleAnimation.js",
      "src/scripts/stylemanipulation/processActionList.js",
      "src/scripts/init.js",
      "src/scripts/injector.js"
    ];

    return gulp.src(files)
      .pipe(concat("animate.js"))
      .pipe(uglify())
      .pipe(rename({
        suffix: ".min"
      }))
      .pipe(gulp.dest("dist/scripts"));
  });


// Run everything
gulp.task("default", ["minify-js"]);


// Dev task with browserSync
gulp.task("dev", ["minify-js"], function() {
  gulp.watch("source-js/*.js", ["minify-js"]);
  gulp.watch("source-js/**/*.js", ["minify-js"]);
});
