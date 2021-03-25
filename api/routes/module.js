const express = require('express');
const router = express.Router();

const moduleController = require('../controllers/moduleController');
const { ensureAuthenticated } = require('../middlewares/auth');

// POST
router.post('/create', ensureAuthenticated, moduleController.createModule);
router.post('/update', ensureAuthenticated, moduleController.updateModule);
router.post('/delete', ensureAuthenticated, moduleController.deleteModule);

// GET
router.get('/all', ensureAuthenticated, moduleController.getAllModules);
router.get('/:id', ensureAuthenticated, moduleController.getModule);
router.get('/categories/:categories', ensureAuthenticated, moduleController.getModulesByCategories);

module.exports = router;