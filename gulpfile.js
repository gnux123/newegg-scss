var gulp = require('gulp')
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    del = require('del'),
    minifyCss = require('gulp-minify-css');
    //git = require('git-semver-tags');

var vers = '1.0.0'; //version

gulp.task('sass', ['clean'], function(){
    gulp.src('./scss/{*/,**/}*.scss')
        .pipe(sass({
              includePaths: ['./scss/includes/'],
              outputStyle: 'expanded'
          }).on('error', sass.logError)
        )
        //.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./.csscache'))
        .pipe(rename({ suffix: "-" + vers }))
        .pipe(gulp.dest('./css'));
});

//sass watch livetype
gulp.task('sass:watch', ['clean'], function () {
  gulp.watch('./scss/{*/,**/}*.scss', ['sass']);
});

//cssminify settings
gulp.task('cssmin', function(){
  gulp.src('./css/*.css')
      .pipe(minifyCss({compatibility: 'ie8'}))
      .pipe(gulp.dest('./css'));
});

//clean temp
gulp.task('clean', function(cb){
    del(['.csscache','css'], {read: false}, cb);
});


gulp.task('default', ['clean'], function(){
    gulp.start('sass:watch');
});

gulp.task('build', function() {
     gulp.start('cssmin');
});
