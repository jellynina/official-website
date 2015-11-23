'use strict';

var gulp  = require('gulp'),
  concat  = require('gulp-concat'),
  uglify  = require('gulp-uglify'),
  rename  = require('gulp-rename'),
  sass    = require('gulp-sass'),
  compass = require('gulp-compass'),
  maps    = require('gulp-sourcemaps'),
  connect = require('gulp-connect'),
  nunjucksRender = require('gulp-nunjucks-render'),
  del     = require('del');


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
    .pipe(gulp.dest("js"))
    .pipe(connect.reload());
});

gulp.task("compileSass", function (){
  return gulp.src("sass/style.scss")
  .pipe(maps.init())
  // .pipe(sass())
  .pipe(compass({
    sass: 'sass',
    image: 'img',
    import_path: ['lib']
  }))
  .pipe(maps.write('./')) //this path is going to be relative to our output directory ??
  .pipe(gulp.dest("dist/css"))
  .pipe(connect.reload());
});

gulp.task('nunjucks', function() {
  // nunjucks stuff here
  nunjucksRender.nunjucks.configure(['./templates/']);

  // Gets .html and .nunjucks files in pages
  return gulp.src('./pages/**/*.+(html|nunjucks)')
  // Renders template with nunjucks
  .pipe(nunjucksRender())
  // output files in app folder
  .pipe(gulp.dest('./'))
});

gulp.task('watch', function (){
  gulp.watch('sass/**/*.scss', ['compileSass']);
  gulp.watch('js/main.js', ['concatScripts']);
  gulp.watch('./index.html', ['build']);
});

gulp.task('serve', ['watch'], function (){
  connect.server({
    root: 'dist',
    port: 8080,
    livereload: true
  });
});

// gulp.task('clean', function(){
//   del(['dist' ]);
// })

gulp.task("build", ['concatScripts', 'compileSass'], function (){
  return gulp.src(['index.html',
                   "img/**", "fonts/**"], { base: './'})
            .pipe(gulp.dest('dist'));
});

gulp.task('serve',['watch']);

gulp.task("default", ["clean"], function (){
  gulp.start('build');
});
