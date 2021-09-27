// load module
const path = require('path');
const express = require('express');
const router = express.Router();

// db module
const { Course } = require(path.join(process.cwd(), 'models/index'));

// GET /api/courses
// returns all courses including the User associated with each course
router.get('/', async (req, res, next) => {
  const allCourses = await Course.findAll({ raw: true });
  res.json(allCourses);
});

// API routers

// single course based on :id
router.use(require('./course'));

//

module.exports = router;
