const store = require('./lib/store.js');

store.start().then(res => console.log(res));