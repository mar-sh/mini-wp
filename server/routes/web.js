const express = require('express');

const entryRoute = require('./entry');
const articleRoute = require('./article');
const miscRoute = require('./misc');

const { errorhandler } = require('../middlewares/errorhandler');

const router = express.Router();

router.use('/', entryRoute);
router.use('/articles', articleRoute);
router.use('/users/content', miscRoute);
router.use(errorhandler);

module.exports = router;