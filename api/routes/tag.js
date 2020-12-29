const express = require('express');
const router = express.Router();

const tagController = require('../controllers/tagController');

router.post('/create', tagController.createTag);
router.post('/update', tagController.updateTag);
router.post('/delete', tagController.deleteTag);
router.get('/all', tagController.getAllTags);
router.get('/:name', tagController.getTag);

module.exports = router;