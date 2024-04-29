const express = require('express');
const expressJoi = require('@escook/express-joi');
const router = express.Router();

const userInfoHandler = require('../router_handler/userInfo');

const { userinfo_update_schema, pwd_reset_schema } = require('../schema/userInfo');

router.get('/userInfo',  userInfoHandler.getUserInfo);

router.post('/userInfo/update', expressJoi(userinfo_update_schema), userInfoHandler.userInfoUpdate);

router.post('/pwd/reset', expressJoi(pwd_reset_schema), userInfoHandler.pwdReset);

module.exports = router;