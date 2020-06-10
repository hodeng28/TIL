const express = require('express');
const router = express.Router();

/* GET user page. */
router.get('/', function (req, res, next) {
  res.render('user');
});

module.exports = router;