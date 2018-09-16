'use strict';
const router = require('koa-router')();
const koaBody = require('koa-body');

const { Task } = require('../db');

router.use(koaBody());

router.get('/tasks', async (ctx) => {
	ctx.body = await Task.findAll({});
});

router.post('/tasks', async (ctx) => {
	try {
		const task = ctx.request.body;

		// note: next checking and definition are only for tests, because in memory-store table hasn't schema
		if (!task.title || !task.details) {
			throw new Error('Title is required');
		}
		task.status = 'new';

		ctx.body = await Task.create(task);
	} catch (err) {
		ctx.status = 400;
		ctx.body = err.message || err;
	}
});

router.patch('/tasks/:id', async (ctx) => {
	try {
		const taskId = ctx.params.id;
		const data = ctx.request.body;
		const instance = await Task.findOne({ where: { id: taskId }});

		await instance.updateAttributes(data);

		ctx.body = instance;
	} catch (err) {
		ctx.status = 400;
		ctx.body = err.message;

		throw err;
	}
});

module.exports = router;
