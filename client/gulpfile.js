const gulp = require('gulp');
const eslint = require('gulp-eslint');

// Note: To have the process exit with an error code (1) on
//  lint error, return the stream and pipe to failOnError last.
gulp.task('lint', function gulpLint() {
  return gulp.src(['assets/javascripts/**/*.jsx', 'scripts/**/*.jsx', '*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('default', ['lint'], function gulpDefault() {
  // This will only run if the lint task is successful...
});
