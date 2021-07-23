import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';

const AUTH_ERROR = {message: 'Authentication Error'};

// isAuth라는 미들웨어 함수를 만듦
export const isAuth = async (req, res, next) => {
	const authHeader = req.get('Authorization'); // req헤더안에 Authorization존재 유무
	if (!(authHeader && authHeader.startsWith('Bearer '))) {
		return res.status(401).json(AUTH_ERROR);
	}

	const token = authHeader.split(' ')[1];
	// TODO: Make it secure!
	jwt.verify(
		token,
		'F1k2DQp739Zvlm8kj1KowUq910zW2n6lkas',
		async (error, decoded) => {
			if (error) {
				return res.status(401).json(AUTH_ERROR);
			}
			const user = await userRepository.findById(decoded.id);
			if (!user) {
				return res.status(401).json(AUTH_ERROR);
			}
			req.userId = user.id; // req.customData
			next();
		}
	);
};