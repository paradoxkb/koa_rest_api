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
		type: STRING(255),
		allowNull: false
	},
	details: {
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

const TaskModel = db => {
	const table = db.define('tasks', taskSchema);

	// hard reset table in db
	// table.sync({force: true})

	return table;
};

module.exports = TaskModel;
