var express = require('express');
var router = express.Router();
const couchbase = require('couchbase');
const crypto = require('crypto'); 

var Transaction = require('../models/transaction');

var transaction;
// let collection_default = {};

/* GET accounts listing. */
router.get('/', function(req, res, next) {
  connect()
//   .then(
//     getTransactions()
//   )
  .then(
    res.send(transaction)
  );
});

router.post('/', function(req, res, next) {
    store()
    .then(
        res.send(transaction)
    )
})

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

  var qs = `SELECT expenses.* from \`tym\`.transactions.expenses`;

  transaction = await cluster.query(qs);

}

async function store() {
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

  const scope = bucket.scope('transactions');

  const transactionsCollection = scope.collection('expenses');

  let uuid = crypto.randomUUID();

  await transactionsCollection.upsert(uuid, new Transaction());

  transaction = await transactionsCollection.get(uuid);
}

module.exports = router;
