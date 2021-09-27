const express = require('express');
const router = express.Router();

const usersRouter = require('./users/index');
const coursesRouter = require('./courses/index');

/* GET /api */
router.get('/', async (req, res, next) => {
  res.send('api');
});

// API routers
router.use('/users', usersRouter);
router.use('/courses', coursesRouter);

module.exports = router;
