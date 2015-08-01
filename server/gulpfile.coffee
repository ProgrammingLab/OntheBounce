gulp = require 'gulp'
coffee = require 'gulp-coffee'
babel = require 'gulp-babel'
watch = require 'gulp-watch'
mocha = require 'gulp-mocha'

gulp.task 'compile', ->
  gulp.src 'es6/**/*.es6'
    .pipe babel()
    .pipe gulp.dest 'js'

gulp.task 'watch', ->
  watch 'es6/**/*.es6', ->
    gulp.start 'compile'

gulp.task 'test', ->
  gulp.src 'test/**/*.es6'
    .pipe mocha()

gulp.task 'default', ['watch']
