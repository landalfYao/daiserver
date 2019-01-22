const router = require('koa-router')()
const bll = require('./../pub/bll/order.js')

router.prefix('/api/order')

router.post('/add', async (ctx, next) => {
    let result = await bll.add(ctx)
    ctx.body = result;
})
router.post('/update', async (ctx, next) => {
    let result = await bll.update(ctx, 'update')
    ctx.body = result;
})
router.post('/update/jjr', async (ctx, next) => {
    let result = await update(ctx, 'updateJJR')
    ctx.body = result;
})
router.post('/update/ywy', async (ctx, next) => {
    let result = await update(ctx, 'updateYWY')
    ctx.body = result;
})
router.post('/update/state/qt', async (ctx, next) => {
    let result = await update(ctx, 'updateStateQT')
    ctx.body = result;
})
router.post('/update/state/fw', async (ctx, next) => {
    let result = await update(ctx, 'updateStateFW')
    ctx.body = result;
})
router.post('/update/state/com', async (ctx, next) => {
    let result = await update(ctx, 'updateStateCOM')
    ctx.body = result;
})
router.post('/get', async (ctx, next) => {
    let result = await bll.getList(ctx)
    ctx.body = result;
})
module.exports = router