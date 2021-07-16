import express from 'express';
import 'express-async-errors';
import * as tweetRepository from '../data/tweet.js';


const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
// 원하는 username이 없으면 모든 tweet 보여주고 있으면 그 username의 tweet보여줌
router.get('/', (req, res, next) => {
	const username = req.query.username; // username이 없다면 undefined
	const data = username  // 사용자에게 전달해줘야하는 데이터(사용자가 요청한 데이터)
	? tweetRepository.getAllByUsername(username)
	: tweetRepository.getAll();
	res.status(200).json(data);
});

// GET /tweets/:id 
// 원하는 id값의 tweet을 찾아 보여줌
router.get('/:id', (req, res, next) => {
	const id = req.params.id; // id를 받아옴
	const tweet = tweetRepository.getById(id);
	if (tweet) {
		res.status(200).json(tweet);
	} else {
		res.status(404).json({msesage: `Tweet id(${id}) not found`});
	}
});

// POST /tweets
// 새로운 tweet을 추가
router.post('/', (req, res, next) => {
	const {text, username, name} = req.body; // body안에서 text, username, name을 받아옴
	const tweet = tweetRepository.create(text, username, name);
	res.status(201).json(tweet);
});

// PUT /tweets/:id
// id에 해당하는 tweet의 내용을 수정
router.put('/:id', (req, res, next) => {
	const id = req.params.id; // 해당하는 tweet을 찾아
	const text = req.body.text; // 내용만 업데이트함
	const tweet = tweetRepository.update(id, text);
	if (tweet) { // 해당 id가 있으면 text 변경
		res.status(200).json(tweet);
	} else {
		res.status(404).json({msesage: `Tweet id(${id}) not found`});
	}
});

// DELETE /tweets/:id
// id에 해당하는 tweet을 제거(실제로 tweet을 제거하지 않고 해당 tweet만 뺀 배열을 만듦)
router.delete('/:id', (req, res, next) => {
	const id = req.params.id;
	tweetRepository.remove(id);
	res.sendStatus(204); // 정상 삭제
});










/* router.get('/', (req, res) => {
	
});
router.get('/:id', (req, res) => {
	res.status(200).send('Get: /tweets/:id');
});
router.post('/', (req, res) => {
	const newTweet = {};

	console.log(req.body);
	newTweet.text = req.body.text;
	newTweet.username = req.body.username;
	newTweet.name = req.body.name;
	console.log(newTweet);
	res.status(201).send('Post tweet ' + JSON.stringify(newTweet));
});
router.put('/:id', (req, res) => {
	res.status(200).send('Put /tweets/:id');
});
router.delete('/:id', (req, res) => {
	res.status(204).send('Delete /tweets/:id');
}) */

export default router;