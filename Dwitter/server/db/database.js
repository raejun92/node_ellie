import Mongoose  from 'mongoose';
import {config} from '../config.js'


export function connectDB() {
	console.log('linit');
	return Mongoose.connect(config.db.host, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	});
}

// _id -> id
export function useVirtualId(schema) {
// 가상의 id를 추가
schema.virtual('id').get(function() {
	return this._id.toString();
});
// JSON으로 변환할때 위의 가상을 포함
schema.set('toJSON', {virtuals: true});
schema.set('toOject', {virtuals: true}); // 콘솔로그에 출력을 보고 싶을 때 사용
}


let db;

export function getTweets() {
	return db.collection('tweets');
}