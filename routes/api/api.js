const express = require('express');
const router = express.Router();

const usersRouter = require('./users/users');
const coursesRouter = require('./courses/courses');

/* GET /api */
router.get('/', async (req, res, next) => {
  res.send('api');
});

// API routers
router.use('/users', usersRouter);
router.use('/courses', coursesRouter);

module.exports = router;
