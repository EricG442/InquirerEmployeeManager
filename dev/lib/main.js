const store = require('./store.js');
const start = require('./start.js');
const { updateEmployeeInfo } = require('./store.js');

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
                promise = this.updateEmployee();
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
                            return this.viewDepartments();
                        })
    }

    addEmployee() {
        let employeeObj = {};
        
        return store
                    .viewEmployeeRole()
                    .then(res => {
                        return this.promptUser.addEmployee(res);
                    })
                    .then(res => {
                        return store.addEmployee(res);
                    })
                    .then(res => {
                        employeeObj.employeeId = res.insertId;
                        return store.viewEmployee();
                    })
                    .then(res => {
                        return this.promptUser.addManagToEmp(res);
                    })
                    .then(res => {
                        employeeObj.managerId = res.manager_id;
                        return store.updateMangId(employeeObj);
                    })
                    .then(() => {
                        return this.viewEmployees();
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
                        return this.viewRoles();
                    });
    };

    updateEmployee() {
        let employee = {};

        return store
                    .viewEmployee()
                    .then(res => {
                        return this.promptUser.updateEmployee(res);
                    })
                    .then(res => {
                        employee.employeeId = res.employeeSelection;
                        return this.promptUser.updateChoice()
                    })
                    .then(res => {
                        if(res.whichToUpdate === 'Manager') {
                            return this
                                    .viewEmployees()
                                    .then(res => {return this.promptUser.addManagToEmp(res)})
                                    .then(res => {
                                        employee.managerId = res.manager_id;
                                        return store.updateMangId(employee);
                                    })
                                    .then(() => {
                                        return this.viewEmployees();
                                    })
                        }else if(res.whichToUpdate === 'Role') {
                            console.log('update role for employee id ' + employee.employeeId);
                            return this
                                    .viewRoles()
                                    .then(res => {return this.promptUser.updateEmployeeRole(res)})
                                    .then(res => {
                                        employee.roleId = res.roleSelection;
                                        return store.updateEmployeeRole(employee);
                                    })
                                    .then(() => {
                                        return this.viewEmployees();
                                    })
                        }
                    })
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