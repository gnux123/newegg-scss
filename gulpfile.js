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
    replace = require('gulp-replace'),
    plumber = require('gulp-plumber');
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
            .pipe(plumber())
            .pipe(sass({
                    includePaths: [_address.include],
                    outputStyle: 'compressed',
                    precision: 10,
                    errLogToConsole: true
                }).on('error', sass.logError)
            )
            //.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(gulp.dest(_address.cache))
            .pipe(replace('img/', '/Themes/img/')) //replace imgPath to stable server
            .pipe(rename({ suffix: "-" + vers }))
            .pipe(plumber.stop())
            .pipe(gulp.dest(_address.css));

});

//copyfiles
gulp.task('copyfiles', function(){
    return gulp.src(['img/{*,*/*}', 'js/{*,*/*}'])
            .pipe(copy('styleguide/'));
});

//copy to develop env
gulp.task('copycss', function(){
    return gulp.src(['css/{*,*/*}'])
            .pipe(copy('D:/projects/NETWWebsite2.0/01_Branch/Branch_Task20151023/TWNewEgg.ECWeb/TWNewEgg.ECWeb/Themes/'));
});

gulp.task('styleguide', function(){
    return gulp.src(_address.sass)
            .pipe(plumber())
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
            }))
            .pipe(plumber.stop());
});


//clean temp
gulp.task('clean', function(cb){
    del(['.tmp', 'css', 'styleguide'], {force: true, read: false}, cb);
});

//sass watch livetype
gulp.task('watch', function () {
  gulp.watch([_address.sass, 'js/main.js'], ['copyfiles', 'styleguide', 'livereload']);
});

//for company sass-watch
gulp.task('sass-watch', function(){
    gulp.watch([_address.sass],['sass', 'copyfiles', 'copycss']);
});

//build task
gulp.task('build',['sass', 'copyfiles', 'copycss', 'styleguide']);

//watch task
gulp.task('server', ['clean', 'webserver', 'watch']);


//sass-watch task
gulp.task('vstudio', ['clean', 'sass-watch']);
