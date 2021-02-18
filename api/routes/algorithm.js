const express = require('express');
const router = express.Router();

const algorithmController = require('../controllers/algorithmController');
const { ensureAuthenticated } = require('../middlewares/auth');

// GET
router.get('/all', ensureAuthenticated, algorithmController.getAllAlgorithms);
router.get('/:name', ensureAuthenticated, algorithmController.getAlgorithm);
router.get('/tags/:tagNames', ensureAuthenticated, algorithmController.getAlgorithmsByTags);
router.post('/create', ensureAuthenticated, algorithmController.createAlgorithm);

// POST
router.post('/update', ensureAuthenticated, algorithmController.updateAlgorithm);
router.post('/delete', ensureAuthenticated, algorithmController.deleteAlgorithm);

module.exports = router;