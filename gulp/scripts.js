'use strict';

// scripts.js
// Gulp tasks responsible for linting JS source code and transpile ES6 code with Babel.
// For production, code is minified using uglify plugin.
// Use: `gulp lint:js` and `gulp scripts` or `gulp scripts --prod`

const gulp = require( 'gulp' );
const gulpLoadPlugins = require( 'gulp-load-plugins' );
const yargs = require( 'yargs' );
const bs = require( 'browser-sync' );
const pkg = require( '../package.json' );
const config = require( '../config.js' );

const rollup = require( 'rollup-stream' );
const babel = require( 'rollup-plugin-babel' );
const resolve = require( 'rollup-plugin-node-resolve' );
const commonjs = require( 'rollup-plugin-commonjs' );
const replace = require( 'rollup-plugin-replace' );
const source = require( 'vinyl-source-stream' );
const buffer = require( 'vinyl-buffer' );

const browserSync = bs.get( pkg.name );
const $ = gulpLoadPlugins();
const arg = yargs.argv;

const prod = ( arg.prod ) ? true : false;
const env = prod ? 'production' : 'development';
const scriptsPath = `${config.baseDir}/${config.scriptsDir}`;

function onError( err )
{
    console.error( err );
    this.emit( 'end' );
}

// Lint JavaScript
gulp.task( 'lint:js', () =>
{
    return gulp.src( [ `${scriptsPath}/**/*.js`, '!node_modules/**' ] )
    .pipe( $.eslint() )
    .pipe( $.eslint.format() )
    .pipe( $.if( !browserSync.active, $.eslint.failAfterError() ) );
} );

// Compile bundle
gulp.task( 'scripts', () =>
{
    return rollup(
    {
        input : `${scriptsPath}/${config.scriptsFileName}.js`,
        plugins : [
            resolve( { browser : true } ),
            replace(
            {
                'process.env.NODE_ENV' : JSON.stringify( env )
            } ),
            commonjs(),
            babel( { exclude : 'node_modules/**' } ),
        ],
        sourcemap : true,
        format : 'iife'
    } )
    .on( 'error', onError )
    .pipe( source( `${config.scriptsFileName}.js` ) )
    .pipe( buffer() )
    .pipe( $.sourcemaps.init( { loadMaps : true } ) )
    .pipe( $.if( prod, $.uglify( { compress : { drop_console : true } } ) ) )
    .pipe( $.size(
    {
        title : pkg.name + ' JS:',
        showFiles : true,
        gzip : true
    } ) )
    .pipe( $.sourcemaps.write( './' ) )
    .pipe( gulp.dest( `${config.outputDir}/${config.outputScripts}` ) );
} );
