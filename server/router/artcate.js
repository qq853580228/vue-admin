const express = require('express');
const expressJoi = require('@escook/express-joi');
const router = express.Router();

const artcateHandler = require('../router_handler/artcate');

const { insert_art_cate_schema, delete_art_cate_schema, query_art_cate_schema, update_art_cate_schema } = require('../schema/artcate');

router.get('/cate', artcateHandler.getArtcates);

router.get('/cate/:id', expressJoi(query_art_cate_schema), artcateHandler.getArtcateById);

router.post('/addcate', expressJoi(insert_art_cate_schema), artcateHandler.addArtcate);

router.post('/deletecate', expressJoi(delete_art_cate_schema), artcateHandler.deleteArtcate);

router.post('/updatecate', expressJoi(update_art_cate_schema), artcateHandler.updateArtcate);

module.exports = router;