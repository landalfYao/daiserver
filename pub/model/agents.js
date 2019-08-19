const db = require('./../db/mysqlHelper.js')

const app = {
    async add(args) {
        let sql = 'INSERT INTO agents (name,wx_id,price,msg,qrcode,username,pwd) value(?,?,?,?,?,?,?)'
        let params = [args.name, args.wx_id, args.price, args.msg, args.qrcode,args.username,args.pwd]
        let result = await db.query(sql, params)
        return result
    },
    //获取客户
    async getkh (sql,params) {
        let result = await db.query(sql, params);
        return result
    },

    async update(args) {
        let sql = 'UPDATE agents set name=?,price=?,msg=?,username=?,pwd=? where id= ?'
        let params = [args.name, args.price, args.msg,args.username,args.pwd, args.id]
        let result = await db.query(sql, params)
        return result
    },
    async findByPwdAndUsername (args) {
        let sql = 'select * from agents where username=? and pwd = ?'
        let params = [args.username,args.pwd]
        let result = await db.query(sql, params)
        return result
    },
    async getById(args) {
        let sql = 'select * from agents where wx_id=?'
        let params = [args.wx_id]
        let result = await db.query(sql, params)
        return result
    },
    async del (args){
        let sql = 'delete from agents where id in (?)';
        let params = [args.ids];
        let result = await db.query(sql, params)
        return result
    },
    async getList(args) {
        let result = await db.commonSelect(args)
        return result
    },

}

module.exports = app