var gulp = require('gulp')
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    del = require('del'),
    minifyCss = require('gulp-minify-css'),
    concatCss = require('gulp-concat-css'),
    hologram = require('gulp-hologram');
    //git = require('git-semver-tags');

var vers = '1.0.0'; //version
var paths = {
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
        .pipe(rename({ suffix: "-" + vers }))
        .pipe(gulp.dest(paths.css));
});

//sass watch livetype
gulp.task('sass:watch', function () {
  gulp.watch(paths.sass, ['sass']);
});

//cssminify settings
gulp.task('cssmin', function(){
    gulp.src('./css/*.css')
      .pipe(minifyCss({compatibility: 'ie8'}))
      .pipe(gulp.dest('./css'));
});

//styleguide build
gulp.task('styleguide', function(){
    gulp.src('./.csscache/*.css')
        .pipe(concatCss('styleguide.css'))
        .pipe(gulp.dest(paths.styleguide))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(paths.styleguide));
});

//clean temp
gulp.task('clean', function(cb){
    del(['.csscache','css'], {read: false}, cb);
});


gulp.task('default', ['clean'], function(){
    gulp.start('sass:watch');
});

gulp.task('build', ['styleguide','cssmin']);
