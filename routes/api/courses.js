// load module
const path = require('path');
const express = require('express');
const router = express.Router();

// Require Controllers
const courseController = require('../../controllers/courseController');

// helpers & middleware
const { authenticateUser } = require('../../middleware/authenticateUser');

// GET request for retrieving all courses in the db
router.get('/courses', courseController.getCourses);

// POST /api/courses
router.post('/courses', authenticateUser, courseController.createCourse);

// GET /api/courses/:id
router.get('/courses/:id', courseController.getCourseById);

module.exports = router;
