import uuidv1  from 'uuid/v1';

// const uuidv1 = require('uuid/v1');


module.exports = {
    uuid() {
        return uuidv1();
    },
}