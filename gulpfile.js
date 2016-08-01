var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass');
 
gulp.task('connect', function() {
	connect.server({
		root: 'dist',
		livereload: true
	});
});

gulp.task('sass', function () {
	return gulp.src('./src/style.sass')
	    .pipe(sass().on('error', sass.logError))
	    .pipe(gulp.dest('./dist'));
});

gulp.task('html', function () {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('js', function () {
    return gulp.src('./src/**/*.js')
        .pipe(gulp.dest('./dist'));
});

gulp.task('reload', function () {
	connect.reload();
});
 
gulp.task('watch', ['html', 'js', 'sass'], function () {
	gulp.watch(['./src/**/*.html'], ['html','reload']);
	gulp.watch(['./src/**/*.sass'], ['sass', 'reload']);
	gulp.watch(['./src/**/*.js'], ['js', 'reload']);
});

gulp.task('default', ['connect', 'watch']);