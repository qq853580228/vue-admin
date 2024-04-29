const express = require('express');
const expressJoi = require('@escook/express-joi');
const { register_login_schema, refresh_token_schema } = require('../schema/user');

const router = express.Router();

const userHandler = require('../router_handler/user');
const { codeCreate } = require('../router_handler/verifyCode');

router.post('/register', expressJoi(register_login_schema), userHandler.register);

router.post('/login', expressJoi(register_login_schema), userHandler.login);

router.get('/refreshToken', expressJoi(refresh_token_schema), userHandler.refreshToken);

router.get('/getCode', codeCreate);

module.exports = router;