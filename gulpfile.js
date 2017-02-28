var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var cleanCss = require('gulp-clean-css');
//var postcss = require('gulp-postcss');
//var precss = require("precss");
//var cssnano = require("cssnano");

var path = {
	scss: 'scss/**/*.scss',
	css: 'css/',
	cssDebug: 'css/debug',
	cssProd: 'css/prod'
};

var cleanCssOptions = {
	advanced: false,
	aggressiveMerging: false,
	restructuring: false,
	keepSpecialComments: 0
};
//cleanCssOptions.relativeTo = path.resolve(path.dirname(rawPath));

gulp.task('default', ['watch']);

gulp.task('scss', function () {
	gulp.src(path.scss)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write({includeContent: false}))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(cleanCss(cleanCssOptions))
		.pipe(rename({dirname: ''}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.css));
});

gulp.task('scss:d', function () {
	gulp.src(path.scss)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(rename({dirname: ''}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.cssDebug));
});

gulp.task('scss:p', function () {
	gulp.src(path.scss)
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(cleanCss(cleanCssOptions))
		.pipe(rename({dirname: ''}))
		.pipe(gulp.dest(path.cssProd));
});

gulp.task('watch', function(){
	gulp.watch(path.scss, ['scss:d']);
});