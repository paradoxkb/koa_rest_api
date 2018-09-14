'use strict'

const server = require('../server/index');
const { db } = require('../server/db');

before(async () => { // eslint-disable-line
	await db.sync();
	server.listen(8000);
});
