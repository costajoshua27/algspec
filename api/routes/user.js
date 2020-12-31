const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/me', userController.me);
router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.post('/logout', userController.logout);