'use strict';

// DB module
const { Course, User } = require('../models');

/// COURSE DB LOGIC ///

// Find all courses
exports.getAllCourses = async () => {
  return await Course.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: [
      {
        model: User,
        attributes: ['firstName', 'lastName', 'emailAddress'],
      },
    ],
  });
};

// Find a single course
exports.getCourseById = async id => {
  return await Course.findByPk(id, {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: [
      {
        model: User,
        attributes: ['firstName', 'lastName', 'emailAddress'],
      },
    ],
  });
};

// Create a course
exports.createCourse = async courseData => {
  return await Course.create(courseData);
};

// Update a course
exports.updateCourse = async (updatedData, id) => {
  return await Course.update(updatedData, {
    where: {
      id: id,
    },
  });
};

// Delete a course
exports.deleteCourse = async id => {
  return await Course.destroy({
    where: {
      id: id,
    },
  });
};

/// USER DB LOGIC ///

// Create a new user
exports.createUser = async userData => await User.create(userData);
