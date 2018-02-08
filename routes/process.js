var express = require('express');
var router = express.Router();
var https = require('https');
var c_json = require('../config/default.json')


/* GET home page. */
router.get('/', function (req, res, next) {
  getCamunda();
  res.render('process', {
    title: 'process'
  });
});

function getCamunda() {
  var optionsget = {
    host: c_json.camunda.host,
    // host : 'graph.facebook.com', // here only the domain name
    // (no http/https !)
    port: 8080,
    path: 'engine-rest/process-definition?latest=true', // the rest of the url with parameters if needed
    method: 'GET' // do GET
  };
  //http://192.168.99.100:8080/engine-rest/process-definition?latest=true
  var reqGet = https.request(optionsget, function (res) {
    console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
    //  console.log("headers: ", res.headers);


    res.on('data', function (d) {
      console.info('GET result:\n');
      process.stdout.write(d);
      console.info('\n\nCall completed');
    });

  });

  reqGet.end();
  reqGet.on('error', function (e) {
    console.error(e);
  });

}


module.exports = router;