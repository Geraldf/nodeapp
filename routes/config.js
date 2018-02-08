var express = require('express');
var router = express.Router();
var config = require('config');
var c_json = require('../config/default.json')
const fs = require('fs');

/* GET config page. */
router.get('/', function(req, res, next) {
  res.render('config', { title: 'Config', conf:c_json });
});


// POST method route
router.post('/', function (req, res) {
  var host=req.body.host;
  config.camunda.host = host;
  fs.writeFileSync(__dirname+'/../config/default.json', JSON.stringify(config));
  res.render('config', { title: 'Config', conf:config });
})
module.exports = router;
