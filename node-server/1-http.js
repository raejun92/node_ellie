const http = require('http');
// const http2 = reuqire('http2'); // https
const fs = require('fs');

// 리스너 콜백함수 (req, res) => { }등록
const server = http.createServer((req, res) => {
	console.log('incoming....');
	console.log(req.headers);
	console.log(req.httpVersion);
	console.log(req.method);
	const url = req.url;
	res.setHeader('Content-Type', 'text/html'); // text파일이 아니라 html파일이라는 것을 알려줌
	if (url === '/') {
		fs.createReadStream('./html/index.html').pipe(res);
	} else if (url === '/courses') {
		fs.createReadStream('./html/courses.html').pipe(res);
	} else {
		fs.createReadStream('./html/not-found.html').pipe(res);
	}
});

server.listen(8080);