/*
 * resize-crop.js
 * https://github.com/traviswimer/resize-crop.js
 *
 * Copyright (c) 2014 Travis Wimer
 * Licensed under the MIT license.
 */

'use strict';

var magick = require('imagemagick');	// Manipulates image files
var imageSize = require('image-size');	// gets image dimensions
var fs = require('fs');	// file system
var deepExtend = require('deep-extend');	// Allows object properties to be overridden

module.exports = function( options, callback ) {

	// Default config
	var config = {
		format: "png",
		gravity: "center",
		src: false,
		dest: false,
		height: 0,
		width: 0
	};

	// Override defaults with supplied options
	deepExtend(config, options);


	var src = config.src;
	var dest = config.dest;

	// make sure specified image exists
	if( !fs.existsSync(src) ){
		callback( new Error('Image file "' + src + '" not found.') );
	}else{

		// Get original image dimensions
		var srcDimensions = imageSize( src );

		var newFilePath = dest;


		var resizeconfig = {
			srcPath: src,
			dstPath: dest,
			format: config.format,
			strip: true
		};

		// Make sure neither image dimension is reduced smaller than
		// the requirements
		var heightRatio = config.height / srcDimensions.height;
		var widthRatio = config.width / srcDimensions.width;

		if( heightRatio > widthRatio ){
			resizeconfig.height = config.height;
		}else{
			resizeconfig.width = config.width;
		}

		// for some reason height/width of 0 throws an error instead of
		// passing it as the `err` parameter
		try{
			magick.resize(resizeconfig, function(err, stdout, stderr){

				var cropconfig = {
					srcPath: dest,
					dstPath: dest,
					gravity: config.gravity,
					height: config.height,
					width: config.width
				};

				magick.crop(cropconfig, function(err, stdout, stderr){
					callback(err, dest);
				});

			});
		}catch(e){
			callback(e, null);
		}

	}



};
