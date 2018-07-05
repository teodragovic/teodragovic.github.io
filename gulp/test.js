'use strict';

// test.js
// Tasks related to testing JS scripts.
// Runs test either in watch mode or once (for production build).
// Use: `npm test` or `gulp test` and `gulp test:singleRun`

const path = require( 'path' );
const gulp = require( 'gulp' );
const KarmaServer = require( 'karma' ).Server;

const pathTo = path.join.bind( null, process.cwd() );

gulp.task( 'test', done =>
{
    new KarmaServer(
    {
        configFile : pathTo( '/karma.conf.js' )
    }, done ).start();
} );

gulp.task( 'test:singleRun', done =>
{
    new KarmaServer(
    {
        configFile : pathTo( '/karma.conf.js' ),
        singleRun : true,
        mochaReporter : { output : 'minimal' }
    }, exitCode =>
    {
        done();
        process.exit( exitCode );
    } ).start();
} );
