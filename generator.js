var gm = require('gm').subClass({
		imageMagick: true
	}),
	options = {
		blockSize: 10,
		bitDepth: 16,
		color0: '#f00',
		color1: '#0f0'
	};

function drawBits(image, number) {
	var bits = number.toString(2),
		padding = '0000000000000000'.substring(0, 16 - bits.length),
		bit, i;

	bits = padding + bits;

	for (i = 0; i < bits.length; i++) {
		if (bits[i] == 1) {
			var x1 = i * 10,
				x2 = x1 + 10 - 1,
				y1 = 0,
				y2 = 10;

			image.draw('rectangle '+x1+','+y1+' '+x2+','+y2);
		}
	}
}

function generateImage(number) {
	var image =  gm(160, 10, options.color0); // width, height, color
	image.fill(options.color1);

	drawBits(image, number);

	output(image, number);
}

function output(image, number) {
	var number = number.toString(),
		padding = '0000'.substring(0, 5 - number.length),
		filename = 'output/' + padding + number + '.jpg';

	image.write(filename, function(error){
		console.log('Error', error);
	});
}

var number;
for (number = 0; number < 1024; number++) {
	generateImage(number);
}