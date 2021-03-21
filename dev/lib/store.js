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

    addEmployee(employeeInfo) {
        return new Promise((res, rej) => {
            let db = this.connection;

            db.query('INSERT INTO employee SET ?', 
            {first_name: employeeInfo.newEmplFirst, 
            last_name: employeeInfo.newEmplLast,
            role_id: employeeInfo.roleId, 
            manager_id: null},
            (error, result) => {
                if(error) rej(error);
                else res(result);
            }
            )
        })
    };

    addRole(roleObj) {
        return new Promise((res, rej) => {
            let db = this.connection;

            db.query('INSERT INTO role SET ?', 
            {title: roleObj.roleName, salary: roleObj.roleSalary, department_id: roleObj.departmentId}, 
            (error, result) => {
                if(error) rej(error);
                else res(result);
            })
        })
    };

    updateEmployeeRole(someObj) {
        return new Promise((res, rej) => {
            this.connection.query('UPDATE employee SET role_id = ? WHERE id = ?', 
            [someObj.roleId, someObj.employeeId],
            (error, result) => {
                if(error) rej(error);
                else res(result);
            });
        })
    };

    updateMangId(someObj) {
        return new Promise((res, rej) => {
            this.connection.query('UPDATE employee SET manager_id = ? WHERE id = ?', 
            [someObj.managerId, someObj.employeeId],
            (error, result) => {
                if(error) rej(error);
                else res(result);
            }
            )
        })
    };

    viewDepartment() {
        return new Promise((res, rej) => {
            this.connection.query('SELECT * FROM department', (error, result) => {
                if(error) rej(error);
                else res(result);
            })
        })
    };

    viewEmployee() {
        return new Promise((res, rej) => {
            this.connection.query('SELECT * FROM employee', (error, result) => {
                if(error) rej(error);
                else res(result);
            })
        })
    };

    viewEmployeeRole() {
        return new Promise((res, rej) => {
            this.connection.query('SELECT * FROM role', (error, result) => {
                if(error) rej(error);
                else res(result);
            })
        })
    };
}

module.exports = new Store;