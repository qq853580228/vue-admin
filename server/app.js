const express = require('express');
const path = require('path');
const cors = require('cors');
const Joi = require('joi');
const { expressjwt } = require('express-jwt');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');

const userRouters = require('./router/user');
const userInfoRouters = require('./router/userInfo');
const artCateRouters = require('./router/artcate');
const { TOKEN_SECRET_KEY } = require('./config/index');

const app = express();

// 配置跨域
app.use(cors());

// 配置解析 application/x-www-form-urlencoded 格式数据的内置中间件
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.cc = ({ code = 200, err, msg, data = {} }) => {
    res.send({
      code,
      msg: msg ? msg : err instanceof Error ? err.message : err,
      data,
    });
  }
  
  next();
});

// 一定要在路由之前配置解析 token 的中间件
app.use(expressjwt({ secret: TOKEN_SECRET_KEY, algorithms: ['HS256'] }).unless({ path: [/^\/auth/, /^\/public/] }));

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/auth', userRouters);
app.use('/my', userInfoRouters);
app.use('/my/article', artCateRouters);

// 错误级别中间件
app.use(function (err, req, res, next) {
  console.log(err.message);
  // Joi 参数校验失败
  if (err instanceof Joi.ValidationError) {
    return res.cc({ code: 1002, err });
  }

  // token 校验失败
  if (err.name === 'UnauthorizedError') {
    return res.cc({ code: 401, msg: 'token失效！' });
  }
  
  // 未知错误
  res.cc({ code: 500, err });
});

app.listen('9001', () => {
  console.log('express server running at http://127.0.0.1:9001');
});