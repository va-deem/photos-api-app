const express = require('express');

const router = express.Router();
require('dotenv').config();

/* GET home page. */
router.get('/', async (req, res) => {
  res.redirect('/sets');
});

module.exports = router;
