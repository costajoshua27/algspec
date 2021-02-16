const express = require('express');
const passport = require('passport');
const router = express.Router();

const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middlewares/auth');

// GET
router.get('/me', ensureAuthenticated, userController.me);
router.get('/isAuthenticated', userController.isAuthenticated);

// POST
router.post('/register', userController.register);
router.post('/login', userController.authenticate, userController.login);
router.post('/logout', userController.logout);

module.exports = router;