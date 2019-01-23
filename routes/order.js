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

//更新经纪人
router.post('/update/jjr', async (ctx, next) => {
    let result = await bll.update(ctx, 'updateJJR')
    ctx.body = result;
})

//跟新业务员
router.post('/update/ywy', async (ctx, next) => {
    let result = await bll.update(ctx, 'updateYWY')
    ctx.body = result;
})
router.post('/update/state/qt', async (ctx, next) => {
    let result = await bll.update(ctx, 'updateStateQT')
    ctx.body = result;
})
router.post('/update/state/fw', async (ctx, next) => {
    let result = await bll.update(ctx, 'updateStateFW')
    ctx.body = result;
})
router.post('/update/state/com', async (ctx, next) => {
    let result = await bll.update(ctx, 'updateStateCOM')
    ctx.body = result;
})
router.post('/get', async (ctx, next) => {
    let result = await bll.getList(ctx)
    ctx.body = result;
})
router.post('/get/id', async (ctx, next) => {
    let result = await bll.getById(ctx)
    ctx.body = result;
})
module.exports = router