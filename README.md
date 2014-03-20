# resize-crop.js [![Build Status](https://travis-ci.org/traviswimer/resize-crop.js.png?branch=master)](https://travis-ci.org/traviswimer/resize-crop.js) [![Coverage Status](https://coveralls.io/repos/traviswimer/resize-crop.js/badge.png)](https://coveralls.io/r/traviswimer/resize-crop.js)

> Make images a specific size without distorting the aspect ratio. Resizes as close as possible and crops the rest.

## Installation

```shell
npm install resize-crop
```

## Example

```javascript
var resizeCrop = require('resize-crop');

resizeCrop(
	{
		format: 'jpg',
		src: 'tests/images/myImageToBeResized.png',
		dest: 'tests/tmp/resized_image.jpg',
		height: 250,
		width: 250,
		gravity: "center"
	}, 
	function( err, filePath ){
		// do something
	}
);
```

## Documentation


### options.src

* REQUIRED OPTION
* Type: `String`
* Description: Sets the path for the image you would like to convert.

### options.dest

* REQUIRED OPTION
* Type: `String`
* Description: Sets the path for the image you would like to create.

### options.height

* REQUIRED OPTION
* Type: `integer`
* Description: Sets the height in pixels to be used for the output image.

### options.width

* REQUIRED OPTION
* Type: `integer`
* Description: Sets the width in pixels to be used for the output image.

### options.format

* Type: `String`
* Default: `"png"`
* Description: Sets the image type to output. Supporst any image format supported by [imagemagick](https://github.com/rsms/node-imagemagick)

### options.gravity

* Type: `string`
* Description: Determines the part of the image that will be removed during cropping. For example, `"center"` will try to keep the centermost part of the image and only remove the furthest edges.