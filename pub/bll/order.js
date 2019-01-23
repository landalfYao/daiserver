const model = require('./../model/order.js')
const retCode = require('./../utils/retcode.js')
const com = require('../utils/common')
const app = {
    async add(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.add(form)
            if (bkdata.errno) {
                if (bkdata.errno == 1062) {
                    result = retCode.Fail
                    result.msg = '失败'
                } else {
                    result = retCode.ServerError
                    result.msg = '服务端错误'
                }
            } else {
                result.data = bkdata.insertId
                result.msg = '添加成功'
            }
        } else {
            result = auth
        }
        return com.filterReturn(result)
    },

    async update(ctx, method) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model[method](method == 'update' || method == 'updateJJR' || method == 'updateYWY' ? form : form.id)
            if (bkdata.errno) {
                if (bkdata.errno == 1062) {
                    result = retCode.Fail
                    result.msg = '该角色名称已存在'
                } else {
                    result = retCode.ServerError
                    result.msg = '服务端错误'
                }
            } else {
                result.data = bkdata.changedRows
                result.msg = '修改成功'
            }

        } else {
            result = auth
        }
        return com.filterReturn(result)
    },
    async getById(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.getById(form.id)
            if (bkdata.errno) {
                if (bkdata.errno == 1062) {
                    result = retCode.Fail
                    result.msg = '失败'
                } else {
                    result = retCode.ServerError
                    result.msg = '服务端错误'
                }
            } else {
                result.data = bkdata[0]
                result.msg = '获取成功'
            }

        } else {
            result = auth
        }
        return com.filterReturn(result)
    },
    async getList(ctx) {
        ctx.request.body.tables = 'orders left join y_user on orders.ywy = y_user.pk_id left join agents on orders.jjr = agents.wx_id'
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let result = await com.commonSelect.getList(ctx)
            if (result.args) {
                let userResult = await model.getList(result.args, result.ct)
                let bkdata = result.result
                bkdata.data = userResult
                let ct = result.ct.payload

                let re = retCode.Success
                re.data = userResult
                return com.filterReturn(re)
            } else {
                return com.filterReturn(result)
            }
        } else {
            return com.filterReturn(auth)
        }

    },
}
module.exports = app