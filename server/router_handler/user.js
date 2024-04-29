const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { setToken, TOKEN_SECRET_KEY } = require('../config/index');
const { evUserQueryByUn, evUserInsert } = require('../db/user');
const { LOGIN_ERR_MSG, VERIFY_CODE_ERR_MSG, LOGIN_SUCCESS_MSG, REGISTER_ERR_MSG, REGISTER_EXIST_MSG, REGISTER_SUCCESS_MSG } = require('../config/constant');

const register = (req, res) => {
  // 获取客户端提交到服务端的用户数据
  const userInfo = req.body;

  evUserQueryByUn(userInfo.username).then(results => {
    if (results.length > 0) {
      return res.cc({ code: 1002, msg: REGISTER_EXIST_MSG });
    }

    // 用户名可以使用，后续流程
    // 对密码进行加密
    userInfo.password = bcrypt.hashSync(userInfo.password, 10);
    // return evUserInsert({ username: userInfo.username, password: userInfo.password });
    // 链式调用 但是会导致错误不会被相应 
    evUserInsert({ username: userInfo.username, password: userInfo.password }).then(results => {
      if (results.affectedRows !== 1) {
        return res.cc({ code: 1002, msg: REGISTER_ERR_MSG });
      }
      res.send({ code: 200, msg: REGISTER_SUCCESS_MSG });
    });
  });

};

const login = (req, res) => {
  // 获取客户端提交到服务端的用户数据
  const user = req.body;
  evUserQueryByUn(user.username).then(results => {
    if (results.length === 0) {
      return res.cc({ code: 1002, msg: LOGIN_ERR_MSG });
    }
    
    // 用户名可以使用，后续流程
    // 对密码进行加密
    const compareResult = bcrypt.compareSync(user.password, results[0].password);
    if (!compareResult) return res.cc({ code: 1002, msg: LOGIN_ERR_MSG });
    
    // 用户信息
    const userInfo = { ...results[0] };
    // 根据用户信息生成 token 字符串
    const access_token = setToken(userInfo);
    const refresh_token = setToken(userInfo, true);

    res.cc({ code: 200, msg: LOGIN_SUCCESS_MSG, data: { userInfo, access_token, refresh_token } });
  });
};

const refreshToken = (req, res) => {
  // 获取客户端提交到服务端的用户数据
  const { token } = req.query;

  const user = jwt.verify(token.split(' ')[1], TOKEN_SECRET_KEY);
  delete user.exp;
  delete user.iat;

  // 根据用户信息生成 token 字符串
  const access_token = setToken(user);
  const refresh_token = setToken(user, true);

  res.cc({ code: 200, msg: '刷新成功！', data: { access_token, refresh_token } });
};

module.exports = {
  register,
  login,
  refreshToken,
};