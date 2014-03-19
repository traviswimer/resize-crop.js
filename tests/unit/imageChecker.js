'use strict';

var chai = require('chai');
var expect = chai.expect;

// Module for finding the dimensions of an image
var sizeOf = require('image-size');

var requireHelper = require('../require_helper');

// The resize-crop module
var resizeCrop = requireHelper('resize-crop');


//Begin tests
///////////////////////////////////////////////////////

describe('resizeCrop', function(){

	it('should exist', function(){
		expect(resizeCrop).to.exist;
	});


	describe('create() method', function(){
		var mi = resizeCrop();

		it('should create correct image sizes for square images', function(done){

			mi.create("tests/images/3000x3000.png", "tests/tmp/", function(){
				var dimensions = sizeOf('tests/tmp/twitter_3000x3000.jpg');
				expect(dimensions.width).to.equal(250);
				expect(dimensions.height).to.equal(250);

				done();
			});
		});

		it('should create correct image sizes for tall images', function(done){

			mi.create("tests/images/1500x3000.png", "tests/tmp/", function(){
				var dimensions = sizeOf('tests/tmp/twitter_1500x3000.jpg');
				expect(dimensions.width).to.equal(250);
				expect(dimensions.height).to.equal(250);

				done();
			});
		});

		/*describe('callback', function(){

			it('should return new file path on success', function(done){

				mi.create("tests/images/1500x3000.png", "tests/tmp/", function(err, filePath){
					expect(typeof filePath).to.equal( "object" );

					done();
				});
			});

			it('should return error for non-existent file', function(done){

				mi.create("tests/images/fakeName.png", "tests/tmp/", function(err, filePath){
					expect(err).to.deep.equal( new Error('Image file "tests/images/fakeName.png" not found.') );

					done();
				});
			});


		});*/


	});

});
