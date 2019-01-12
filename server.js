const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

// Import routes
const users = require('./routes/api/users');

// Initialize App
const app = express();

// Create database mode
const MysqlModel = require('./models/mysql/Model');
const mysqlModel = new MysqlModel();

// Share the connection variable
app.locals.conn = mysqlModel.conn;

// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport, mysqlModel.conn);

// Routes
app.use('/api/users', users);

const port = process.env.PORT || 5050;
app.listen(port, () => `OK: App running on port ${port}`);