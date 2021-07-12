import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan'; // 사용자에게 요청을 받았을 때 무슨 요청을 받았는지 얼마나 걸렸는지 알려줌
import helmet from 'helmet';

/* cors 정책
동일한 ip주소에서 동작한다면 리소스를 제약없이 공유 가능
다른 ip주소에서 동작한다면 원칙적으로 어떠한 데이터도 공유 불가능
가능하게 하려면 서버에서 클라이언트로 보낼 때 
헤더에 Access-Control-Allow-Origin을 추가 해서 보냄
*/

const app = express();

const corsOption = {
	origin: ['http://127.0.0.1:5500'],
	optionsSuccessStatus: 200,
	credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined'));
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
	console.log(req.body);
	console.log(req.cookies);
	res.send('Welcome!');
});

app.listen(8080);