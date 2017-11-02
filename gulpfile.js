"use strict";
const gulp = require('gulp');
const less = require('gulp-less');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const path = require("path");

gulp.task('html', function () {
  return gulp.src([path.join('src', 'favicon.ico'), path.join('src', '*.html')])
    .pipe(gulp.dest('app'));
});
/**
 * 如果有必要可以可以扩展js 预编译
 */
gulp.task('js', function () {
  return gulp.src(path.join('src', '*.js'))
    .pipe(gulp.dest('app'))
    .pipe(reload({ stream: true }));
});

gulp.task('less', function () {
  return gulp.src(path.join('src', 'index.less'))
    .pipe(less())
    .pipe(gulp.dest('app'))
    .pipe(reload({ stream: true }));

});

// 监视 less 文件的改动，如果发生变更，运行 'less' 任务，并且重载文件
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