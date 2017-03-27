var gulp       = require('gulp');
var browserify = require('browserify');
var babelify   =   require('babelify');
var source     = require('vinyl-source-stream');
var watch      = require('gulp-watch');

//browserify, allows to require modules in the browser
// babelify converts react or es6 to readable javascript code
// source converts babelify stream into a vinyl stream which gulp
// expects

gulp.task('watch', function(){
  gulp.watch(['./clientReact/*.js'], ['react'])
});


// .babelrc is where we set our presets at
gulp.task('react', function(){
  return browserify('./clientReact/main.js')
    .transform('babelify', {presets: ["react"]})
    .bundle()
    .pipe(source('build.js'))
    .pipe(gulp.dest('./scripts/build/'))
})


gulp.task('default', ['react', 'watch'])
