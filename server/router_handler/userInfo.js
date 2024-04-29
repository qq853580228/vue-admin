const bcrypt = require('bcryptjs');

const { evUserQueryById, evUserQueryByIdAll, evUserUpdate, evUserPwdUpdate } = require('../db/userInfo');
const {
  USER_NOT_FOUND_MSG, USER_QUERY_ERR_MSG, 
  USER_QUERY_SUCCESS_MSG, UPDATE_ERR_MSG,
  UPDATE_SUCCESS_MSG,
  USER_UPDATE_SUCCESS_MSG, PWD_ERR_MSG,
} = require('../config/constant');

const getUserInfo = (req, res) => {
  const { id } = req.auth;
  evUserQueryById(id).then(results => {
    if (results.length !== 1) {
      return res.cc({ code: 1002, msg: USER_QUERY_ERR_MSG });
    }
    res.cc({ code: 200, msg: USER_QUERY_SUCCESS_MSG, data: results[0] });
  })
}

const userInfoUpdate = (req, res) => {
  const userInfo = req.body;
  evUserQueryById(userInfo.id).then(results => {
    if (results.length !== 1) {
      return res.cc({ code: 1002, msg: USER_NOT_FOUND_MSG });
    }
    evUserUpdate(userInfo).then(result => {
      if (result.affectedRows !== 1) {
        return res.cc({ code: 1002, msg: UPDATE_ERR_MSG });
      }
      res.cc({ code: 200, msg: USER_UPDATE_SUCCESS_MSG });
    });
  });
}

const pwdReset = (req, res) => {
  const userInfo = req.auth;
  evUserQueryByIdAll(userInfo.id).then(results => {
    if (results.length !== 1) {
      return res.cc({ code: 1002, msg: USER_NOT_FOUND_MSG });
    }
    const { oldPwd, newPwd } = req.body;
    // 判断用户输入的旧密码是否正确
    const compareResult = bcrypt.compareSync(oldPwd, results[0].password);
    if (!compareResult) {
      return res.cc({ code: 1002, msg: PWD_ERR_MSG });
    }
    const password = bcrypt.hashSync(newPwd, 10);
    evUserPwdUpdate({ password, id: userInfo.id }).then(result => {
      if (result.affectedRows !== 1) {
        return res.cc({ code: 1002, msg: UPDATE_ERR_MSG });
      }
      res.cc({ code: 200, msg: UPDATE_SUCCESS_MSG });
    });
  });
}

module.exports = {
  getUserInfo,
  userInfoUpdate,
  pwdReset,
}