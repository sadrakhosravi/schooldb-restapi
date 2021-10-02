const path = require('path');
const express = require('express');
const router = express.Router();

const apiRouter = require('./api/api');

// API router
router.use('/api', apiRouter);

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.send('Hello');
});

module.exports = router;
