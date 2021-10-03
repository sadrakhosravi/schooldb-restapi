'use strict';
// DB module
const { Course, User } = require('../models');

// Helpers
const asyncHandler = require('express-async-handler');
const checkSequelizeError = require('../helpers/checkSequelizeError');

/// COURSE CONTROLLER - LOGIC ///

// GET method - retrieves all courses in the database
exports.getCourses = async (req, res, next) => {
  const allCourses = await Course.findAll({
    include: [
      {
        model: User,
        attributes: ['firstName', 'lastName', 'emailAddress'],
      },
    ],
  });
  res.json(allCourses);
};

// POST method - creates a new course and sets the location URI to the newly created course
exports.createCourse = asyncHandler(async (req, res, next) => {
  try {
    const course = await Course.create(req.body);

    // if successful, redirect to the new course created
    res.location(`/courses/${course.id}`).status(201).end();
  } catch (err) {
    const error = checkSequelizeError(err);
    console.log(error);
    next(error);
  }
});

// GET method - returns a single course based on the request id parameter
exports.getCourseById = async (req, res, next) => {
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
};
