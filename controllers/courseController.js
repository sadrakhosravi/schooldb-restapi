'use strict';
// DB module
const { Course, User } = require('../models');

// DB Controller
const dbController = require('./dbController');

// Helpers
const asyncHandler = require('../helpers/asyncHandler');

/// COURSE CONTROLLER - LOGIC ///

// GET METHODS
// GET method - retrieves all courses in the database
exports.getCourses = async (_req, res) => {
  const allCourses = await dbController.getAllCourses();
  res.json(allCourses);
};

// GET method - returns a single course based on the request id parameter
exports.getCourse = async (req, res, next) => {
  const course = await dbController.getCourseById(req.params.id);

  // If course does not exist, reply with an error
  if (course) {
    res.json(course);
  } else {
    const err = new Error('Course does not exist');
    err.status = 404;
    err.type = 'Not Found';
    next(err);
  }
};

// POST METHODS
// POST method - creates a new course and sets the location URI to the newly created course
exports.createCourse = asyncHandler(async (req, res, next) => {
  const course = await dbController.createCourse(req.body);
  // If successful, redirect to the new course created
  res.location(`/courses/${course.id}`).status(201).end();
});

// PUT METHODS
// PUT method - update a course by its id
exports.updateCourse = asyncHandler(async (req, res, next) => {
  await dbController.updateCourse(req.body, req.params.id);
  // If successful, redirect to the new course created
  res.status(204).end();
});

// DELETE METHODS
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const authenticatedUserId = req.user.id;
  const courseId = req.params.id;
  const course = await dbController.getCourseById(courseId);

  // If the authenticated user is not the owner of the course throw an authentication error
  if (course.userId !== authenticatedUserId) {
    const error = new Error();
    error.type = 'Authentication Error';
    error.message = ['Access denied! You are not the owner of the course'];
    error.status = 403;
    next(error);
  } else {
    // Delete the course and send the response
    course.destroy();
    res.status(204).end();
  }
});
