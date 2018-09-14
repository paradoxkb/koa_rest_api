'use strict';
const Sequelize = require('sequelize');

const creds = require('./config/creds.json');
const TaskModel = require('./models/Task');

const connectionSettings = process.env.NODE_ENV === 'test' ?
	{ dialect: 'sqlite' } :
	{
		host: creds.postgres_url,
		dialect: 'postgres',
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	};

const db = new Sequelize(
	'srvuihkg',
	creds.postgres_user,
	creds.postgres_pswd,
	connectionSettings,
);

if (process.env.NODE_ENV !== 'test') db.sync();

module.exports = {
	db,
	Task: new TaskModel({ db }).model,
};
