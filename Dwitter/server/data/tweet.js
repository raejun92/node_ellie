import MongoDb from 'mongodb';
import { getTweets } from '../db/database.js';
import * as UserRepository from './auth.js';

const ObjectID = MongoDb.ObjectID;

export async function getAll() {
	return getTweets()
	.find()
	.sort({createdAt: -1}) // -1 = DESC, 1 = ASC,
	.toArray()
	.then(mapTweets); // _id(object) 를 id(string)로 변경
}

export async function getAllByUsername(username) {
	return getTweets()
	.find({username})
	.sort({createdAt: -1}) // -1 = DESC, 1 = ASC,
	.toArray()
	.then(mapTweets); // _id(object) 를 id(string)로 변경
}

export async function getById(id) {
	return getTweets()
	.find({_id: new ObjectID(id)})
	.next()
	.then(mapOptionalTweet);
}

export async function create(text, userId) {
	return UserRepository.findById(userId).then(user => 
		getTweets().insertOne({ // tweets의 db collection
			text,
			createdAt: new Date(),
			userId,
			name: user.name,
			username: user.username,
			url: user.url,
		})
	)
	.then(result => result.ops[0])
	.then(mapOptionalTweet);
}

export async function update(id, text) {
	return getTweets()
	.findOneAndUpdate(
		{_id: new ObjectID(id)}, // 해당하는 id를 찾아서
		{$set: {text}}, // text의 설정 바꿈
		// 위까지만 하면 바꾼 text가 아닌 기존 text리턴
		{returnOriginal: false} 
	)
	.then(result => result.value)
	.then(mapOptionalTweet);
}

export async function remove(id) {
	return getTweets().deleteOne({_id: new ObjectID(id)});
}

// tweets를 돌면서 tweet하나하나 _id를 id로 바꿔줌
function mapTweets(tweets) {
	return tweets.map(t => ({...t, id: t._id.toString()})) // 괄호가 있으면 소괄호로 묶어줘야함
}

function mapOptionalTweet(tweet) {
	return tweet ? {...tweet, id: tweet._id.toString()} : tweet;
  }