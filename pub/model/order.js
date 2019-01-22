const db = require('./../db/mysqlHelper.js')

const app = {
    async add(args) {
        let sql = 'INSERT INTO orders (name,idcard,phone,position,city,gjj,sb,housetype,zxqk,area,hcar,xyqk,money,date,jjr,title,wx_id) value(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
        let params = [args.name, args.idcard, args.phone, args.position, args.city, args.gjj, args.sb, args.housetype, args.zxqk, args.area, args.hcar, args.xyqk, args.money, args.date, args.jjr, args.title, args.wx_id]
        let result = await db.query(sql, params)
        return result
    },
    async update(args) {
        let sql = 'UPDATE orders set name=?,idcard=?,phone=?,position=?,city=?,gjj=?,sb=?,housetype=?,zxqk=?,area=?,hcar=?,xyqk=?,money=?,date=?,jjr=?,title=?where id = ?'
        let params = [args.name, args.idcard, args.phone, args.position, args.city, args.gjj, args.sb, args.housetype, args.zxqk, args.area, args.hcar, args.xyqk, args.money, args.date, args.jjr, args.title, args.id]
        let result = await db.query(sql, params)
        return result
    },
    //更新经纪人
    async updateJJR(id) {
        let sql = 'UPDATE orders set jjr=? where id =?'
        let result = await db.query(sql, [id])
        return result
    },
    //更新业务员
    async updateYWY(id) {
        let sql = 'UPDATE orders set ywy=? where id=?'
        let result = await db.query(sql, [id])
        return result
    },
    async updateStateQT(id) {
        let sql = 'UPDATE orders set state="洽谈中",qt_time=now() where id=?'
        let result = await db.query(sql, [state, id])
        return result
    },
    async updateStateFW(id) {
        let sql = 'UPDATE orders set state="服务中",fw_time=now() where id=?'
        let result = await db.query(sql, [state, id])
        return result
    },
    async updateStateCOM(id) {
        let sql = 'UPDATE orders set state="已完成",com_time=now() where id=?'
        let result = await db.query(sql, [state, id])
        return result
    },
    async getList(args) {
        let result = await db.commonSelect(args)
        return result
    },

}

module.exports = app