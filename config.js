'use strict';

// config.js
// Contains all configurable variables for the projects.
// NOTE: if changing these values, check dotfiles (.babelrc etc.) and update manually.

module.exports = {

    baseDir : 'source',

    stylesDir : 'styles',

    scriptsDir : 'scripts',

    htmlDir : 'templates',

    outputDir : 'build',

    // Path to output styles inside outputDir.
    outputStyles : '',

    // Path to output scripts inside outputDir.
    outputScripts : '',

    scriptsFileName : 'main',

    // Browser support for Autoprefixer using Browserlist (http://browserl.ist/?q=last+2+versions)
    // Use same settings in .babelrc for transpiler
    autoprefixer : 'last 2 versions',

    localhostPort : 4000

};
