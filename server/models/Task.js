const Sequelize = require('sequelize');
const { STRING, DATE, INTEGER } = Sequelize;

const taskSchema = {
	id: {
		type: INTEGER,
		allowNull: false,
		unique: true,
		primaryKey: true,
		autoIncrement: true
	},
	title: {
		type: STRING,
		allowNull: false
	},
	description: {
		type: STRING(1000),
		allowNull: false
	},
	createdAt: {
		type: DATE,
		allowNull: false,
		defaultValue: new Date().toISOString()
	},
	updatedAt: {
		type: DATE,
		defaultValue: new Date().toISOString()
	},
	status: {
		type: STRING,
		defaultValue: 'new',
		values: ['new', 'progress', 'done']
	}
};

class Task {
	constructor(props) {
		const { db } = props

		if (!db) throw Error('db and SubTask required');

		this.model = db.define('tasks', taskSchema);
	}
}

module.exports = Task;
