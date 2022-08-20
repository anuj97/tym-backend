var express = require('express');
var router = express.Router();
const couchbase = require('couchbase');

/* GET accounts listing. */
router.get('/', function(req, res, next) {
  connect();
  res.send(accounts);
});

async function connect() {
  

const clusterConnStr = 'couchbase://localhost';
const certificate = '/cert/path/cert.pem';
const username = 'Administrator';
const password = 'admin10';
const bucketName = 'tym';

const cluster = await couchbase.connect(clusterConnStr, {
  username: username,
  password: password,
  // Uncomment if you require a secure cluster connection (TSL/SSL).
  // This is strongly recommended for production use.
  // security: {
  //   trustStorePath: certificate,
  // },
});

const bucket = cluster.bucket(bucketName);

const collection_default = bucket.defaultCollection(); 

accounts = await collection_default.get('accounts');
}

var accounts;

module.exports = router;
