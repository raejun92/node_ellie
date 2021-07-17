import express from 'express';
import { body, param, validationResult } from 'express-validator';

const app = express();

app.use(express.json());

const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}
	return res.status(400).json({message: errors.array()[0].msg}); // 모든 에러 메세지가 아닌 첫번째 메세지만 보냄
}

app.post('/users', 
[
body('name').trim().isLength({min: 2}).withMessage('이름은 두 글자 이상'),
body('age').isInt().withMessage('숫자를 입력해'),
body('email').isEmail().withMessage('이메일 입력').normalizeEmail(),
body('job.name').notEmpty(), // job객체 안에 name에 접근
validate,
], (req, res, next) => { // handler는 배열형태로 등록 가능
	console.log(req.body);
	res.sendStatus(201);
});

app.get('/:email', 
[param('email').isEmail().withMessage('이메일 입력').normalizeEmail(), validate], 
(req, res, next) => {
	res.send('♡');
});

app.listen(8080);