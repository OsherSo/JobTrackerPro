const express = require('express');
const rateLimiter = require('express-rate-limit');

const authenticateUser = require('../middleware/auth');
const authController = require('../controllers/authController');

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

const router = express.Router();

// Public
router.route('/register').post(apiLimiter, authController.register);
router.route('/login').post(apiLimiter, authController.login);

// Private
router.route('/updateUser').patch(authenticateUser, authController.updateUser);
router
  .route('/getCurrentUser')
  .get(authenticateUser, authController.getCurrentUser);

module.exports = router;
