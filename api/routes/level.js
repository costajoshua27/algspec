const express = require('express');
const router = express.Router();

const levelController = require('../controllers/levelController');
const { ensureAuthenticated } = require('../middlewares/auth');

// GET
router.get('/all', ensureAuthenticated, levelController.getAllLevels);
router.get('/:number', ensureAuthenticated, levelController.getLevel);

// POST
router.post('/create', ensureAuthenticated, levelController.createLevel);
router.post('/update', ensureAuthenticated, levelController.updateLevel);
router.post('/delete', ensureAuthenticated, levelController.deleteLevel);

module.exports = router;