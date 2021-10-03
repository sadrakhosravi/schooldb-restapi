// load modules
const path = require('path');
const express = require('express');
const router = express.Router();

// Require Controllers
const userController = require('../../controllers/userController');

// Require Middleware
const { authenticateUser } = require('../../middleware/authenticateUser');

/// API USERS ROUTES ///

// GET request for getting the authenticated user's information
router.get('/users', authenticateUser, async (req, res, next) => {
  const { user } = req;
  res.json(user);
});

// POST request for creating a new user
router.post('/users', userController.createUser);

module.exports = router;
