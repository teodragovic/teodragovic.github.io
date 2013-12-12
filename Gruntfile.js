module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dev: {
				options: {
					outputStyle: 'expanded',
					sourceComments: 'none',
					//compass: true
				},
				src: 'sass/screen.scss',
				dest: 'source/stylesheets/screen.build.css',
			}
		},

		autoprefixer: {
			options: {
				browsers: ['last 2 version']
			},
			single_file: {
				src: 'source/stylesheets/screen.build.css',
				dest: 'source/stylesheets/screen.css',
			}
		},

		csso: {
			dev: {
				options: {
					restructure: false,
					report: 'gzip'
				},
				files: {
					'public/stylesheets/screen.css': ['source/stylesheets/screen.css']
				}
			},
			dist: {
				options: {
					restructure: false,
					report: 'gzip'
				},
				files: {
					'source/stylesheets/screen.css': ['source/stylesheets/screen.css']
				}
			}
		},

		compass: {
			dist: {
				options: {
					config: 'config.rb'
				}
			}
		},

		csslint: {
			options: {
				errors: false,
				formatters: [
					{id: 'text', dest: 'csslint.txt'}
				]
			},
			src: ['source/stylesheets/screen.build.css']
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
				asset_url: 'stylesheets/screen.css',
				files: {
					src: ['public/**/*.html']
				}
			},
			// js cache
		},

		connect: {
			server: {
				options: {
					base: 'public',
					livereload: true,
					port: 4000,
				}
			}
		},

		watch: {
			css: {
				files: ['sass/**/*.scss'],
				tasks: ['sass', 'autoprefixer', 'csso:dev'],
				options: {
					spawn: true,
					livereload: false,
				}
			},
			livereload: {
    		files: ['public/stylesheets/*.css'],
    		options: {
    			spawn: false,
    			livereload: true,
    		}
  		},
			/*
			scripts: {
				files: ['source/javascripts/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false,
				}
			},
			*/
			jekyll: {
				files: ['source/**/*.html', 'source/_posts/*.markdown'],
				tasks: ['exec:build'],
				options: {
					spawn: false,
					livereload: true,
				}
			}
		},

		exec: {
			build: {
				cmd: 'jekyll public'
			}
		},
/*
		clean: ['source/stylesheets', 'public'],

		copy: {
			main: {
				files: [{
					expand: true, 
					src: ['source/stylesheets/*'], 
					dest: 'public/stylesheets/',
					flatten: true,
					filter: 'isFile',
				}]
			}
		}
*/
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', ['compass', 'exec:build', 'cachebreaker']); // add js

	grunt.registerTask('css', ['compass', 'exec:build', 'cachebreaker:css']);

	grunt.registerTask('js', ['concat', 'uglify']); // add cachebreaker:js

	grunt.registerTask('test-css', ['csslint']);

	grunt.registerTask('test-js', ['jshint']);

	grunt.registerTask('dev', ['exec:build', 'connect', 'watch']);

};
