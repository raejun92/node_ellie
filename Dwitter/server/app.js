import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';
import tweetsRouter from './route/tweets.js';
import authRouter from './route/auth.js';
import { config } from './config.js';
import {initSocket} from './connection/socket.js';
import { connectDB } from './db/database.js';

const app = express();

app.use(express.json());
app.use(cors()); // 배포할 때 신경쓰자
app.use(helmet());
app.use(morgan('tiny'));

app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

// 예외 처리
app.use((req, res, next) => {
	res.sendStatus(404); // not found
})

// 에러 처리
app.use((error, req, res) => {
	console.error(error);
	res.sendStatus(500); // error
})

connectDB().then(client => {
	// console.log(client);
	const server = app.listen(config.host.port);
	initSocket(server);
})
.catch(console.error);
