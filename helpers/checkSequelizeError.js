'use strict';

/**
 * Checks if the error was thrown by sequelize and responds accordingly.
 * @param {Object} error
 */
module.exports = error => {
  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeForeignKeyConstraintError') {
    error.status = 400;
    return error;
  } else {
    return error;
  }
};
