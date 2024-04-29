const query = require('./query');

// ev_article_cate表 查询列表
const QUERY_ARTICLE_CATES = 'select * from ev_article_cate where is_delete = 0 order by id asc';

// ev_article_cate表 根据 id 查询列表
const QUERY_ARTICLE_CATE_BY_ID = 'select * from ev_article_cate where is_delete = 0 and id = ?';

// ev_article_cate表 根据别名或名称查询列表
const QUERY_ARTICLE_CATE_ONE = 'select * from ev_article_cate where name = ? or alias = ?';

// ev_article_cate表 根据 id 别名或名称查询列表 --- id<> 排除当前 id 这条数据
const QUERY_ARTICLE_CATE_BY_ID_N_A = 'select * from ev_article_cate where id<>? and is_delete = 0 and (name = ? or alias = ?)';

// ev_article_cate表 添加分类
const INSERT_ARTICLE_CATES = 'insert into ev_article_cate set ?';

// ev_article_cate表 根据 id 删除分类
const DELETE_ARTICLE_CATES = 'update ev_article_cate set is_delete = 1 where id = ?';

// ev_article_cate表 根据 id 修改分类
const UPDATE_ARTICLE_CATES = 'update ev_article_cate set ? where id = ?';

const getArtcates = () => query(QUERY_ARTICLE_CATES);

const getArtcateById = id => query(QUERY_ARTICLE_CATE_BY_ID, id);

const getArtcateOne = ({ name, alias }) => query(QUERY_ARTICLE_CATE_ONE, [name, alias]);

const getArtcateByIdNA = ({ id, name, alias }) => query(QUERY_ARTICLE_CATE_BY_ID_N_A, [id, name, alias]);

const insertArtcates = data => query(INSERT_ARTICLE_CATES, data);

const deleteArtcateOne = id => query(DELETE_ARTICLE_CATES, id);

const updateArtcateOne = data => query(UPDATE_ARTICLE_CATES, [data, data.id]);

module.exports = {
  getArtcates,
  getArtcateById,
  getArtcateOne,
  getArtcateByIdNA,
  insertArtcates,
  deleteArtcateOne,
  updateArtcateOne,
}