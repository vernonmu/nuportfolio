'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');

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

gulp.task('default', ['sass', 'sass:watch']);
