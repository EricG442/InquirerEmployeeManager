const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.join(__dirname, '../../.env');
console.log(envPath);

// Default config settings, MySQL password required to use app
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = 3306;
process.env.DB_USER = 'root';
process.env.DB_PASS = '',
process.env.DB_NAME = 'employees_db';

try {
    if(fs.existsSync(envPath)) {
        let res = dotenv.config({path: envPath});
        if(res.error) throw res.error;
        process.env.DB_PASS = res.parsed.DB_PASS;
    };
}catch(err) {
    console.log('\nPlease run \'node dev/init.js\' in your terminal to setup a .env file to use this app');
}

module.exports = process.env;