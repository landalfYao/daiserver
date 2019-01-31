const model = require('./../model/order.js')
const retCode = require('./../utils/retcode.js')
const com = require('../utils/common')
const app = {
    async add(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let isFd = await model.findShare(form.wx_id)
            if (isFd.length > 0) {
                form.jjr = isFd[0].sid
            }
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
    async updateStateCOM(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            form.p_get = parseFloat(form.total_fee) - parseFloat(form.ywy_get) - parseFloat(form.jjr_get)
            let dsda = await model.lius(form)
            if (dsda.errno) {
                result = retCode.Fail
                result.data = 0
                result.msg = '订单已完成,状态更改失败'
            } else {
                let bkdata = await model.updateStateCOM(form.order_id)
                let yw = await model.upYWY(form.ywy_get, form.ywy_id)
                let jr = await model.upJJR(form.jjr_get, form.jjr_id)
                let ad = await model.upYWY(form.p_get, 1)
                if (bkdata.errno) {
                    if (bkdata.errno == 1062) {
                        result = retCode.Fail
                        result.msg = '无措'
                    } else {
                        result = retCode.ServerError
                        result.msg = '服务端错误'
                    }
                } else {
                    result.data = bkdata.changedRows
                    result.msg = '修改成功'
                }
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
            let asa = await model.liugetId(form)
            if (asa.length > 0) {
                result = retCode.ServerError
                result.msg = '订单已完成，无法修改'
            } else {
                let bkdata = await model[method](method == 'update' || method == 'updateJJR' || method == 'updateYWY' || method == 'updateQt' ? form : form.id)
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
    async getLiuTotal(ctx) {
        let form = ctx.request.body
        let result = retCode.Success
        let auth = await com.jwtFun.checkAuth(ctx)
        if (auth.code == 1) {
            let bkdata = await model.getLiuTotal()
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
    async getLiu(ctx) {
        ctx.request.body.tables = 'capitals'
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