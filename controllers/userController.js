'use strict';

// DB Controller
const dbController = require('./dbController');

// Helpers
const asyncHandler = require('express-async-handler');
const checkSequelizeError = require('../helpers/checkSequelizeError');

/// USERS CONTROLLER - LOGIC ///

// GET METHODS
// GET method - get the authenticated user
exports.getAuthenticatedUser = async (req, res) => {
  const { user } = req;
  res.json(user);
};

// POST METHODS
// POST method - creates a new user in the database
exports.createUser = asyncHandler(async (req, res, next) => {
  // Try to create the user, if fail, throw an error
  try {
    const user = await dbController.createUser(req.body);

    // If successful
    res.location('/').status(201).end();
  } catch (err) {
    const error = checkSequelizeError(err);
    next(error);
  }
});

// PUT METHODS

// DELETE METHODS
