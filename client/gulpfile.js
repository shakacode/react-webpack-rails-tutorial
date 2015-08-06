const gulp = require('gulp');
const eslint = require('eslint/lib/cli');

// Note: To have the process exit with an error code (1) on
//  lint error, return the stream and pipe to failOnError last.
gulp.task('lint', function gulpLint(done) {
  eslint.execute('--ext .js,.jsx .');
  return done();
});

gulp.task('default', ['lint'], function gulpDefault() {
  // This will only run if the lint task is successful...
});
