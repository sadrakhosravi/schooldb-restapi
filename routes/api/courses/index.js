const express = require('express');
const router = express.Router();

// GET /api/courses
// returns all courses including the User associated with each course
router.get('/', async (req, res, next) => {
  res.send('api/users');
});

module.exports = router;
