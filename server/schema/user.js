const { query } = require('express');
const joi = require('joi');

// 定义校验用户名密码的验证规则
const username = joi.string().alphanum().min(4).max(10).required();
const password = joi.string().pattern(/^[\S]{6,15}$/).required();
const verifyCode = joi.string().alphanum().min(4).required();
exports.password = password;

const token = joi.string().required();

// 定义注册和登录的表单验证规则对象
exports.register_login_schema = {
  body: {
    username,
    password,
    verifyCode,
  }
}
// 定义注册和登录的表单验证规则对象
exports.refresh_token_schema = {
  query: {
    token,
  }
}