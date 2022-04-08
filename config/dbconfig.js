const {Pool} = require("pg");
const client = new Pool({
    user: 'postgres',
/*    host: '54.37.14.244',*/
    host: 'db',
    database: 'postgres',
    password: 'docker',
    port: 5432,
});

module.exports = client;