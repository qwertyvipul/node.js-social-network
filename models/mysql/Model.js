const mysql = require('mysql');
const keys = require('../../config/keys').MYSQL;

class Model{
    constructor(){
        this.self = this;
        this.conn = '';
        this.nofunc = () => {};
        this.query = {
            Users: `CREATE TABLE IF NOT EXISTS users(
                    user_id INT AUTO_INCREMENT,
                    name VARCHAR(255),
                    email VARCHAR(255) UNIQUE,
                    password VARCHAR(255),
                    PRIMARY KEY(user_id)
                );`,
        };

        this.init();
    }

    init(){
        this.conn = mysql.createConnection({
            host: keys.MYSQL_HOST,
            user: keys.MYSQL_USER,
            password: keys.MYSQL_PASSWORD,
            database: keys.MYSQL_DB
        });

        this.conn.connect((err) => {
            if(err){
                console.log('Connection to MySQL Database Failed!');
                throw err;
            }
            console.log('OK: MySQL Database Connected!');
            this.createModel();
            //this.conn.close();
        });
    }

    createModel(){
        this.createUsers(this.self);
    }

    createUsers(self, callback = self.nofunc){
        self.conn.query(self.query.Users, (err, result) => {
            if(err) throw err.message;
            else console.log("OK: Users Table!");
            callback(self);
        });
        callback();
    }
}

module.exports = Model;