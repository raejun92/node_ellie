import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'express-async-errors';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';

export async function signup(req, res) {
	const {username, password, name, email, url}  = req.body;
	const found = await userRepository.findByUsername(username); // 이미 등록된 회원인지 확인
	if (found) {
		return res.status(409).json({message: `${username} already exists`});
	}
	const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds); // 비밀번호 숨김
	const userId = await userRepository.createUser({
		username,
		password: hashed,
		name,
		email,
		url,
	});
	const token = createJwtToken(userId); // 토큰 생성
	res.status(201).json({token, username});
}

export async function login(req, res) {
	const {username, password} = req.body;
	const user = await userRepository.findByUsername(username);
	if (!user) {
		return res.status(401).json({message: 'Invalid user or password'});
	}
	const isValidPassword = await bcrypt.compare(password, user.password); // 사용자가 입력한 비밀번호와 해쉬된 비밀번호를 비교
	if (!isValidPassword) {
		return res.status(401).json({message: 'Invalid user or password'});
	}
	const token = createJwtToken(user.id);
	res.status(200).json({token, username});
}

function createJwtToken(id) {
	return jwt.sign({id}, config.jwt.secretKey, {expiresIn: config.jwt.expiresInSec});
}

export async function me(req, res, next) {
	const user = await userRepository.findById(req.userId);
	if (!user) {
		return res.status(404).json({message: 'User not found'});
	}
	res.status(200).json({token: req.token, username: user.name});
}