/*jslint browser:true */
/*global require */
(function () {
    'use strict';
    var gulp = require('gulp'),
        plumber = require('gulp-plumber'),
        jade = require('gulp-jade'),
        sass = require('gulp-sass'),
        cssmin = require('gulp-cssmin'),
        autoprefixer = require('gulp-autoprefixer'),
        babel = require('gulp-babel'),
        uglify = require('gulp-uglify'),
        rename = require('gulp-rename'),
        livereload = require('gulp-livereload');

    gulp.task('compile-jade',function() {
        return gulp
            .src('src/index.jade')
            .pipe(jade())
            .pipe(gulp.dest('dist'));
    });
    gulp.task('compile-sass', function() {
        return gulp
            .src('src/style/main.sass')
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
            .pipe(cssmin())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('dist/style'));
    });
    gulp.task('compile-es6', function() {
        return gulp
            .src('src/js/app.js')
            .pipe(plumber())
            .pipe(babel({ presets: ['es2015'] }))
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('dist/lib'));
    });
    gulp.task('default', function() {
        gulp.start(['compile-jade', 'compile-sass', 'compile-es6', 'watch']);
    });
    gulp.task('watch', function() {
        gulp.watch('src/*.jade', ['compile-jade']);
        gulp.watch('src/style/*.sass', ['compile-sass']);
        gulp.watch('src/js/*.js', ['compile-es6']);
        livereload.listen();
        gulp.watch(['src/**/*']).on('change', livereload.changed);
    });
}());
