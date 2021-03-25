const express = require('express');
const router = express.Router();

const exerciseController = require('../controllers/exerciseController');
const { ensureAuthenticated } = require('../middlewares/auth');

// POST
router.post('/create', ensureAuthenticated, exerciseController.createExercise);
router.post('/update', ensureAuthenticated, exerciseController.updateExercise);
router.post('/delete', ensureAuthenticated, exerciseController.deleteExercise);

// GET


module.exports = router;