"use strict";
const gulp = require('gulp');
const less = require('gulp-less');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const path = require("path");
const pkg = require("./package.json");
// console.log(module)
const root = path.join('src',pkg.module);


gulp.task('html', function () {
  return gulp.src([path.join(root, 'favicon.ico'), path.join(root,'*.html')])
    .pipe(gulp.dest('app'));
});
/**
 * 如果有必要可以可以扩展js 预编译
 */
gulp.task('js', function () {
  return gulp.src(path.join(root, '*.js'))
    .pipe(gulp.dest('app'))
    .pipe(reload({ stream: true }));
});

gulp.task('less', function () {
  return gulp.src(path.join(root,'index.less'))
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

  gulp.watch(path.join(root,'*.less'), ['less']);
  gulp.watch(path.join(root,'*.js'), ['js']);
  gulp.watch(path.join(root,'*.html'), ['html',reload]);
});