'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');
const useref = require('gulp-useref');
const minifyCss = require('gulp-minify-css');
const gulpif = require('gulp-if');
const wiredep = require('wiredep').stream;
const uglify = require('gulp-uglify');
const ngAnnotate = require('gulp-ng-annotate');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');

gulp.task('sass', () => {
  console.log('let us gulp!');
  return gulp.src('./public/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
  console.log('done gulping.');
});

gulp.task('sass:watch', () => {
  gulp.watch('./public/sass/*.scss', ['sass']);
});

gulp.task('start', () => {
  nodemon({
    script: 'index.js',
    ext: 'js html'
  })
})

gulp.task('copy-html-files', function() {
  var stream = gulp.src('./public/*.html')
    .pipe(gulp.dest('./dist'));
  return stream;
});

gulp.task('copy-images', () => {
  return gulp.src('./public/images/*.{gif,jpg,png,svg}')
    .pipe(gulp.dest('./dist/images'));
})

gulp.task('css-files', function () {
    var stream = gulp.src('./public/index.html')
    .pipe(useref())
      .pipe(gulpif('*.css', minifyCss()))
      .pipe(gulpif('*.css', gulp.dest('./dist')));
    return stream;
});

gulp.task('bower-files', function() {
  var stream = gulp.src('./public/index.html')
    .pipe(wiredep({
      directory: 'bower_components'
    }))
    .pipe(useref())
    .pipe(gulpif('*.js', ngAnnotate()))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.js', gulp.dest('./dist')));
  return stream;
})

gulp.task('js-dev', () => {
  return gulp.src('./public/**/*js')
    .pipe(concat('whills.js'))
    .pipe(gulp.dest('./public'))
    console.log('done js-ing for development');
})

gulp.task('js-dev:watch', () => {
  gulp.watch('./public/*.js', ['js-dev']);
})

gulp.task('js-files', () => {
  return gulp.src('./public/**/*js')
    .pipe(concat('whills.js'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('default', ['sass', 'js-dev', 'start', 'sass:watch']);


gulp.task ('build', function(callback){
  runSequence(
    'css-files',
    // 'bower-files',
    'js-files',
    'copy-html-files',
    callback
  );
});

gulp.task('clean', function() {
  var stream = gulp.src('./dist', {read: false})
    .pipe(clean());
  return stream
})
