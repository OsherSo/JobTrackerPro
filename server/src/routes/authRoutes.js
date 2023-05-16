const express = require('express');

const authenticateUser = require('../middleware/auth');
const authController = require('../controllers/authController');

const router = express.Router();

// Public
router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

// Private
router.route('/updateUser').patch(authenticateUser, authController.updateUser);

module.exports = router;
