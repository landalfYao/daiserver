const db = require('./../db/mysqlHelper.js')

const app = {
    async add(args) {
        let sql = 'INSERT INTO carousel (img,sort) value(?,?)'
        let params = [args.img, args.sort]
        let result = await db.query(sql, params)
        return result
    },

    async update(args) {
        let sql = 'UPDATE carousel set img=?,sort=? where id= ?'
        let params = [args.img, args.sort,args.id]
        let result = await db.query(sql, params)
        return result
    },
    async getById(id) {
        let sql = 'select * from carousel where id=?'
        let params = [id]
        let result = await db.query(sql, params)
        return result
    },
    async getList(args) {
        let result = await db.commonSelect(args)
        return result
    },
    async del (args){
        let sql = 'delete from carousel where id in (?)';
        let params = [args.ids];
        let result = await db.query(sql, params)
        return result
    },
}

module.exports = app