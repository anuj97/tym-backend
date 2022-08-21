const crypto = require('crypto');

BUCKET_NAME = 'tym';
SCOPE = 'transactions';
COLLECTION = 'expenses'

async function getExpense(cluster) {
    var qs = `SELECT expenses.* from \`tym\`.transactions.expenses`;

    transaction = await cluster.query(qs);

    result = transaction.rows;
}

async function addExpense(cluster, expense) {
    const bucket = cluster.bucket(BUCKET_NAME);
    const scope = bucket.scope(SCOPE);
    const transactionsCollection = scope.collection(COLLECTION);

    let uuid = crypto.randomUUID();

    await transactionsCollection.upsert(uuid, expense);
}

module.exports = addExpense | getExpense;