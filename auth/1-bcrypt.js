const bcrypt = require('bcrypt');

const password = 'abcd1234';
const hashed = bcrypt.hashSync(password, 10); // 10은 solt 10~12가 적당 크면 오래 걸림
console.log(`password: ${password}, hash: ${hashed}`);

// 사용자가 로그인하여 검사할 때
const result = bcrypt.compareSync('abcd123', hashed);
console.log(result);
