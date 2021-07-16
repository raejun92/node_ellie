import * as tweetRepository from '../data/tweet.js';

export async function getTweets(req, res, next) {
	const username = req.query.username; // username이 없다면 undefined
	const data = await (username  // 사용자에게 전달해줘야하는 데이터(사용자가 요청한 데이터)
	? tweetRepository.getAllByUsername(username)
	: tweetRepository.getAll());
	res.status(200).json(data);
}

export async function getTweet(req, res, next) {
	const id = req.params.id; // id를 받아옴
	const tweet = await tweetRepository.getById(id);
	if (tweet) {
		res.status(200).json(tweet);
	} else {
		res.status(404).json({msesage: `Tweet id(${id}) not found`});
	}
}

export async function createTweet(req, res, next) {
	const {text, username, name} = req.body; // body안에서 text, username, name을 받아옴
	const tweet = await tweetRepository.create(text, username, name);
	res.status(201).json(tweet);
}

export async function updateTweet(req, res, next) {
	const id = req.params.id; // 해당하는 tweet을 찾아
	const text = req.body.text; // 내용만 업데이트함
	const tweet = await tweetRepository.update(id, text);
	if (tweet) { // 해당 id가 있으면 text 변경
		res.status(200).json(tweet);
	} else {
		res.status(404).json({msesage: `Tweet id(${id}) not found`});
	}
}

export async function deleteTweet(req, res, next) {
	const id = req.params.id;
	await tweetRepository.remove(id);
	res.sendStatus(204); // 정상 삭제
}