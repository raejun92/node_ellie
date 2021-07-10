const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('./file.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./file4.zip');
const piping = readStream.pipe(zlibStream).pipe(writeStream); // read한 것을 pipe로 zip으로 만들고 write함
piping.on('finish', () => {
	console.log('done!');
});

// 나중에 서버할 때 배움 가볍게 보셈
const http = require('http');
const server = http.createServer((req, res) => {
	const stream = fs.createReadStream('./file.txt');
	stream.pipe(res);
});
server.listen(3000);