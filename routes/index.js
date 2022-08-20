var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.end("Welcome to Track Your Money");
});

module.exports = router;
