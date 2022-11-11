var express = require('express');
var router = express.Router();
const Prices = require('../../services/Prices');
const {AuthenticatedOnly} = require("../../middlewares/index");

router.get('/', AuthenticatedOnly, function(req, res, next) {
    Prices.GetAll().then(result => {
        res.json({data: result});
    })
});



module.exports = router;
