/*
 * resize-crop
 * https://github.com/traviswimer/resize-crop.js
 *
 * Copyright (c) 2014 Travis Wimer
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'src/**/*.js'
			],
			options: {
				jshintrc: '.jshintrc',
			},
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tests/tmp/*']
		},

		// For istanbul
		env: {
			coverage: {
				APP_DIR_FOR_CODE_COVERAGE: '../tests/coverage/instrument/src/'
			}
		},

		// Unit tests.
		mochaTest: {
			test: {
				options: {
					reporter: 'spec',
					timeout: 10000
				},
				src: ['tests/unit/*_test.js']
			}
		},


		not_constantinople: {
			coverage: {
				options: {
					unitTestTask: "mochaTest",
					directories: {
						root: 'tests',
						coverage: 'coverage',
						sourceFiles: 'src'
					},
					thresholds: {
						'statements': 100,
						'branches': 100,
						'lines': 100,
						'functions': 100
					}
				}
			}
		},

		coveralls: {
			options: {
				force: true
			},
			all: {
				src: 'tests/coverage/reports/lcov.info' 
			}
		},

		watch: {
			scripts: {
				files: [
					'tests/unit/*.js',
					'src/**/*.js'
				],
				tasks: ['test'],
			},
		},

	});


	// Load grunt tasks
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-not-constantinople');
	grunt.loadNpmTasks('grunt-coveralls');
	grunt.loadNpmTasks('grunt-contrib-watch');


	// Removes images created from past tests and runs tests
	grunt.registerTask('test', ['jshint', 'clean:tests', 'env:coverage', 'not_constantinople']);

	grunt.registerTask('default', ['watch']);



};
