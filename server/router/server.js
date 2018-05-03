import Router from 'koa-router';


const router = Router();

router.get('/sys/', async ctx => {
  const title = 'Hello, world';
  await ctx.render('server/index', {
    title,
  });
});

router.get('/sys/*', async ctx => {
  const title = 'Hello, world';
  await ctx.render('server/index', {
    title,
  });
});


export default router;