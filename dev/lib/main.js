const store = require('./store.js');
const start = require('./start.js');
const fs = require('fs');
const { runInThisContext } = require('vm');

class Main {
    constructor() {
        this.promptUser = new start();
    }

    run = () => {
        store
            .start()
            .then(() => this.runMainMenu())
            .catch(err => console.log(err))
    };

    runMainMenu() {
        this.promptUser.mainMenu().then(response => {
            let answer = response.mainMenu;
            let promise;

            if(answer === 'Add Department') {
                promise = this.addDepartment();
            }else if(answer === 'Add Employee Role') {
                promise = this.addEmployeeRole();
            }else if(answer === 'Add Employee') {
                promise = this.addEmployee();
            }else if(answer === 'View Department\'s') {
                promise = this.viewDepartments();
            }else if(answer === 'View Employee Role\'s') {
                promise = this.viewRoles();
            }else if(answer === 'View Employee\'s') {
                promise = this.viewEmployees();
            }else if(answer === 'Update Employee Info') {

            }else if(answer === 'Exit') {
                return store.end();
            }

            return promise
                    .then(res => this.display(res))
                    .then(() => this.runMainMenu());
        });
    };

    addDepartment() {
        return this.promptUser
                        .addDepartMenu()
                        .then(res => {
                            return store.addDepartment(res)
                        })
                        .then(() => {
                            return store.viewDepartment();
                        })
    }

    addEmployee() {
        return store
                    .viewEmployeeRole()
                    .then(res => {
                        return this.promptUser.addEmployee(res);
                    })
                    .then(res => {
                        return store.addEmployee(res);
                    })
                    .then(() => {
                        return store.viewEmployee();
                    })
    };

    addEmployeeRole() {
        return store
                    .viewDepartment()
                    .then(res => {
                        return this.promptUser.addEmployeeRole(res);
                    })
                    .then(res => {
                        return store.addRole(res)
                    })
                    .then(() => {
                        return store.viewEmployeeRole();
                    });
    };

    updateEmployee() {
        return 
    }

    viewDepartments() {
        return store.viewDepartment();
    }

    viewRoles() {
        return store.viewEmployeeRole();
    }

    viewEmployees() {
        return store.viewEmployee();
    }

    display(response) {
        console.table(response)
    }
}

module.exports = Main;