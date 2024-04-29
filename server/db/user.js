const query = require('./query');

// ev_users表 通过用户名查询用户
const EV_USER_QUERT_BY_UN = 'select * from ev_users where username = ?';

// ev_users表 插入新用户
const EV_USER_INSERT = 'insert into ev_users set ?';

const evUserQueryByUn = username => query(EV_USER_QUERT_BY_UN, username);

const evUserInsert = data => query(EV_USER_INSERT, data);

module.exports = {
  evUserQueryByUn,
  evUserInsert,
}