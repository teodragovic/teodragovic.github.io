module.exports = function(grunt) {

	grunt.initConfig({

		sass: {
			dev: {
				options: {
					outputStyle: 'expanded', // buggy?
					sourceComments: 'none',
					//compass: true
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
				dest: 'source/stylesheets/screen.css',
			}
		},

		csso: {
			dist: {
				options: {
					restructure: false,
					report: 'gzip'
				},
				files: {
					'source/stylesheets/screen.css': ['source/stylesheets/screen.css']
				}
			},
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
			src: ['source/stylesheets/screen.css']
		},

		jshint: {
			files: ['source/javascripts/main.js'], // beforeconcat?
			options: {
				ignores: ['source/javascripts/libs/*.js'],
				reporter: 'checkstyle',
				reporterOutput: 'jslint.xml',
			}
		},

		concat: {
			options: {
				stripBanner: true,
			},
			dist: {
				src: ['scripts/*.js','!scripts/libs/*.js'],
				dest: 'source/javascripts/main.js',
			}
		},

		uglify: {
			options: {
				report: 'gzip',
				preserveComments: false,
			},
			build: {
				src: 'source/javascripts/main.js',
				dest: 'source/javascripts/main.js'
			}
		},

		cachebreaker : {
			css: {
				asset_url: 'stylesheets/screen.css',
				files: {
					src: ['public/**/*.html'],
				}
			},
			js: {
				asset_url: 'javascripts/main.js',
				files: {
					src: ['public/**/*.html'],
				}
			},
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
				tasks: ['sass', 'autoprefixer', 'csso', 'copy:css'],
				options: {
					spawn: true,
					livereload: false,
				}
			},
			scripts: {
				files: ['scripts/*.js'],
				tasks: ['concat', 'uglify', 'cachebreaker:js', 'copy:js'],
				options: {
					spawn: true,
					livereload: false,
				}
			},
			livereload: {
    		files: ['public/stylesheets/*.css', 'public/javascripts/**/*.js'],
    		options: {
    			spawn: false,
    			livereload: true,
    		}
  		},
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

		copy: {
			css: {
				files: [{
					expand: true, 
					src: ['source/stylesheets/*'], 
					dest: 'public/stylesheets/',
					flatten: true,
					filter: 'isFile',
				}]
			},
			js: {
				files: [{
					expand: true, 
					src: ['source/javascripts/*', 'scripts/config.js'], 
					dest: 'public/javascripts/',
					flatten: true,
					filter: 'isFile',
				}]
			}
		},

	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', ['compass', 'concat', 'uglify', 'exec:build', 'cachebreaker']);

	grunt.registerTask('css', ['compass', 'copy:css', 'cachebreaker:css']);

	grunt.registerTask('js', ['concat', 'uglify', 'cachebreaker:js', 'copy:js']);

	grunt.registerTask('test-css', ['csslint']);

	grunt.registerTask('test-js', ['jshint']);

	grunt.registerTask('dev', ['exec:build', 'connect', 'watch']);

};
