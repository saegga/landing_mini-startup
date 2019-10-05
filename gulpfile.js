'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var pipeline = require('readable-stream').pipeline;

var watch = require('gulp-watch');

//мининфикация изображений
gulp.task('imageMin', () =>
   gulp.src('./src/img/*')
        .pipe(imagemin([
        	imagemin.gifsicle({interlaced: true}),
        	imagemin.jpegtran({progressive: true}),
        	imagemin.optipng({optimizationLevel: 5}),
        	imagemin.svgo({
        	 	plugins: [
 	        	           {removeViewBox: true},
 	        	           {cleanupIDs: false}
 	        	       ]
        	 })
        ]))
        .pipe(gulp.dest('./dist/img'))
);

// 2 sass -> css
gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({
    	overrideBrowserslist:  ['last 14 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./dist/css/'));
});

// 3 minify css
gulp.task('minify-css', () => {
  return gulp.src('./dist/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/mincss/'));
});


// Uglify Task
gulp.task('compress', function(){
	return pipeline(
			gulp.src('./src/js/*.js'),
			uglify(),
			gulp.dest('./dist/js/')
		);
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './dist/',
      index: "index.html"
    },
    port: 8080,
    open: true,
    notify: false,
     // directory: true
  });
});

gulp.task('html', function() {
  gulp.src('./dist/**/*.html');
});  


// Watch Task
  gulp.task('watch', function() {
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./dist/css/**/*.css', gulp.series('minify-css'));
  	gulp.watch('./src/js/*.js', gulp.series('compress'));
  	gulp.watch('./dist/**/*.html').on('change', browserSync.reload);
  	gulp.watch('./dist/css/**/*.css').on('change', browserSync.reload);
  	gulp.watch('./dist/js/*.js').on('change', browserSync.reload);
  	// gulp.watch('./src/img/*', gulp.series('imageMin'));
  });

 gulp.task('start', gulp.parallel('browser-sync', 'watch') );

 // gulp start