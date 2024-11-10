const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your username
    password: '', // leave empty if no password is set
    database: 'FAQ_DATA'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database!');
});
module.exports = connection;