// setup postgresql configuration
const Pool = require('pg').Pool;
const bcrypt = require('bcrypt');
const client = new Pool({
    user: 'doryan',
    host: 'localhost',
    database: 'quote',
    password: 'MonDxwnkl88',
    port: 5432,
});

const createUser = (request, response) => {
    console.log("register,request.body", request.body);
    const {
        username,
        email,
        firstname,
        lastname,
        phone,
        address,
        city,
        state,
        zipcode,
        vatnumber
    } = request.body;
    const hash = bcrypt.hashSync(request.body.password, 10);
    client.query('INSERT INTO users (username, password, email, firstname, lastname, phone, address, city, state, zipcode,vatnumber) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11)',
        [username, hash, email, firstname, lastname, phone, address, city, state, zipcode,vatnumber], (error, results) => {
        if (error) {
            throw error;
        }
            console.log(results,"results")
        response.status(201).send(`User added`);
    });
};

/*create login method with bcrypt password*/
const login = (request, response) => {
    const {
        email,
        password
    } = request.body;
    client.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length === 0) {
            response.status(401).send('User not found');
        } else {
            const valid = bcrypt.compareSync(password, results.rows[0].password);
            if (valid) {
                response.status(200).send(`${results.rows[0].username}`);
            } else {
                response.status(401).send('Invalid password');
            }
        }
    });
};



module.exports = {
    createUser,
    login
};