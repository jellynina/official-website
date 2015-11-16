'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  sass   = require('gulp-sass'),
  maps   = require('gulp-sourcemaps'),
  del    = require('del');


gulp.task("concatScripts", function () {
  return gulp.src([
    'lib/jquery/dist/jquery.js',
    'lib/fullpage.js/jquery.fullPage.min.js',
    'js/main.js'])
  .pipe(maps.init())
  .pipe(concat("app.js")) // 把上面的js file 串近 app.js
  .pipe(maps.write('./'))
  .pipe(gulp.dest("dist/js")) //app.js 放到某個位置(js資料夾裡面)
});

// 任務有相依性
gulp.task("minifyScripts", ["concatScripts"], function (){
  return gulp.src("js/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest("js"));
});

gulp.task("compileSass", function (){
  return gulp.src("sass/style.scss")
  .pipe(maps.init())
  .pipe(sass())
  .pipe(maps.write('./')) //this path is going to be relative to our output directory ??
  .pipe(gulp.dest("dist/css"));
});

gulp.task('watch', function (){
  gulp.watch('scss/**/*.scss', ['compileSass']);
  gulp.watch('js/main.js', ['concatScripts']);
});

gulp.task('clean', function(){
  del(['dist','css/application.css*','js/app.*.js*' ]);
})

gulp.task("build", ['minifyScripts', 'compileSass'], function (){
  return gulp.src(["css/application.css", "js/app.min.js", 'index.html',
                   "img/**", "fonts/**"], { base: './'})
            .pipe(gulp.dest('dist'));
});

gulp.task('serve',['watch']);

gulp.task("default", ["clean"], function (){
  gulp.start('build');
});
