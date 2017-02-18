const babelify = require('babelify')
const browserify = require('browserify')
const buffer = require('vinyl-buffer')
const gulp = require('gulp')
const sass = require('gulp-sass')
const source = require('vinyl-source-stream')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const vueify = require('vueify')

let b = browserify('src/index.js', { 
	cache: {},
	debug: true,
	packageCache: {}
})

let IGNORED = ['jquery', 'lodash', 'vue']
for (let lib of IGNORED)
	b.ignore(lib)

gulp.task('js', () => {
	return b
		.transform(vueify)
		.transform(babelify, {
			presets: ['latest']
		})
		.bundle()
		.on('error', function (e) { 
			console.log(e.message)
			this.emit('end')
		})
		.pipe(source('src/index.js'))
		.pipe(rename('paint.js'))
		.pipe(gulp.dest('static/'))
})

gulp.task('sass', () => {
	return gulp.src('styles/main.sass')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(rename('paint.css'))
		.pipe(gulp.dest('static/'))
})

gulp.task('watch', () => {
	gulp.watch('src/**/*', ['js'])
	gulp.watch('styles/**/*', ['sass'])
})

gulp.task('default', ['js', 'sass'])
