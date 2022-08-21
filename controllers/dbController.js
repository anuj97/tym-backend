function connectToDatabase() {
    const clusterConnStr = 'couchbase://localhost';
    const certificate = '/cert/path/cert.pem';
    const username = 'Administrator';
    const password = 'admin10';

    const cluster = await couchbase.connect(clusterConnStr, {
        username: username,
        password: password,
        // Uncomment if you require a secure cluster connection (TSL/SSL).
        // This is strongly recommended for production use.
        // security: {
        //   trustStorePath: certificate,
        // },
    });

    return cluster;
}

module.exports = connectToDatabase;