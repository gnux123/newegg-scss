var gulp = require('gulp'),
    del = require('del'),
    copy = require('gulp-copy'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    wait = require('gulp-wait'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css'),
    concatCss = require('gulp-concat-css'),
    styleguide = require('gulp-styledocco'),
    replace = require('gulp-replace');
    //git = require('git-semver-tags');

var vers = '1.0.0'; //version
var _address = {
  Address: '.', //'D:/projects/NETWWebsite2.0/01_Branch/Branch_Task20150820-CSS/TWNewEgg.ECWeb/TWNewEgg.ECWeb/Themes'
  sass: 'scss/{*/,**/}*.scss',
  css: 'css',
  cache: '.tmp/',
  styleguide: 'styleguide/styles/',
  include: 'scss/includes/'
}

gulp.task('webserver', function () {
    connect.server({
        root: '',
        livereload: true
    });
});

gulp.task('livereload', function(){
    gulp.src(['.tmp/*.css', './styleguide/*.html'])
            // .pipe(wait(800))
            .pipe(watch(['.tmp/*.css', './styleguide/*.html']))
            .pipe(connect.reload());
});

gulp.task('sass', function(){
    return gulp.src(_address.sass)
            .pipe(sass({
                    includePaths: [_address.include],
                    outputStyle: 'expanded',
                    precision: 10,
                    errLogToConsole: true
                }).on('error', sass.logError)
            )
            //.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(gulp.dest(_address.cache))
            .pipe(replace('img/', '/Themes/img/')) //replace imgPath to stable server
            .pipe(minifyCss({compatibility: 'ie8'}))
            .pipe(rename({ suffix: "-" + vers }))
            .pipe(gulp.dest(_address.css));

});

//copyfiles
gulp.task('copyfiles', function(){
    return gulp.src(['img/{*,*/*}', 'js/{*,*/*}'])
            .pipe(copy('styleguide/'));
});

gulp.task('styleguide', function(){
    return gulp.src(_address.sass)
            .pipe(sass({
                  includePaths: [_address.include],
                  outputStyle: 'expanded',
                  precision: 10,
                  errLogToConsole: true
              }).on('error', sass.logError)
            )
            .pipe(gulp.dest(_address.styleguide))
            .pipe(styleguide({
              out: 'styleguide',
              name: 'Newegg-CSS documents v'+ vers,
              include: [
                  _address.styleguide+'/RWD.css',
                  'styleguide/js/main.js'
              ],
              'no-minify': false
            }));
});


//clean temp
gulp.task('clean', function(cb){
    del(['.tmp', 'css', 'styleguide'], {force: true, read: false}, cb);
});

//sass watch livetype
gulp.task('watch', function () {
  gulp.watch([_address.sass, 'js/main.js'], ['copyfiles', 'styleguide', 'livereload']);
});

//build task
gulp.task('build',['sass', 'copyfiles', 'styleguide']);

//watch task
gulp.task('server', ['clean', 'webserver', 'watch']);
