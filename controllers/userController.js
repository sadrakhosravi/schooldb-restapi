'use strict';

// DB module
const { User } = require('../models');

// Helpers
const asyncHandler = require('express-async-handler');

/// USERS CONTROLLER - LOGIC ///

// GET method - get the authenticated user
exports.getAuthenticatedUser = async (req, res) => {
  const { user } = req;
  res.json(user);
};

// POST method - creates a new user in the database
exports.createUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, emailAddress, password } = req.body;

  // Try to create the user, if fail, throw an error
  try {
    await User.create({
      firstName,
      lastName,
      emailAddress,
      password,
    });

    // If successful
    res.location('/').status(201).end();
  } catch (err) {
    err.status = 409;
    err.message = 'User already exists';
    next(err);
  }
});
