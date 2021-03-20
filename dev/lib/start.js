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
    
}

class PromptEngine {

    mainMenu() {
        return inquirer.prompt(questions.homeMenu);
    };

    addDepartMenu() {
        return inquirer.prompt(questions.addDepartment);
    };

    addEmployee(roleObj) {

    };
};

module.exports = PromptEngine;