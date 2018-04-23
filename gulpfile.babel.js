import gulp from 'gulp';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import autoprefixer from 'gulp-autoprefixer';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync'
import { rename } from 'fs';

gulp.task("webpack", () => {
    return webpackStream(webpackConfig,webpack)
    .pipe(plumber())
    .pipe(gulp.dest("./public/js/"));
});

gulp.task("autoprefix",() =>{
    return gulp.src(['./src/css/*.css'])
    .pipe(plumber())
    .pipe(autoprefixer({
        browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.4'],
        cascade: false
    }))
    .pipe(gulp.dest('./public/css'))
});

gulp.task('browser-sync', () =>{
    browserSync.init({
        server:{
            baseDir:"public",
            index: "index.html"
        }
    });
});

gulp.task('html-copy',() =>{
    return gulp.src(['./src/html/**/*.html'],{base: './src/html'})
    .pipe(gulp.dest('./public/'));
});

gulp.task('src-copy',() =>{
    return gulp.src(['./src/**/*'],{base: './src/'})
    .pipe(gulp.dest('./public/'));
});

gulp.task('bs-reload', () =>{
    browserSync.reload();
})

gulp.task('default',['browser-sync'],() => {
    gulp.watch('./src/**/*',['src-copy']);
    gulp.watch('./src/**/*.html',['html-copy']);
    gulp.watch('./src/js/**/*.js',['webpack']);
    gulp.watch('./src/css/*.css',['autoprefix']);
    gulp.watch('./public/**/*',['bs-reload']);
});