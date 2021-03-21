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


    start() {
        return new Promise((res, rej) => {
            let db = this.connection;
            
            db.connect(err => {
                if(err) rej(err)
                else res();
            })
        });
    };

    end() {
        this.connection.end();
    };

    addDepartment(obj) {
        return new Promise((res, rej) => {
            let db = this.connection;

            db.query('INSERT INTO department SET ?', {name: obj.newDepartment}, (error, result) => {
                if(error) rej(error);
                res(result);
                console.log(`\nAdding ${obj.newDepartment} to departments`);
            })
            
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

    updateEmployeeInfo() {};

    viewDepartment() {
        return new Promise((res, rej) => {
            this.connection.query('SELECT * FROM department', (error, result) => {
                if(error) rej(error);
                else res(result);
            })
        })
    };

    viewEmployee() {};

    viewEmployeeRole() {};
}

module.exports = new Store;