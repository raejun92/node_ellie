const jwt = require('jsonwebtoken');
const secret = 'aaksndlkasdnlsad';
// 토근은 한 번 만들면 계속 사용할 수 있다는 단점이 존재
// expiresIn으로 해결
const token = jwt.sign({ 
	// payload는 중요한 정보(담고 싶은 내용)
	// 계속 서버와 클라이언트를 왔다갔다함
	id: 'userId',
	isAdmin: false,
}, secret, {expiresIn: 2}); // 2초가 지나면 토근이 더 이상 유효하지 않음

setTimeout(() => {
	jwt.verify(token, secret, (error, decoded) => {
		console.log(error, decoded);
	})
}, 3000)

console.log(token);