const config = require('./config.js');
const mysql = require('mysql');
const path = require('path');

class Store {
    constructor() {
        if(!config.DB_PASS)
            throw new Error('Missing MySQL database password! Please run the setup command');

            this.connection = mysql.createConnection({
                host: config.DB_HOST,
                port: config.DB_PORT,
                user: config.DB_USER,
                password: config.DB_PASS,
                database: config.DB_NAME
            })
    }

    test() {
        let db = this.connection;
        db.connect(err => {
            if(err) throw err;
            console.log('connected as thread id ' + db.threadId);
        })
    };

    start() {
        return new Promise((res, rej) => {
            let db = this.connection;
            
            db.connect(err => {
                if(err) rej(err)
                else res();
                console.log('Connected as thread ' + db.threadId);
            })
        });
    };

    end() {
        this.connection.end();
    };

    addDepartment() {
        return new Promise((res, rej) => {
            let db = this.connection;

            res(console.log(db, '\nAdd department path was hit'));
        })
    };

    addEmployee() {
        return new Promise((res, rej) => {
            let db = this.connection;

            res(console.log(db, '\nAdd employee path was hit'));
        })
    };

    addRole() {
        return new Promise((res, rej) => {
            let db = this.connection;

            res(console.log(db, '\nAdd role path was hit'));
        })
    };
}

module.exports = new Store;