var express = require('express');
var router = express.Router();
const couchbase = require('couchbase');

const Expense = require('../models/expense');
const exp = require('constants');
const addExpense = require('../controllers/expenseController');
const { get } = require('http');

var result;
// let collection_default = {};

/* GET accounts listing. */
router.get('/expenses', function(req, res, next) {
    getExpense()
    .then(
        res.send(result)
    );
});

router.post('/expenses', function(req, res, next) {
    setExpense(req)
    .then(
        res.send(transaction)
    )
})

async function getExpense() {
    
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

    getExpense(cluster);

}

async function setExpense(req) {
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

    let expense = new Expense();

    expense.setName(req.body.name);
    expense.setDescription(req.body.description)
    expense.setDate(req.body.date)
    expense.setTime(req.body.time)
    expense.setAmount(req.body.amount)
    expense.setCategory(req.body.category)

    addExpense(cluster, expense);
}

module.exports = router;
