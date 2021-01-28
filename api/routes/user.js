const express = require('express');
const passport = require('passport');
const router = express.Router();

const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middlewares/auth');

router.get('/me', ensureAuthenticated, userController.me);
router.get('/isAuthenticated', userController.isAuthenticated);
router.post('/register', userController.register);
router.post('/login', userController.authenticate, userController.login);
router.post('/logout', userController.logout);
router.post('/level/create', userController.createLevel);

module.exports = router;