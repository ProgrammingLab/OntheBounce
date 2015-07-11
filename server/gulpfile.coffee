gulp = require 'gulp'
coffee = require 'gulp-coffee'
babel = require 'gulp-babel'
watch = require 'gulp-watch'

gulp.task 'compile', ->
  gulp.src '**/*.es6'
    .pipe babel()
    .pipe gulp.dest 'js'

gulp.task 'watch', ->
  watch '**/*.es6', ->
    gulp.start 'compile'

gulp.task 'default', ['watch']
