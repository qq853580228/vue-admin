const query = require('../db/query');

// ev_users表 通过 id 查询用户 --- 不包含密码
const EV_USER_QUERT_BY_ID = 'select id, username, nickname, email, user_pic from ev_users where id = ?';

// ev_users表 通过 id 查询用户
const EV_USER_QUERT_BY_ID_ALL = 'select * from ev_users where id = ?';

// ev_users表 修改用户信息
const EV_USER_UPDATE = 'update ev_users set nickname = ?, email = ? where id = ?';

// ev_users表 修改用户密码
const EV_USER_PWD_UPDATE = 'update ev_users set password = ? where id = ?';

const evUserQueryById = id => query(EV_USER_QUERT_BY_ID, id);

const evUserQueryByIdAll = id => query(EV_USER_QUERT_BY_ID_ALL, id);

const evUserUpdate = ({ id, nickname, email }) => query(EV_USER_UPDATE, [nickname, email, id]);

const evUserPwdUpdate = ({ id, password }) => query(EV_USER_PWD_UPDATE, [password, id]);

module.exports = {
  evUserQueryById,
  evUserQueryByIdAll,
  evUserUpdate,
  evUserPwdUpdate,
}