const jwt = require('jsonwebtoken');
const { TOKEN_SECRET_KEY } = require('../config/index');

const { getArtcates, insertArtcates, getArtcateOne, getArtcateById, deleteArtcateOne, getArtcateByIdNA, updateArtcateOne } = require('../db/artcate');

const {
  ARTICLE_CATES_SUCCESS_MSG, INSERT_ARTICLE_CATES_ERR_MSG, ARTICLE_CATES_ERR_MSG,
  INSERT_ARTICLE_CATES_SUCCESS_MSG, INSERT_ARTICLE_CATES_EXIST_MSG,
  INSERT_ARTICLE_CATES_ALIAS_EXIST_MSG, INSERT_ARTICLE_CATES_NAME_EXIST_MSG,
  ARTICLE_CATES_NOT_FOUND_ERR_MSG, DELETE_ARTICLE_CATES_ERR_MSG, DELETE_ARTICLE_CATES_SUCCESS_MSG,
  UPDATE_ARTICLE_CATES_ALIAS_EXIST_MSG, UPDATE_ARTICLE_CATES_EXIST_MSG, UPDATE_ARTICLE_CATES_NAME_EXIST_MSG,
  UPDATE_ERR_MSG,
  UPDATE_SUCCESS_MSG,
} = require('../config/constant');

exports.getArtcates = (req, res) => {
  try {
    const decode = jwt.verify(req.auth, TOKEN_SECRET_KEY);
    console.log('decode', decode);
  } catch (error) {
    console.log('error', error);
  }
  getArtcates().then(results => {
    res.cc({ code: 200, msg: ARTICLE_CATES_SUCCESS_MSG, data: results });
  });
}

exports.getArtcateById = (req, res) => {
  getArtcateById(req.params.id).then(results => {
    if (results.length !== 1) {
      return res.cc({ code: 1002, msg: ARTICLE_CATES_ERR_MSG });
    }
    res.cc({ code: 200, msg: ARTICLE_CATES_SUCCESS_MSG, data: results[0] });
  });
}

exports.addArtcate = (req, res) => {
  const { name, alias } = req.body;
  getArtcateOne(req.body).then(results => {
    if (results.length === 2) {
      return res.cc({ code: 1002, msg: INSERT_ARTICLE_CATES_EXIST_MSG });
    }
    
    if (results.length === 1 && name === results[0].name && alias === results[0].alias) {
      return res.cc({ code: 1002, msg: INSERT_ARTICLE_CATES_EXIST_MSG });
    }
    
    if (results.length === 1 && name === results[0].name) {
      return res.cc({ code: 1002, msg: INSERT_ARTICLE_CATES_NAME_EXIST_MSG });
    }
    
    if (results.length === 1 && alias === results[0].alias) {
      return res.cc({ code: 1002, msg: INSERT_ARTICLE_CATES_ALIAS_EXIST_MSG });
    }

    insertArtcates(req.body).then(results => {
      if (results.affectedRows !== 1) {
        return res.cc({ code: 1002, msg: INSERT_ARTICLE_CATES_ERR_MSG });
      }
      res.cc({ code: 200, msg: INSERT_ARTICLE_CATES_SUCCESS_MSG });
    });
  });
}

exports.deleteArtcate = (req, res) => {
  const { id } = req.body;
  getArtcateById(id).then(results => {
    if (results.length === 0) {
      return res.cc({ code: 1002, msg: ARTICLE_CATES_NOT_FOUND_ERR_MSG });
    }

    deleteArtcateOne(id).then(results => {
      if (results.affectedRows !== 1) {
        return res.cc({ code: 1002, msg: DELETE_ARTICLE_CATES_ERR_MSG });
      }
      res.cc({ code: 200, msg: DELETE_ARTICLE_CATES_SUCCESS_MSG });
    });
  });
}

exports.updateArtcate = (req, res) => {
  const { name, alias } = req.body;
  getArtcateByIdNA(req.body).then(results => {
    if (results.length === 2) {
      return res.cc({ code: 1002, msg: UPDATE_ARTICLE_CATES_EXIST_MSG });
    }
    
    if (results.length === 1 && name === results[0].name && alias === results[0].alias) {
      return res.cc({ code: 1002, msg: UPDATE_ARTICLE_CATES_EXIST_MSG });
    }
    
    if (results.length === 1 && name === results[0].name) {
      return res.cc({ code: 1002, msg: UPDATE_ARTICLE_CATES_NAME_EXIST_MSG });
    }
    
    if (results.length === 1 && alias === results[0].alias) {
      return res.cc({ code: 1002, msg: UPDATE_ARTICLE_CATES_ALIAS_EXIST_MSG });
    }
    
    updateArtcateOne(req.body).then(results => {
      if (results.affectedRows !== 1) {
        return res.cc({ code: 1002, msg: UPDATE_ERR_MSG });
      }
      res.cc({ code: 200, msg: UPDATE_SUCCESS_MSG });
    });
  });
}