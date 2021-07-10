const http = require('http');

const courses = [
	{name: "HTML"}, 
	{name: "CSS"}, 
	{name: "JS"}, 
	{name: "Node"},
	{name: "EJS"},
]

// 우리의 서버는 메모리에 데이터를 보관하고 있음
const server = http.createServer((req, res) => {
	const url = req.url; // 어떤 데이터를 원하는지? what?
	const method = req.method; // 어떤 것을 하고 싶은지? how?, action?
	if (url === '/courses') {
		if (method === 'GET') {
			res.writeHead(200, {'Content-Type': 'application/json'}); // 상태코드: 200, json파일을 사용하겠다
			res.end(JSON.stringify(courses)); // 배열객체를 문자열형태로 보내줌
			// JSON: 데이터를 저장하거나 전송할 때 사용하는 표현 방법
		} else if (method === 'POST') { // 클라이언트에서 데이터를 받아와서 새로운 courses만듦 
			const body = [];
			req.on('data', chunk => {
				console.log(chunk); // 받은 데이터 출력(Buffer형식)
				body.push(chunk);
			});
			
			req.on('end', () => {
				const bodyStr = body.concat().toString(); // Buffer형식인 body를 concat으로 묶은 다음 toString으로 문자열로 만듦
				const course = JSON.parse(bodyStr);
				courses.push(course);
				console.log(course);
				res.writeHead(201);
				res.end();
			})
		}
	}
});

server.listen(8080);