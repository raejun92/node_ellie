import express from 'express';
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js';
import { body } from 'express-validator';
import {validate} from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

const validateTweet = [
	body('text')
	.trim()
	.isLength({min: 3})
	.withMessage('text should be a least 3 characters'),
	validate,
];

// GET /tweets
// GET /tweets?username=:username
// 원하는 username이 없으면 모든 tweet 보여주고 있으면 그 username의 tweet보여줌
router.get('/', isAuth, tweetController.getTweets);

// GET /tweets/:id 
// 원하는 id값의 tweet을 찾아 보여줌
router.get('/:id', isAuth, tweetController.getTweet);

// POST /tweets
// 새로운 tweet을 추가
router.post('/', isAuth, validateTweet, tweetController.createTweet);

// PUT /tweets/:id
// id에 해당하는 tweet의 내용을 수정
router.put('/:id', isAuth, validateTweet, tweetController.updateTweet);

// DELETE /tweets/:id
// id에 해당하는 tweet을 제거(실제로 tweet을 제거하지 않고 해당 tweet만 뺀 배열을 만듦)
router.delete('/:id', isAuth, tweetController.deleteTweet);










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