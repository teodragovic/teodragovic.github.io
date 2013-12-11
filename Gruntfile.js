module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dev: {
				options: {
					style: 'expanded',
					compass: true
				},
				src: 'sass/screen.scss',
				dest: 'source/stylesheets/screen.css',
			}
		},

		autoprefixer: {
			options: {
				browsers: ['last 2 version']
			},
			single_file: {
				src: 'source/stylesheets/screen.css',
				dest: 'source/stylesheets/screen-prefixed.css',
			}
		},

		compass: {
			dist: {
				options: {
					config: 'config.rb'
				}
			}
		},

		csso: {
			compress: {
				options: {
					restructure: false,
					report: 'gzip'
				},
				src: 'source/stylesheets/screen-prefixed.css',
				dest: 'source/stylesheets/screen.min.css',
			}
		},

		csslint: {
			options: {
				errors: false,
				formatters: [
					{id: 'text', dest: 'csslint.txt'}
				]
			},
			src: ['source/stylesheets/screen.min.css']
		},

		jshint: {
			files: ['source/javascripts/*.js'], // beforeconcat?
			options: {
				ignores: ['source/javascripts/libs/*.js'],
				reporter: 'checkstyle',
				reporterOutput: 'jslint.xml',
			}
		},

		concat: {
			dist: {
				src: ['source/javascripts/libs/*.js','source/javascripts/*.js'],
				dest: 'source/javascripts/build.js',
			}
		},

		uglify: {
			options: {
				report: 'gzip'
			},
			build: {
				src: 'source/javascripts/build.js',
				dest: 'source/javascripts/build.min.js'
			}
		},

		cachebreaker : {
			css: {
				asset_url : 'stylesheets/screen.min.css',
				file: 'source/_includes/head.html',
			},
			// js cache
		},

		connect: {
			server: {
				options: {
					port: 4000,
					//hostname: localhost,
					base: 'public/',
					//livereload: true
				}
			}
		},

		watch: {
			options: {
				livereload: false,
			},
			css: {
				files: ['sass/*.scss'],
				tasks: ['sass', 'autoprefixer', 'csso', 'cachebreaker:css'],
				options: {
					spawn: false,
				}
			},
			scripts: {
				files: ['source/javascripts/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false,
				}
			},
			jekyll: {
				files: ['source/**'],
				tasks: ['exec:build']
			}
		},

		exec: {
	    build: {
	      cmd: 'jekyll build public --watch'
	    },
	    serve: {
	      cmd: 'jekyll serve --watch'
	    }
	  }

		//clean: ["path/to/dir/one", "path/to/dir/two"]

		// devtools, copy, exec, clean

	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', ['sass', 'autoprefixer', 'csso', 'cachebreaker:css']);

	grunt.registerTask('css-alt', ['compass']); // errors?

	grunt.registerTask('js', ['concat', 'uglify']); // add cachebreaker

	grunt.registerTask('test-css', ['csslint']);

	grunt.registerTask('test-js', ['jshint']);

	grunt.registerTask('dev', ['connect', 'watch']);

};
