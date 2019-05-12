const express = require('express');

const controller = require('../controllers/misc');
const imageMiddleware = require('../middlewares/image');

const {
  upload,
  sendUploadToGCS,
} = imageMiddleware;

const {
  postCreateImageUrl,
  getAllTags
} = controller;


const router = express.Router();

router.post('/image', upload.single('file'), sendUploadToGCS, postCreateImageUrl);
router.get('/tags', getAllTags);

module.exports = router;