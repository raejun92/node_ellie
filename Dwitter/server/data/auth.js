let users = [
	{
		id: '1',
		username: 'juchoi',
		// a1324 새로고침되면 달라짐;
		password: '1$2b$12$9jQU3a9bZZS9LSf26THUpO0ZSN5pKI/qkd58kQ4mj0GOMIkuwxQiC',
		name: 'juno',
		email: 'seoul42@server.com',
	},
	{
		id: '2',
		username: 'hie',
		// b1324
		password: '$2b$12$dwvdI.472b3qCoq0Nn1u1ut3LwLGiLavcb8p7vwkxh59d4fgnzFb.',
		name: 'hello',
		email: 'cam@server.com',
	}
];

export async function createUser(user) {
	const created = {...user, id: Date.now().toString()};
	console.log(created);
	users.push(created);
	return created.id;
}

export async function findByUsername(username) {
	return users.find(user => user.username === username);
}