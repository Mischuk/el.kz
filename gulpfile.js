var gulp         = require('gulp');
var connect      = require('gulp-connect');
var stylus       = require('gulp-stylus');
var jade         = require('gulp-jade');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var plumber      = require('gulp-plumber');
var rigger       = require('gulp-rigger');
var notify       = require('gulp-notify');
var jadeInheritance = require('gulp-jade-inheritance');
var changed      = require('gulp-changed');
var cached       = require('gulp-cached');
var gulpif       = require('gulp-if');
var filter       = require('gulp-filter');

// Local server
gulp.task('connect', function () {
  connect.server({
    root: ['build'],
    livereload: true
  });
});

//Jade
gulp.task('jade', function() {
  return gulp.src(['dev/templates/*.jade', 'dev/templates/includes/*.jade'])
    .pipe(changed('build', {extension: '.html'}))
    .pipe(gulpif(global.isWatching, cached('jade')))
    .pipe(jadeInheritance({basedir: 'dev'}))
    .pipe(filter(function (file) {
        return !/\/_/.test(file.path) && !/^_/.test(file.relative);
    }))
    .pipe(jade())
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload());
});

// Images
gulp.task('images', function () {
  return gulp.src('dev/images/**/*')
    .pipe(gulp.dest('build/images'))
    .pipe(connect.reload());
});

// Images
gulp.task('index', function () {
  return gulp.src('dev/index.html')
    .pipe(gulp.dest('build'))
    .pipe(connect.reload());
});

// Fonts
gulp.task('fonts', function () {
  return gulp.src('dev/fonts/**/*')
    .pipe(gulp.dest('build/fonts'))
});

//JS
gulp.task('js', function() {
  return gulp.src("dev/js/*.js")
    .pipe(gulp.dest("build/js"))
    .pipe(connect.reload());
});

// Stylus
gulp.task('stylus', function() {
  var onError = function(err) {
    notify.onError({
      title:    "Gulp",
      subtitle: "Failure!",
      message:  "Error: <%= error.message %>"
    })(err);
    this.emit('end');
  };
  return gulp.src("dev/stylus/styles.styl")
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sourcemaps.init())
    .pipe(stylus({compress: false}))
    .pipe(autoprefixer({
      browsers: [
        'last 2 versions',
        'firefox >= 4',
        'safari >= 5',
        'IE >= 8'
      ],
      cascade: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("build/css"))
    .pipe(connect.reload());
});

gulp.task('setWatch', function() {
  global.isWatching = true;
});

gulp.task('watch', function () {
  gulp.watch("dev/index.html", ['index']);
  gulp.watch("dev/stylus/**/*", ['stylus']);
  gulp.watch("dev/templates/*.jade", ['jade']);
  gulp.watch("dev/templates/includes/*.jade", ['jade']);
  gulp.watch("dev/images/**/*", ['images']);
  gulp.watch("dev/fonts/**/*", ['fonts']);
  gulp.watch("dev/js/*.js", ['js']);
});

// Watching project files
gulp.task('default', ['watch', 'setWatch', 'jade', 'stylus', 'fonts', 'js', 'images', 'connect', 'index']);