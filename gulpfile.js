const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-dart-sass');
const extend = require('extend');
const merge = require('merge-stream');
const util = require('gulp-util');
const clean = require('gulp-clean');
const autoprefixer = require('gulp-autoprefixer');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const webpack = require('webpack-stream');

const config = {
    mode: util.env.production ? 'production' : 'development',
    sourceMaps: !util.env.production
}

const paths = {
    js: [
        'dev/js/*.ts',
        'dev/js/*.js',
        'dev/js/**/*.js',
        'dev/js/**/*.ts',
    ],
    css: [
        './dev/scss/*.scss',
        './dev/scss/**/*.scss'
    ],
    reload: [
        'dist/*.js',
        'dist/*.css',
        '*.php',
        '**/*.php',
        '*.twig',
        '**/*.twig',
        '*.html',
        '*.php'
    ]
}

gulp.task('sass', function () {
    return gulp.src('dev/scss/main.scss', {
            base: __dirname
        })
        .pipe(gulpif(config.sourceMaps, sourcemaps.init()))
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: ['node_modules']
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename({
            dirname: '',
            basename: 'main'
        }))
        .pipe(gulpif(config.sourceMaps, sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: __dirname
        })))
        .pipe(gulp.dest('dist'));
});

gulp.task('webpack', function(done) {
    const webpackConfig = extend({}, require('./webpack.config.js'), {
        mode: config.mode
    });
    return gulp.src('./dev/js/main.js')
        .pipe(webpack(webpackConfig))
        .on('error', error => {
            console.error(error);
            done();
         })
         .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    const js = gulp.src('dist', {
            read: false,
            allowEmpty: true
        })
        .pipe(clean());

    const css = gulp.src('dist', {
            read: false,
            allowEmpty: true
        })
        .pipe(clean());
    return merge(js,css);
});

gulp.task('watch', gulp.series('sass', 'webpack', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        notify: true,
        open: false
    });

    gulp.watch(paths.css, gulp.series('sass'));
    gulp.watch(paths.js, gulp.series('webpack'));
    gulp.watch(paths.reload).on('change', browserSync.reload);
}));

gulp.task('build', gulp.series('clean', 'sass', 'webpack'));