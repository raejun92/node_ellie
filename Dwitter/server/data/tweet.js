import * as userRepository from './auth.js';

let tweets = [ // 새로 추가되는 트위을 배열의 첫 부분에 넣어주기 위해 let으로 변경
	{
		id: '1',
		text: 'hello dwitter',
		createAt: new Date().toString(),
		userId: '1',		
	},
	{
		id: '2',
		text: 'I\'m two da',
		createAt: new Date().toString(),
		userId: '1',
	}
];

export async function getAll() {
	// 생성된 프로미스 배열을 묶어줌
	return Promise.all(
		// 프로미스 배열이 생성
		tweets.map(async (tweet) => { // userRepository가 비동기여서 async await 사용
			const {username, name, url} = await userRepository.findById(tweet.userId); // 사용자 정보를 받아옴
			return {...tweet, username, name, url}; // 트윗자체가 아니라 트윗을 가지고 있는 프로미스를 반환
		})
	);
}

export async function getAllByUsername(username) {
	return getAll().then((tweets) => tweets.filter((tweet) => tweet.username === username));
}

export async function getById(id) {
	const found = tweets.find((tweet) => tweet.id === id);
	if (!found) {
		return null;
	}
	const {username, name, url} = await userRepository.findById(found.userId);
	return {...found, username, name, url};
}

export async function create(text, userId) {
	const tweet = { // 새로운 트위를 만듦
		id: Date.now().toString(), // db가 없어서 Date로 대체
		text,
		createAt: new Date(),
		userId,
	};
	tweets = [tweet, ...tweets]; // 배열의 첫 번째를 새로운 tweet을 넣고 기존 tweets에 있던 tweet을 추가
	return getById(tweet.id);
}

export async function update(id, text) {
	const tweet = tweets.find(tweet => tweet.id === id); // tweets에서 변경하고자 하는 id를 찾음
	if (tweet) {
		tweet.text = text;
	}
	return getById(tweet.id);
}

export async function remove(id) {
	tweets = tweets.filter(tweet => tweet.id !== id); // id인 tweet만 빼고 다시 tweets을 만듦
}