'use strict';

// html.js
// Gulp tasks responsible for outputting file HTML from provided template and data files.
// Also provided task for minification of HTML and all inlined scripts and styles for production build.
// Use: `gulp html` and `gulp html:minify`

const path = require( 'path' );
const yargs = require( 'yargs' );
const gulp = require( 'gulp' );
const gulpLoadPlugins = require( 'gulp-load-plugins' );
const inlinesource = require( 'gulp-inline-source' );
const pkg = require( '../package.json' );
const config = require( '../config' );

const $ = gulpLoadPlugins();
const arg = yargs.argv;

const prod = ( arg.prod ) ? true : false;
const env = prod ? 'production' : 'development';

function onError( err )
{
    console.error( err );
    this.emit( 'end' );
}

gulp.task( 'nunjucks', () =>
{
    return gulp.src( `${config.baseDir}/${config.htmlDir}/*.html` )
    .pipe( $.nunjucks.compile( { env : env } ) )
    .on( 'error', onError )
    .pipe( gulp.dest( config.outputDir ) );
} );

gulp.task( 'html', [ 'nunjucks' ], () =>
{
    return gulp.src( `${config.outputDir}/**/*.html` )
    .pipe( $.if( prod, inlinesource(
    {
        rootpath : `${config.outputDir}/`,
        attribute : 'data-inline',
    } ) ) )
    .pipe( $.if( prod, $.htmlmin(
    {
        collapseWhitespace : true,
        conservativeCollapse : true,
        keepClosingSlash : true,
        minifyJS : true
    } ) ) )
    .pipe( $.size(
    {
        title : pkg.name + ' HTML:',
        showFiles : true,
        gzip : true
    } ) )
    .pipe( gulp.dest( config.outputDir ) );
} );
