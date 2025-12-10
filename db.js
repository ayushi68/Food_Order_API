const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',        // XAMPP default
    password: '',        // empty password
    database: 'restaurant_db'
});

module.exports = db;
