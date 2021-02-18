const express = require('express');
const router = express.Router();

const tagController = require('../controllers/tagController');
const { ensureAuthenticated } = require('../middlewares/auth');

// GET ('all' route must go first)
router.get('/all', ensureAuthenticated, tagController.getAllTags);
router.get('/:name', ensureAuthenticated, tagController.getTag);

// POST
router.post('/create', ensureAuthenticated, tagController.createTag);
router.post('/update', ensureAuthenticated, tagController.updateTag);
router.post('/delete', ensureAuthenticated, tagController.deleteTag);

module.exports = router;