var gulp = require('gulp');
var wrapJS = require('gulp-wrap-js');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var del = require('del');
var wait = require('gulp-wait');
var connect = require('gulp-connect');

var paths = {
	app_scripts: ['app/scripts/**/*.js', '!app/bower_components/**/*.js'],
	vendor_scripts: [
        'app/bower_components/jquery/dist/jquery.min.js',
		'app/bower_components/bootstrap/dist/js/bootstrap.min.js',
		'app/bower_components/linq.min.js',
		'app/bower_components/angular/angular.min.js',
		'app/bower_components/angular-ui-router/release/angular-ui-router.min.js'
	],
	sass: ['app/styles/**/*.scss'],
	vendor_css: ['app/bower_components/bootstrap/dist/css/bootstrap.min.css']
};

gulp.task('clean-js', function() {
	return del(['public/js']);
});

gulp.task('clean-css', function() {
	return del(['public/css']);
});

gulp.task('jshint', function() {
	return gulp.src(paths.app_scripts)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'))
});

gulp.task('app-scripts-build', function() {
	// Minify and copy all JavaScript (except vendor scripts) 
	// with sourcemaps all the way down 
	return gulp.src(paths.app_scripts)
		.pipe(sourcemaps.init())
		.pipe(wrapJS('(function(){ \'use strict\'; %= body % })();'))
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/js'));
});

gulp.task('vendor-scripts-build', function() {
	return gulp.src(paths.vendor_scripts)
		.pipe(concat('vendor.min.js', {newLine: ';'}))
		.pipe(gulp.dest('public/js'));
});

gulp.task('sass-build', function() {
	return gulp.src('app/styles/main.scss')
		.pipe(wait(1000))
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(minifyCss({
			keepSpecialComments: 0
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/css'));
});

gulp.task('vendor-css-build', function() {
	return gulp.src(paths.vendor_css)
		.pipe(concat('vendor.min.css'))
		.pipe(minifyCss({
			keepSpecialComments: 0
		}))
		.pipe(gulp.dest('public/css'));
});

gulp.task('serve', function() {
	connect.server({
		name: 'Crud App',
		root: ['app', 'public'],
		port: 8001,
		livereload: true
	});
});

// Rerun the task when a file changes 
gulp.task('watch', function() {
	gulp.watch(paths.app_scripts, ['app-scripts-build']);
	gulp.watch(paths.vendor_scripts, ['vendor-scripts-build']);
	gulp.watch(paths.sass, ['sass-build']);
	gulp.watch(paths.vendor_css, ['vendor-css-build']);
});

// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['sass-build', 'app-scripts-build']);
gulp.task('dev', ['sass-build', 'app-scripts-build', 'serve']);
gulp.task('production', ['vendor-css-build', 'sass-build', 'vendor-scripts-build', 'app-scripts-build']);