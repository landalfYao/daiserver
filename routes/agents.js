const router = require('koa-router')()
const bll = require('./../pub/bll/agents.js')

router.prefix('/api/agent')

router.post('/add', async (ctx, next) => {
    let result = await bll.add(ctx)
    ctx.body = result;
})
router.post('/update', async (ctx, next) => {
    let result = await bll.update(ctx, 'update')
    ctx.body = result;
})
router.post('/del', async (ctx, next) => {
    let result = await bll.del(ctx)
    ctx.body = result;
})


router.post('/get', async (ctx, next) => {
    let result = await bll.getList(ctx)
    ctx.body = result;
})
router.post('/login', async (ctx, next) => {
    let result = await bll.login(ctx)
    ctx.body = result;
})
router.post('/kh', async (ctx, next) => {
    let result = await bll.getMineKh(ctx)
    ctx.body = result;
})
router.post('/get/id', async (ctx, next) => {
    let result = await bll.getById(ctx)
    ctx.body = result;
})
module.exports = router