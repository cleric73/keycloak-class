var express = require('express');
var router = express.Router();
const protect = require('../middleware/auth')

/* GET users listing. */
router.get('/', function(req, res, next) {
  //console.log(keycloak);
  console.log(req.kauth);
  res.setHeader('content-type', 'text/plain');
  res.send('Access granted to unprotected resource');
});

/* GET users listing. */
router.get('/authenticated', protect(), function(req, res, next) {
  //console.log(keycloak);
  console.log(req.kauth);
  res.setHeader('content-type', 'text/plain');
  res.send('Access granted to protected resource');
});

/* GET users listing. */
router.get('/protected2', protect(['staff']), function(req, res, next) {
  //console.log(req);
  res.setHeader('content-type', 'text/plain');
  res.send('Access granted to protected resource');
});

module.exports = router;
