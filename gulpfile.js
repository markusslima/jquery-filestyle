var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('default', ['css', 'js']);

gulp.task('css', function() {
  return gulp.src('src/*.css')
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', function() {
  return gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'));
});
