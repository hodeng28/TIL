const express = require('express');
const router = express.Router();
const db = require('../model/db')

/* GET user page. */
router.get('/', function (req, res, next) {

  res.render('user');
});

router.post('/create', async (req, res) => {

})

router.get('/list', async (req, res) => {

})

router.post('/update', async (req, res) => {

})


module.exports = router;