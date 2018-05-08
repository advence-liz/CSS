"use strict";
const gulp = require('gulp');
const less = require('gulp-less');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const path = require("path");
const pkg = require("./package.json");
// console.log(module)
const dir = path.join('src',pkg.module);


gulp.task('html', function () {
  return gulp.src([path.join(dir, 'favicon.ico'), path.join(dir,'*.html')])
    .pipe(gulp.dest('app'));
});
/**
 * 如果有必要可以可以扩展js 预编译
 */
gulp.task('js', function () {
  return gulp.src(path.join(dir, '*.js'))
    .pipe(gulp.dest('app'))
    .pipe(reload({ stream: true }));
});

gulp.task('less', function () {
  return gulp.src(path.join(dir,'index.less'))
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

  gulp.watch(path.join(dir,'*.less'), ['less']);
  gulp.watch(path.join(dir,'*.js'), ['js']);
  gulp.watch(path.join(dir,'*.html'), ['html',reload]);
});