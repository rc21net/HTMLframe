var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var Spriter = require('scss-sprite');

var path = {
    scss: 'scss/**/*.scss',
    css: 'production',
    cssProd: 'production',
    jsWatch: 'js/**/*.js',
    js: [
        './js/init.js'
    ],
    jsDebug: 'production',
    jsProd: 'production',
};

var cleanCssOptions = {
    advanced: false,
    aggressiveMerging: false,
    restructuring: false,
    keepSpecialComments: 0
};

gulp.task('scss', async function () {
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

gulp.task('scss:p', async function () {
    gulp.src(path.scss)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(cleanCss(cleanCssOptions))
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(path.cssProd));
});

gulp.task('js', async function () {
    gulp.src(path.js)
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.jsDebug));
});

gulp.task('js:p', async function () {
    gulp.src(path.js)
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.jsProd));
});

gulp.task('sprite', async function () {
    var options = {
        outputDir: "production/images/",
        outputDirForCss: "/images/",
        inputPath: "sprites",
        sassPath: "scss/_sprite.scss",
        svgMode: "view",
        svgLayout: "diagonal"
    };

    var spriter = new Spriter(options);
    spriter.Run();
});

gulp.task('watch', function () {
    gulp.watch(path.scss, ['scss']);
    gulp.watch(path.jsWatch, ['js'])
});
gulp.task('default', gulp.series('watch'));

gulp.task('build', gulp.series('sprite', 'js', 'scss'));
