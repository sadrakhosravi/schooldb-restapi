'use strict';

// DB Controller
const dbController = require('./dbController');

// Helpers
const asyncHandler = require('../helpers/asyncHandler');

/// USERS CONTROLLER - LOGIC ///

// GET METHODS
// GET method - get the authenticated user
exports.getAuthenticatedUser = async (req, res) => {
  const { firstName, lastName, emailAddress } = req.user;
  res.json({
    firstName,
    lastName,
    emailAddress,
  });
};

// POST METHODS
// POST method - creates a new user in the database
exports.createUser = asyncHandler(async (req, res, next) => {
  // Try to create the user, if fail, throw an error
  const user = await dbController.createUser(req.body);
  // If successful
  res.location('/').status(201).end();
});
