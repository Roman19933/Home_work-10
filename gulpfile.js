const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');//зєднує файли js...
const uglify = require('gulp-uglify'); //мініфіцирує файли
const babel = require('gulp-babel');
const mincss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const imgmin = require('gulp-imagemin');
const imgminPng = require('imagemin-pngquant');
const cache = require('gulp-cache');
const htmlmin = require('gulp-htmlmin');

gulp.task('worked', () => {
    return console.log('Goood Jobs');
})

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir:'src'
        },
        notify:false
    })
})

gulp.task('compiler', function () {
    gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
        stream:true
    }))
})

gulp.task('imagemin', function () {
    gulp.src('src/img/*')
    .pipe(cache(imgmin([
        imgminPng({quality:'65-80', speed:5})
    ])))
    .pipe(gulp.dest('dist/img'))
})

gulp.task('html', function () {
    gulp.src('src/*html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
})

gulp.task('cleancss', function () {
    gulp.src('src/css/*.css')
    .pipe(autoprefixer({
        browsers:['last 2 version'],
        cascade:false
    }))
    .pipe(mincss())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
        stream:true
    }))
})

gulp.task('scripts', function () {
    gulp.src('src/js/assets/*.js')
    .pipe(concat('main.min.js'))
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({
        stream:true
    }))
})

gulp.task('build',['imagemin','cleancss','scripts','html'] )

gulp.task('watch',['browserSync','compiler'], function () {
    gulp.watch('src/scss/**/*.scss', ['compiler']);
    gulp.watch('src/*.html',browserSync.reload);
    gulp.watch('src/js/*.js',browserSync.reload);
})