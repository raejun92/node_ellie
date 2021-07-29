import { sequelize } from '../db/database.js';
import SQ from 'sequelize';
import { User } from './auth.js';

const Sequelize = SQ.Sequelize; 
const DataTypes = SQ.DataTypes;

const Tweet = sequelize.define('tweet', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	text: {
		type: DataTypes.TEXT,
		allowNull: false, 
	}
});

Tweet.belongsTo(User); // 유저를 연결, 자동으로 foreign키의 userid생성

const INCLUDE_USER = {
	attributes: [
		'id', 
		'text', 
		'createdAt', 
		'userId',
		// user 객체에 따로 들어있던 요소를 빼주는 작업
		[Sequelize.col('user.name'), 'username'], // user 컬럼안에 있는 name을 username으로 가져옴
		[Sequelize.col('user.url'), 'url'],
	],
	include: {
		model: User,
		attributes: [],
	},
};

const ORDER_DESC = {
	order: [['createdAt', 'DESC']], // createdAt기준으로 내림차순
}

export async function getAll() {
	return Tweet.findAll({...INCLUDE_USER, ...ORDER_DESC});
}

export async function getAllByUsername(username) {
	return Tweet.findAll({
		...INCLUDE_USER, 
		...ORDER_DESC, 
		include: {
		...INCLUDE_USER.include, 
		where: {username},
		},
	});
}

export async function getById(id) {
	return Tweet.findOne({
		where: {id},
		...INCLUDE_USER, // user에 있는 정보를 가져와야 함
	})
}

export async function create(text, userId) {
	return Tweet.create({text, userId})
	.then(data => getById(data.dataValues.id));
}

export async function update(id, text) {
	return Tweet.findByPk(id, INCLUDE_USER)
	.then(tweet => {
		tweet.text = text;
		return tweet.save();
	});
}

export async function remove(id) {
	return Tweet.findByPk(id)
	.then(tweet => {
		tweet.destroy();
	});
}