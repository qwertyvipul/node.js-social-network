var express = require('express');
var mysql = require('mysql');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

// Import routes
const users = require('./routes/api/users');
const register = require('./routes/api/register');

// Initialize App
const app = express();

// Initialize MySQL Database
const db_mysql = require('./config/keys').MYSQL;
const MysqlModel = require('./models/mysql/Model');
// Connecting to the mysql database
const conn = mysql.createConnection({
    host: db_mysql.MYSQL_HOST,
    user: db_mysql.MYSQL_USER,
    password: db_mysql.MYSQL_PASSWORD,
    database: db_mysql.MYSQL_DB
});

conn.connect((err) => {
    if(err){
        console.log('Connection to MySQL Database Failed!');
        throw err;
    }
    console.log('OK: MySQL Database Connected!');
    const mysqlModel = new MysqlModel(conn);
    mysqlModel.createModel();
});

// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());

// Routes
app.use('/api/users', users);
app.use('/api/register', register);

const port = process.env.PORT || 5050;
app.listen(port, () => `OK! App running on port ${port}`);