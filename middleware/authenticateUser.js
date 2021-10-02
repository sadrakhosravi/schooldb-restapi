'use strict';

// load modules
const path = require('path');
const bcrypt = require('bcryptjs');
const auth = require('basic-auth');

// db model
const { User } = require(path.join(__dirname, '../models/index'));

/**
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function that gets called to run the next middleware
 */
exports.authenticateUser = async (req, res, next) => {
  // parse user's credential from the Authorization header
  const credential = auth(req);

  let message = '';

  if (credential) {
    const user = await User.findOne({ where: { emailAddress: credential.name }, raw: true });

    // if user exits, check their password
    if (user) {
      const isAuthenticated = bcrypt.compareSync(credential.pass, user.password);

      // if user's password is valid
      if (isAuthenticated) {
        req.user = user;
      } else {
        message = 'Your password is incorrect, please try again.';
      }
    } else {
      message = `User: ${credential.name} was not found! Please try again.`;
    }
  } else {
    message = 'No authentication found.';
  }

  // if an error has occurred throw an error, else continue with the user
  if (message) {
    const err = new Error(message + ' Access denied!');
    err.status = 401;
    next(err);
  } else {
    next();
  }
};
