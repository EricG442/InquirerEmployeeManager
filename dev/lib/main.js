const store = require('./store.js');
const start = require('./start.js');

class Main {
    constructor() {
        this.prompt = new start();
    }

    testConnection() {
        console.log(store.connection);
        store
            .start()
            .then(() => console.log('successfully connected'))
            .then(() => store.end());
    };

    run = () => {
        store
            .start()
            .then(() => this.runMainMenu())
            .catch(err => console.log(err))
            .finally(() => store.end());
    };

    runMainMenu() {
        this.prompt.mainMenu().then(response => {
            let answer = response.mainMenu;
            let promise;

            if(answer === 'Add Department') {
                promise = this.addDepartment();
            }

            return promise.then(res => console.log(res))
        });
    };

    addDepartment() {
        return this.prompt
                        .addDepartMenu()
                        .then(res => store.addDepartment(res));
    }

    addEmployee() {
        return this.prompt
    };

    addEmployeeRole() {};

    display(response) {
        console.table(response)
    }
}

module.exports = Main;