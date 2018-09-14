'use strict';
const Koa = require('koa');
const app = new Koa();
const router = require('./routers');

const { PORT } = require('./config');
require('./db');

app.use(router.routes());

if (!module.parent) {
	app.listen(PORT);
	console.log(`App listen on 0.0.0.0:${PORT}`); // eslint-disable-line
}

module.exports = app;
