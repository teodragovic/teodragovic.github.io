'use strict';

// gulpfile.js
// Main Gulp file that uses tasks located in `gulp/` dir to spin up
// development server and watch for source changes and make production build.
// Use: `npm start` or `gulp watch` for development and `npm run build:{env}` for production build.

const path = require( 'path' );
const gulp = require( 'gulp' );
const del = require( 'del' );
const runSequence = require( 'run-sequence' );
const bs = require( 'browser-sync' );
const gulpLoadPlugins = require( 'gulp-load-plugins' );
const pkg = require( './package.json' );
const config = require( './config.js' );

const browserSync = bs.create( pkg.name );
const $ = gulpLoadPlugins();
const reload = browserSync.reload;

require( 'require-dir' )( './gulp' );

const htmlGlob = `${config.baseDir}/${config.htmlDir}/**/*.html`;
const stylesGlob = `${config.baseDir}/${config.stylesDir}/**/*.scss`;
const scriptsGlob = `${config.baseDir}/${config.scriptsDir}/**/*.js`;

// Dummy gulp task to fix bug when watching images
// before reload, default task is triggered.
gulp.task( 'dummy', ( cb ) => { return cb(); } );

// Serving section
// The following task serve assets to the browser on `localhost:{port}`
// and watches for changes in the source code.
gulp.task( 'watch', [ 'styles', 'scripts', 'html' ], () =>
{
    browserSync.init(
    {
        open : true,
        notify : false,
        // Customize the BrowserSync console logging prefix
        logPrefix : pkg.name,
        server :
        {
            baseDir : [ config.outputDir ],
            middleware : ( req, res, next ) =>
            {
                res.setHeader( 'Access-Control-Allow-Origin', '*' );
                next();
            },
        },
        port : config.localhostPort || 4000,
        https : true,
    } );

    gulp.watch( [ htmlGlob ], [ 'html', reload ] );
    gulp.watch( [ stylesGlob ], [ 'lint:css', 'styles' ] );
    gulp.watch( [ `${scriptsGlob}` ], [ 'lint:js', 'scripts', reload ] );
} );

// Build section
// The following tasks builds all assets for production, this includes:
// - clean dist/ directory from any leftovers and artifacts
// - lint JS and SCSS for code and style errors
// - generate HTML files from nunjucks template and provided data (passing `--prod` flag will also minify HTML)
// - compile CSS from Sass source and add vendor prefixes (passing `--prod` flag will also minify CSS)
// - compile and minify JS bundle from ES6 modules (passing `--prod` flag will also uglify JS)

// Clean output directory
gulp.task( 'clean', () => del( [ `${config.outputDir}/*` ], { dot : true } ) );

// Copy all files from root/ directory to output
gulp.task( 'copy:root', () =>
{
    return gulp.src( [ `${config.baseDir}/root/*` ] )
    .pipe( gulp.dest( config.outputDir ) );
} );

// Production build
gulp.task( 'default', [ 'clean' ], cb =>
{
    return runSequence(
    [ 'lint:css', 'lint:js', 'copy:root' ],
    [ 'styles', 'scripts' ],
    'html',
    cb );
} );
