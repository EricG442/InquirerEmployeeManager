const store = require('./store.js');
const start = require('./start.js');

const run = () => {
    store
        .start()
        .then(res => console.log(res))
        .catch(err => console.log(err))
        .finally(() => store.end());
};

run();