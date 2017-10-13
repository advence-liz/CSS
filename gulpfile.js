"use strict";
const gulp = require('gulp');
const less = require('gulp-less');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const path = require("path");

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
gulp.task('start', ['less', 'js'], function () {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch('src/*.less', ['less']);
  gulp.watch('src/*.js', ['js']);
  gulp.watch('app/*.html',reload);
});