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


	describe('Errors', function(){

		it('should return error for non-existent src file', function(done){

			resizeCrop(
				{
					format: 'png',
					src: 'tests/images/FAKENAME.png',
					dest: 'tests/tmp/resized_3000x3000.png',
					height: 250,
					width: 250
				}, 
				function( err, filePath ){
					expect(err).to.deep.equal( new Error('Image file "tests/images/FAKENAME.png" not found.') );

					done();
				}
			);

		});
		
		it('should return error for invalid dimensions', function(done){

			resizeCrop(
				{
					format: 'png',
					src: 'tests/images/3000x3000.png',
					dest: 'tests/tmp/resized_negative.png',
					height: 0,
					width: 0
				}, 
				function( err, filePath ){
					expect(err).to.deep.equal( new Error('Error: both width and height can not be 0 (zero)') );

					done();
				}
			);

		});

	});


	describe('Output images', function(){

		it('should create correct image size for square images', function(done){

			resizeCrop(
				{
					format: 'png',
					src: 'tests/images/3000x3000.png',
					dest: 'tests/tmp/resized_3000x3000.png',
					height: 250,
					width: 250
				}, 
				function( err, filePath ){
					var dimensions = sizeOf('tests/tmp/resized_3000x3000.png');
					expect(dimensions.width).to.equal(250);
					expect(dimensions.height).to.equal(250);

					done();
				}
			);

		});

		it('should create correct image sizes for tall images', function(done){

			resizeCrop(
				{
					format: 'png',
					src: 'tests/images/1500x3000.png',
					dest: 'tests/tmp/resized_1500x3000.png',
					height: 250,
					width: 250
				}, 
				function( err, filePath ){
					var dimensions = sizeOf('tests/tmp/resized_1500x3000.png');
					expect(dimensions.width).to.equal(250);
					expect(dimensions.height).to.equal(250);

					done();
				}
			);

		});

		it('should create correct image sizes for wide images', function(done){

			resizeCrop(
				{
					format: 'png',
					src: 'tests/images/3000x1500.png',
					dest: 'tests/tmp/resized_3000x1500.png',
					height: 250,
					width: 250
				}, 
				function( err, filePath ){
					var dimensions = sizeOf('tests/tmp/resized_3000x1500.png');
					expect(dimensions.width).to.equal(250);
					expect(dimensions.height).to.equal(250);

					done();
				}
			);

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
