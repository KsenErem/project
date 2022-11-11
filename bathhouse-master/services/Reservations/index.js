const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const Reservation = require('../../models/reservations.model');
const Op = require('Sequelize').Op;
const httpError = require('http-errors');


class Reservations {

    async GetSingleReservation(id) {
        //SELECT * FROM `reservations` WHERE `start_time` <= "2022-06-27 15:55:00" OR `end_time` >= "2022-06-27 13:55:00"
        let result = await Reservation.findOne({
            where: {
                "id": id,
            }
        });

        return result;
    }

    async DeleteById(id) {
        //SELECT * FROM `reservations` WHERE `start_time` <= "2022-06-27 15:55:00" OR `end_time` >= "2022-06-27 13:55:00"
        let result = await Reservation.destroy({
            where: {
                "id": id,
            }
        });

        return result;
    }

    async GetAll(start_time, end_time, gender) {
        //SELECT * FROM `reservations` WHERE `start_time` <= "2022-06-27 15:55:00" OR `end_time` >= "2022-06-27 13:55:00"
        console.log(start_time);
        console.log(end_time);
        let result = await Reservation.findAll({
            where: {
                [Op.and]: [
                    {
                        "start_time": {[Op.gt]: start_time}
                    },
                    {
                        "end_time": {[Op.lt]: end_time}
                    }
                ],
                "gender": gender,
            }
        });
        console.log(result.length);

        return result;
    }

    async CreateReservation(body) {
        const start_time = body.start_time;
        const end_time = body.end_time;
        const gender = body.gender;
        const name = body.name;
        const phone = body.phone;
        console.log(body);

        //SELECT * FROM `reservations` WHERE `start_time` <= "2022-06-27 15:55:00" OR `end_time` >= "2022-06-27 13:55:00"
        // 1 - male, 0 - female
        let result = await Reservation.findAll({
            where: {
                [Op.or]: [
                    {
                        "start_time": {[Op.gt]: start_time}
                    },
                    {
                        "end_time": {[Op.lt]: start_time}
                    }
                ],
                "gender": gender,
            }
        });

        console.log(result.length);

        if (+gender === 1) {
            console.log(`here`);
            if(result.length >= 28){
                throw httpError(400, "Больше шкафчиков нет")
            }
        }
        if(+gender === 0){
            console.log(`here1`);
            if(result.length >= 30){
                throw httpError(400, "Больше шкафчиков нет");
            }
        }

        await Reservation.create({start_time, end_time, gender, created_by_admin: 1, client_name: name, client_phone: phone});

        return "Создано";
    }

    async GetTable(gender) {
        let result = [];
        for (let i = 10; i < 24; i++) {
            if (i < 10) {
                result.push(`0${i}:00`);
                result.push(`0${i}:30`);
            } else {
                result.push(`${i}:00`);
                result.push(`${i}:30`);
            }
        }

        result.push(`24:00`);
        result.push(`00:30`);
        result.push(`01:00`);
        result.push(`01:30`);


        let rows = 30;

        if (gender === 'male') {
            rows = 28;
        }

        return {columns: result, rows: rows};
    }

}

module.exports = new Reservations();


