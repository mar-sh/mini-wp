const express = require('express');

const controller = require('../controllers/article');
const imageMiddleware = require('../middlewares/image');
const authMiddleware = require('../middlewares/auth');

const {
  upload,
  sendUploadToGCS,
} = imageMiddleware;

const {
  userAuthentication,
  articleOwnership,
} = authMiddleware;

const {
  postCreateArticle,
  getArticlesByQueries,
  getSearchedArticles,
  getArticleBySlug,
  getArticleById,
  putEditArticlesById,
  deleteArticleById
} = controller;

const router = express.Router();

router.post('/', userAuthentication, upload.single('image'), sendUploadToGCS, postCreateArticle);
router.get('/', getArticlesByQueries);
router.get('/search', getSearchedArticles);
router.get('/:id/:slug', getArticleBySlug);
router.get('/:id', userAuthentication, articleOwnership, getArticleById);
router.put('/:id', userAuthentication, upload.single('image'), sendUploadToGCS, putEditArticlesById);
router.delete('/:id', userAuthentication, articleOwnership, deleteArticleById);

module.exports = router;