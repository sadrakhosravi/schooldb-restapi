// load module
const path = require('path');
const express = require('express');
const router = express.Router();

// db module
const { Course, User } = require(path.join(process.cwd(), 'models/index'));

// helpers
const asyncHandler = require('express-async-handler');

// GET /api/courses/:id
// returns a single course based on the request id parameter
router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  const course = await Course.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ['firstName', 'lastName', 'emailAddress'],
      },
    ],
  });

  // if course does not exist, reply with an error
  if (course) {
    res.json(course);
  } else {
    const err = new Error('Course does not exist');
    err.status = 404;
    next(err);
  }
});

module.exports = router;
