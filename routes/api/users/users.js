// load modules
const path = require('path');
const express = require('express');
const router = express.Router();

// db module
const { User } = require(path.join(process.cwd(), 'models/index'));

// helpers
const asyncHandler = require('express-async-handler');
const { authenticateUser } = require(path.join(process.cwd(), 'middleware/authenticateUser'));

// GET /api/users
// return all properties and values for the currently authenticated User
router.get('/', authenticateUser, async (req, res, next) => {
  const { user } = req;
  res.json(user);
});

// POST /api/users
// creates a new user
router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { firstName, lastName, emailAddress, password } = req.body;

    // try to create the user, if fail, throw an error
    try {
      await User.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // if successful
      res.location('/').status(201).end();
    } catch (err) {
      err.status = 409;
      err.message = 'User already exists';
      next(err);
    }
  }),
);

module.exports = router;
