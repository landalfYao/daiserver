const db = require('./../db/mysqlHelper.js')

const app = {
    async add(args) {
        let sql = 'INSERT INTO orders (name,idcard,phone,position,city,gjj,sb,housetype,zxqk,area,hcar,xyqk,money,date,jjr,title,wx_id) value(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
        let params = [args.name, args.idcard, args.phone, args.position, args.city, args.gjj, args.sb, args.housetype, args.zxqk, args.area, args.hcar, args.xyqk, args.money, args.date, args.jjr, args.title, args.wx_id]
        let result = await db.query(sql, params)
        return result
    },
    async update(args) {
        let sql = 'UPDATE orders set name=?,idcard=?,phone=?,position=?,city=?,gjj=?,sb=?,housetype=?,zxqk=?,area=?,hcar=?,xyqk=?,money=?,date=?,jjr=?,title=? where id = ?'
        let params = [args.name, args.idcard, args.phone, args.position, args.city, args.gjj, args.sb, args.housetype, args.zxqk, args.area, args.hcar, args.xyqk, args.money, args.date, args.jjr, args.title, args.id]
        let result = await db.query(sql, params)
        return result
    },
    async updateQt(args) {
        let sql = 'UPDATE orders set qdate=? where id = ?'
        let params = [args.qdate, args.id]
        let result = await db.query(sql, params)
        return result
    },
    //更新经纪人
    async updateJJR(args) {
        let sql = 'UPDATE orders set jjr=? where id in (?)'
        let result = await db.query(sql, [args.jid, args.id])
        return result
    },
    //更新业务员
    async updateYWY(args) {
        let sql = 'UPDATE orders set ywy=? where id=?'
        let result = await db.query(sql, [args.yid, args.id])
        return result
    },
    async updateStateQT(id) {
        let sql = 'UPDATE orders set state="洽谈中",qt_time=now() where id=?'
        let result = await db.query(sql, [id])
        return result
    },
    async updateStateFW(id) {
        let sql = 'UPDATE orders set state="服务中",fw_time=now() where id=?'
        let result = await db.query(sql, [id])
        return result
    },
    async updateStateCOM(id) {
        let sql = 'UPDATE orders set state="已完成",com_time=now() where id=?'
        let result = await db.query(sql, [id])
        return result
    },
    async getList(args) {
        let result = await db.commonSelect(args)
        return result
    },
    async getById(id) {
        let sql = 'select orders.*,y_user.name ywyname,agents.name jjrname from orders left join y_user on orders.ywy = y_user.pk_id left join agents on orders.jjr = agents.wx_id where orders.id=?'
        let result = await db.query(sql, [id])
        return result
    }

}

module.exports = app