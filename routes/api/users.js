const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route   GET api/users
// @desc    Return all users
// @access  Public
router.get('/', (req, res) => {
    res.json({
        page: 'users'
    });
});

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);

    // Check validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    // Check if email exists
    const query_email = `select * from users where email = "${req.body.email}"`;
    req.app.locals.conn.query(query_email, (err, result, fields) => {
        if(err) throw err;
        if(result.length > 0){
            errors.email = 'Email aleady exists!';
            return res.status(400).json(errors);
        }else{
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if(err) throw err;
                    const query_addUser = `insert into 
                        users(name, email, password) 
                        values(
                        "${req.body.name}",
                        "${req.body.email}",
                        "${hash}"
                    )`;

                    req.app.locals.conn.query(query_addUser, (err, result) => {
                        if(err) throw err;
                        res.json({success: 'User registered successfully!'});
                    })
                });
            });
        }
    });
});

// @route   POST api/users/login
// @desc    Login user
// @access  Public
router.post('/login', (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);

    // Check validation
    if(!isValid) res.status(400).json(errors);

    // Find user by email
    const query_findUser = `select * from users where email = "${req.body.email}"`;
    req.app.locals.conn.query(query_findUser, (err, result, fields) => {
        if(result.length !== 1){
            errors.email = 'User not found!';
            res.status(400).json(errors);
        }else{
            // Compare password
            bcrypt.compare(req.body.password, result[0].password)
            .then(isMatch => {
                if(isMatch){
                    const payload = {
                        user_id: result[0].user_id,
                        name: result[0].name,
                        email: result[0].email
                    };

                    jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    });
                }else{
                    errors.password = 'Incorrect password!';
                    return res.status(400).json(errors);
                }
            })
        }
    });
});

// @route   GET api/users/current
// @desc    Get current users
// @access  Private
router.get('/current', passport.authenticate('jwt', {session:false}), (req, res) => {
    res.json({
        user_id: req.user.user_id,
        name: req.user.name,
        email: req.user.email
    });
});


module.exports = router;