var gulp = require('gulp'),
    del = require('del'),
    copy = require('gulp-copy'),
    sass = require('gulp-sass'),
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
  cache: 'css/_csstmp/',
  styleguide: 'styleguide/styles/',
  include: 'scss/includes/'
}

gulp.task('sass', function(){
  gulp.src(_address.sass)
      .pipe(sass({
            includePaths: [_address.include],
            outputStyle: 'expanded',
            precision: 10
        }).on('error', sass.logError)
      )
      //.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(gulp.dest(_address.cache))
      .pipe(gulp.dest(_address.styleguide))
      .pipe(styleguide({
        out: 'styleguide',
        name: 'Newegg-CSS documents v'+ vers,
        include: [_address.styleguide+'/common.css',_address.styleguide+'/RWD.css'],
        'no-minify': false
      }));

});

//copyfiles
gulp.task('copyfiles', function(){
    gulp.src('img/{*,*/*}')
        .pipe(copy('styleguide/'));
});

//cssmin task
gulp.task('cssmin', function(){
  gulp.src(_address.cache+'*.css')
      .pipe(replace('img/', '/Themes/img/')) //replace imgPath to stable server
      .pipe(minifyCss({compatibility: 'ie8'}))
      .pipe(rename({ suffix: "-" + vers }))
      .pipe(gulp.dest(_address.css));

});

//clean temp
gulp.task('clean', function(cb){
    del(['css','styleguide'],cb);
});

//sass watch livetype
gulp.task('sass:watch', function () {
  gulp.watch(_address.sass, ['sass','cssmin']);
});

//build task
gulp.task('build',['sass', 'copyfiles', 'cssmin']);

//watch task
gulp.task('server', ['clean', 'sass:watch']);
