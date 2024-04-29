const joi = require('joi');

const { password } = require('./user');

// 定义校验 id，nickname 和 email 的验证规则
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();

// 定义修改用户信息的表单验证规则对象
exports.userinfo_update_schema = {
  body: {
    id,
    nickname,
    email,
  }
}

// 定义重置用户密码的表单验证规则对象
exports.pwd_reset_schema = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref('oldPwd')).concat(password),
  }
}