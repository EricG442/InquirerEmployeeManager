const inquirer = require('inquirer');

const homeMenu = [
    {
        message: 'Please choose an option',
        name: 'home-menu',
        type: 'list',
        choices: [
            'Add Department',
            'Add Employee',
            'Add Employee Role',
            'Update Employee Info',
            'Delete Department',
            'Delete Employee',
            'Delete Employee Role',
            'Exit'
        ]
    }
]