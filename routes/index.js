const express = require('express');
const router = express.Router();

const apiRouter = require('./api/index');

// API router
router.use('/api', apiRouter);

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.send('Hello');
});

module.exports = router;
