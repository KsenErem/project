const jwt = require('jsonwebtoken');
const Price = require('../../models/prices.model');


class Prices {

    async GetAll(body){
        let prices = await Price.findAll();
        return prices;
    }

}

module.exports = new Prices();


