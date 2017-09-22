'use strict';

const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    browserSync = require("browser-sync").create(),
    reload = browserSync.reload;

var path = {
    build: {
    	html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
    },
    src: {
        js: 'src/js/*.js',
        scss: 'src/scss/*.scss',
        img: 'src/img/**/*.*', 
    },
    watch: {
    	html: 'build/*.html',
        js: 'src/js/**/*.js',
        style: 'src/scss/**/*.scss',
        img: 'src/img/**/*.*',
    },
};

gulp.task('html:build', function () {
    gulp.src(path.build.html)         
        .pipe(reload({stream: true})); 
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 5 versions", "ie >= 10"],
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});


gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({plugins: [{removeViewBox: true}]})
        ]))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('build', [
	'html:build',
    'js:build',
    'style:build',
    'image:build'
]);

gulp.task('watch', function() {
	gulp.watch(path.watch.html, ['html:build']);
    gulp.watch(path.watch.style, ['style:build']);
    gulp.watch(path.watch.js, ['js:build']);
    gulp.watch(path.watch.img, ['image:build']);
});

var config = { 
    server: {
        baseDir: "./build"
    },
};

gulp.task('webserver', function () {
    browserSync.init(config);
});


gulp.task('default', ['build', 'webserver', 'watch']);