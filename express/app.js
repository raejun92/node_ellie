import express from 'express';
import fs from 'fs';
import fsAsync from 'fs/promises';
import 'express-async-errors';

// npm i express-async-errors를 설치하면 비동기에서 에러처리를 하지 않아 생기는 오류를 집아줌

const app = express();

app.use(express.json());

app.get('/file', (req, res) => {
	fs.readFile('/file1.txt', (err, data) => {
		if (err) {
			res.sendStatus(404);
		}
	})
});

app.get('/file1', (req, res) => {
	try {
		const data = fs.readFileSync('/file1.txt');
	res.send(data);
	} catch(error) {
		res.sendStatus(404);
	}
});

app.get('/file2', (req, res) => {
	fsAsync
	.readFile('./file2.txt')
	.then((data) => res.send(data))
	.catch((error) => res.sendStatus(404));
});

app.get('/file3', async (req, res) => {
	try {
		const data = await fsAsync.readFile('/file2.txt');
		res.send(data);
	} catch {
		res.sendStatus(404);
	}
});

app.use((error, req, res, next) => {
	console.error(error);
	res.status(500).json({message: 'Something went wrong'});
})

app.listen(8080);

/* app.use(express.json()); // json 사용
app.post('/', (req, res, next) => {
	console.log(req.body);
})

app.listen(8080); */





/* // app.get('/sky/:id', (req, res, next) => {
// 	// console.log('get');
// 	// console.log(req.path);
// 	console.log(req.headers);
// 	console.log(req.params);
// 	console.log(req.params.id);
// 	console.log(req.query);
// 	console.log(req.query.keyw);
	
// 	res.setHeader('key', 'value');
// 	res.status(201).send('created');
// })

app.get('/', (req, res, next) => {
	console.log('first');
	// next(new Error('error'));
	if (true) {
		return res.send('Hello'); // send는 한 번만 가능하기 떄문에 return으로 종료
	}
	res.send('Eliie');
})

// 찾는 것이 마지막 까지 없을 때 처리
app.use((req, res, next) => {
	res.status(404).send("Not available!");
})

// 에러처리
app.use((error, req, res, next) => {
	console.error(error);
	res.status(500).send('Sorry, try later!');
})

app.listen(8080); */

// IP: 우리 서버가 네트워크상에 어디에 있는지 알게 해줌
// Port: 그 서버에 어떤 어플리케이션에 접속하길 원하는지 알게 해줌

/* all vs use
app.all('/app', function)
all은 app에 대한 경로만 처리 됨

app.use('/use', function)
use는 use를 포함한 경로 모두 처리
/use/abc 하면 function 동작 

all도 use처럼 동작하려면
app.all('/app/*' function) 과 같이 선언
*/