var express = require('express');
var router = express.Router();
const Reservations = require('../../services/Reservations');
const {AuthenticatedOnly} = require("../../middlewares/index");

router.get('/getSingle', AuthenticatedOnly, function(req, res, next) {
    Reservations.GetSingleReservation(req.query.id).then(data => res.status(200).json({ message: 'Запрос выполнен успешно', data}))
        .catch(err => next(err));
});

router.post('/deleteById', AuthenticatedOnly, function(req, res, next) {
    Reservations.DeleteById(req.body.id).then(data => res.status(200).json({ message: 'Запрос выполнен успешно', data}))
        .catch(err => next(err));
});

router.get('/', AuthenticatedOnly, function(req, res, next) {
    Reservations.GetAll(req.query.start_time, req.query.end_time, req.query.gender).then(data => res.status(200).json({ message: 'Запрос выполнен успешно', data}))
        .catch(err => next(err));
});

router.post('/create', AuthenticatedOnly, function(req, res, next) {
    Reservations.CreateReservation(req.body).then(data => res.status(200).json({ message: 'Запрос выполнен успешно', data}))
        .catch(err => next(err));
});

router.get('/getTable', AuthenticatedOnly, function(req, res, next) {
    Reservations.GetTable(req.query.gender).then(data => res.status(200).json({ message: 'Запрос выполнен успешно', data}))
        .catch(err => next(err));
});

module.exports = router;
