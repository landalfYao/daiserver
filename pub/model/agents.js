const db = require('./../db/mysqlHelper.js')

const app = {
    async add(args) {
        let sql = 'INSERT INTO agents (name,wx_id,price,msg) value(?,?,?,?)'
        let params = [args.name, args.wx_id, args.price, args.msg]
        let result = await db.query(sql, params)
        return result
    },

    async update(args) {
        let sql = 'UPDATE agents set name=?,price=?,msg=? where id= ?'
        let params = [args.name, args.price, args.msg, args.id]
        let result = await db.query(sql, params)
        return result
    },

    async getList(args) {
        let result = await db.commonSelect(args)
        return result
    },

}

module.exports = app