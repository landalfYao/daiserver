const db = require('./../db/mysqlHelper.js')

const app = {
    async add(args) {
        let sql = 'INSERT INTO banks (icon,sort,bankname,des,p_min,p_max,contact,phone,tele,is_show) value(?,?,?,?,?,?,?,?,?,?)'
        let params = [args.icon, args.sort, args.bankname, args.des, args.p_min, args.p_max, args.contact, args.phone, args.tele, args.is_show]
        let result = await db.query(sql, params)
        return result
    },

    async update(args) {
        let sql = 'UPDATE banks set icon=?,sort=?,bankname=?,des=?,p_min=?,p_max=?,contact=?,phone=?,tele=?,is_show=? where id= ?'
        let params = [args.icon, args.sort, args.bankname, args.des, args.p_min, args.p_max, args.contact, args.phone, args.tele, args.is_show, args.id]
        let result = await db.query(sql, params)
        return result
    },
    async getById(id) {
        let sql = 'select * from banks where id=?'
        let params = [id]
        let result = await db.query(sql, params)
        return result
    },
    async getList(args) {
        let result = await db.commonSelect(args)
        return result
    },
    async del (args){
        let sql = 'delete from banks where id in (?)';
        let params = [args.ids];
        let result = await db.query(sql, params)
        return result
    },

}

module.exports = app