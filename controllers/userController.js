'use strict';

// DB module
const { User } = require('../models');

// Helpers
const asyncHandler = require('express-async-handler');

// Creates a new user. POST Method
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
