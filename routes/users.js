const errors = require('restify-errors');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require('./auth');
const jwt = require('jsonwebtoken');
const config = require('../config');
module.exports = server => {

    //register user
    server.post('/register', (req, res, next) => {
        const { email, password } = req.body
        const user = new User({
            email,
            password
        });

        bcrypt.genSalt(10, (err, salt) => {

            bcrypt.hash(user.password, salt, async (err, hash) => {
                //hash apssword
                user.password = hash;
                //save user
                try {
                    const newUser = await user.save();
                    res.send(201);
                    next();

                } catch (err) {

                    return next(new errors.InternalError(err.message))
                }
            })
        })

    });

    //auth user

    server.post('/auth', async (req, res, next) => {
        const { email, password } = req.body;


        try {
            //Authenticate user
            const user = await auth.authenticate(email, password);
           
            // create Jwt
            const token = jwt.sign(user.toJSON(),config.JWT_SECRET,{
                expiresIn :'30m'
            });

            //respond with token 

            const { iat , exp } = jwt.decode(token);

            res.send({iat , exp , token});

            next();

        } catch (err) {
            // statements
            return next(new errors.UnauthorizedError(err));
        }


    });














}