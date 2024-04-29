const joi = require('joi');

// 定义校验文章分类的表单验证规则((
const id = joi.number().integer().min(1).required();
const name = joi.string().required();
const alias = joi.string().alphanum().required();

// 定义新增文章分类的表单验证规则对象
exports.insert_art_cate_schema = {
  body: {
    name,
    alias,
  }
}

// 定义通过 id 删除文章分类的表单验证规则对象
exports.delete_art_cate_schema = {
  body: {
    id,
  }
}

// 定义通过 id 查询文章分类的表单验证规则对象
exports.query_art_cate_schema = {
  params: {
    id,
  }
}

// 定义通过 id 修改文章分类的表单验证规则对象
exports.update_art_cate_schema = {
  body: {
    id,
    name,
    alias,
  }
}