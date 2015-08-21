var express = require('express');
var path = require("path");
var router = express.Router();
var url = require('url');


/* GET home page. */
router.get('/', function(request, res, next) {
  var url_parts = url.parse(request.url, true);
  var query = url_parts.query;
  // console.log('GET /');
  console.log(query);
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

module.exports = router;
