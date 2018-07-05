'use strict';

// gulpfile.js
// Main Gulp file that uses tasks located in `gulp/` dir to spin up
// development server and watch for source changes and make production build.
// Use: `npm start` or `gulp watch` for development and `npm run build:{env}` for production build.

// This gulpfile makes use of new JavaScript features.
// Node 4 handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

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
const testsGlob = `${config.baseDir}/${config.scriptsDir}/**/*.test.js`;

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
            // serve images from source dir during development
            routes :
            {
                '/images' : 'source/images/',
            },
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
    gulp.watch( [ `${scriptsGlob}`, `!${testsGlob}` ], [ 'lint:js', 'scripts', reload ] );
    gulp.watch( [ `${config.baseDir}/images/**/*` ], [ 'dummy', reload ] );
} );

// Build section
// The following tasks builds all assets for production, this includes:
// - clean dist/ directory from any leftovers and artifacts
// - lint JS and SCSS for code and style errors
// - run JS tests
// - generate HTML files from nunjucks template and provided data (passing `--prod` flag will also minify HTML)
// - compile CSS from Sass source and add vendor prefixes (passing `--prod` flag will also minify CSS)
// - compile and minify JS bundle from ES6 modules (passing `--prod` flag will also uglify JS)

// Clean output directory
gulp.task( 'clean', () => del( [ `${config.outputDir}/*` ], { dot : true } ) );

// Production build
gulp.task( 'default', [ 'clean' ], cb =>
{
    return runSequence(
    [ 'lint:css', 'lint:js', 'test:singleRun', 'html' ],
    [ 'styles', 'scripts' ],
    cb );
} );

// Serve production build
// Build for production and serve the output.
gulp.task( 'serve:build', [ 'default' ], () =>
{
    browserSync.init(
    {
        notify : false,
        logPrefix : pkg.name,
        // Note: "https: true" uses an unsigned certificate which on first access
        // will present a certificate warning in the browser.
        https : true,
        server : config.outputDir,
        port : config.localhostPort + 1,
    } );
} );
