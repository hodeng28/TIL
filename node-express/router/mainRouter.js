const express = require('express');
const router = express.Router();

/* GET main page. */
router.get('/', function (req, res, next) {

  res.render('main', {
    title: '타이틀입니다',
    html: '<h1>H1 태그입니다</h1>',
    json: { 'key': 1000000 }
  });
});

module.exports = router;