// load modules
const path = require('path');
const express = require('express');
const router = express.Router();

// db module
const { User } = require(path.join(process.cwd(), 'models/index'));

// helpers
const asyncHandler = require('express-async-handler');

// GET /api/users
// return all properties and values for the currently authenticated User
router.get('/', async (req, res, next) => {
  const allUsers = await User.findAll({ raw: true });
  res.json(allUsers);
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
      res.status(201).end();
    } catch (err) {
      next(err);
    }
  }),
);

module.exports = router;
