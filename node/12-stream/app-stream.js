const fs = require('fs');

const readStream = fs.createReadStream('./file.txt', {
	highWaterMark: 8, // 기본 64kbytes
	// encoding: 'utf-8',
});

const data = [];

readStream.once('data', (chunk) => {
	// console.log(data);
	data.push(chunk);
	console.count('data');
}); 

readStream.on('end', () => {
	console.log(data.join(''));
});

readStream.on('error', (error) => {
	console.log(error);
});

/* chaining
const readStream = fs.createReadStream('./file.txt', {
	// highWaterMark: 8, // 기본 64kbytes
	// encoding: 'utf-8',
}).on('data', (chunk) => {
	// console.log(data);
	data.push(chunk);
	console.count('data');
}).on('end', () => {
	console.log(data.join(''));
}).on('error', (error) => {
	console.log(error);
});
 */