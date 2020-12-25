const express = require('express');
const router = express.Router();

const algorithmController = require('../controllers/algorithmController');

router.post('/create', algorithmController.createAlgorithm);
router.post('/update', algorithmController.updateAlgorithm);

module.exports = router;