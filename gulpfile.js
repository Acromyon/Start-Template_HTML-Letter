var gulp = require('gulp'),
	sass = require('gulp-sass'),
	inky = require('inky'),
	inlineCss = require('gulp-inline-css'),
	browserSync = require('browser-sync'),
	inlineSource = require('gulp-inline-source');

gulp.task('styles', function () {
	return gulp.src('./letter/sass/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./letter/css'));
});

gulp.task('build', ['styles'], function () {
	return gulp.src('./letter/**/*.html')
		.pipe(inlineSource())
		.pipe(inky())
		.pipe(inlineCss({
			preserveMediaQueries: true,
			removeLinkTags: false
		}))
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'dist'
		},
		notify: false
	});
});

/* Далее идут консольные таски! */

gulp.task('watch', ['browser-sync', 'build'], function () {
	gulp.watch(['./letter/sass/**/*.sass', './letter/**/*.html'], ['build']);
});
