// 이 서버의 문제점: html만 제공하는 브라우저 클라이언트만 사용할 수 있는 서버, 
// 다른 클라이언트가 이용할 수 있도록 만들어야 함

const http = require('http');
// const http2 = reuqire('http2'); // https
const fs = require('fs');
const ejs = require('ejs');

const name = 'Ellie';
const courses = [
	{name: "HTML"}, 
	{name: "CSS"}, 
	{name: "JS"}, 
	{name: "Node"},
	{name: "EJS"},
]

// ejs를 사용하면 동적으로 html을 활용할 수 있지만 문법이 더러움
// react와 next.js를 통해 편리하게 동적으로 사용할 수 있음
const server = http.createServer((req, res) => {
	const url = req.url;
	res.setHeader('Content-Type', 'text/html');
	if (url === '/') {
		// ejs를 redferFile함수로 연결, 한 번만 수행하는 것은 end에 넣어 실행 가능
		ejs.renderFile('./template/index.ejs', {name})
		.then(data => res.end(data));
	} else if (url === '/courses') {
		ejs.renderFile('./template/courses.ejs', {courses})
		.then(data => res.end(data));
	} else {
		ejs.renderFile('./template/not-found.ejs', {name})
		.then(data => res.end(data));
	}
});

server.listen(8080);