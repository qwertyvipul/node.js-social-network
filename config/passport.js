const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport, conn) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        const query_getUserById = `select * from users where user_id = ${jwt_payload.user_id}`;
        conn.query(query_getUserById, (err, result) => {
            if(err) throw err;
            if(result.length === 1){
                return done(null, result[0]);
            }
            return done(null, false);
        });
    }));
}