import Router from 'koa-router';


const router = Router();

router.get('/', async ctx => {
  const title = 'Hello, world';
  await ctx.render('client/index', {
    title,
  });
});


export default router;