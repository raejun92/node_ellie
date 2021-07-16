let tweets = [ // 새로 추가되는 트위을 배열의 첫 부분에 넣어주기 위해 let으로 변경
	{
		id: '1',
		text: 'hello dwitter',
		createAt: new Date(),
		name: 'juchoi',
		username: 'bob',
		url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
	},
	{
		id: '2',
		text: 'I\'m two da',
		createAt: new Date(),
		name: 'mono',
		username: 'ellie',
	}
];

export async function getAll() {
	return tweets;
}

export async function getAllByUsername(username) {
	return tweets.filter(tweets => tweets.username === username);
}

export async function getById(id) {
	return tweets.find(tweet => tweet.id === id); // id가 없으면 undefined
}

export async function create(text, username, name) {
	const tweet = { // 새로운 트위를 만듦
		id: Date.now().toString(), // db가 없어서 Date로 대체
		text,
		createAt: new Date(),
		name,
		username,
	};
	tweets = [tweet, ...tweets]; // 배열의 첫 번째를 새로운 tweet을 넣고 기존 tweets에 있던 tweet을 추가
	return tweet;
}

export async function update(id, text) {
	const tweet = tweets.find(tweet => tweet.id === id); // tweets에서 변경하고자 하는 id를 찾음
	if (tweet) {
		tweet.text = text;
	}
	return tweet;
}

export async function remove(id) {
	tweets = tweets.filter(tweet => tweet.id !== id); // id인 tweet만 빼고 다시 tweets을 만듦
}