const express = require('express');
const controller = require('../controllers/entry');

const { loginMethod } = require('../middlewares/auth');
const {
  postRegister,
  postUserLogin,
} = controller;

const router = express.Router();

router.post('/register', postRegister);
router.post('/login', loginMethod, postUserLogin);

module.exports = router;