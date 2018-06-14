'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');
const useref = require('gulp-useref');
const minifyCss = require('gulp-minify-css');
const gulpif = require('gulp-if');


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
    .pipe(gulp.dest('./dist/'));
  return stream;
});

gulp.task('css-files', function () {
    var stream = gulp.src('./public/index.html')
    .pipe(useref()) //take a streem from index.html comment
      .pipe(gulpif('*.css', minifyCss())) // if .css file, minify
      .pipe(gulpif('*.css', gulp.dest('./dist'))); // copy to dist
    return stream;
});

gulp.task('default', ['sass', 'start', 'sass:watch']);
