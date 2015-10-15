var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var Server = require('karma').Server;

var path = {
    files: ['./src/*.js', './test/*.js']
};

gulp.task('lint', function() {
  return gulp.src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function (done) {
  return new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('watch', function () {
    gulp.watch(path.files, ['default']);
});

gulp.task('default', ['lint', 'test']);
