var gulp        = require('gulp');
var http        = require('http');
var st          = require('st');
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var livereload  = require('gulp-livereload');

gulp.task('build', function () {
    return browserify({entries: './src/js/app.js', debug: true})
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(livereload());
});

gulp.task('watch', ['build'], function () {
    livereload.listen();
    gulp.watch('./src/js/*.js', ['build']);
});

gulp.task('default', ['watch'], function (done) {
    http.createServer(
        st({ index: 'index.html', cache: false, path: __dirname})
    ).listen(8080, done);
});