// load module
const path = require('path');
const express = require('express');
const router = express.Router();

// db module
const { Course, User } = require(path.join(process.cwd(), 'models/index'));

// helpers & middleware
const asyncHandler = require('express-async-handler');
const { authenticateUser } = require(path.join(process.cwd(), 'middleware/authenticateUser'));
const checkSequelizeError = require(path.join(process.cwd(), 'helpers/checkSequelizeError'));

// GET /api/courses
// returns all courses including the User associated with each course
router.get('/', async (req, res, next) => {
  const allCourses = await Course.findAll({
    include: [
      {
        model: User,
        attributes: ['firstName', 'lastName', 'emailAddress'],
      },
    ],
  });
  res.json(allCourses);
});

// POST /api/courses
// creates a new course and sets the location URI to the newly created course
router.post(
  '/',
  authenticateUser,
  asyncHandler(async (req, res, next) => {
    try {
      const course = await Course.create(req.body);

      // if successful, redirect to the new course created
      res.location(`/courses/${course.id}`).status(201).end();
    } catch (err) {
      const error = checkSequelizeError(err);
      console.log(error);
      next(error);
    }
  }),
);

// Course routers
// single course based on :id
router.use(require('./course'));

//

module.exports = router;
