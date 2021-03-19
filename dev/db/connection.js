const mysql = require('mysql');
const config = require('../lib/config.js');

const connection = mysql.createConnection({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME
})

connection.connect( err => {
    if(err) throw err;
    console.log('Connected as ' + connection.threadId);
})

module.exports = connection;