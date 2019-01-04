class Model{
    constructor(conn){
        this.self = this;
        this.conn = conn;
        this.nofunc = () => {};
        this.query = {
            Users: `CREATE TABLE IF NOT EXISTS users(
                    name VARCHAR(255),
                    email VARCHAR(255),
                    username VARCHAR(255),
                    password VARCHAR(255)
                );`,
        };
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