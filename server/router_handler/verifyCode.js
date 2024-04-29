// 验证码
const svgCaptcha = require('svg-captcha');

exports.codeCreate = (req, res) => {
  const { width = 100, height = 40 } = req.query;
  const captcha = svgCaptcha.create({
    color: true, // 彩色
    //inverse:false,// 反转颜色
    width, //  宽度
    height, // 高度
    fontSize: 48, // 字体大小
    size: 4, // 验证码的长度
    noise: 0, // 干扰线条
    ignoreChars: '0oO1ilI' // 验证码字符中排除 0o1i
  });
  // session 里面也放一份
  const captchaVal = captcha.text.toLowerCase();
  // req.session.verifyCode = captchaVal;
  res.cc({ code: 200, msg: '获取验证码成功！', data: { img: captcha.data, text: captchaVal } });
};