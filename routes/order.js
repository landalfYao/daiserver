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
router.post('/update/qt', async (ctx, next) => {
    let result = await bll.update(ctx, 'updateQt')
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
router.post('/update/state/cancel', async (ctx, next) => {
    let result = await bll.update(ctx, 'updateStateCONCEL')
    ctx.body = result;
})
router.post('/update/state/com', async (ctx, next) => {
    let result = await bll.updateStateCOM(ctx)
    ctx.body = result;
})
// router.post('/update/state/cancel', async (ctx, next) => {
//     let result = await bll.updateStateCOM(ctx)
//     ctx.body = result;
// })
router.post('/get', async (ctx, next) => {
    let result = await bll.getList(ctx)
    ctx.body = result;
})
router.post('/get/id', async (ctx, next) => {
    let result = await bll.getById(ctx)
    ctx.body = result;
})
router.post('/get/liu', async (ctx, next) => {
    let result = await bll.getLiu(ctx)
    ctx.body = result;
})
router.post('/get/liu/total', async (ctx, next) => {
    let result = await bll.getLiuTotal(ctx)
    ctx.body = result;
})
module.exports = router