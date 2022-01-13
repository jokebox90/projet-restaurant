const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')(require('sass'))

function serverTask(done) {
  nodemon({
    script: 'server.js', //this is where my express server is
    ext: 'js html css', //nodemon watches *.js, *.html and *.css files
    env: { 'NODE_ENV': 'development' }
  })

  done()
}

exports.serverTask = serverTask

function browserSyncTask(done) {
  browserSync.init({
    port: 8887, //this can be any port, it will show our app
    proxy: 'http://localhost:8888/', //this is the port where express server works
    ui: { port: 8886 }, //UI, can be any port
    reloadDelay: 1000 //Important, otherwise syncing will not work
  })
}

exports.browserSyncTask = browserSyncTask

function sassTask(done) {
  gulp.src('scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/css/'))

  done()
}

exports.sassTask = sassTask

function sassWatch() {
  gulp.watch('scss/**/*.scss', gulp.series(sassTask, browserSync.reload))
  gulp.watch(['scss/**/*.scss']).on("change", gulp.series(sassTask, browserSync.reload))
}

exports.sassWatch = sassWatch

exports.default = gulp.parallel(sassWatch, serverTask, browserSyncTask)
