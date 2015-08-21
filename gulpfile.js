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
var paths = {
  Address: '.', //'D:/projects/NETWWebsite2.0/01_Branch/Branch_Task20150820-CSS/TWNewEgg.ECWeb/TWNewEgg.ECWeb/Themes'
  sass: './scss/{*/,**/}*.scss',
  cache: './.csscache',
  css: './css',
  styleguide: './styleguide/styles',
  include: './scss/includes/'
}

gulp.task('sass', function(){
    gulp.src(paths.sass)
        .pipe(sass({
              includePaths: [paths.include],
              outputStyle: 'expanded'
          }).on('error', sass.logError)
        )
        //.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(paths.cache))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(paths.styleguide))
        .pipe(rename({ suffix: "-" + vers }))
        .pipe(gulp.dest(paths.css));
});

//sass watch livetype
gulp.task('sass:watch', function () {
  gulp.watch(paths.sass, ['sass','styleguide']);
});

//concatcss
// gulp.task('concat-common-css', function(){
//     gulp.src(paths.cache+'/common.css')
//         .pipe(gulp.dest(paths.styleguide))
//         .pipe(minifyCss({compatibility: 'ie8'});
// });

//styleguide build
gulp.task('styleguide', function(){
    gulp.src('./.csscache/*.css')
        .pipe(styleguide({
          out: 'styleguide',
          name: 'Newegg-CSS documents v'+ vers,
          include: ['styles/common.css'],
          'no-minify': true
        }));
});

//clean temp
gulp.task('clean', function(cb){
    del([paths.css], {force: true, read: false}, cb);
});

//build task
gulp.task('build', ['clean','sass','styleguide']);

//watch task
gulp.task('watch', ['clean','sass:watch']);
