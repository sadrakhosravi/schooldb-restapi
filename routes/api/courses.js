'use strict';

const path = require('path');
const express = require('express');
const router = express.Router();

// Require Controllers
const courseController = require('../../controllers/courseController');

// Helpers & middleware
const { authenticateUser } = require('../../middleware/authenticateUser');

// GET request for retrieving all courses in the db
router.get('/courses', courseController.getCourses);

// POST request for creating a new course if the user is authenticated
router.post('/courses', authenticateUser, courseController.createCourse);

// GET request for retrieving a single course information based on its id
router.get('/courses/:id', courseController.getCourse);

// PUT request for updating a single course based on the id
router.put('/courses/:id', authenticateUser, courseController.updateCourse);

// PUT request for updating a single course based on the id
router.delete('/courses/:id', authenticateUser, courseController.deleteCourse);

module.exports = router;
