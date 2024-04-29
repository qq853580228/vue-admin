// jwt 加密密钥
const TOKEN_SECRET_KEY = 'Bls Learning Node';
// jwt 过期时间
const TOKEN_EXPIRES = '30000s';
// jwt 过期时间
const REFRESH_TOKEN_EXPIRES = '30m';

const jwt = require('jsonwebtoken');

const setToken = (user, refresh) => {
  if (!user) {
    return console.log('用户信息不能为空！');
  }
  const expiresIn = refresh ? REFRESH_TOKEN_EXPIRES : TOKEN_EXPIRES;
  return 'Bearer ' + jwt.sign(user, TOKEN_SECRET_KEY, { expiresIn });
}

module.exports = {
  TOKEN_SECRET_KEY,
  setToken,
}