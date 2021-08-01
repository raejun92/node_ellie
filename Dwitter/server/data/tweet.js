import Mongoose from 'mongoose';
import { useVirtualId } from '../db/database.js';
import * as UserRepository from './auth.js';

const tweetSchema = new Mongoose.Schema({
	text: {type: String, required: true},
	userId: {type: String, required: true},
	name: {type: String, required: true},
	username: {type: String, required: true},
	url: String,
}, {timestamps: true}); // timestamps를 설정하면 reactedAt과 updatedAt 생성

useVirtualId(tweetSchema);
const Tweet = Mongoose.model('Tweet', tweetSchema); // Tweet 컬렉션 tweetSchema 연결

export async function getAll() {
	// tweet에서 찾을 건데 다 찾을 건데 만들어진 날짜를 아래차순으로 정렬해줘서 찾아줘
	return Tweet.find().sort({createdAt: -1});
}

export async function getAllByUsername(username) {
	return Tweet.find({username}).sort({createdAt: -1});
}

export async function getById(id) {
	return Tweet.findById(id);
}

export async function create(text, userId) {
	return UserRepository.findById(userId) // 사용자의 정보를 받아옴
	.then(user => 
		new Tweet({
			text, 
			userId, 
			name: user.name, 
			username: user.username
		}).save()
	);
}

export async function update(id, text) {
	return Tweet.findByIdAndUpdate(id, {text}, {returnOriginal: false}); // returnOriginal 옵션을 해줘야 업데이트된 text가 리턴 됨
}

export async function remove(id) {
	return Tweet.findByIdAndDelete(id);
}