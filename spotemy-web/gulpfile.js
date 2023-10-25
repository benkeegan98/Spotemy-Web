const gulp = require('gulp');
const shell = require('gulp-shell');
const sass = require('gulp-sass')(require('sass'));

// Define a Gulp task to run the Next.js project
gulp.task('next-build', shell.task('npx next build'));

// You can create more tasks for other commands if needed

// Task to start the Next.js site
gulp.task('next-start', shell.task('npx next dev'));

// Default task (example)
gulp.task('start', gulp.series('next-start'));

// Task to build and then start the Next.js site
gulp.task('build-and-start', gulp.series('next-build', 'next-start'));


gulp.task('compile-scss', function () {
    return gulp
        .src('./styles/styles.scss') // Replace with the actual path to your styles.scss file
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css')); // Replace with the path where you want to save the compiled CSS
});

gulp.task('watch-scss', function () {
    gulp.watch('./styles/**/*.scss', gulp.series('compile-scss'));
});