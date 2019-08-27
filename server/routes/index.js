module.exports = app => {
    const express = require("express");
    const Token = require('../plugins/token');
    const Asset = require('http-assert');
    const router = express.Router();
    router.use(function (req, res, next) {
        const token = req.header.authentication;
        console.log(token);
        next();
    });

    router.get('/', function (req, res, next) {
        res.send('Hello World!');
    });
    app.use('/', router)
};
