"use strict";
const gulp = require('gulp');
const less = require('gulp-less');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const path = require("path");

gulp.task('html', function () {
  return gulp.src([path.join('src', 'favicon.ico'), path.join('src', 'index.html')])
    .pipe(gulp.dest('app'));
});
gulp.task('js', function () {
  return gulp.src(path.join('src', 'index.js'))
    .pipe(gulp.dest('app'))
    .pipe(reload({ stream: true }));
});

gulp.task('less', function () {
  return gulp.src(path.join('src', 'index.less'))
    .pipe(less())
    .pipe(gulp.dest('app'))
    .pipe(reload({ stream: true }));

});

// 监视 Sass 文件的改动，如果发生变更，运行 'sass' 任务，并且重载文件
gulp.task('start', ['less', 'js','html'], function () {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch('src/*.less', ['less']);
  gulp.watch('src/*.js', ['js']);
  gulp.watch('src/*.html', ['html',reload]);
});