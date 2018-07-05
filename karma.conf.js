'use strict';

// karma.conf.js
// Configuration file for Karma test framework.

const path = require( 'path' );
const resolve = require( 'rollup-plugin-node-resolve' );
const commonjs = require( 'rollup-plugin-commonjs' );
const babel = require( 'rollup-plugin-babel' );
const replace = require( 'rollup-plugin-replace' );
const cfg = require ( './config' );

const pathTo = path.join.bind( null, process.cwd() );

module.exports = function( config )
{
    config.set(
    {

        // if base path is scoped to scripts so node_modules/ don't get included
        basePath : pathTo( cfg.baseDir, cfg.scriptsDir ),

        files : [ '**/*.test.js' ],

        frameworks : [ 'mocha', 'chai' ],

        browsers : [ 'HugoHeadlessChrome' ], // or open localhost:9876 in any browser installed

        customLaunchers :
        {
            HugoHeadlessChrome : {
                base : 'ChromeHeadless',
                flags : [ '--no-sandbox' ],
            }
        },

        reporters : [ 'mocha' ],

        mochaReporter : { output : 'autowatch' },

        preprocessors :
        {
            '**/*.test.js' : [ 'rollup' ]
        },

        rollupPreprocessor :
        {
            plugins : [
                resolve( { browser : true } ),
                replace(
                {
                    'process.env.NODE_ENV' : JSON.stringify( 'development' )
                } ),
                commonjs(),
                babel( { exclude : 'node_modules/**' } )
            ],
            format : 'iife',
            name : 'hpw',
            sourcemap : 'inline'
        },

    } );
};
