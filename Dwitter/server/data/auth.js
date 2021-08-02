import Mongoose from 'mongoose';
import {useVirtualId} from '../db/database.js';

const userSchema = new Mongoose.Schema({
	username: {type: String, required: true},
	name: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	url: String,
});

// _id -> id
useVirtualId(userSchema);
// 모델 생성
const User = Mongoose.model("User", userSchema); // User컬렉션을  userSchema 연결

export async function createUser(user) {
	return new User(user).save().then(data => data.id);
}

export async function findByUsername(username) {
	return User.findOne({username});
}

export async function findById(id) {
	return User.findById(id);
}