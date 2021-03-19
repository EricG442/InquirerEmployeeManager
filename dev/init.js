const inquirer = require('inquirer');
const fs = require('fs');
const config = require('../dev/lib/config.js');
const path = require('path');

const dbSetup = () => {
    let setup = [
        {
            name: 'db_pass',
            message: 'Please enter your MySQL password to be able to fully use the app',
            type: 'input'
        }
    ];

    inquirer
        .prompt(setup)
        .then(res => {
            let envVar = `DB_PASS = ${res.db_pass}`;
            console.log(envVar);
            fs.writeFile('./.env', envVar, err => {
                if(err) throw err;
                console.log('\nConfig file created successfully');
            })
        });
};

if(!config.DB_PASS) {
    dbSetup();
}else {
    console.log('\nConfig file already setup')
}
