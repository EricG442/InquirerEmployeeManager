const inquirer = require('inquirer');

const questions = {
    homeMenu: [
        {
            message: 'Please choose an option',
            name: 'mainMenu',
            type: 'list',
            choices: [
                'Add Department',
                'Add Employee',
                'Add Employee Role',
                'Update Employee Info',
                'View Department\'s',
                'View Employee\'s',
                'View Employee Role\'s',
                'Exit'
            ]
        } 
    ],

    addDepartment: [
        {
            message: 'Please enter the name of the department you would like to add',
            name: 'newDepartment',
            type: 'input'
        }
    ],

    addEmployee: [
        {
            message: 'Please enter the first name of the employee you would like to add',
            name: 'newEmplFirst',
            type: 'input'
        },
        {
            message: 'Please enter the last name of the employee you would like tp add',
            name: 'newEmplLast',
            type: 'input'
        },
    ],

    addEmployeeRole: [
        {
            message: 'Please enter the name of the role you would like to add',
            name: 'roleName',
            type: 'input'
        },
        {
            message: 'Please enter the the salary for the role you would like to add',
            name: 'roleSalary',
            type: 'number',
            validate: value => {
                return !isNaN(value) ? true : 'Please enter a valid number';
            }
        }
    ]
}

class PromptEngine {

    mainMenu() {
        return inquirer.prompt(questions.homeMenu);
    };

    addDepartMenu() {
        return inquirer.prompt(questions.addDepartment);
    };

    addEmployeeRole(roleObj) {
        return inquirer.prompt([...questions.addEmployeeRole, {
                    message: 'Department question goes here',
                    name: 'departmentId',
                    type: 'list',
                    choices:  roleObj.map(department => {return {name: department.name, value: department.id}})
        }])
    };

    addEmployee(roleObj) {
        return inquirer.prompt([...questions.addEmployee, {
                    message: 'Please select a role to asign your new employee',
                    name: 'roleId',
                    type: 'list',
                    choices: roleObj.map(role => {return {name: role.title, value: role.id}})
                }])
    }

    addManagToEmp(employeeList) {
        employeeList.push(
            {
                id: null,
                first_name: 'No',
                last_name: 'Manager',
                role_id: 'NA'
            }
        )
        
        return inquirer
                    .prompt([{
                        message: 'Please choose a manager for your new employee or select \'NA\' if there is no manager for your employee',
                        name: 'manager_id',
                        type: 'list',
                        choices: employeeList.map(worker => {
                            return {
                                name: `${worker.first_name} ${worker.last_name}, role_id=${worker.role_id}`,
                                value: worker.id
                            }
                        })
                    }])
    };

    updateEmployee() {
        
    }
};

module.exports = PromptEngine;