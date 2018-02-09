var express = require('express');
var router = express.Router();
var https = require('https');
var c_json = require('../config/default.json')
var request = require('request-promise');


/* GET home page. */
router.get('/', function (req, res, next) {
  getCamunda(res);
  res.render('process', {
    title: 'process'
  });
});

function getCamunda(res) {
  var options = {
    uri: c_json.camunda.host + ":8080/engine-rest/process-definition?latest=true",
    // qs: {
    //     access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
    // },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
  };
  request(options)
    .then(function (repos) {
      showProcesses(repos,res);
    })
    .catch(function (err) {
      console.log("ERROR %s", err);
      // API call failed...    
    })
}
//http://192.168.99.100:8080/engine-rest/process-definition?latest=tru


function showProcesses(processList,res){
  //console.log(JSON.stringify(processList));
  res.render('process', { pList : processList });
}


module.exports = router;