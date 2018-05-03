/**
 *
 * main server js
 *
 * server start with this
 *
 * @author charles meng5994197@gmail.com
 * @date 2018.02.01
 *
 */
import 'babel-polyfill';

import Koa from 'koa';
import Router from 'koa-router';
import path from 'path';
import koaStatic from 'koa-static';
import logger from 'koa-logger';
import views from 'koa-views';
import bodyParser from 'koa-bodyparser';
import jwtKoa from 'koa-jwt';
import mongoose from 'mongoose';

import { secret } from './utils/secret';
import clientRouter from './router/client';
import serverRouter from './router/server';


const [host, port] = ['localhost', '9999'];

/**
 * connect mongodb with env config
 *
 * you must have a file call '.env' in your /
 *
 * if you have auth, you should open your db with config => auth=true
 */
mongoose.connect('mongodb://localhost:27017', err => {
  if (err) throw err;
  console.log('db is ready 👌');
});

const app = new Koa();

/**
 * router doesn't exist then get into this router
 */
const router = Router();

/**
 * user logger to save log
 */
app.use(logger());

app.use(bodyParser());

/**
 * use jwt to check auth
 *
 * except method is GET or path in array
 */
app.use(jwtKoa({
  secret
}).unless({
  method: 'GET',
  path: [/^\/(?!sys(\/|$)).+/],
}));

/**
 * error handle
 */
app.on('error', async (err, ctx) => {
  console.error(ctx.url);
  console.error(err);
  console.error(err.stack);
});

/**
 * static file handle and ejs views handle
 */
app.use(koaStatic(path.join(__dirname, '../public')));
app.use(views(path.join(__dirname, '../views'), {
  extension: 'ejs',
}));

/**
 * routers
 */
app.use(clientRouter.routes());
app.use(serverRouter.routes());

/**
 * error routers
 */
router.get('/*', async ctx => {
  const title = 'Opps, server';
  await ctx.render('client/opps', {
    title,
  });
});
app.use(router.routes());

app.listen(port, host);
console.log(`server start at port ${port}`);


module.exports = app;