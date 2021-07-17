import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}
	return res.status(400).json({message: errors.array()[0].msg}); // 모든 에러 메세지가 아닌 첫번째 메세지만 보냄
}