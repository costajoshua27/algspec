const express = require('express');
const router = express.Router();

const algorithmController = require('../controllers/algorithmController');

router.post('/create', algorithmController.createAlgorithm);
router.post('/update', algorithmController.updateAlgorithm);
router.post('/delete', algorithmController.deleteAlgorithm);
router.get('/all', algorithmController.getAllAlgorithms);
router.get('/:name', algorithmController.getAlgorithm);

module.exports = router;