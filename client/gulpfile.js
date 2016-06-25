'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};

gulp.task('sass', function () {
	gulp.src('./sass/**/style.scss')
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(gulp.dest('./assets/css'))
		.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('webserver', function() {
	connect.server({
		port: 8181,
		livereload: true
	});
});

gulp.task('default', ['sass', 'webserver', 'watch']);
