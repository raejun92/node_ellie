import dotenv from 'dotenv';
dotenv.config();

// 설정하지 않은 환경변수에 대한 오류처리
function required(key, defaultValue = undefined) {
	const value = process.env[key] || defaultValue; // 동적으로 오브젝트에 접근
	if (value == null) { // null일 때와 undefined일 때 true
		throw new Error(`Key ${key} is undefined`);
	}
	return value;
}

export const config = {
	jwt: {
		secretKey: required('JWT_SECRET'),
		expiresInSec: required('JWT_EXPIRES_SEC', 86400), // 환경변수가 설정되지 않아도 86400
	},
	bcrypt: {
		saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)), // 환경변수가 숫자인 경우 숫자로 바꿔줌
	},
	host: {
		port: parseInt(required('HOST_PORT', 8080)),
	},
}