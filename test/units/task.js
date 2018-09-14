const request = require('request');
const { expect } = require('chai');
const { promisify } = require('util');

const asyncPost = promisify(request.post);
const asyncPatch = promisify(request.patch);
const baseUrl = 'http://localhost:8000';

const taskPattern = {
	title: 'task 1',
	description: 'task\'s description',
	status: '',
};

let task = null;

describe('Task', () => {
	describe('tasks', () => {
		it('should create task', async () => {
			const create = await asyncPost(
				`${baseUrl}/tasks`,
				{ json: taskPattern }
			);
			task = create.body;

			expect(create.statusCode).to.equal(200);
			expect(task.status).to.equal('new');
		});

		it('should\'t create task without title', async () => {
			const create = await asyncPost(`${baseUrl}/tasks`, { json: { description: 'short' }});

			expect(create.statusCode).to.equal(400);
		});

		it('patch task with status progress', async () => {
			const update = await asyncPatch(`${baseUrl}/tasks/${task.id}`, { json: { status: 'progress' }});

			expect(update.statusCode).to.equal(200);
			expect(update.body.status).to.equal('progress');
		});
	});
});
