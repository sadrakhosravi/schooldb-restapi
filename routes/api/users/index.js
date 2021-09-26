const express = require('express');
const router = express.Router();

// GET /api/users
// return all properties and values for the currently authenticated User
router.get('/', async (req, res, next) => {
  res.send('api/users');
});

module.exports = router;
