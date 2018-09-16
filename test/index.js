'use strict'

const server = require('../server/index');
const { db } = require('../server/db');
let _server = null;

before(async () => { // eslint-disable-line
	await db.sync({ force: true });
	_server = server.listen(8000);
});

after(async () => { // eslint-disable-line
	if (_server) _server.close();
});
