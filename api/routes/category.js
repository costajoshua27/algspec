const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const { ensureAuthenticated } = require('../middlewares/auth');

// POST
router.post('/create', ensureAuthenticated, categoryController.createCategory);
router.post('/update', ensureAuthenticated, categoryController.updateCategory);
router.post('/delete', ensureAuthenticated, categoryController.deleteCategory);

// GET ('all' route must go first)
router.get('/all', ensureAuthenticated, categoryController.getAllCategories);
router.get('/:id', ensureAuthenticated, categoryController.getCategory);


module.exports = router;