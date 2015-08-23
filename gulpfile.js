var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css'),
    concatCss = require('gulp-concat-css'),
    styleguide = require('gulp-styledocco');
    //git = require('git-semver-tags');

var vers = '1.0.0'; //version
var _address = {
  Address: '.', //'D:/projects/NETWWebsite2.0/01_Branch/Branch_Task20150820-CSS/TWNewEgg.ECWeb/TWNewEgg.ECWeb/Themes'
  sass: 'scss/{*/,**/}*.scss',
  css: 'css',
  cache: 'css/_csstmp',
  styleguide: 'styleguide/styles',
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
      .pipe(styleguide({
        out: 'styleguide',
        name: 'Newegg-CSS documents v'+ vers,
        include: [_address.cache+'/common.css',_address.cache+'/RWD.css'],
        'no-minify': false
      }));
});

//cssmin task
gulp.task('cssmin', function(){
  gulp.src(_address.cache+'/*.css')
      .pipe(minifyCss({compatibility: 'ie8'}))
      .pipe(rename({ suffix: "-" + vers }))
      .pipe(gulp.dest(_address.css));
});

//sass watch livetype
gulp.task('sass:watch', function () {
  gulp.watch(_address.sass, ['build']);
});

//concatcss
// gulp.task('concat-common-css', function(){
//     gulp.src(paths.cache+'/common.css')
//         .pipe(gulp.dest(paths.styleguide))
//         .pipe(minifyCss({compatibility: 'ie8'});
// });

//clean temp
gulp.task('clean', function(cb){
    del(['css'],cb);
});

//build task
gulp.task('build',['sass','cssmin']);

//watch task
gulp.task('watch', ['clean','sass:watch']);
