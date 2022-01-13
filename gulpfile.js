const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')(require('sass'))

function server(done) {
  nodemon({
    script: '.', //this is where my express server is
    ext: 'js html css', //nodemon watches *.js, *.html and *.css files
    env: { 'NODE_ENV': 'development' }
  })

  done()
}

exports.server = server

function watcher(done) {
  browserSync.init({
    port: 8887, //this can be any port, it will show our app
    proxy: 'http://localhost:8888/', //this is the port where express server works
    ui: { port: 8886 }, //UI, can be any port
    reloadDelay: 1000 //Important, otherwise syncing will not work
  })

  gulp.watch(['./**/*.js', './**/*.html', './**/*.css']).on("change", browserSync.reload)

  done()
}

exports.watcher = watcher

function builder(done) {
    gulp.src('scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'))

    done()
}

exports.builder = builder

exports.default = gulp.series(builder, watcher, server)
