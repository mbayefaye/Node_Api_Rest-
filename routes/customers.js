const errors = require('restify-errors');
const Customer = require('../models/Customer');
const rjwt = require('restify-jwt-community')
const config = require('../config');

module.exports = server => {

    //Get Costumers
    server.get('/customers', async (req, res, next) => {
        try {
            const customers = await Customer.find({});
            res.send(customers)
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err))
        }

    });



    //get single costumer
    server.get('/customers/:id', async (req, res, next) => {
        try {
            const customer = await Customer.findById(req.params.id);
            res.send(customer)
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`there is no customer with this id:${req.params.id}`))
        }

    });



    //Add costumers

    server.post('/customers',rjwt({secret:config.JWT_SECRET}), async (req, res, next) => {
        //check for Json

        if (req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        const { name, email, balance } = req.body;

        const customer = new Customer({
            name: name,
            email: email,
            balance: balance
        });


        try {
            const newCostumer = await customer.save();
            res.send(201);
            next();
        } catch (err) {

            return next(new errors.InvalidContentError(err.message))


        }

    });



    //update customer

    server.put('/customers/:id',rjwt({secret:config.JWT_SECRET}), async (req, res, next) => {
        //check for Json

        if (req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        try {
            const newCostumer = await Customer.findOneAndUpdate({ _id: req.params.id }, req.body);
            res.send(200);
            next();
        } catch (err) {

            return next(new errors.ResourceNotFoundError(`there is no costumer with this id:${req.params.id}`))


        }

    });


    /// delete costumer


    server.del('/customers/:id',rjwt({secret:config.JWT_SECRET}), async (req, res, next) => {

        try {
            const customer = await Customer.findOneAndRemove({ _id: req.params.id });
            res.send(204)
            next()
        } catch (err) {

            return next(new errors.ResourceNotFoundError(`there is no costumer with this id:${req.params.id}`))


        }















    });








































}