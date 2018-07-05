'use strict';

// styles.js
// Gulp tasks responsible for linting CSS source and compiling CSS from Sass.
// It also adds vendor prefixes and minifes output for production.
// Use: `gulp styles` or `gulp styles --prod`

const path = require( 'path' );
const gulp = require( 'gulp' );
const gulpLoadPlugins = require( 'gulp-load-plugins' );
const yargs = require( 'yargs' );
const bs = require( 'browser-sync' );
const pkg = require( '../package.json' );
const config = require ( '../config' );

const browserSync = bs.get( pkg.name );
const arg = yargs.argv;
const $ = gulpLoadPlugins();
const pathTo = path.join.bind( null, process.cwd() );

const prod = ( arg.prod ) ? true : false;
const stylesGlob = `${config.baseDir}/${config.stylesDir}/**/*.scss`;
const vendorGlob = `${config.baseDir}/${config.stylesDir}/**/vendors/**/*.scss`;

// Compile and automatically prefix stylesheets
gulp.task( 'styles', () =>
{
    return gulp.src( [ stylesGlob ] )
    .pipe( $.sourcemaps.init() )
    .pipe( $.sass(
    {
        precision : 10,
        includePaths : [ pathTo( 'node_modules' ) ],
    } )
    .on( 'error', $.sass.logError ) )
    .pipe( $.autoprefixer( [ config.autoprefixer ] ) )
    // Dedupe and minify styles (this can take a while, run only for production)
    .pipe( $.if( prod, $.cssnano(
    {
        // Prevent overriding @keyframes names
        // when having multiple stylesheets
        reduceIdents : false
    } ) ) )
    .pipe( $.size(
    {
        title : pkg.name + ' CSS:',
        showFiles : true,
        gzip : true
    } ) )
    .pipe( $.sourcemaps.write( './' ) )
    .pipe( gulp.dest( `${config.outputDir}/${config.outputStyles}` ) )
    .pipe( $.if( browserSync.active, browserSync.stream( { match : '**/*.css' } ) ) );
} );

// Lint SCSS source
gulp.task( 'lint:css', () =>
{
    return gulp.src( [ stylesGlob, `!${vendorGlob}` ] )
    .pipe( $.stylelint(
    {
        failAfterError : !browserSync.active,
        reporters : [ { formatter : 'string', console : true } ]
    } ) );
} );
