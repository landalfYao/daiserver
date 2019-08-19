const db = require('./../db/mysqlHelper.js')

const app = {

    async upYWY(w, id) {
        let sql = 'update y_user set wallets=wallets+' + w + ' where pk_id=' + id
        let result = await db.query(sql, [])
        return result
    },
    async upJJR(w, id) {
        let sql = 'update agents set wallet=wallet+' + w + ' where wx_id=' + id
        let result = await db.query(sql, [])
        return result
    },
    async lius(args) {
        let sql = 'insert into capitals (order_id,jjr_id,ywy_id,ywy_get,jjr_get,p_get,total_fee) value(?,?,?,?,?,?,?)'
        let params = [args.order_id, args.jjr_id, args.ywy_id, args.ywy_get, args.jjr_get, args.p_get, args.total_fee]
        let result = await db.query(sql, params)
        return result
    },
    async getLiuTotal() {
        let sql = 'SELECT SUM(total_fee) total FROM capitals'
        let result = await db.query(sql, [])
        return result
    },
    async getJJRTotal(jjr_id) {
        let sql = 'SELECT SUM(jjr_get) total FROM capitals where jjr_id=?'
        let result = await db.query(sql, [jjr_id])
        return result
    },
    async liugetId(args) {
        let sql = 'select * from capitals where order_id=?'
        let params = [args.id]
        let result = await db.query(sql, params)
        return result
    },

    async findShare(wx_id) {
        let sql = 'select sid from scan_share where wx_id=?'
        let params = [wx_id]
        let result = await db.query(sql, params)
        return result
    },

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
    async updateStateCONCEL(id) {
        let sql = 'UPDATE orders set state="已中断",cancel_time=now() where id=?'
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