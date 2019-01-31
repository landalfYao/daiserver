const db = require('./../db/mysqlHelper.js')

const app = {
    async add(args) {
        let sql = 'INSERT INTO agents (name,wx_id,price,msg,qrcode) value(?,?,?,?,?)'
        let params = [args.name, args.wx_id, args.price, args.msg, args.qrcode]
        let result = await db.query(sql, params)
        return result
    },

    async update(args) {
        let sql = 'UPDATE agents set name=?,price=?,msg=? where id= ?'
        let params = [args.name, args.price, args.msg, args.id]
        let result = await db.query(sql, params)
        return result
    },
    async getById(args) {
        let sql = 'select * from agents where wx_id=?'
        let params = [args.wx_id]
        let result = await db.query(sql, params)
        return result
    },

    async getList(args) {
        let result = await db.commonSelect(args)
        return result
    },

}

module.exports = app