const db = require('./../db/mysqlHelper.js')

const app = {
    async add(args) {
        let sql = 'INSERT INTO news (title,content,img) value(?,?,?)'
        let params = [args.title, args.content,args.img]
        let result = await db.query(sql, params)
        return result
    },

    async update(args) {
        let sql = 'UPDATE news set title=?,content=?,img=? where id= ?'
        let params = [args.img, args.sort,args.id]
        let result = await db.query(sql, params)
        return result
    },
    async getById(id) {
        let sql = 'select * from news where id=?'
        let params = [id]
        let result = await db.query(sql, params)
        return result
    },
    async getList(args) {
        let result = await db.commonSelect(args)
        return result
    },

}

module.exports = app