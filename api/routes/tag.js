const express = require('express');
const router = express.Router();

const tagController = require('../controllers/tagController');
const { ensureAuthenticated } = require('../middlewares/auth');

router.post('/create', ensureAuthenticated, tagController.createTag);
router.post('/update', ensureAuthenticated, tagController.updateTag);
router.post('/delete', ensureAuthenticated, tagController.deleteTag);
router.get('/all', ensureAuthenticated, tagController.getAllTags);
router.get('/:name', ensureAuthenticated, tagController.getTag);

module.exports = router;