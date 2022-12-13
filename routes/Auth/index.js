var express = require('express');
var router = express.Router();
const Auth = require('../../services/Auth');
const {AuthenticatedOnly} = require("../../middlewares/index");

router.post('/register', function(req, res, next) {
    Auth.RegisterUser(req.body)
        .then(data => res.status(200).json({ message: 'Запрос выполнен успешно', data}))
        .catch(err => next(err));
});

router.post('/login', function(req, res, next) {
    Auth.Login(req.body)
        .then(data => res.status(200).json({ message: 'Запрос выполнен успешно', data}))
        .catch(err => next(err));
});

router.post('/checkToken', AuthenticatedOnly, function(req, res, next) {
    Auth.CheckToken(req.body, req.user)
        .then(data => res.status(200).json({ message: 'Запрос выполнен успешно', data}))
        .catch(err => next(err));
});



module.exports = router;
