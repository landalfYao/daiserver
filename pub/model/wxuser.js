const db = require("./../db/mysqlHelper.js");

const roles = {
    async insertScan(args) {
        let sql = "INSERT INTO scan_share (sid,wx_id,types) value(?,?,?)";
        let params = [args.sid, args.wx_id, args.types];
        let result = await db.query(sql, params);
        return result;
    },
    async saddnum(type, id) {
        let temp = ''
        if (type == 'scan') {
            temp = ' by_scan=by_scan+1 '
        } else {
            temp = ' by_share=by_share+1 '
        }
        let sql = 'update wxuser set ' + temp + ' where id=?'
        let result = await db.query(sql, [id]);
        return result;
    },
    async add(args) {
        let sql = "INSERT INTO wxuser (openid) value(?)";
        let params = [args.openid];
        let result = await db.query(sql, params);
        return result;
    },
    async addInfo(args) {
        let sql =
            "INSERT INTO userinfo (wx_id,name,card_num,cert,a_id,form_id,stu_card) value(?,?,?,?,?,?,?)";
        let params = [
            args.wx_id,
            args.name,
            args.card_num,
            args.cert,
            args.a_id,
            args.form_id,
            args.stu_card
        ];
        let result = await db.query(sql, params);
        return result;
    },
    async updateInfo(args) {
        let sql =
            "update userinfo set name=?,card_num=?,cert=?,a_id=?,form_id=?,stu_card=?,state=0 where id = ?";
        let params = [
            args.name,
            args.card_num,
            args.cert,
            args.a_id,
            args.form_id,
            args.stu_card,
            args.id
        ];
        let result = await db.query(sql, params);
        return result;
    },
    async updateWX(args) {
        let sql = 'update wxuser set nick_name=?,phone=? where id=?'
        let result = await db.query(sql, [args.nick_name, args.phone, args.id]);
        return result;
    },
    async updatePhone(args) {
        let sql = 'update wxuser set phone=? where id=?'
        let result = await db.query(sql, [args.phone, args.id]);
        return result;
    },
    async updateInfoState(args) {
        let sql = "update userinfo set state = ?,msg=? where id= ? ";
        let result = await db.query(sql, [args.state, args.msg, args.id]);
        return result;
    },
    async getInfoByWxId(id) {
        let sql = "select * from userinfo where wx_id= " + id;
        let result = await db.query(sql, []);
        return result;
    },
    async getInfos() {
        let result = await db.commonSelect(args);
        return result;
    },
    async update(args) {
        let sql =
            "UPDATE wxuser set nick_name=?,avatar_url=?,gender=? ,province=?,city=?,phone=? where id = ?";
        let params = [
            args.nickName,
            args.avatarUrl,
            args.gender,
            args.province,
            args.city,
            args.phone,
            args.id
        ];
        let result = await db.query(sql, params);
        return result;
    },
    async updateDel(ids) {
        let sql = "UPDATE wxuser set is_delete=1 where pk_id in (" + ids + ")";
        let result = await db.query(sql, []);
        return result;
    },

    async getByOpenid(openid) {
        let sql = "select * from wxuser where openid=?";
        let result = await db.query(sql, [openid]);
        return result;
    },
    async getById(id) {
        let sql = "select * from wxuser where id=?";
        let result = await db.query(sql, [id]);
        return result;
    },
    async getList(args) {
        let result = await db.commonSelect(args);
        return result;
    },
    async updateDefAddress(args) {
        let sql = 'update wxuser set default_address=? where id=?'
        let result = await db.query(sql, [args.default_address, args.id]);
        return result;
    }
};

module.exports = roles;