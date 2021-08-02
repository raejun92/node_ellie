// config 파일을 따로 두는 이유: 서버가 시작해야 환경변수에 접근함으로 오류 찾기 힘듦,
// 환경변수가 정의가 돼 있는지 안 되어 있는지 확인 불가
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
	db: {
		host: required('DB_HOST'),
		user: required('DB_USER'),
		password: required('DB_PASSWORD'),
		database: required('DB_DATABASE'),
	},
	port: parseInt(required('HOST_PORT', 8080)),
	cors: {
		allowedOrigin: required('CORS_ALLOW_ORIGIN'),
	},
};