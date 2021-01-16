const express = require('express');
const router = express.Router();

const algorithmController = require('../controllers/algorithmController');
const { ensureAuthenticated } = require('../middlewares/auth');

router.post('/create', ensureAuthenticated, algorithmController.createAlgorithm);
router.post('/update', ensureAuthenticated, algorithmController.updateAlgorithm);
router.post('/delete', ensureAuthenticated, algorithmController.deleteAlgorithm);
router.get('/all', ensureAuthenticated, algorithmController.getAllAlgorithms);
router.get('/tag/:tagName', ensureAuthenticated, algorithmController.getAlgorithmsByTag);
router.get('/tags/:tagNames', ensureAuthenticated, algorithmController.getAlgorithmsByTags);
router.get('/:name', ensureAuthenticated, algorithmController.getAlgorithm);

module.exports = router;