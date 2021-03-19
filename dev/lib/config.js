const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../../.env');
console.log(envPath);

// Default config settings, MySQL pass required to use app
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = 3306;
process.env.DB_USER = 'root';
process.env.DB_PASS = '',
process.env.DB_NAME = 'employees_db';

try {
    if(fs.existsSync(envPath));
}catch(err) {
    console.log('\nPlease run \'node dev/init.js\' in your terminal to setup a .env file to use this app');
}

module.exports = process.env;